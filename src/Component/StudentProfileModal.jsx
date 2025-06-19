import React from "react";
import { Modal, Button, Row, Col, Form, Card } from "react-bootstrap";
import { FaUserGraduate, FaBook, FaUsers } from "react-icons/fa";

const StudentProfileModal = ({ show, onClose }) => {
  const student = {
    firstName: "Vavya",
    middleName: "Prakash",
    lastName: "Mahapatra",
    dob: "19-02-2004",
    gender: "Female",
    bloodGroup: "AB+",
    address: "Badalotta, Jatni, Odisha, India",
    city: "Jatni",
    pinCode: "752050",
    whatsapp: "9876543210",
    admissionClass: "I",
    section: "B",
    rollNo: "2",
    admissionDate: "29-05-2025",
    previousSchool: "ABCD School",
    previousClass: "I",
    father: {
      name: "Alex Jones",
      occupation: "Land",
      idProof: "ID101",
      email: "darshansahoo404@gmail.com",
      number: "7894561230"
    },
    mother: {
      name: "",
      occupation: "",
      idProof: "",
      email: "",
      number: ""
    },
    guardian: {
      name: "",
      occupation: "",
      idProof: "",
      email: "darshansahoo404@gmail.com",
      number: ""
    }
  };

  return (
    <Modal show={show} onHide={onClose} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Student Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Student Info */}
        <Card className="mb-3">
          <Card.Header><FaUserGraduate className="me-2" /> Student Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>First Name</Form.Label><Form.Control value={student.firstName} readOnly /></Col>
              <Col md={4}><Form.Label>Middle Name</Form.Label><Form.Control value={student.middleName} readOnly /></Col>
              <Col md={4}><Form.Label>Last Name</Form.Label><Form.Control value={student.lastName} readOnly /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={4}><Form.Label>Date of Birth</Form.Label><Form.Control value={student.dob} readOnly /></Col>
              <Col md={4}><Form.Label>Gender</Form.Label><Form.Control value={student.gender} readOnly /></Col>
              <Col md={4}><Form.Label>Blood Group</Form.Label><Form.Control value={student.bloodGroup} readOnly /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Address</Form.Label><Form.Control value={student.address} readOnly /></Col>
              <Col md={3}><Form.Label>City</Form.Label><Form.Control value={student.city} readOnly /></Col>
              <Col md={3}><Form.Label>PIN Code</Form.Label><Form.Control value={student.pinCode} readOnly /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>WhatsApp Number</Form.Label><Form.Control value={student.whatsapp} readOnly /></Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Academic Info */}
        <Card className="mb-3">
          <Card.Header><FaBook className="me-2" /> Academic Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={3}><Form.Label>Admission Class</Form.Label><Form.Control value={student.admissionClass} readOnly /></Col>
              <Col md={3}><Form.Label>Section</Form.Label><Form.Control value={student.section} readOnly /></Col>
              <Col md={3}><Form.Label>Roll No</Form.Label><Form.Control value={student.rollNo} readOnly /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={4}><Form.Label>Admission Date</Form.Label><Form.Control value={student.admissionDate} readOnly /></Col>
              <Col md={5}><Form.Label>Previous School</Form.Label><Form.Control value={student.previousSchool} readOnly /></Col>
              <Col md={3}><Form.Label>Previous Class</Form.Label><Form.Control value={student.previousClass} readOnly /></Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Parent Info */}
        <Card>
          <Card.Header><FaUsers className="me-2" /> Parent/Guardian Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>Father's Name</Form.Label><Form.Control value={student.father.name} readOnly /></Col>
              <Col md={4}><Form.Label>Father's Occupation</Form.Label><Form.Control value={student.father.occupation} readOnly /></Col>
              <Col md={4}><Form.Label>Father's ID Proof</Form.Label><Form.Control value={student.father.idProof} readOnly /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Father's Email</Form.Label><Form.Control value={student.father.email} readOnly /></Col>
              <Col md={6}><Form.Label>Father's Number</Form.Label><Form.Control value={student.father.number} readOnly /></Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}><Form.Label>Mother's Name</Form.Label><Form.Control value={student.mother.name} readOnly /></Col>
              <Col md={4}><Form.Label>Mother's Occupation</Form.Label><Form.Control value={student.mother.occupation} readOnly /></Col>
              <Col md={4}><Form.Label>Mother's ID Proof</Form.Label><Form.Control value={student.mother.idProof} readOnly /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Mother's Email</Form.Label><Form.Control value={student.mother.email} readOnly /></Col>
              <Col md={6}><Form.Label>Mother's Number</Form.Label><Form.Control value={student.mother.number} readOnly /></Col>
            </Row>
            <hr />
            <Row>
              <Col md={4}><Form.Label>Guardian's Name</Form.Label><Form.Control value={student.guardian.name} readOnly /></Col>
              <Col md={4}><Form.Label>Guardian's Occupation</Form.Label><Form.Control value={student.guardian.occupation} readOnly /></Col>
              <Col md={4}><Form.Label>Guardian's ID Proof</Form.Label><Form.Control value={student.guardian.idProof} readOnly /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Guardian's Email</Form.Label><Form.Control value={student.guardian.email} readOnly /></Col>
              <Col md={6}><Form.Label>Guardian's Number</Form.Label><Form.Control value={student.guardian.number} readOnly /></Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary">📄 Print Form</Button>
        <Button variant="info">🪪 Print ID</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentProfileModal;
