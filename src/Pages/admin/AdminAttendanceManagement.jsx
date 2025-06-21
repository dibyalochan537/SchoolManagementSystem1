import React, { useState,useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Tab,
  Tabs,
  Card
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {provideListOfAllActor} from "../../API/totalData";
import {adminGetAllStudentManagement} from "../../API/studentManagement";
import {adminGetAllStaffManagement} from "../../API/staffManagement"
export default function AdminAttendanceManagement(){
  return (
    <Container fluid className="p-4">
      <h3 className="text-center text-primary">Attendance Management</h3>
      <p className="text-center text-muted">
        Easily manage and track attendance records for students and staff.
      </p>

      <Tabs
        id="attendance-tabs"
        className="mb-4 nav-tabs"
        justify
      >
        <Tab eventKey="student" title="🧑‍🎓 Student Attendance" className="nav-link">
          <StudentAttendance />
        </Tab>
        <Tab eventKey="staff" title="👨‍🏫 Staff Attendance" className="nav-link">
          <StaffAttendance />
        </Tab>
      </Tabs>
    </Container>
  );
};

const StudentAttendance = () => {
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
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
          const loadStdMngData = async () => {
            try {
              const dataStdMng = await adminGetAllStudentManagement();
              setStudentInformation(dataStdMng);
            } catch (err) {
              console.error("Error fetching student management data:", err);
              setError("Failed to load student data.");
            } finally {
              setLoading(false);
            }
          };
        loadStdMngData();
    }, []);
    const handleLoadData = () => {
        if (formData.class && formData.section) {
            const matched = studentInformation.filter(
            (student) =>
                student.admissionClass === formData.class &&
                student.section === formData.section
            );
            setFilteredStudents(matched);
            setAttendanceData(matched.map((s) => ({
            regdNo: s.regdNo,
            status: "present", // default or leave empty ""
            })));
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
  return (
    <>
      <Form className="p-3 border rounded bg-light">
        <h5 className="mb-3">Student Attendance</h5>
        <Row className="mb-3" style={{display:"flex",justifyContent:"space-between"}}>
          <Col md={2}>
            <Form.Label>Type</Form.Label>
            <Form.Control defaultValue="Manual Attendance"  />
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
            <Form.Control type="date" defaultValue={today} />
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
            <Button variant="success" size="sm" onClick={() => updateAllStatus("present")}>
              Mark All Present
            </Button>
          </Col>
          <Col>
            <Button variant="danger" size="sm" onClick={() => updateAllStatus("sunday")}>
              Mark As Sunday
            </Button>
          </Col>
          <Col>
            <Button variant="warning" size="sm" onClick={() => updateAllStatus("holiday")}>
              Mark All Holiday
            </Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive className="mt-4">
            <thead className="bg-primary text-white text-center">
                <tr>
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
                    <tr key={idx} style={{textAlign:"center"}}>
                        <td>{student.id}</td>
                        <td>{`${student.firstName} ${student.middleName} ${student.lastName}`}</td>
                        <td>{student.gender}</td>
                        <td>{student.admissionClass}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.fatherNumber || student.motherNumber || student.guardianNumber}</td>
                        <td>
                            <select name="" id=""
                                value={
                                    attendanceData.find((entry) => entry.regdNo === student.regdNo)?.status ||
                                    ""
                                    }
                                    onChange={(e) => {
                                    const updated = attendanceData.map((entry) =>
                                        entry.regdNo === student.regdNo
                                        ? { ...entry, status: e.target.value }
                                        : entry
                                    );
                                    setAttendanceData(updated);
                                }}
                            >
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="sunday">Sunday</option>
                                <option value="holiday">Holiday</option>
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
            <Form.Control type="button" value="Submit" 
                style={{
                    backgroundColor: "#0d6efd",
                    color: "white",
                    width:"fit-content",
                }}
            />
        </div>
        </Form>
        <Form className="p-3 mt-4 border rounded bg-light">
            <h5 className="mb-3">Attendance Report</h5>
            <Row>
            <Col md={3}>
                <Form.Label>Report Type</Form.Label>
                <Form.Control defaultValue="Date Range" disabled />
            </Col>
            <Col md={3}>
                <Form.Label>From</Form.Label>
                <Form.Control type="date" />
            </Col>
            <Col md={3}>
                <Form.Label>To</Form.Label>
                <Form.Control type="date" />
            </Col>
            <Col md={3} className="d-flex align-items-end">
                <Button variant="success" className="w-100">
                Download Report
                </Button>
            </Col>
            </Row>
        </Form>
    </>
  );
};









