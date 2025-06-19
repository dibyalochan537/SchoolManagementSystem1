import React, { useState } from "react";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { FaSearch, FaEye, FaEdit, FaPlus, FaFileExport } from "react-icons/fa";
import * as XLSX from "xlsx";

const initialParentData = [
  {
    id: "PTU001NCE",
    name: "Parent123",
    phone: "7894561230",
    profession: "Teacher",
    email: "parent123@example.com",
  },
  {
    id: "PTU002NCE",
    name: "Parent321",
    phone: "9876543210",
    profession: "Engineer",
    email: "parent321@example.com",
  },
  {
    id: "PTU003NCE",
    name: "Alex Jones",
    phone: "7894561230",
    profession: "Land",
    email: "alex.jones@example.com",
  },
  {
    id: "P12348",
    name: "John Doe",
    phone: "+123456789",
    profession: "Engineer",
    email: "john.doe@example.com",
  },
  {
    id: "PTU004NCE",
    name: "Sunita Singh",
    phone: "7654321890",
    profession: "Doctor",
    email: "sunita.singh@example.com",
  },
];

export default function AdminParentManagement() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(initialParentData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSearch = () => {
    const keyword = search.toLowerCase();
    const filtered = initialParentData.filter(
      (parent) =>
        parent.name.toLowerCase().includes(keyword) ||
        parent.id.toLowerCase().includes(keyword) ||
        parent.email.toLowerCase().includes(keyword) ||
        parent.phone.toLowerCase().includes(keyword)
    );
    setData(filtered);
    setSelectAll(false);
    setSelectedIds([]);
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const allIds = data.map((p) => p.id);
      setSelectedIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    const toExport = selectedIds.length
      ? data.filter((p) => selectedIds.includes(p.id))
      : data;

    const exportData = toExport.map(({ id, name, phone, profession, email }) => ({
      ID: id,
      Name: name,
      Phone: phone,
      Profession: profession,
      Email: email,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Parents");
    XLSX.writeFile(workbook, "parent_data.xlsx");
  };

  return (
    <Card className="p-4 shadow">
      <h4 className="fw-bold mb-4 d-flex align-items-center">
        <FaSearch className="me-2" /> Parent Details
      </h4>

      <Row className="mb-3">
        <Col md={8} sm={12}>
          <Form.Control
            type="text"
            placeholder="Search by Name, ID, Email or Phone"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </Col>
        <Col md={4} sm={12} className="mt-2 mt-md-0 d-flex justify-content-md-end">
          <Button variant="primary" onClick={handleSearch}>
            <FaSearch className="me-1" /> Search
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table bordered hover className="text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>
                <Form.Check
                  checked={selectAll}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Profession</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length ? (
              data.map((parent) => (
                <tr key={parent.id}>
                  <td>
                    <Form.Check
                      checked={selectedIds.includes(parent.id)}
                      onChange={() => toggleSelectOne(parent.id)}
                    />
                  </td>
                  <td>{parent.id}</td>
                  <td>{parent.name}</td>
                  <td>{parent.phone}</td>
                  <td>{parent.profession}</td>
                  <td>{parent.email}</td>
                  <td>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <FaEye />
                    </Button>
                    <Button variant="warning" size="sm">
                      <FaEdit />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No matching parent found.</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-end mt-3 gap-2">
        <Button variant="outline-success" onClick={handleExport}>
          <FaFileExport className="me-1" /> Export
        </Button>
        <Button variant="primary">
          <FaPlus className="me-1" /> Add New Parent
        </Button>
      </div>
    </Card>
  );
}
