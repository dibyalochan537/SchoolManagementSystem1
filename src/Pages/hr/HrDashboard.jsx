import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaUserFriends, FaIdBadge, FaChartBar } from "react-icons/fa"
const cards = [
    {
      title: "NUMBER OF EMPLOYEES",
      value: "2",
      color: "text-success",
      border: "border-start border-3 border-success",
      icon: <FaUserFriends size={28} color="#59bfff" />,
    },
    {
      title: "AVERAGE ATTENDANCE",
      value: "90%",
      color: "text-primary",
      border: "border-start border-3 border-primary",
      icon: <FaIdBadge size={28} color="#59bfff" />,
    },
    {
      title: "AVERAGE PERFORMANCE",
      value: "Good",
      color: "text-info",
      border: "border-start border-3 border-info",
      icon: <FaChartBar size={28} color="#59bfff" />,
    },
  ];
const yearlyData = [
  { year: '2019', attendance: 85 },
  { year: '2020', attendance: 88 },
  { year: '2021', attendance: 90 },
  { year: '2022', attendance: 86 },
  { year: '2023', attendance: 91 },
  { year: '2024', attendance: 93 },
];

const monthlyData = [
  { month: 'Jan', attendance: 89 },
  { month: 'Feb', attendance: 92 },
  { month: 'Mar', attendance: 87 },
  { month: 'Apr', attendance: 91 },
  { month: 'May', attendance: 88 },
  { month: 'Jun', attendance: 94 },
];

export default function HrDashboard(){
  return (
    <div className="container-fluid p-3">
      <Card className="mb-4 shadow-lg rounded" style={{background:"linear-gradient(to right,rgba(224, 99, 99, 0.14),rgba(29, 73, 216, 0.92))"}}>
        <Card.Body>
          <Row >
            <Col md={8} sm={12} className="text-start">
              <h5 className="text-primary mb-2">👩‍💼 HR Profile</h5>
              <h3>Dheeraj Kutreya</h3>
              <p className="text-muted mb-1">Sr. HR</p>
              <p><strong>Email:</strong> dheeraj@dmps.com</p>
              <p><strong>Phone:</strong> 7898456552</p>
              <p><strong>Department:</strong> Human Resources</p>
            </Col>
            <Col md={4} sm={12} className="text-end text-md-end mt-3 mt-md-0" style={{color:"white"}}>
              <p><strong>Join Date:</strong> 14/6/2025</p>
              <p><strong>Qualification:</strong> B.Com</p>
              <p><strong>ID:</strong> STF006NCE</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row className="g-3 mb-4 rounded">
        {cards.map((card, idx) => (
          <Col key={idx} md={4} sm={12}>
            <Card className={`shadow-sm`}>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className={`fw-semibold ${card.color}`}>{card.title}</h6>
                  <h5 className="fw-normal">{card.value}</h5>
                </div>
                <div>{card.icon}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col lg={6} md={12} className="mb-4">
          <Card className="shadow rounded h-100">
            <Card.Body>
              <h5 className="mb-3">📊 Yearly Attendance Performance</h5>
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

        <Col lg={6} md={12} className="mb-4">
          <Card className="shadow rounded h-100">
            <Card.Body>
              <h5 className="mb-3">📅 Monthly Attendance Performance</h5>
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
    </div>
  );
};
