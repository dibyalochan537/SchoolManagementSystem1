import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Table, Form, Button, Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Pie chart components
Chart.register(ArcElement, Tooltip, Legend);

// Dummy admin-set holiday data
const holidaysData = [
  { date: '2025-01-26', name: 'Republic Day', description: 'National Holiday' },
  { date: '2025-03-08', name: 'International Women’s Day', description: 'Observance' },
  { date: '2025-04-14', name: 'Ambedkar Jayanti', description: 'Public Holiday' },
  { date: '2025-05-01', name: 'Labour Day', description: 'Public Holiday' },
  { date: '2025-08-15', name: 'Independence Day', description: 'National Holiday' },
  { date: '2025-10-02', name: 'Gandhi Jayanti', description: 'National Holiday' },
  { date: '2025-12-25', name: 'Christmas Day', description: 'Festival' }
];

export default function StaffHolidays() {
  const [filterDate, setFilterDate] = useState('');

  const filteredHolidays = holidaysData.filter(item =>
    filterDate ? item.date === filterDate : true
  );

  // Prepare data for Pie chart (holidays grouped by description type)
  const chartData = useMemo(() => {
    const descriptionCounts = {};

    holidaysData.forEach(holiday => {
      const key = holiday.description;
      descriptionCounts[key] = (descriptionCounts[key] || 0) + 1;
    });

    return {
      labels: Object.keys(descriptionCounts),
      datasets: [
        {
          label: 'Holiday Types',
          data: Object.values(descriptionCounts),
          backgroundColor: [
            '#0d6efd', '#198754', '#ffc107', '#dc3545', '#6f42c1',
            '#20c997', '#fd7e14'
          ],
          borderColor: '#fff',
          borderWidth: 1
        }
      ]
    };
  }, []);

  return (
    <Container fluid className="py-4">
      <h4 className="mb-4">Holiday List</h4>

      <Row className="mb-3 g-2">
        <Col md={6} sm={12}>
          <Form.Control
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </Col>
        <Col md={6} sm={12}>
          <Button className="w-100" variant="primary" disabled>
            Add New Holiday (Admin Only)
          </Button>
        </Col>
      </Row>

      <Row>
        <Col lg={8} className="mb-4">
          <Card className="p-3 shadow-sm" style={{ height: '400px'}}>
            <h5 className="mb-3">Upcoming Holidays</h5>
            <Table bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Holiday Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filteredHolidays.length > 0 ? (
                  filteredHolidays.map((holiday, idx) => (
                    <tr key={idx}>
                      <td>{holiday.date}</td>
                      <td>{holiday.name}</td>
                      <td>{holiday.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center text-muted">
                      No holidays found for the selected date.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="p-3 shadow-sm" style={{ height: '400px' }}>
            <h5 className="mb-3">Holiday Type Distribution</h5>
            <div style={{ position: 'relative', height: '300px' }}>
              <Pie
                data={chartData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}
