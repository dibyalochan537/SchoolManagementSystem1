import React, { useState } from "react";
import {Container,Tabs,Tab,Form,Row,Col,Button,Table,Card} from "react-bootstrap";
import "../../PagesCSS/SettingsAdminAccountSetting.css";
import { FaSave,FaPlus,FaTrash, FaEdit} from "react-icons/fa";
export default function AdminAccountSettings() {
  const [key, setKey] = useState("classExpenses");
  //Class Expenses
      const classExpenses = [
        { class: "I", description: "Ganesh Puja Chanda", amount: 4000 },
        { class: "I", description: "Bus", amount: 500 },
        { class: "II", description: "Picnic Collection", amount: 200 }
      ];
      const sectionExpenses = [
        { classSection: "I-A", description: "School Goodies Fees", amount: 1000 },
        { classSection: "I-A", description: "Somethhing", amount: 200 },
        { classSection: "III-B", description: "Picnic Fees", amount: 100 }
      ];
//Class fees setting
      const [selectedClass, setSelectedClass] = useState("");
      const [admissionFees, setAdmissionFees] = useState("");
      const [tuitionFees, setTuitionFees] = useState("");
      const [busFees, setBusFees] = useState("");
      const [feesList, setFeesList] = useState([
        { className: "I", admission: 5000, tuition: 2000, bus: 200 },
        { className: "II", admission: 5500, tuition: 2200, bus: 200 },
        { className: "III", admission: 6000, tuition: 2400, bus: 200 },
        { className: "IV", admission: 6500, tuition: 2600, bus: 200 },
      ]);
      const handleSaveFee = () => {
        if (selectedClass && admissionFees && tuitionFees && busFees) {
          const newEntry = {
            className: selectedClass,
            admission: Number(admissionFees),
            tuition: Number(tuitionFees),
            bus: Number(busFees),
          };
          setFeesList([...feesList, newEntry]);
          setSelectedClass("");
          setAdmissionFees("");
          setTuitionFees("");
          setBusFees("");
        }
      };
//Class Payment Setting
      const [modeName, setModeName] = useState("");
      const [description, setDescription] = useState("");
      const [modesList, setModesList] = useState([
        { mode: "UPI", description: "Unified Payments Interface" },
        { mode: "Cash", description: "Offline Transaction Handedly Cash Transaction Made" },
        { mode: "Dodge Coin", description: "Digital Currency Transfer" },
      ]);
      const handleAddMode = () => {
        if (modeName.trim() && description.trim()) {
          setModesList([...modesList, { mode: modeName.trim(), description: description.trim() }]);
          setModeName("");
          setDescription("");
        }
      };
//Class Expenses Type setting
      const [expenseType, setExpenseType] = useState("");
      const [descriptionExpenses, setExpensesDescription] = useState("");
      const [expenseTypes, setExpenseTypes] = useState([
        { type: "Class", description: "General class expenses" },
        { type: "Section", description: "Specific section-wise expenses" },
        { type: "Transport", description: "Bus, van, fuel charges" },
      ]);

      const handleAddExpenseType = () => {
        if (expenseType.trim() && descriptionExpenses.trim()) {
          setExpenseTypes([
            ...expenseTypes,
            { type: expenseType.trim(), description: descriptionExpenses.trim() },
          ]);
          setExpenseType("");
          setExpensesDescription("");
        }
      };
      const [editingExpensesIndex, setEditingExpensesIndex] = useState(null);
      const handleExpensesDelete = (index) => {
        const updatedList = [...expenseTypes];
        updatedList.splice(index, 1);
        setExpenseTypes(updatedList);
      };
      const handleExpensesEdit = (index) => {
        setEditingExpensesIndex(index);
        setExpenseType(expenseTypes[index].type);
        setDescription(expenseTypes[index].description);
      };
      const handleExpensesUpdate = () => {
        if (editingExpensesIndex !== null && expenseType.trim() && descriptionExpenses.trim()) {
          const updated = [...expenseTypes];
          updated[editingExpensesIndex] = { type: expenseType.trim(), description: descriptionExpenses.trim() };
          setExpenseTypes(updated);
          setExpenseType("");
          setExpensesDescription("");
          setEditingExpensesIndex(null);
        }
      };
  return (
      <Card className="p-4 shadow-sm">
        <h5 className="fw-bold mb-4">Account Settings</h5>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4 account-tabs"
        >
{/* Class Expenses******************************************************************** */}
          <Tab eventKey="classExpenses" title="Class Expenses">
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Expense Type</Form.Label>
                  <Form.Control value="Class" readOnly />
                </Col>
                <Col md={6}>
                  <Form.Label>Select Class</Form.Label>
                  <Form.Control placeholder="Select Class" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Label>Select Section</Form.Label>
                  <Form.Select>
                    <option>Select</option>
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="number" />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={2} />
                </Col>
              </Row>
              <div className="text-end">
                <Button className="animated-btn">💾 Save Expense</Button>
              </div>
            </Form>
            <Row className="mt-5">
              <Col md={6}>
                <h6>Class Expenses</h6>
                <div className="table-responsive">
                  <Table bordered hover className="responsive-table">
                    <thead className="table-light">
                      <tr>
                        <th>Class</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classExpenses.map((exp, i) => (
                        <tr key={i}>
                          <td>{exp.class}</td>
                          <td>{exp.description}</td>
                          <td>{exp.amount}</td>
                          <td>
                            <Button variant="danger" size="sm">Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
              <Col md={6}>
                <h6>Section Expenses</h6>
                <div className="table-responsive">
                  <Table bordered hover className="responsive-table">
                    <thead className="table-light">
                      <tr>
                        <th>Class - Section</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sectionExpenses.map((exp, i) => (
                        <tr key={i}>
                          <td>{exp.classSection}</td>
                          <td>{exp.description}</td>
                          <td>{exp.amount}</td>
                          <td>
                            <Button variant="danger" size="sm">Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Tab>
{/* CLass Fees*************************************************************************************** */}
          <Tab eventKey="classFees" title="Class Fees">
            <h5 className="fw-bold mb-4">Class Fees</h5>
            <Row className="mb-3">
              <Col md={6} className="mb-3">
                <Form.Label>Select Class</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  <option>I</option>
                  <option>II</option>
                  <option>III</option>
                  <option>IV</option>
                </Form.Control>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Monthly Tuition Fees</Form.Label>
                <Form.Control
                  type="number"
                  value={tuitionFees}
                  onChange={(e) => setTuitionFees(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Admission Fees</Form.Label>
                <Form.Control
                  type="number"
                  value={admissionFees}
                  onChange={(e) => setAdmissionFees(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Bus Services Fees</Form.Label>
                <Form.Control
                  type="number"
                  value={busFees}
                  onChange={(e) => setBusFees(e.target.value)}
                />
              </Col>
            </Row>
            <div className="text-end mb-4">
              <Button variant="primary" onClick={handleSaveFee}>
                <FaSave className="me-2" />
                Save Fee
              </Button>
            </div>
            <h6 className="fw-bold">Class Fees List</h6>
            <div className="table-responsive">
              <Table bordered hover responsive className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Class Name</th>
                    <th>Admission Fees</th>
                    <th>Monthly Tuition Fees</th>
                    <th>Bus Services Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {feesList.map((fee, index) => (
                    <tr key={index}>
                      <td>{fee.className}</td>
                      <td>{fee.admission}</td>
                      <td>{fee.tuition}</td>
                      <td>{fee.bus}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>
{/* Payment Modes ****************************************************************************/}
          <Tab eventKey="paymentModes" title="Payment Modes">
            <h5 className="fw-bold mb-4">Payment Modes Supported</h5>
            <Row className="align-items-end mb-3">
              <Col md={6} className="mb-3">
                <Form.Label>Payment Mode Name</Form.Label>
                <Form.Control
                  placeholder="Enter payment mode"
                  value={modeName}
                  onChange={(e) => setModeName(e.target.value)}
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </Row>
            <div className="text-end mb-4">
              <Button variant="primary" onClick={handleAddMode}>
                <FaPlus className="me-2" />
                Add Payment Mode
              </Button>
            </div>
            <h6 className="fw-bold">Payment Modes List</h6>
            <div className="table-responsive">
              <Table bordered hover responsive className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Payment Mode</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {modesList.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.mode}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>
{/* Expenses Types *********************************************************************************************/}
          <Tab eventKey="expenseTypes" title="Expenses Type">
            <h6 className="fw-bold mb-4">Expense Types Supported</h6>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Expense Type Name</Form.Label>
                  <Form.Control
                    placeholder="Enter Expense Type"
                    value={expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder="Enter Description"
                    value={descriptionExpenses}
                    onChange={(e) => setExpensesDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="text-end mt-3">
              <Button variant={editingExpensesIndex !== null ? "success" : "primary"} onClick={editingExpensesIndex !== null ? handleExpensesUpdate : handleAddExpenseType}>
                {editingExpensesIndex !== null ? (
                  <>
                    <FaSave className="me-2" /> Update
                  </>
                ) : (
                  <>
                    <FaPlus className="me-2" /> Add Expense Type
                  </>
                )}
              </Button>
            </div>

            <h6 className="fw-bold mt-5">Expense Types List</h6>

            <div className="table-responsive">
              <Table bordered hover className="mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Expense Type</th>
                    <th>Description</th>
                    <th style={{ width: "120px" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenseTypes.map((item, index) => (
                    <tr key={index}>
                      <td>{item.type}</td>
                      <td>{item.description}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleExpensesEdit(index)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleExpensesDelete(index)}
                        >
                          <FaTrash /> 
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>
      </Card>
  );
}