const StaffAttendance = () => {
    const today = new Date().toISOString().split("T")[0];
    const [staffList, setStaffList] = useState([]);
    const [staffDeptpartmentList,setStaffDeptpartmentList]=useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // const dummyStaff = [
    //     { id: "ST001", name: "Rina Sahoo", designation: "Teacher" },
    //     { id: "ST002", name: "Abhishek Nayak", designation: "Head Accountant" },
    // ];
    useEffect(() => {
          const fetchData = async () => {
            try {
              const getAllActorData = await provideListOfAllActor();
              setStaffDeptpartmentList(getAllActorData[2]);
            } catch (err) {
              console.error("Failed to fetch data:", err);
            }
          };
          fetchData();
    }, []);
    const [dummyStaff,setdummyStaff]=useState([]);
    useEffect(() => {
          const fetchData = async () => {
            try {
              const getAllActorData = await adminGetAllStaffManagement();
              setdummyStaff(getAllActorData);
            } catch (err) {
              console.error("Failed to fetch data:", err);
            }
          };
          fetchData();
    }, []);
    const handleLoadReport = () => {
        let filtered = dummyStaff;
        if (selectedDepartment) {
            filtered = filtered.filter(
            (s) => s.department && s.department.toLowerCase() === selectedDepartment.toLowerCase()
            );
        }
        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();
            filtered = filtered.filter(
            (s) =>
                s.name.toLowerCase().includes(query) ||
                s.id.toLowerCase().includes(query)
            );
        }
        setStaffList(filtered);
        setAttendanceData(
            filtered.map((s) => ({
            staffId: s.id,
            status: "present",
            }))
        );
    };
    const updateAllStatus = (newStatus) => {
        setAttendanceData((prev) =>
        prev.map((entry) => ({ ...entry, status: newStatus }))
        );
    };
    const handleStatusChange = (id, newStatus) => {
        setAttendanceData((prev) =>
            prev.map((entry) =>
                entry.staffId === id ? { ...entry, status: newStatus } : entry
            )
        );
    };
  return (
    <>
      <Card className="p-3 mb-4 shadow-sm bg-light">
        <Form className="bg-light">
        <h4 className="text-dark text-left mb-3">Staff Attendance</h4>
          <Row className="mb-3" style={{display:"flex",justifyContent:"space-between"}}>
            <Col md={2}>
              <Form.Label>Department</Form.Label>
              <Form.Select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                    <option value="">All Departments</option>
                    {staffDeptpartmentList.map((item) => (
                        <option key={item} value={item}>
                        {item}
                        </option>
                    ))}
               </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>Type</Form.Label>
              <Form.Control value="Manual Attendance" readOnly />
            </Col>
            <Col md={2}>
                <Form.Label>Search Staff</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Search by ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Col>
            <Col md={2}>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" defaultValue={today} />
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="primary" onClick={handleLoadReport} className="w-100">
                Load Report
              </Button>
            </Col>
          </Row>
          <Row className="text-center mb-3">
            <Col>
              <Button variant="success" size="sm" onClick={() => updateAllStatus("present")}>
                Mark All Present
              </Button>
            </Col>
            <Col>
              <Button variant="danger" size="sm" onClick={() => updateAllStatus("sunday")}>
                Mark As Sunday
              </Button>
            </Col>
            <Col>
              <Button variant="warning" size="sm" onClick={() => updateAllStatus("holiday")}>
                Mark All Holiday
              </Button>
            </Col>
          </Row>
          <Table bordered hover responsive className="text-center">
            <thead className="table-secondary">
              <tr>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
            {staffList.length > 0 ? (
              staffList.map((staff) => (
                <tr key={staff.id}>
                  <td>{staff.id}</td>
                  <td>{staff.name}</td>
                  <td>{staff.department}</td>
                  <td>{staff.designation}</td>
                  <td style={{display:"flex",justifyContent:"center"}}>
                    <Form.Select
                      value={
                        attendanceData.find((e) => e.staffId === staff.id)?.status || ""
                      }
                      onChange={(e) => handleStatusChange(staff.id, e.target.value)}
                      style={{width:"120px"}}
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="sunday">Sunday</option>
                      <option value="holiday">Holiday</option>
                    </Form.Select>
                  </td>
                </tr>
               ))):(
                <tr>
                    <td colSpan="8" className="text-center text-muted">
                    No Staff found for the selected Department.
                    </td>
                </tr>  
            )}
            </tbody>
          </Table>
          <div style={{display:"flex",justifyContent:"right"}}>
                <Form.Control type="button" value="Submit" 
                    style={{
                        backgroundColor: "#0d6efd",
                        color: "white",
                        width:"fit-content",
                    }}
                />
            </div>
        </Form>
      </Card>

      <Card className="p-3 shadow-sm">
        <h5 className="mb-3">Attendance Report</h5>
        <Form>
          <Row>
            <Col md={3}>
              <Form.Label>Report Type</Form.Label>
              <Form.Control value="Date Range" readOnly />
            </Col>
            <Col md={3}>
              <Form.Label>From</Form.Label>
              <Form.Control type="date" />
            </Col>
            <Col md={3}>
              <Form.Label>To</Form.Label>
              <Form.Control type="date" />
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <Button variant="success" className="w-100">
                Download Report
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

    </>
  );
};
