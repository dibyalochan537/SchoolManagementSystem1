import React, { useState,useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Tab,
  Tabs,
  Card
} from "react-bootstrap";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminStaffAttendance from "../../Component/AdminStaffAttendance";
import AdminStudentAttendance from "../../Component/AdminStudentAttendance"
export default function AdminAttendanceManagement(){
  return (
    <Container fluid className="p-4">
      <h3 className="text-center text-primary">Attendance Management</h3>
      <p className="text-center text-muted">
        Easily manage and track attendance records for students and staff.
      </p>
      <Tabs
        id="attendance-tabs"
        className="mb-4 nav-tabs"
        justify
      >
        <Tab eventKey="student" title="🧑‍🎓 Student Attendance" className="nav-link">
          <AdminStudentAttendance />
        </Tab>
        <Tab eventKey="staff" title="👨‍🏫 Staff Attendance" className="nav-link">
          <AdminStaffAttendance />
        </Tab>
      </Tabs>
    </Container>
  );
};

