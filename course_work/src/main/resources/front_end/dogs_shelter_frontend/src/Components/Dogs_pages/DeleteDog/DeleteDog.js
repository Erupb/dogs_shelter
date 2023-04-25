import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../../Style/TableStyle.css'


function DeleteDog(props) {
    const [dog, setDog] = useState([]);
    let token = getTokenFromStorage();
    const dog_id = window.location.pathname.split('/').pop();
    useEffect(() => {
        const fetchDogs = async () => {
            const response = await fetch('http://localhost:8084/dogs/get/' + dog_id, {
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
        const response = await fetch('http://localhost:8084/dogs/' + dog_id + '/remove', {
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
            <table className="table, table-bordered">
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
                    <td><img src={dog.img} alt={dog.name} style={{ width: '15vw', height: '15vw', objectFit: 'contain' }} /></td>
                </tr>
                </tbody>
            </table>
            {/* ДОБАВИТЬ ВОЗМОЖНОСТЬ УДАЛИТЬ СОБАКУ ИЗ СПИСКА. СЕРВЕРУ ПЕРЕДАЕТСЯ АЙДИШНИК СОБАКИ.*/}
            <div>
                <button type="submit" onClick={DeleteDog} className="btn btn-outline-secondary" style={{ 'width': '100%' }}>
                    Удалить собаку
                </button>
            </div>
        </div>
    );
}

export default DeleteDog;