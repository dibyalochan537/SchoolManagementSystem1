import React, { useState,useEffect} from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal
} from "react-bootstrap";
import { Alert } from "react-bootstrap";
import AdminAcMngStdFeePayNowModal from "./AdminAcMngStdFeePayNowModal";
import { FaUserGraduate, FaFileInvoice } from "react-icons/fa";
import {getFeesOfStudents,adminGetAllStudentManagement} from "../API/studentManagement"
import PrintAccountDetailsStudent from "../layout/printAccountDetailsStudent";
import {postStudentAccountData} from "../API/studentAccount";
export default function AdminAcMngStdFees() {
    const [feeDataset,setFeesDataset]=useState([]);
    const [studentInformation,setStudentInformation]=useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadStdMngData = async () => {
            try {
                const studentFees = await getFeesOfStudents();
                const studentInfo=await adminGetAllStudentManagement();
                setFeesDataset(studentFees);
                setStudentInformation(studentInfo);
            } catch (err) {
                console.error("Error fetching student Fees data:", err);
                setError("Failed to load student fees Data.");
            } finally {
                setLoading(false);
            }
        };
        loadStdMngData();
    }, []);
  const [searchInput, setSearchInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const handleSearch = () => {
    const trimmedInput = searchInput.trim();
    // If input is empty, reset everything
        if (trimmedInput === "") {
            setSelectedStudent(null);
            setShowAlert(false);
            return;
        }
        const found = studentInformation.find((student) =>
            student.id.includes(trimmedInput) ||
            student.firstName.toLowerCase().includes(trimmedInput.toLowerCase()) ||
            student.lastName.toLowerCase().includes(trimmedInput.toLowerCase()) ||
            student.rollNo === trimmedInput
        );
        if (found) {
            setSelectedStudent(found);
            setShowAlert(false);
            setFeeDetails(null);
        } else {
            setSelectedStudent(null);
            setFeeDetails(null);
            setShowAlert(true);
        }
    };
// Fees show
    const [feeDetails, setFeeDetails] = useState(null);
// Pay fees modal
        const [showPayModal, setShowPayModal] = useState(false);
        const [currentPayment, setCurrentPayment] = useState(null);
        // Trigger modal
        const handlePayNow = (payment) => {
          setCurrentPayment({
              ...payment,
              regdNo: selectedStudent.id // include student ID
          });
          setShowPayModal(true);
      };
            // Dummy pay function
        const handlePayment = async (slNo, paidAmount, paymentMode, paymentType) => {
          const payment = feeDetails.payments.find(p => p.slNo === slNo);
          if (!payment || !selectedStudent) return;
          const payload = {
            regdNo: selectedStudent.id,
            description: payment.description,
            amount: paidAmount,
            paymentType: paymentMode
          };
          try {
            await postStudentAccountData(payload);
            setFeeDetails((prev) => {
              const updatedPayments = prev.payments.map((p) => {
                if (p.slNo === slNo) {
                  const totalPaid = p.paidAmount + paidAmount;
                  const isFull = totalPaid >= p.amount;
                  return {
                    ...p,
                    paidAmount: totalPaid,
                    status: isFull ? "Completed" : "Pending",
                  };
                }
                return p;
              });
              const newPaidSum = updatedPayments.reduce((sum, p) => sum + p.paidAmount, 0);
              const newBalance = updatedPayments.reduce((sum, p) => sum + (p.amount - p.paidAmount), 0);
              return {
                ...prev,
                payments: updatedPayments,
                fees: {
                  ...prev.fees,
                  paidAmount: newPaidSum,
                  balanceAmount: newBalance,
                },
              };
            });
          } catch (error) {
            console.error('Error posting payment:', error);
          }
          setShowPayModal(false);
        };

// Open print modal
        const [showPrintModal, setShowPrintModal] = useState(false);
const [printData, setPrintData] = useState(null);

const handlePrint = (payment) => {
  setPrintData({
    receiptNo: `REC-${payment.slNo}`,
    date: new Date().toLocaleDateString(),
    regdNo: studentInformation.regdNo,
    name: studentInformation.firstName,
    amountInWords: "One Thousand Rupees Only",
    amount: payment.amount,
    remark: payment.description,
    receivedBy: "Account Staff",
    authorizedBy: "Principal",
  });
  setShowPrintModal(true);
};


  return (
    <>
    <Container fluid className="p-3">
      <Card className="p-4 shadow-sm">
        <h4 className="mb-3">Student Fees Form</h4>
        <Row className="mb-4 g-2 align-items-end">
          <Col md={9} xs={12}>
            <Form.Label>Search Student</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Roll No, Name, or Number"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Col>
          <Col md={3} xs={12}>
            <Button className="w-100" variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
          {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Student not found
            </Alert>
           )}

        </Row>

        {selectedStudent && (
          <Card className="p-3 shadow-sm mt-4">
            <h5 className="mb-3">
              <FaUserGraduate className="me-2" /> Student Information
            </h5>
            <hr />
            <h6 className="text-muted">Basic Details</h6>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Student Roll No</Form.Label><Form.Control value={selectedStudent.id} readOnly /></Col>
              <Col md={6}><Form.Label>Student Name</Form.Label><Form.Control value={`${selectedStudent.firstName} ${selectedStudent.middleName} ${selectedStudent.lastName}`} readOnly /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Date of Birth</Form.Label><Form.Control value={selectedStudent.dateOfBirth} readOnly /></Col>
            </Row>

            <h6 className="text-muted">Academic Details</h6>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Gender</Form.Label><Form.Control value={selectedStudent.gender} readOnly /></Col>
              <Col md={6}><Form.Label>Class</Form.Label><Form.Control value={selectedStudent.admissionClass} readOnly /></Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}><Form.Label>Section</Form.Label><Form.Control value={selectedStudent.section} readOnly /></Col>
            </Row>

            <div className="text-end mt-3">
              <Button variant="primary"
                    onClick={() => {
                        const matched = feeDataset.find(
                            (fee) => fee.regdNo === selectedStudent.id
                        );
                        setFeeDetails(matched || null);
                    }}
              >
                <FaFileInvoice className="me-2" /> Fees Details
              </Button>
            </div>
          </Card>
        )}
        {feeDetails && (
            <Card className="p-3 shadow-sm mt-4">
                <h5 className="mb-3">Fees Details</h5>
                <Row className="mb-3">
                <Col md={6}>
                    <Form.Label>Annual Fees</Form.Label>
                    <Form.Control value={feeDetails.fees.annualFees} readOnly />
                </Col>
                <Col md={6}>
                    <Form.Label>Monthly Tuition Fees</Form.Label>
                    <Form.Control value={feeDetails.fees.monthlyFees} readOnly />
                </Col>
                <Col md={6}>
                    <Form.Label>Bus Fees</Form.Label>
                    <Form.Control value={feeDetails.fees.busFees} readOnly />
                </Col>
                <Col md={6}>
                    <Form.Label>Other Fees</Form.Label>
                    <Form.Control value={feeDetails.fees.otherFees} readOnly />
                </Col>
                </Row>

                <h5 className="mt-4">Payment Details</h5>
                <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Description</th>
                        <th>Total Amount</th>
                        <th>Paid Amount</th>
                        <th>Pending Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {feeDetails.payments.map((payment, idx) => (
                        <tr key={idx}>
                        <td>{payment.slNo}</td>
                        <td>{payment.description}</td>
                        <td>{payment.amount}</td>
                        <td>{payment.paidAmount}</td>
                        <td>{payment.amount - payment.paidAmount}</td>
                        <td>
                            <span
                            className={`badge ${
                                payment.status === "Completed"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                            >
                            {payment.status}
                            </span>
                        </td>
                        <td>
                            <Button size="sm" variant="primary" className="me-2"
                                onClick={() => handlePayNow(payment)}
                                disabled={payment.status === "Completed"}
                            >
                            Pay Now
                            </Button>
                            <Button size="sm" variant="info"
                                onClick={() => handlePrint(payment)}
                            >
                                Print
                            </Button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                </div>
            </Card>
            )}
      </Card>
    </Container>
    {/* Open Fee PayNow modal */}
    <AdminAcMngStdFeePayNowModal
        show={showPayModal}
        onHide={() => setShowPayModal(false)}
        payment={currentPayment || { amount: 0 }}
        onPay={handlePayment}
    />
        <PrintAccountDetailsStudent
            show={showPrintModal}
            onHide={() => setShowPrintModal(false)}
            data={printData}
        />
    </>
  );
}
