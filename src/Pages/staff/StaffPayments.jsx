import React, { useState } from 'react';
import { Card, Container, Row, Col, Form, Table, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Dummy data
const dummyPayments = Array.from({ length: 40 }, (_, i) => {
  const modes = ['Bank Transfer', 'Cash', 'Cheque'];
  const status = ['Paid', 'Pending'];
  return {
    paymentId: `PAY${String(i + 1).padStart(3, '0')}`,
    staffId: 'STF001',
    name: 'John Doe',
    amount: 38000 + (i % 3) * 500,
    date: `2025-06-${String((i % 30) + 1).padStart(2, '0')}`,
    mode: modes[i % 3],
    status: status[i % 2],
  };
});

export default function StaffPayments() {
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('All');
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredPayments = dummyPayments.filter((item) => {
    const searchText = search.toLowerCase();
    const matchesSearch = Object.values(item)
      .some(value => String(value).toLowerCase().includes(searchText));
    const matchesMode = filterMode === 'All' || item.mode === filterMode;
    return matchesSearch && matchesMode;
  });


  const handleCheckboxChange = (paymentId) => {
    setSelectedIds((prev) =>
      prev.includes(paymentId)
        ? prev.filter((id) => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allVisibleIds = filteredPayments.map((item) => item.paymentId);
      setSelectedIds(allVisibleIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleExport = () => {
    const selectedData = filteredPayments.filter(item =>
      selectedIds.includes(item.paymentId)
    );

    const exportData = selectedData.map(item => ({
      'Payment ID': item.paymentId,
      'Staff ID': item.staffId,
      'Name': item.name,
      'Amount (₹)': item.amount,
      'Date': item.date,
      'Mode': item.mode,
      'Status': item.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileData = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(fileData, 'SelectedStaffPayments.xlsx');
  };

  const isAllSelected =
    filteredPayments.length > 0 &&
    filteredPayments.every((item) => selectedIds.includes(item.paymentId));

  return (
    <Container fluid className="py-4">
      <h4 className="mb-4">My Payments</h4>

      <Row className="mb-3 g-2">
        <Col md={4} sm={12}>
          <Form.Control
            placeholder="Search by ID or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4} sm={12}>
          <Form.Select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
          >
            <option value="All">All Payment Modes</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </Form.Select>
        </Col>
        <Col md={4} sm={12}>
          <Button
            className="w-100"
            variant="primary"
            onClick={handleExport}
            disabled={selectedIds.length === 0}
          >
            Export Selected
          </Button>
        </Col>
      </Row>

      <Card className="mb-4 shadow-lg rounded table-light" style={{ padding: "20px", borderRadius: "10px", height: "70vh" }}>
        <Table bordered hover responsive className="mt-3">
          <thead className="table-light">
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  title="Select All"
                />
              </th>
              <th>Payment ID</th>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((item, i) => (
                <tr key={i}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedIds.includes(item.paymentId)}
                      onChange={() => handleCheckboxChange(item.paymentId)}
                    />
                  </td>
                  <td>{item.paymentId}</td>
                  <td>{item.staffId}</td>
                  <td>{item.name}</td>
                  <td>₹{item.amount}</td>
                  <td>{item.date}</td>
                  <td>{item.mode}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === 'Paid'
                          ? 'bg-success'
                          : 'bg-warning text-dark'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
