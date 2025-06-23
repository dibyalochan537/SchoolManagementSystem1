import React,{useEffect, useState} from 'react';
import { Table,Button, Form,Row, Col, Card } from 'react-bootstrap';
import {getAllInventoryData} from "../../API/inventoryData"
export default function AdminInventory(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts]=useState([]);
    useEffect(() => {
      const loadStdMngData = async () => {
        try {
          setProducts(await getAllInventoryData());
        } catch (err) {
          console.error("Error fetching Inventory data:", err);
          setError("Failed to load inventory Data.");
        } finally {
          setLoading(false);
        }
      };
      loadStdMngData();
    }, []);
//     const [products, setProducts] = useState([
//     { id: 1, name: "Product_1", quantity: 40, category: "Electronics", supplier: "ABC Electronics", unitPrice: 100, discount: 20 },
//     { id: 2, name: "Product_2", quantity: 40, category: "Furniture", supplier: "BCD Woods", unitPrice: 5000, discount: 30 },
//     { id: 3, name: "My Product", quantity: 15, category: "Electronics", supplier: "Someone", unitPrice: 100, discount: 10 },
//     { id: 4, name: "dsfsfs", quantity: 10, category: "Electronics", supplier: "dsfsdf", unitPrice: 456, discount: 10 },
//   ]);


//   Summary card
    const inStock = products.reduce((acc, p) => acc + p.quantity, 0);
    const purchases = products.length;
    const cost = products.reduce((acc, p) => acc + ((p.unitPrice - (p.unitPrice * p.discount / 100)) * p.quantity), 0);
    const suppliers = new Set(products.map(p => p.supplier)).size;
    const categories = new Set(products.map(p => p.category)).size;

//   Inventory Table
    const handleDelete = id => setProducts(products.filter(p => p.id !== id));
    return(
        <>
            <h4 className="mb-3"><i className="bi bi-box-seam"></i> Inventory Management</h4>
            <Row className="mb-3">
                <Col xs={12} md={8}>
                <Form.Control placeholder="Search inventory items..." />
                </Col>
                <Col xs={6} md={2}>
                <Button className="w-100" variant="primary">Search</Button>
                </Col>
                <Col xs={6} md={2}>
                <Form.Select>
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                </Form.Select>
                </Col>
            </Row>




            <Row className="mb-4">
                <Col md={4}>
                    <Card className="p-3"><strong>In Stock</strong><h4>{inStock}</h4><strong>To Be Delivered</strong><h4>0</h4></Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3"><strong>Purchases</strong><h4>{purchases}</h4><strong>Cost</strong><h4>₹{cost.toFixed(2)}</h4></Card>
                </Col>
                <Col md={4}>
                    <Card className="p-3"><strong>Suppliers</strong><h4>{suppliers}</h4><strong>Categories</strong><h4>{categories}</h4></Card>
                </Col>
            </Row>




            <Card className="p-3">
                <Row className="mb-3">
                    <Col><h5><i className="bi bi-card-list"></i> Inventory List</h5></Col>
                    <Col className="text-end">
                    <Button variant="outline-primary" className="me-2"><i className="bi bi-download"></i> Export Logs</Button>
                    <Button variant="primary"><i className="bi bi-plus-circle"></i> Add Product</Button>
                    </Col>
                </Row>
                <div >
                <Table bordered hover responsive="xxl">
                    <thead className="table-light">
                    <tr>
                        <th>Product Name</th><th>Quantity</th><th>Category</th><th>Supplier</th>
                        <th>Unit Price</th><th>Discount</th><th>Total Amount</th><th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => {
                        const total = ((p.unitPrice - (p.unitPrice * p.discount / 100)) * p.quantity).toFixed(2);
                        return (
                        <tr key={p.id}>
                            <td>{p.name}</td><td>{p.quantity}</td><td>{p.category}</td><td>{p.supplier}</td>
                            <td>{p.unitPrice.toFixed(2)}</td><td>{p.discount}</td><td>{total}</td>
                            <td >
                                <Button size="sm" variant="success" className="me-1">Restock</Button>
                                <Button size="sm" variant="warning" className="me-1">Deduct</Button>
                                <Button size="sm" variant="info" className="me-1 text-white">Update</Button>
                                <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
                            </td>
                        </tr>
                        );
                    })}
                    </tbody>
                </Table>
                </div>
            </Card>
        </>
    );
}