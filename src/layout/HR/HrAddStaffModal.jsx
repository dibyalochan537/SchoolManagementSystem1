import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

export default function HrAddStaffModal({ show, onHide, onSave, existingStaff }) {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    permanentAddress: "",
    presentAddress: "",
    email: "",
    mobile: "",
    emergencyContact: "",
    aadhar: "",
    pan: "",
    certificates: null,
    photo: null,
    joinDate: "",
    designation: "",
    department: "",
    reportingOfficer: "",
    employeeType: "",
    ctc: "",
    esi: "",
    pf: "",
    bankName: "",
    bankAddress: "",
    bankAccount: "",
    ifsc: "",
    leaveTaken: "",
    leaveBalance: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    const newStaff = {
      ...formData,
      id: `STF${String(existingStaff.length + 1).padStart(3, "0")}NCE`,
    };
    onSave(newStaff);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" scrollable centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center mb-3">
          <img
            src={formData.photo ? URL.createObjectURL(formData.photo) : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png"}
            alt="Staff"
            width={80}
            height={80}
          />
          <div>
            <Form.Label className="text-primary" style={{ cursor: "pointer" }}>
              <Form.Control type="file" name="photo" accept="image/*" onChange={handleChange} hidden />
              Choose Photo
            </Form.Label>
          </div>
        </div>

        <Card className="mb-3">
          <Card.Header>Basic Information</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Name</Form.Label><Form.Control name="name" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Date of Birth</Form.Label><Form.Control type="date" name="dob" onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Permanent Address</Form.Label><Form.Control name="permanentAddress" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Present Address</Form.Label><Form.Control name="presentAddress" onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Email ID</Form.Label><Form.Control name="email" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Mobile No</Form.Label><Form.Control name="mobile" onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Emergency Contact</Form.Label><Form.Control name="emergencyContact" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Aadhar No</Form.Label><Form.Control name="aadhar" onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Label>PAN Card No</Form.Label>
                <Form.Control name="pan" onChange={handleChange} />
              </Col>
              <Col md={6}>
                <Form.Label>Certificates</Form.Label>
                <Form.Control type="file" name="certificates" onChange={handleChange} />
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Header>Employee Information</Card.Header>
          <Card.Body>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Joining Date</Form.Label><Form.Control type="date" name="joinDate" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Designation</Form.Label><Form.Select name="designation" onChange={handleChange}>
                <option>Select</option><option>Lead Teacher</option><option>Assistant</option>
              </Form.Select></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Department</Form.Label><Form.Select name="department" onChange={handleChange}>
                <option>Select</option><option>HR</option><option>Teaching</option>
              </Form.Select></Col>
              <Col md={6}><Form.Label>Reporting Officer</Form.Label><Form.Control name="reportingOfficer" onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Employee Type</Form.Label><Form.Select name="employeeType" onChange={handleChange}>
                <option>Select</option><option>Full-time</option><option>Part-time</option>
              </Form.Select></Col>
              <Col md={6}><Form.Label>CTC</Form.Label><Form.Control name="ctc" onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>ESI</Form.Label><Form.Control name="esi" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>PF</Form.Label><Form.Control name="pf" onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Bank Name</Form.Label><Form.Control name="bankName" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Bank Address</Form.Label><Form.Control name="bankAddress" onChange={handleChange} /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Bank A/C No</Form.Label><Form.Control name="bankAccount" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>IFSC Code</Form.Label><Form.Control name="ifsc" onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>Login Credentials</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}><Form.Label>User ID</Form.Label><Form.Control name="username" onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Password</Form.Label><Form.Control name="password" type="password" onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="warning">Next</Button>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
