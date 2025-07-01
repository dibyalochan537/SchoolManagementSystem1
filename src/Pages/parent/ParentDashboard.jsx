import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaUserFriends, FaLock, FaChartLine } from "react-icons/fa";

const yearlyData = [
  { year: "2019", attendance: 85 },
  { year: "2020", attendance: 88 },
  { year: "2021", attendance: 90 },
  { year: "2022", attendance: 87 },
  { year: "2023", attendance: 91 },
  { year: "2024", attendance: 93 },
];

const monthlyData = [
  { month: "Jan", attendance: 89 },
  { month: "Feb", attendance: 92 },
  { month: "Mar", attendance: 86 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 87 },
  { month: "Jun", attendance: 93 },
];

export default function ParentDashboard() {
  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      <Card className="mb-4 shadow-lg bg-primary text-white border-0">
        <Card.Body>
          <Row>
            <Col md={10}>
              <h2 className="fw-bold">Welcome, Parent123!</h2>
              <p className="mb-0">Every Parent Knows What's Best For Their Child.</p>
              <small className="text-light">
                Being a parent can be tough, but just remember that in your child's eyes, nobody does it better than you.
              </small>
            </Col>
            <Col md={2} className="d-flex align-items-center justify-content-end">
              <img src="/school.png" alt="Logo" width="80" className="img-fluid" />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase text-muted">Number of Students</h6>
                <h4 className="fw-bold">2</h4>
              </div>
              <FaUserFriends size={36} className="text-primary" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase text-muted">Average Attendance</h6>
                <h4 className="fw-bold">65.155%</h4>
              </div>
              <FaLock size={36} className="text-info" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="text-uppercase text-muted">Average Performance</h6>
                <h4 className="fw-bold">Good</h4>
              </div>
              <FaChartLine size={36} className="text-success" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-primary fw-semibold mb-3">Yearly Attendance Performance</h6>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#3b82f6" name="Attendance (%)" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h6 className="text-info fw-semibold mb-3">Monthly Attendance Performance</h6>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="attendance" fill="#06b6d4" name="Attendance (%)" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
