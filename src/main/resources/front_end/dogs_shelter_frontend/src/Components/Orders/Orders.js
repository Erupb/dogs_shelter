import React, { useState, useEffect } from 'react';
import '../../Style/TableStyle.css'


function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            let token;
            token = getTokenFromStorage();
            const response = await fetch('http://89.108.76.130:8084/dogs/admin/orders', {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': 'http://89.108.76.130:8084',
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
        const response = await fetch('http://89.108.76.130:8084/dogs/admin/orders/' + order_id + '/remove/' + dog_id, {
            method:"POST",
            headers: {
                'Access-Control-Allow-Origin': 'http://89.108.76.130:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `Bearer ${token}`

            },
        });
        let admin_deleted_order = document.getElementById("admin_deleted_order");

        if(response.ok){
            admin_deleted_order.style.visibility = "visible";
        }

        const data = await response.json();
        setOrders(data);
    };

    function getTokenFromStorage(){
        return localStorage.getItem('token');
    }

    return (
        <div>
            <h1 style={{ 'paddingLeft': '3vw' }}>Заявки</h1>
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
            <div id="admin_deleted_order" style={{ "visibility": "hidden"}}>
                <h3 style={{ "width" : "50%", "margin": "auto" }}>Вы успешно удалили заявку</h3>
            </div>
        </div>
    );
}

export default Orders;