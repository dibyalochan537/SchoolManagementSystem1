import React, { useState,useEffect } from "react";
import {Container,Row,Col,Form,Button,Table,Tab,Tabs,Card} from "react-bootstrap";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {provideListOfAllActor} from "../API/totalData";
import {adminGetAllStudentManagement} from "../API/studentManagement";
import {getAttendanceOfStudents} from "../API/studentManagement";
import {postStudentAttendanceData,updateStudentAttendanceData} from "../API/attendanceManagement";
export default function AdminStudentAttendance(){
    // For student Class List
    // const [classListActor, setClassListActor] = useState({});
    const [key, setKey] = useState("student");
    const [classSectionData,setClassSectionData]=useState({});
    const [formData, setFormData] = useState({
        class: "",
        section: "",
    });
    useEffect(() => {
        const fetchData = async () => {
          try {
            const getAllActorData = await provideListOfAllActor();
            setClassSectionData(getAllActorData[0]);
          } catch (err) {
            console.error("Failed to fetch data:", err);
          }
        };
        fetchData();
    }, []);
    const today = new Date().toISOString().split("T")[0];
    // Get section options based on selected class
    const dynamicSectionOptions =
    classSectionData[formData.class] || [];
    // For Filter student data
    const [studentInformation,setStudentInformation]=useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [attendanceAllStudentData,setAttendanceAllStudentData]=useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    const [selectedDate, setSelectedDate] = useState(today);
    useEffect(() => {
      const loadStdMngData = async () => {
        try {
          const dataStdMng = await adminGetAllStudentManagement();
          const allStudentAttendance = await getAttendanceOfStudents();
          setAttendanceAllStudentData(allStudentAttendance);
          setStudentInformation(dataStdMng);
          const matched = dataStdMng.filter(
            (student) =>
              student.admissionClass === formData.class &&
              student.section === formData.section
          );
          setFilteredStudents(matched);
          const todayDate = today; // default selected date is today
          const initialAttendance = matched.map((s) => {
            const studentRecord = allStudentAttendance.find((std) => std.student_id === s.id);
            const record = studentRecord?.records.find((r) => r.date === todayDate);
            return {
              regdNo: s.id,
              status: record ? record.status.toLowerCase() : "present",
            };
          });
          setAttendanceData(initialAttendance);
        } catch (err) {
          console.error("Error fetching student management data:", err);
          setError("Failed to load student data.");
        } finally {
          setLoading(false);
        }
      };
      loadStdMngData();
    }, []);
    const handleOnchangeStudentStatus = async (data) => {
      setAttendanceData((prev) =>
        prev.map((entry) =>
          entry.regdNo === data.student_id ? { ...entry, status: data.status } : entry
        )
      );
    };   
    const handleLoadData = () => {
      if (formData.class && formData.section) {
        const matched = studentInformation.filter(
          (student) =>
            student.admissionClass === formData.class &&
            student.section === formData.section
        );
        setFilteredStudents(matched);
        const initialAttendance = matched.map((s) => {
          const studentRecord = attendanceAllStudentData.find((std) => std.student_id === s.id);
          const record = studentRecord?.records.find((r) => r.date === selectedDate);
          return {
            regdNo: s.id,
            status: record ? record.status: "Present",
          };
        });
        setAttendanceData(initialAttendance);
      } else {
        setFilteredStudents([]);
        alert("Please select both class and section.");
      }
    };
    //Mark All functionality
    const updateAllStatus = (newStatus) => {
        setAttendanceData((prev) =>
            prev.map((entry) => ({ ...entry, status: newStatus }))
        );
    };
    //Handle checkbox
    const [selectedStudents, setSelectedStudents] = useState([]);
    const handleSelectAll =(e)=>{
      if (e.target.checked) {
        const allIds = filteredStudents.map((s) => s.id);
        setSelectedStudents(allIds);
      } else {
        setSelectedStudents([]);
      }
    };
    const handleCheckboxChange = (id) => {
      setSelectedStudents((prev) =>
        prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
      );
    };
// Handle attendance submit
    const handleSubmitAttendance = async () => {
      if (selectedStudents.length === 0) {
        alert("Please Select Atleast one Student !!");
      } else {
        const submissionData = filteredStudents
          .filter((student) => selectedStudents.includes(student.id))
          .map((student) => {
            const attendance =
              attendanceData.find((entry) => entry.regdNo === student.id)?.status || "absent";
            return {
              student_id: student.id,
              date: selectedDate,
              status: attendance,
            };
          });

        for (const data of submissionData) {
          const studentRecord = attendanceAllStudentData.find(
            (std) => std.student_id === data.student_id
          );
          const existingRecord = studentRecord?.records.find((r) => r.date === selectedDate);

          if (existingRecord) {
            await updateStudentAttendanceData(data);
          } else {
            await postStudentAttendanceData(data);
          }
        }

        alert("Attendance submitted successfully.");
      }
    };
// Report download
    const [reportType, setReportType] = useState("dateRange");
    const [fromValue, setFromValue] = useState("");
    const [toValue, setToValue] = useState("");
  //Handle download
  const handleDownload = () => {
    let from = fromValue;
    let to = toValue;
    let filteredRecords = [];
    attendanceAllStudentData.forEach((student) => {
      student.records.forEach((record) => {
        const date = record.date;
        let include = false;
        if (reportType === "dateRange") {
          include = date >= from && date <= to;
        } else if (reportType === "monthRange") {
          // Compare just year and month (YYYY-MM)
          include =
            date.slice(0, 7) >= from.slice(0, 7) &&
            date.slice(0, 7) <= to.slice(0, 7);
        }
        if (include) {
          filteredRecords.push({
            Student_ID: student.student_id,
            Name: student.name,
            Class: student.class,
            Date: record.date,
            Status: record.status,
          });
        }
      });
    });

    if (filteredRecords.length === 0) {
      alert("No data found for the selected range.");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredRecords);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AttendanceReport");
    XLSX.writeFile(workbook, "Attendance_Report.xlsx");
  };
  return (
    <>
      <Form className="p-3 border rounded bg-light">
        <h5 className="mb-3">Student Attendance</h5>
        <Row className="mb-3" style={{display:"flex",justifyContent:"space-between"}}>
          <Col md={2}>
            <Form.Label>Type</Form.Label>
            <Form.Select>
              <option value="manual">Manual Attendance</option>
              <option value="biometric">Auto Attendance</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label>Class</Form.Label>
            <Form.Select
                value={formData.class}
                onChange={(e) =>
                setFormData({
                    ...formData,
                    class: e.target.value,
                    section: "", // Reset section when class changes
                })
                }
            >
                <option value="">Select Class</option>
                {Object.keys(classSectionData || {}).map((classKey) => (
                    <option key={classKey} value={classKey}>
                        {classKey}
                    </option>
                ))}
            </Form.Select>
            </Col>
            <Col md={2}>
            <Form.Label>Section</Form.Label>
            <Form.Select
                value={formData.section}
                onChange={(e) =>
                setFormData({ ...formData, section: e.target.value })
                }
                disabled={!formData.class} // Disable if no class selected
            >
                <option value="">Select Section</option>
                {dynamicSectionOptions.map((sec, idx) => (
                <option key={idx} value={sec}>
                    {sec}
                </option>
                ))}
            </Form.Select>
            </Col>
          <Col md={2}>
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" max={today} value={selectedDate} onChange={(e) => {
              setSelectedDate(e.target.value);
              if (formData.class && formData.section) {
                const updatedAttendance = filteredStudents.map((s) => {
                  const studentRecord = attendanceAllStudentData.find((std) => std.student_id === s.id);
                  const record = studentRecord?.records.find((r) => r.date === e.target.value);
                  return {
                    regdNo: s.id,
                    status: record ? record.status.toLowerCase() : "present",
                  };
                });
                setAttendanceData(updatedAttendance);
              }
            }}

            />
          </Col>
          <Col md={2}>
            <Form.Label>Load Data</Form.Label>
            <Form.Control type="button" value="Load Data" 
                style={{ backgroundColor: "#0d6efd", color: "white" }}
                onClick={handleLoadData}
            />
          </Col>
        </Row>
        <Row className="text-center mb-3">
          <Col>
            <Button variant="success" size="sm" onClick={() => updateAllStatus("Present")}>
              Mark All Present
            </Button>
          </Col>
          <Col>
            <Button variant="danger" size="sm" onClick={() => updateAllStatus("Sunday")}>
              Mark As Sunday
            </Button>
          </Col>
          <Col>
            <Button variant="warning" size="sm" onClick={() => updateAllStatus("Holiday")}>
              Mark All Holiday
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive className="mt-4">
          <thead className="bg-primary text-white text-center">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    filteredStudents.length > 0 &&
                    selectedStudents.length === filteredStudents.length
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th>Regd No</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Admission Class</th>
              <th>Roll No</th>
              <th>Contact No</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, idx) => (
                <tr key={idx} style={{ textAlign: "center" }}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleCheckboxChange(student.id)}
                    />
                  </td>
                  <td>{student.id}</td>
                  <td>{`${student.firstName} ${student.middleName} ${student.lastName}`}</td>
                  <td>{student.gender}</td>
                  <td>{student.admissionClass}</td>
                  <td>{student.rollNo}</td>
                  <td>
                    {student.fatherNumber ||
                      student.motherNumber ||
                      student.guardianNumber}
                  </td>
                  <td>
                  <select
                    value={
                      attendanceData.find(
                        (entry) => entry.regdNo === student.id
                      )?.status || ""
                    }
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      const updated = attendanceData.map((entry) =>
                        entry.regdNo === student.id
                          ? { ...entry, status: newStatus }
                          : entry
                      );
                      setAttendanceData(updated);
                      const attendanceRecord = {
                        student_id:`${student.id}`,
                        date:`${selectedDate}`,
                        status:`${newStatus}`
                      };
                      handleOnchangeStudentStatus(attendanceRecord);
                    }}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Holiday">Holiday</option>
                  </select>
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No students found for the selected class and section.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <div style={{display:"flex",justifyContent:"right"}}>
              <Form.Control
                type="button"
                value="Submit"
                style={{
                  backgroundColor: "#0d6efd",
                  color: "white",
                  width: "fit-content",
                }}
                onClick={handleSubmitAttendance}
              />
        </div>
        </Form>
        <Form className="p-3 mt-4 border rounded bg-light">
            <h5 className="mb-3">Attendance Report</h5>
            <Row>
              <Col md={3}>
                <Form.Label>Report Type</Form.Label>
                <Form.Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="dateRange">By Date</option>
                  <option value="monthRange">By Month</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Label>From</Form.Label>
                <Form.Control
                  type={reportType === "dateRange" ? "date" : "month"}
                  value={fromValue}
                  onChange={(e) => setFromValue(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Label>To</Form.Label>
                <Form.Control
                  type={reportType === "dateRange" ? "date" : "month"}
                  value={toValue}
                  onChange={(e) => setToValue(e.target.value)}
                />
              </Col>
              <Col md={3} className="d-flex align-items-end">
                <Button variant="success" className="w-100" onClick={handleDownload}>
                  Download Report
                </Button>
              </Col>
            </Row>
        </Form>
    </>
  );
};