import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Card } from "react-bootstrap";
import { FaUserGraduate, FaBook, FaUsers } from "react-icons/fa";

export default function StudentEditProfileModal({ show, onClose }) {
  const initialData = {
    firstName: "Vavya",
    middleName: "Prakash",
    lastName: "Mahapatra",
    dob: "2004-02-19",
    gender: "Female",
    bloodGroup: "AB-",
    admissionClass: "Class I",
    section: "B",
    rollNo: "2",
    admissionDate: "2025-05-29",
    previousSchool: "ABCD School",
    previousClass: "I",
    feeType: "Regular",
    admissionFees: "5000",
    monthlyFees: "2000",
    scholarshipAmount: "200",
    fatherName: "Alex Jones",
    fatherOccupation: "Land",
    fatherId: "ID101",
    fatherEmail: "darshansahoo404@gmail.co",
    fatherPhone: "7894561230",
    motherEmail: "",
    motherOccupation: "",
    motherId: "",
    guardianEmail: "darshansahoo404@gmail.co",
    address: "Badtolia, Jatni, Odisha, India",
    city: "Jatni",
    pinCode: "752050",
    whatsappNumber: "9876543210",
  };

  const [student, setStudent] = useState(initialData);

  useEffect(() => {
    // Reset form on modal open
    if (show) {
      setStudent(initialData);
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Modal show={show} onHide={onClose} size="xl" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Student Information */}
        <Card className="mb-3">
          <Card.Header><FaUserGraduate /> Student Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>First Name</Form.Label><Form.Control name="firstName" value={student.firstName} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Middle Name</Form.Label><Form.Control name="middleName" value={student.middleName} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Last Name</Form.Label><Form.Control name="lastName" value={student.lastName} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={4}><Form.Label>Date of Birth</Form.Label><Form.Control type="date" name="dob" value={student.dob} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Gender</Form.Label><Form.Control name="gender" value={student.gender} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Blood Group</Form.Label><Form.Control name="bloodGroup" value={student.bloodGroup} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Academic Information */}
        <Card className="mb-3">
          <Card.Header><FaBook /> Academic Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={3}><Form.Label>Admission Class</Form.Label><Form.Control name="admissionClass" value={student.admissionClass} onChange={handleChange} /></Col>
              <Col md={3}><Form.Label>Section</Form.Label><Form.Control name="section" value={student.section} onChange={handleChange} /></Col>
              <Col md={3}><Form.Label>Roll No</Form.Label><Form.Control name="rollNo" value={student.rollNo} onChange={handleChange} /></Col>
              <Col md={3}><Form.Label>Admission Date</Form.Label><Form.Control type="date" name="admissionDate" value={student.admissionDate} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Previous School</Form.Label><Form.Control name="previousSchool" value={student.previousSchool} onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Previous Class</Form.Label><Form.Control name="previousClass" value={student.previousClass} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Tuition Fees Information */}
        <Card className="mb-3">
          <Card.Header><FaBook /> Tuition Fees Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>Fee Type</Form.Label><Form.Control name="feeType" value={student.feeType} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Scholarship Amount</Form.Label><Form.Control name="scholarshipAmount" value={student.scholarshipAmount} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Admission Fees</Form.Label><Form.Control name="admissionFees" value={student.admissionFees} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Monthly Tuition Fees</Form.Label><Form.Control name="monthlyFees" value={student.monthlyFees} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Parent/Guardian Information */}
        <Card className="mb-3">
          <Card.Header><FaUsers /> Parent/Guardian Information</Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}><Form.Label>Father's Name</Form.Label><Form.Control name="fatherName" value={student.fatherName} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>Occupation</Form.Label><Form.Control name="fatherOccupation" value={student.fatherOccupation} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>ID Proof</Form.Label><Form.Control name="fatherId" value={student.fatherId} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Email</Form.Label><Form.Control name="fatherEmail" value={student.fatherEmail} onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>Phone</Form.Label><Form.Control name="fatherPhone" value={student.fatherPhone} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={6}><Form.Label>Guardian Email</Form.Label><Form.Control name="guardianEmail" value={student.guardianEmail} onChange={handleChange} /></Col>
              <Col md={6}><Form.Label>WhatsApp Number</Form.Label><Form.Control name="whatsappNumber" value={student.whatsappNumber} onChange={handleChange} /></Col>
            </Row>
            <Row className="mt-2">
              <Col md={4}><Form.Label>Address</Form.Label><Form.Control name="address" value={student.address} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>City</Form.Label><Form.Control name="city" value={student.city} onChange={handleChange} /></Col>
              <Col md={4}><Form.Label>PIN Code</Form.Label><Form.Control name="pinCode" value={student.pinCode} onChange={handleChange} /></Col>
            </Row>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={() => console.log("Save:", student)}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}
