import React, { useState } from "react";
import {Container,Tab,Tabs,Row,Col,Form,Button,ListGroup,Card} from "react-bootstrap";
import { FaPlus, FaChalkboardTeacher, FaBook } from "react-icons/fa";
export default function AdminClassSettings() {
  const [key, setKey] = useState("classes");
  const [className, setClassName] = useState("");
  const [classList, setClassList] = useState(["I", "II", "III", "IV"]);
  const [subjectName, setSubjectName] = useState("");
  const [subjectList, setSubjectList] = useState(["Math", "Science", "English"]);

  const handleAddClass = () => {
    if (className.trim()) {
      setClassList([...classList, className]);
      setClassName("");
    }
  };

  const handleAddSubject = () => {
    if (subjectName.trim()) {
      setSubjectList([...subjectList, subjectName]);
      setSubjectName("");
    }
  };

  return (
      <Card className="p-4 shadow-sm">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          id="admin-class-settings-tabs"
          className="d-flex flex-md-row flex-column"
          variant="pills"
        >
          <Tab
            eventKey="classes"
            title={
              <span className="d-flex align-items-center">
                <FaChalkboardTeacher className="me-2" />
                Classes
              </span>
            }
          >
            <div className="p-4">
              <h5 className="fw-bold">Class Management</h5>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Class Name</Form.Label>
                <Form.Control
                  placeholder="Enter class name"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="mb-3" onClick={handleAddClass}>
                <FaPlus className="me-1" /> Add New Class
              </Button>

              <ListGroup>
                {classList.map((cls, idx) => (
                  <ListGroup.Item key={idx}>{cls}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Tab>

          <Tab
            eventKey="subjects"
            title={
              <span className="d-flex align-items-center">
                <FaBook className="me-2" />
                Subjects
              </span>
            }
          >
            <div className="p-4">
              <h5 className="fw-bold">Subject Management</h5>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Subject Name</Form.Label>
                <Form.Control
                  placeholder="Enter subject name"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" className="mb-3" onClick={handleAddSubject}>
                <FaPlus className="me-1" /> Add New Subject
              </Button>

              <ListGroup>
                {subjectList.map((sub, idx) => (
                  <ListGroup.Item key={idx}>{sub}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Tab>
        </Tabs>
      </Card>
  );
}