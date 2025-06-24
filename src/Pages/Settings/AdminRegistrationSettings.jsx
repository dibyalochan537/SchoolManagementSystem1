import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
// import "../../PagesCSS/AdminSettings.css"; // Your custom CSS

export default function AdminRegistrationSettings() {
  const [staffPrefix, setStaffPrefix] = useState("STF");
  const [staffSuffix, setStaffSuffix] = useState("NCE");
  const [studentPrefix, setStudentPrefix] = useState("STU");
  const [studentSuffix, setStudentSuffix] = useState("NCE");

  const handleSave = () => {
    const settings = {
      staffPrefix,
      staffSuffix,
      studentPrefix,
      studentSuffix,
    };
    console.log("Saving Settings:", settings);
    // You can replace console.log with an API call
  };

  return (
      <Card className="p-4 shadow-sm">
        <h5 className="fw-bold mb-4">Registration Number Settings</h5>
        <Form>
          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <Form.Label>Staff Prefix</Form.Label>
              <Form.Control
                value={staffPrefix}
                onChange={(e) => setStaffPrefix(e.target.value)}
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Staff Suffix</Form.Label>
              <Form.Control
                value={staffSuffix}
                onChange={(e) => setStaffSuffix(e.target.value)}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6} className="mb-3">
              <Form.Label>Student Prefix</Form.Label>
              <Form.Control
                value={studentPrefix}
                onChange={(e) => setStudentPrefix(e.target.value)}
              />
            </Col>
            <Col md={6} className="mb-3">
              <Form.Label>Student Suffix</Form.Label>
              <Form.Control
                value={studentSuffix}
                onChange={(e) => setStudentSuffix(e.target.value)}
              />
            </Col>
          </Row>

          <div className="text-end mt-4">
            <Button className="animated-btn" onClick={handleSave}>
              💾 Save Changes
            </Button>
          </div>
        </Form>
      </Card>
  );
}
