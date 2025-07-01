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
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import {provideListOfAllActor} from "../API/totalData";
import {adminGetAllStaffManagement} from "../API/staffManagement";
import {getAttendanceOfStaffs} from "../API/staffManagement";
import {postStaffAttendanceData,updateStaffAttendanceData} from "../API/attendanceManagement"
export default function AdminStaffAttendance(){
    const today = new Date().toISOString().split("T")[0];
  const [staffList, setStaffList] = useState([]);
  const [staffDeptpartmentList, setStaffDeptpartmentList] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [attendanceAllStaffData, setAttendanceAllStaffData] = useState([]);
  const [dummyStaff, setDummyStaff] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actorData = await provideListOfAllActor();
        const allStaffAttendance = await getAttendanceOfStaffs();
        setAttendanceAllStaffData(allStaffAttendance);
        setStaffDeptpartmentList(actorData[2]);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const staffData = await adminGetAllStaffManagement();
        setDummyStaff(staffData);
      } catch (err) {
        console.error("Failed to fetch staff data:", err);
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
        (s) => s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query)
      );
    }

    setStaffList(filtered);
    const initialAttendance = filtered.map((s) => {
      const staffRecord = attendanceAllStaffData.find((std) => std.staff_id === s.id);
      const record = staffRecord?.records.find((r) => r.date === selectedDate);
      return {
        staffId: s.id,
        status: record ? record.status : "Present",
      };
    });
    setAttendanceData(initialAttendance);
    setSelectedStaffs([]);
  };

  const handleSubmitAttendance = async () => {
    const submissionData = staffList
      .filter((staff) => selectedStaffs.includes(staff.id))
      .map((staff) => {
        const status = attendanceData.find((entry) => entry.staffId === staff.id)?.status || "absent";
        return {
          staff_id:staff.id,
          date: selectedDate,
          status:status,
        };
      });

    for (const data of submissionData) {
      const existing = attendanceAllStaffData.find((s) => s.staff_id === data.staff_id);
      const recordExists = existing?.records.some((r) => r.date === data.date);

      try {
        if (recordExists) {
          await updateStaffAttendanceData(data);
        } else {
          await postStaffAttendanceData(data);
        }
      } catch (err) {
        console.error("Error submitting attendance:", err);
      }
    }
    alert("Attendance submitted successfully.");
  };

  const updateAllStatus = (newStatus) => {
    setAttendanceData((prev) => prev.map((entry) => ({ ...entry, status: newStatus })));
  };

  const handleStatusChange = (id, newStatus) => {
    setAttendanceData((prev) =>
      prev.map((entry) => (entry.staffId === id ? { ...entry, status: newStatus } : entry))
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStaffs(staffList.map((s) => s.id));
    } else {
      setSelectedStaffs([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedStaffs((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };
// Download report
  const [reportType, setReportType] = useState("dateRange");
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const handleDownload = () => {
    if (!fromValue || !toValue) {
      alert("Please select both From and To.");
      return;
    }

    const filteredData = [];

    getAllStaffAttendance.forEach((staff) => {
      staff.records.forEach((record) => {
        const date = record.date;
        let include = false;

        if (reportType === "dateRange") {
          include = date >= fromValue && date <= toValue;
        } else {
          // Check by YYYY-MM
          const recordMonth = date.slice(0, 7);
          include =
            recordMonth >= fromValue.slice(0, 7) &&
            recordMonth <= toValue.slice(0, 7);
        }

        if (include) {
          filteredData.push({
            Staff_ID: staff.staff_id,
            Name: staff.name,
            Department: staff.department,
            Designation: staff.designation,
            Date: record.date,
            Status: record.status,
          });
        }
      });
    });

    if (filteredData.length === 0) {
      alert("No data found in selected range.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "StaffAttendance");
    XLSX.writeFile(workbook, "Staff_Attendance_Report.xlsx");
  };

  return (
    <>
      <Card className="p-3 mb-4 shadow-sm bg-light">
        <Form>
          <Row className="mb-3" style={{display:"flex",justifyContent:"space-between"}}>
            <Col md={2}>
              <Form.Label>Department</Form.Label>
              <Form.Select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {staffDeptpartmentList.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </Form.Select>
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
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="primary" onClick={handleLoadReport} className="w-100">
                Load Data
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
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={staffList.length > 0 && selectedStaffs.length === staffList.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Staff ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Attendance Status</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStaffs.includes(staff.id)}
                      onChange={() => handleCheckboxChange(staff.id)}
                    />
                  </td>
                  <td>{staff.id}</td>
                  <td>{staff.name}</td>
                  <td>{staff.department}</td>
                  <td>{staff.designation}</td>
                  <td>
                    <Form.Select
                      value={attendanceData.find((e) => e.staffId === staff.id)?.status || ""}
                      onChange={(e) => handleStatusChange(staff.id, e.target.value)}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Sunday">Sunday</option>
                      <option value="Holiday">Holiday</option>
                    </Form.Select>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end">
            <Button variant="primary" onClick={handleSubmitAttendance}
              disabled={selectedStaffs.length===0}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>

      <Card className="p-3 shadow-sm">
        <h5 className="mb-3">Attendance Report</h5>
        <Form>
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
      </Card>
    </>
  );
};
