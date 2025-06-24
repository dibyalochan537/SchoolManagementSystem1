import React, { useState } from "react";
import {Container,Tab,Tabs,Row,Col,Form,Button,ListGroup,Card,} from "react-bootstrap";
import { FaPlus, FaBuilding, FaIdBadge } from "react-icons/fa";

export default function AdminStaffsSettings() {
  const [key, setKey] = useState("departments");

  const [deptName, setDeptName] = useState("");
  const [departmentList, setDepartmentList] = useState([
    "Science",
    "Humanities",
    "Administration",
  ]);

  const [designationName, setDesignationName] = useState("");
  const [designationList, setDesignationList] = useState([
    "Principal",
    "Vice Principal",
    "Teacher",
  ]);

  const handleAddDepartment = () => {
    if (deptName.trim()) {
      setDepartmentList([...departmentList, deptName]);
      setDeptName("");
    }
  };

  const handleAddDesignation = () => {
    if (designationName.trim()) {
      setDesignationList([...designationList, designationName]);
      setDesignationName("");
    }
  };

  return (
      <Card className="p-4 shadow-sm">
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          id="admin-dept-settings-tabs"
          className="d-flex flex-md-row flex-column"
          variant="pills"
        >
          <Tab
            eventKey="departments"
            title={
              <span className="d-flex align-items-center">
                <FaBuilding className="me-2" />
                Departments
              </span>
            }
          >
            <div className="p-4">
              <h5 className="fw-bold">Department Management</h5>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Department Name</Form.Label>
                <Form.Control
                  placeholder="Enter department name"
                  value={deptName}
                  onChange={(e) => setDeptName(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" className="mb-3" onClick={handleAddDepartment}>
                <FaPlus className="me-1" /> Add New Department
              </Button>

              <ListGroup>
                {departmentList.map((dept, idx) => (
                  <ListGroup.Item key={idx}>{dept}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Tab>

          <Tab
            eventKey="designations"
            title={
              <span className="d-flex align-items-center">
                <FaIdBadge className="me-2" />
                Designations
              </span>
            }
          >
            <div className="p-4">
              <h5 className="fw-bold">Designation Management</h5>
              <Form.Group className="mb-3 mt-3">
                <Form.Label>Designation Name</Form.Label>
                <Form.Control
                  placeholder="Enter designation name"
                  value={designationName}
                  onChange={(e) => setDesignationName(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" className="mb-3" onClick={handleAddDesignation}>
                <FaPlus className="me-1" /> Add New Designation
              </Button>

              <ListGroup>
                {designationList.map((desg, idx) => (
                  <ListGroup.Item key={idx}>{desg}</ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Tab>
        </Tabs>
      </Card>
  );
}
