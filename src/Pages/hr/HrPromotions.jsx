import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HrPromotions() {
  const [formData, setFormData] = useState({
    empId: "",
    newDesignation: "",
    newSalary: "",
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("none");

  const [history, setHistory] = useState([
    {
      date: "2024-06-01",
      empId: "EMP001",
      oldDesignation: "Teacher",
      newDesignation: "Senior Teacher",
      oldSalary: 30000,
      newSalary: 40000,
      status: "previous",
    },
  ]);

  const dummyEmployee = {
    EMP001: { designation: "Teacher", salary: 30000 },
    EMP002: { designation: "Accountant", salary: 25000 },
    EMP003: { designation: "Clerk", salary: 18000 },
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleApply = () => {
    const { empId, newDesignation, newSalary } = formData;
    const emp = dummyEmployee[empId];
    if (!emp) return alert("Employee ID not found in dummy data.");

    const newEntry = {
      date: new Date().toISOString().slice(0, 10),
      empId,
      oldDesignation: emp.designation,
      newDesignation,
      oldSalary: emp.salary,
      newSalary: parseInt(newSalary),
      status: "recent",
    };

    dummyEmployee[empId] = {
      designation: newDesignation,
      salary: parseInt(newSalary),
    };

    const updatedHistory = history.map((entry) =>
      entry.empId === empId ? { ...entry, status: "previous" } : entry
    );

    setHistory([newEntry, ...updatedHistory]);
    setFormData({ empId: "", newDesignation: "", newSalary: "" });
  };

  const handleFilterChange = (e) => setFilter(e.target.value);
  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredHistory = history
    .filter((entry) => {
      const query = search.toLowerCase();
      return (
        entry.empId.toLowerCase().includes(query) ||
        entry.oldDesignation.toLowerCase().includes(query) ||
        entry.newDesignation.toLowerCase().includes(query) ||
        entry.oldSalary.toString().includes(query) ||
        entry.newSalary.toString().includes(query)
      );
    })
    .sort((a, b) => {
      if (filter === "a-z") {
        return a.empId.localeCompare(b.empId);
      } else if (filter === "status") {
        return a.status.localeCompare(b.status);
      } else if (filter === "salary") {
        return b.newSalary - a.newSalary;
      } else {
        return 0;
      }
    });

  return (
    <Container className="mt-4">
      <h3 className="text-center text-primary fw-bold">
        Employee Promotion / Demotion Management
      </h3>

      <Card className="p-3 my-4">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>Employee ID</Form.Label>
            <Form.Control
              placeholder="Enter Employee ID"
              value={formData.empId}
              onChange={handleChange("empId")}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Label>New Designation</Form.Label>
            <Form.Control
              placeholder="Choose designation"
              value={formData.newDesignation}
              onChange={handleChange("newDesignation")}
            />
          </Col>
          <Col md={4}>
            <Form.Label>New Salary (INR)</Form.Label>
            <Form.Control
              placeholder="Enter new salary"
              value={formData.newSalary}
              onChange={handleChange("newSalary")}
              type="number"
            />
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button className="w-100" onClick={handleApply}>
              Apply
            </Button>
          </Col>
        </Row>
      </Card>

      <Card className="p-3 my-4">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by ID, designation, salary..."
              value={search}
              onChange={handleSearchChange}
            />
          </Col>
          <Col md={4}>
            <Form.Select value={filter} onChange={handleFilterChange}>
              <option value="none">Sort/Filter By</option>
              <option value="a-z">A-Z (Employee ID)</option>
              <option value="status">Status</option>
              <option value="salary">Highest Salary</option>
            </Form.Select>
          </Col>
        </Row>

        <h5 className="text-primary">Promotion / Demotion History</h5>
        <div className="table-responsive" style={{ overflowX: 'auto' }}>
          <Table bordered hover responsive className="mt-2 text-center">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Employee ID</th>
                <th>Old Designation</th>
                <th>New Designation</th>
                <th>Old Salary (₹)</th>
                <th>New Salary (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((entry, idx) => (
                <tr
                  key={idx}
                  className={
                    entry.status === "recent"
                      ? "table-success"
                      : entry.status === "previous"
                      ? "table-danger"
                      : ""
                  }
                >
                  <td>{entry.date}</td>
                  <td>{entry.empId}</td>
                  <td>{entry.oldDesignation}</td>
                  <td>{entry.newDesignation}</td>
                  <td>{entry.oldSalary}</td>
                  <td>{entry.newSalary}</td>
                  <td className="fw-bold text-capitalize">{entry.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>
    </Container>
  );
} 