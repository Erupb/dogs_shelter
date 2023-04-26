import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../../Style/TableStyle.css'


function DeleteDog(props) {
    const [dog, setDog] = useState([]);
    let token = getTokenFromStorage();
    const dog_id = window.location.pathname.split('/').pop();
    useEffect(() => {
        const fetchDogs = async () => {
            const response = await fetch('http://localhost:8084/dogs/admin/' + dog_id, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8084',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `Bearer ${token}`

                },
            });
            const data = await response.json();
            setDog(data);
        };
        fetchDogs();
    }, []);

    const DeleteDog = async () => {
        const response = await fetch('http://localhost:8084/dogs/admin/' + dog_id + '/remove', {
            method:"DELETE",
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `Bearer ${token}`

            },
        });
        const data = await response.json();
        setDog(data);
    };

    function getTokenFromStorage(){
        return localStorage.getItem('token');
    }

    return (
        <div>
            <h1>Подробные сведения о собаке</h1>
            <table className="table, table-bordered" style={{ 'margin': 'auto', 'width': '70%' }}>
                <thead>
                <tr>
                    <th>Кличка</th>
                    <th>Порода</th>
                    <th>Возраст</th>
                    <th>Описание</th>
                    <th>Фото</th>
                </tr>
                </thead>
                <tbody>
                <tr key={dog.id}>
                    <td>{dog.name}</td>
                    <td>{dog.breed}</td>
                    <td>{dog.age}</td>
                    <td>{dog.description}</td>
                    <td><img src={dog.img} alt={dog.name} style={{ width: '17vw', height: '17vw', objectFit: 'contain' }} /></td>
                </tr>
                </tbody>
            </table>
            {/* ДОБАВИТЬ ВОЗМОЖНОСТЬ УДАЛИТЬ СОБАКУ ИЗ СПИСКА. СЕРВЕРУ ПЕРЕДАЕТСЯ АЙДИШНИК СОБАКИ.*/}
            <div>
                <button type="submit" onClick={DeleteDog} className="btn btn-danger" style={{ 'width': '30%', 'margin': 'auto', 'display': 'flex' }}>
                    Удалить собаку
                </button>
            </div>
        </div>
    );
}

export default DeleteDog;