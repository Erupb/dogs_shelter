import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../Style/TableStyle.css'


function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            let token;
            token = getTokenFromStorage();
            const response = await fetch('http://localhost:8084/dogs/admin/orders', {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8084',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `Bearer ${token}`

                },
            });
            const data = await response.json();
            setOrders(data);
        };
        fetchOrders();
    }, []);

    const deleteOrder = async (order_id, dog_id) => {
        let token;
        token = getTokenFromStorage();
        const response = await fetch('http://localhost:8084/dogs/admin/orders/' + order_id + '/remove/' + dog_id, {
            method:"POST",
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `Bearer ${token}`

            },
        });
        const data = await response.json();
        setOrders(data);
    };

    function getTokenFromStorage(){
        return localStorage.getItem('token');
    }

    return (
        <div>
            <h1 style={{ 'padding-left': '3vw' }}>Заявки</h1>
            <table className="table, table-bordered"  style={{ 'margin': 'auto', 'width': '70%' }}>
                <thead>
                <tr>
                    <th>Номер заявки</th>
                    <th>Уникальный номер клиента</th>
                    <th>Уникальный номер собаки</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td><a href={"/admin/get/user/" + order.user_id }>{order.user_id}</a></td>
                        <td>{order.dog_id}</td>
                        <td>
                            <button className="btn btn-danger" type={"submit"} onClick={() => deleteOrder(order.id, order.dog_id)}>Удалить заявку</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;