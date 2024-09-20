import React, { useState, useEffect } from 'react';
import axios from 'axios';
import menu from '../assets/menu.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Order.css'; // Import the CSS file

const Order = () => {
    const API_URL = 'http://localhost:8081/orders';
    const [orders, setOrders] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [orderDetails, setOrderDetails] = useState({ orderName: '', price: '', isDiscounted: false });
    const [newOrderDetails, setNewOrderDetails] = useState({ orderName: '', price: '', isDiscounted: false });

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_URL}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
            alert('Cannot load details. Something went wrong.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newOrderDetails = {
            ...orderDetails,
            [name]: type === 'checkbox' ? checked : value,
        };

        if (name === 'orderName') {
            if (value === 'Espresso') {
                newOrderDetails.isDiscounted = true;
            } else {
                newOrderDetails.isDiscounted = false;
            }
        }

        setOrderDetails(newOrderDetails);
    };

    const handleNewOrderInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        let updatedNewOrderDetails = {
            ...newOrderDetails,
            [name]: type === 'checkbox' ? checked : value,
        };

        if (name === 'orderName') {
            if (value === 'Espresso') {
                updatedNewOrderDetails.isDiscounted = true;
            } else {
                updatedNewOrderDetails.isDiscounted = false;
            }
        }

        setNewOrderDetails(updatedNewOrderDetails);
    };

    const handleAddOrder = async (e) => {
        e.preventDefault();
        try {
            const newOrder = { ...newOrderDetails };
            const response = await axios.post(`${API_URL}/add`, newOrder);
            setOrders([...orders, response.data]);
            setNewOrderDetails({ orderName: '', price: '', isDiscounted: false });
            alert('Order successfully added!');
            fetchOrders();
        } catch (error) {
            console.error('Error adding order:', error);
            alert('Failed to add order. Please try again.');
        }
    };

    const handleUpdateOrder = async (index) => {
        try {
            const orderId = orders[index].id; // Get the id of the order to update
            const updatedOrder = { ...orderDetails };
            const response = await axios.put(`${API_URL}/update/${orderId}`, updatedOrder);
            const updatedOrders = [...orders];
            updatedOrders[index] = response.data;
            setOrders(updatedOrders);
            setEditingIndex(null);
            alert('Order successfully updated!');
            fetchOrders();
        } catch (error) {
            console.error('Error updating order:', error);
            alert('Failed to update order. Please try again.');
        }
    };

    const handleEditOrder = (index) => {
        setEditingIndex(index);
        setOrderDetails(orders[index]);
    };

    const handleDeleteOrder = async (index) => {
        try {
            const orderId = orders[index].id; // Get the id of the order to delete
            await axios.delete(`${API_URL}/delete/${orderId}`);
            setOrders(orders.filter((_, i) => i !== index));
            alert('Order successfully deleted!');
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Failed to delete order. Please try again.');
        }
    };

    const calculateTotals = () => {
        let totalRegularBill = 0;
        let totalDiscountedBill = 0;

        orders.forEach(order => {
            if (order.isDiscounted) {
                totalDiscountedBill += order.price * 0.95; // Apply 5% discount
            } else {
                totalRegularBill += order.price;
            }
        });

        return { totalRegularBill, totalDiscountedBill };
    };

    const { totalRegularBill, totalDiscountedBill } = calculateTotals();

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4">
                    <img src={menu} alt="Menu" className="img-fluid blinking-border" style={{ maxWidth: '100%' }} />
                </div>
                <div className="col-md-8">
                    <form onSubmit={handleAddOrder}>
                        <div className="table-container mb-4">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="text-center text-white table-header">
                                        <tr>
                                            <th className="bg-dark text-white">Order Item</th>
                                            <th className="bg-dark text-white">Price</th>
                                            <th className="bg-dark text-white">On 5% Promo?</th>
                                            <th className="bg-dark text-white">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>
                                                <label htmlFor="orderName" className="form-label"></label>
                                                <input
                                                    type="text"
                                                    className="form-control text-center"
                                                    id="orderName"
                                                    name="orderName"
                                                    placeholder="Enter item"
                                                    value={newOrderDetails.orderName}
                                                    onChange={handleNewOrderInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label htmlFor="price" className="form-label"></label>
                                                <input
                                                    type="number"
                                                    className="form-control text-center"
                                                    id="price"
                                                    name="price"
                                                    placeholder="Enter price"
                                                    value={newOrderDetails.price}
                                                    onChange={handleNewOrderInputChange}
                                                />
                                            </td>
                                            <td>
                                                <label className="form-check-label" htmlFor="isDiscountedCheck"></label>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input form-check-lg custom-checkbox"
                                                    id="isDiscountedCheck"
                                                    name="isDiscounted"
                                                    checked={newOrderDetails.isDiscounted}
                                                    onChange={handleNewOrderInputChange}
                                                />
                                            </td>
                                            <td className="text-center">
                                                <button type="submit" className="btn bg-dark text-white custom-btn">
                                                    Place Order
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                    <div className="table-responsive">

                        <div className='bg-white text-center'>
                            <span className='fw-bold fs-4'> Attending Clerk: Jane Doe</span>
                        </div>
                        <table className="table table-bordered w-100">
                            <thead className="text-center text-white table-header">
                                <tr>
                                    <th className="bg-dark text-white">Order Item</th>
                                    <th className="bg-dark text-white">Price</th>
                                    <th className="bg-dark text-white">On 5% Promo?</th>
                                    <th className="bg-dark text-white">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(orders) && orders.map((order, index) => (
                                    <tr key={index} className="align-middle">
                                        {editingIndex === index ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control form-control-lg text-center"
                                                        name="orderName"
                                                        value={orderDetails.orderName}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control form-control-lg text-center"
                                                        name="price"
                                                        value={orderDetails.price}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input form-check-lg custom-checkbox"
                                                        name="isDiscounted"
                                                        checked={orderDetails.isDiscounted}
                                                        onChange={handleInputChange}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <button className="btn btn-success btn-lg" onClick={() => handleUpdateOrder(index)}>
                                                        Save
                                                    </button>
                                                    <button className="btn btn-secondary btn-lg" onClick={() => setEditingIndex(null)}>
                                                        Cancel
                                                    </button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="fs-5">{order.orderName}</td>
                                                <td className="fs-5">${order.price}</td>
                                                <td className="text-center">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input form-check-lg custom-checkbox"
                                                        name="isDiscounted"
                                                        checked={order.isDiscounted}
                                                        onChange={(e) => {
                                                            const updatedOrders = [...orders];
                                                            updatedOrders[index].isDiscounted = e.target.checked;
                                                            setOrders(updatedOrders);

                                                        }}
                                                        disabled
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <a href="#" className="btn btn-dark btn-lg" onClick={(e) => { e.preventDefault(); handleEditOrder(index); }}>
                                                        Edit
                                                    </a>
                                                    <a href="#" className="btn btn-primary btn-lg" onClick={(e) => { e.preventDefault(); handleDeleteOrder(index); }}>
                                                        Delete
                                                    </a>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="3" className="text-end fs-5">Total Regular Bill:</td>
                                    <td className="text-center fs-5">${totalRegularBill.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="text-end fs-5">Total Discounted Bill:</td>
                                    <td className="text-center fs-5">${totalDiscountedBill.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Order;