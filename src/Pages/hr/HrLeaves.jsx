import React, { useState } from 'react';
import { Card, Table, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const initialLeaves = [
  {
    id: 1,
    employee: 'John Doe',
    department: 'HR',
    type: 'Sick Leave',
    from: '2025-06-20',
    to: '2025-06-22',
    days: 3,
    reason: 'Fever and cold',
    status: 'Pending',
  },
  {
    id: 2,
    employee: 'Anita Sharma',
    department: 'Accounts',
    type: 'Casual Leave',
    from: '2025-06-18',
    to: '2025-06-18',
    days: 1,
    reason: 'Personal Work',
    status: 'Pending',
  },
  {
    id: 3,
    employee: 'Rakesh Singh',
    department: 'Teaching',
    type: 'Annual Leave',
    from: '2025-06-15',
    to: '2025-06-20',
    days: 6,
    reason: 'Vacation',
    status: 'Pending',
  },
];

export default function HrLeaves() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const updateStatus = (id, newStatus) => {
    const confirmed = window.confirm(`Are you sure you want to ${newStatus.toLowerCase()} this leave request?`);
    if (!confirmed) return;

    setLeaves(prev =>
      prev.map(leave =>
        leave.id === id ? { ...leave, status: newStatus } : leave
      )
    );
  };


  const departments = ['All', ...new Set(leaves.map(l => l.department))];
  const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

  const filteredLeaves = leaves.filter((leave) => {
    const matchesSearch = Object.values(leave).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesDepartment = departmentFilter === 'All' || leave.department === departmentFilter;
    const matchesStatus = statusFilter === 'All' || leave.status === statusFilter;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const statusCounts = {
    Pending: leaves.filter(l => l.status === 'Pending').length,
    Approved: leaves.filter(l => l.status === 'Approved').length,
    Rejected: leaves.filter(l => l.status === 'Rejected').length,
    Total: leaves.length,
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <div className="w-100" style={{ maxWidth: '98%' }}>
        <Card className="shadow-sm border-0 rounded">
          <Card.Header className="bg-white border-0 d-flex flex-wrap justify-content-between align-items-center">
            <h4 className="mb-2 mb-md-0">Leave Accept/Reject</h4>
          </Card.Header>

          <Card.Body>
            <Row className="mb-4" style={{display:"flex",justifyContent:"space-between",padding:"10px"}}>
              <Col md={2} className='shadow-lg rounded' style={{marginBottom:"20px"}}><div><div>Pending Requests</div><div className="text-warning fw-bold fs-5">{statusCounts.Pending}</div></div></Col>
              <Col md={2} className='shadow-lg rounded' style={{marginBottom:"20px"}}><div><div>Approved Leaves</div><div className="text-success fw-bold fs-5">{statusCounts.Approved}</div></div></Col>
              <Col md={2} className='shadow-lg rounded' style={{marginBottom:"20px"}}><div><div>Rejected Leaves</div><div className="text-danger fw-bold fs-5">{statusCounts.Rejected}</div></div></Col>
              <Col md={2} className='shadow-lg rounded' style={{marginBottom:"20px"}}><div><div>Total Requests</div><div className="text-primary fw-bold fs-5">{statusCounts.Total}</div></div></Col>
            </Row>
            <div className="d-flex gap-5" style={{flexDirection:"row",paddingBottom:"20px"}}>
              <InputGroup size="sm" style={{ minWidth: '200px' }}>
                <InputGroup.Text><FaSearch /></InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search leaves..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              <Form.Select size="sm" onChange={(e) => setDepartmentFilter(e.target.value)}>
                {departments.map((dept, idx) => <option key={idx} value={dept}>{dept}</option>)}
              </Form.Select>
              <Form.Select size="sm" onChange={(e) => setStatusFilter(e.target.value)}>
                {statuses.map((stat, idx) => <option key={idx} value={stat}>{stat}</option>)}
              </Form.Select>
            </div>
            <h5 className="mb-2 mb-md-0" style={{paddingBottom:"20px"}}>Staff List :</h5>
            <div className="table-responsive">
              <Table hover bordered className="mb-0 text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Id</th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Days</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.length > 0 ? (
                    filteredLeaves.map((leave) => (
                      <tr key={leave.id}>
                        <td>{leave.id}</td>
                        <td>{leave.employee}</td>
                        <td>{leave.department}</td>
                        <td>{leave.type}</td>
                        <td>{leave.from}</td>
                        <td>{leave.to}</td>
                        <td>{leave.days}</td>
                        <td>{leave.reason}</td>
                        <td>
                          <span
                            className={`badge ${
                              leave.status === 'Approved'
                                ? 'bg-success'
                                : leave.status === 'Rejected'
                                ? 'bg-danger'
                                : 'bg-warning text-dark'
                            }`}
                          >
                            {leave.status}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="success"
                            size="sm"
                            className="me-1"
                            onClick={() => updateStatus(leave.id, 'Approved')}
                            disabled={leave.status !== 'Pending'}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => updateStatus(leave.id, 'Rejected')}
                            disabled={leave.status !== 'Pending'}
                          >
                            Reject
                          </Button>

                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10">No results found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
