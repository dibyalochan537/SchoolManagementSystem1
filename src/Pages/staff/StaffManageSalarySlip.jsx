import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';

const initialDummySalarySlips = Array.from({ length: 12 }, (_, index) => {
  const month = new Date(2025, index).toISOString().slice(0, 7);
  return {
    staffId: "STF001",
    name: "John Doe",
    department: "Teaching",
    month: month,
    basic: 40000,
    deductions: 2000 + index * 100,
    net: 40000 - (2000 + index * 100)
  };
});

export default function StaffManageSalarySlip() {
  const [salarySlips, setSalarySlips] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  const [displayedSlips, setDisplayedSlips] = useState([]);

  const handleGenerateSlips = () => {
    if (!selectedMonth) return alert("Please select a month first.");

    const alreadyExists = salarySlips.some(
      slip => slip.staffId === "STF001" && slip.month === selectedMonth
    );
    if (alreadyExists) return alert(`Salary slip for ${selectedMonth} already exists.`);

    const newSlip = initialDummySalarySlips.find(
      slip => slip.staffId === "STF001" && slip.month === selectedMonth
    );

    if (!newSlip) return alert(`No dummy salary slip found for ${selectedMonth}.`);

    const updated = [...salarySlips, newSlip];
    setSalarySlips(updated);
  };

  const handlePrintSlip = (slip) => {
    const slipWindow = window.open('', '', 'width=800,height=900');
    const htmlContent = `
      <html>
      <head><title>Salary Slip - ${slip.name}</title></head>
      <body onload="window.print(); window.onafterprint = function(){ window.close(); }">
        <h2 style="text-align:center;">Salary Slip</h2>
        <p><strong>Month:</strong> ${slip.month}</p>
        <p><strong>Staff ID:</strong> ${slip.staffId}</p>
        <p><strong>Name:</strong> ${slip.name}</p>
        <p><strong>Department:</strong> ${slip.department}</p>
        <table border="1" width="100%" style="border-collapse:collapse;">
          <tr><th>Description</th><th>Amount (₹)</th></tr>
          <tr><td>Basic Salary</td><td>${slip.basic}</td></tr>
          <tr><td>Deductions</td><td>${slip.deductions}</td></tr>
          <tr><th>Net Salary</th><th>${slip.net}</th></tr>
        </table>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Authorized By:</strong> _______________</p>
      </body>
      </html>`;
    slipWindow.document.write(htmlContent);
    slipWindow.document.close();
  };

  // 🔁 Recompute displayed slips when salarySlips, searchText or sortConfig change
  useEffect(() => {
    let filtered = salarySlips.filter(slip =>
      Object.values(slip).some(value =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      )
    );

    if (sortField) {
      filtered.sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (typeof valA === 'number') {
          return sortOrder === 'asc' ? valA - valB : valB - valA;
        }
        return sortOrder === 'asc'
          ? String(valA).localeCompare(valB)
          : String(valB).localeCompare(valA);
      });
    }

    setDisplayedSlips(filtered);
  }, [salarySlips, searchText, sortField, sortOrder]);


  const toggleSort = (key) => {
    setSortConfig(prev => {
      const isSameKey = prev.key === key;
      const direction = isSameKey && prev.direction === 'asc' ? 'desc' : 'asc';
      return { key, direction };
    });
  };

  return (
    <Container fluid className="py-4">
      <h4 className="mb-4">Salary Slips</h4>
      <Row className="mb-3 g-2">
        <Col md={3}>
          <Form.Control
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Button className="w-100" variant="primary" onClick={handleGenerateSlips}>
            Generate Salary Slip
          </Button>
        </Col>
        <Col md={3}>
          <Form.Control
            type="text"
            placeholder="Search by any field..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="">Sort By</option>
            <option value="month">Month</option>
            <option value="net">Net Salary</option>
            <option value="name">Name</option>
            <option value="staffId">Staff ID</option>
          </Form.Select>
        </Col>
        <Col md={1}>
          <Button variant="secondary" onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}>
            {sortOrder === 'asc' ? '▲' : '▼'}
          </Button>
        </Col>
      </Row>


      {displayedSlips.length > 0 ? (
        <Table bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th onClick={() => toggleSort('month')} style={{ cursor: 'pointer' }}>
                Month {sortConfig.key === 'month' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th>Staff ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Basic</th>
              <th>Deductions</th>
              <th onClick={() => toggleSort('net')} style={{ cursor: 'pointer' }}>
                Net {sortConfig.key === 'net' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedSlips.map((slip, i) => (
              <tr key={i}>
                <td>{slip.month}</td>
                <td>{slip.staffId}</td>
                <td>{slip.name}</td>
                <td>{slip.department}</td>
                <td>₹{slip.basic}</td>
                <td>₹{slip.deductions}</td>
                <td>₹{slip.net}</td>
                <td>
                  <Button size="sm" variant="success" onClick={() => handlePrintSlip(slip)}>
                    Download
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted">No salary slips available or matching the search.</p>
      )}
    </Container>
  );
}
