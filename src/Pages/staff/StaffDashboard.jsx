import React from 'react';
import { Container, Row, Col, Card, Button, ProgressBar, Table } from 'react-bootstrap';
import { FaCalendarCheck, FaMoneyBillWave, FaTasks, FaUmbrellaBeach } from 'react-icons/fa';

export default function StaffDashboard() {
  const staff = {
    name: "Dibyalochan Dash",
    designation: "Software Developer",
    department: "IT",
    salary: "₹48,000",
    attendance: 91,
    totalLeaves: 20,
    leavesTaken: 7,
    tasks: [
      { title: "Submit monthly expense report", status: "Completed" },
      { title: "Verify fee receipts", status: "Pending" },
      { title: "Department meeting", status: "Upcoming" },
    ],
  };

  const remainingLeaves = staff.totalLeaves - staff.leavesTaken;
  const leaveProgress = Math.round((staff.leavesTaken / staff.totalLeaves) * 100);

  return (
    <Container fluid className="py-4">
      <h4 className="mb-4 fw-bold">Welcome, {staff.name} 👋</h4>

      <Row className="mb-4 g-3">
        {[
            {
            icon: <FaCalendarCheck size={24} className="text-primary mb-1" />,
            title: "Attendance",
            body: (
                <>
                <h6 className="mb-1">{staff.attendance}%</h6>
                <ProgressBar now={staff.attendance} label={`${staff.attendance}%`} />
                </>
            )
            },
            {
            icon: <FaMoneyBillWave size={24} className="text-success mb-1" />,
            title: "Monthly Salary",
            body: (
                <>
                <h6 className="mb-1">{staff.salary}</h6>
                </>
            )
            },
            {
            icon: <FaTasks size={24} className="text-warning mb-1" />,
            title: "Tasks Overview",
            body: (
                <ul className="list-unstyled mb-0 small">
                {staff.tasks.map((task, i) => (
                    <li key={i} className="text-truncate">
                    <span className="fw-medium">{task.title}</span> - <span className="text-muted">{task.status}</span>
                    </li>
                ))}
                </ul>
            )
            },
            {
            icon: <FaUmbrellaBeach size={24} className="text-info mb-1" />,
            title: "Leave Summary",
            body: (
                <>
                <div className="small mb-2">
                    <span className="me-2">Total: <strong>{staff.totalLeaves}</strong></span>
                    <span className="me-2">Taken: <strong>{staff.leavesTaken}</strong></span>
                    <span>Remaining: <strong>{remainingLeaves}</strong></span>
                </div>
                <ProgressBar variant="info" now={leaveProgress} label={`${leaveProgress}% used`} />
                </>
            )
            }
        ].map((card, i) => (
            <Col key={i} lg={3} md={6} sm={12}>
            <Card className="shadow-sm border-0 h-100">
                <Card.Body className="d-flex flex-column justify-content-start" style={{ minHeight: '80px' }}>
                {card.icon}
                <Card.Title className="fs-6 mb-1">{card.title}</Card.Title>
                {card.body}
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>


      <Row className="g-3">
        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className=" text-white" style={{backgroundColor:"#578FCA"}}>Profile Information</Card.Header>
            <Card.Body>
              <Table borderless size="sm">
                <tbody>
                  <tr><th>Name</th><td>{staff.name}</td></tr>
                  <tr><th>Designation</th><td>{staff.designation}</td></tr>
                  <tr><th>Department</th><td>{staff.department}</td></tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Header className="text-white" style={{backgroundColor:"#578FCA"}}>Recent Announcements</Card.Header>
            <Card.Body>
              <ul className="mb-0">
                <li>🎓 Staff training on 5th July at 2 PM</li>
                <li>📅 Submit appraisal forms by 10th July</li>
                <li>🏖️ Office holiday on 15th August</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
