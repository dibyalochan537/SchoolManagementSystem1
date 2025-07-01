import React,{useEffect,useState} from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function AdminAcMngStdFeePayNowModal({ show, onHide, payment, onPay }) {
    const [paymentType, setPaymentType] = useState("fullpayment");
    const [amount, setAmount] = useState(payment.amount);
    const [mode, setMode] = useState("");
    const [paymentMode, setPaymentMode] = useState("");
    useEffect(() => {
        const pendingAmount = payment.amount - payment.paidAmount;
        setAmount(pendingAmount);
        setPaymentType("fullpayment");
        setMode("");
    }, [payment]);

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        setPaymentType(selectedType);
        if (selectedType === "fullpayment") {
            setAmount(payment.amount - payment.paidAmount);
        } else {
            setAmount("");
        }
    };
    const handlePay = () => {
        if (!mode) return alert("Please select Mode of Payment");
        onPay({
            regdNo: payment.regdNo,
            description: payment.description,
            amount: parseFloat(amount),
            paymentType: mode
        });
    };
    return (
        <Modal show={show} onHide={onHide} centered size="md">
            <Modal.Header closeButton>
                <Modal.Title>Pay Fees</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Label>Mode of Payment</Form.Label>
                            <Form.Select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                              <option disabled value="">Select Mode</option>
                              <option value="Cash">Cash</option>
                              <option value="UPI">UPI</option>
                              <option value="Card">Card</option>
                              <option value="Net Banking">Net Banking</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Select value={paymentType} onChange={handleTypeChange}>
                                <option value="fullpayment">Full Payment</option>
                                <option value="partialPayment">Partial Payment</option>
                            </Form.Select>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12}>
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={amount}
                                disabled={paymentType === "fullpayment"}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button
                  variant="primary"
                  onClick={() => onPay(payment.slNo, parseFloat(amount), paymentMode, paymentType)}
                >
                  Pay
                </Button>

            </Modal.Footer>
        </Modal>
    );
}
