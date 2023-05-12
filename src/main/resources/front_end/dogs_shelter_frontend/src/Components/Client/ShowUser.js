import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../Style/TableStyle.css'


function ShowUser(props) {
    const [user, setUser] = useState([]);
    let token;
    let user_id;
    user_id = window.location.pathname.split('/').pop();
    token = getTokenFromStorage();

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('http://89.108.76.130:8084/admin/get/user/' + user_id, {
                method:"GET",
                headers: {

                    'Access-Control-Allow-Origin': 'http://89.108.76.130:8084',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `Bearer ${token}`

                },
            });
            const data = await response.json();
            setUser(data);
        };
        fetchUser();
    }, []);


    function getTokenFromStorage(){
        return localStorage.getItem('token');
    }

    function getIdFromStorage(){
        return localStorage.getItem('id')
    }

    return (
        <div>
            <h1>Подробные сведения о пользователе</h1>
            <table className="table, table-bordered" style={{ 'margin': 'auto', 'width': '70%' }}>
                <thead>
                <tr>
                    <th>Логин</th>
                    <th>Инициалы</th>
                    <th>Номер телефона</th>
                    <th>Роль</th>
                </tr>
                </thead>
                <tbody>
                <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.initials}</td>
                    <td>8{user.phone_number}</td>
                    <td>{user.role}</td>
                </tr>
                </tbody>
            </table>
            <div style={{ "margin":"auto", "width":"50%" }}>
                <button className="btn btn-info" >
                    <a href="/dogs/admin/orders">Вернуться на страницу ордеров</a>
                </button>
            </div>
        </div>
    );
}

export default ShowUser;