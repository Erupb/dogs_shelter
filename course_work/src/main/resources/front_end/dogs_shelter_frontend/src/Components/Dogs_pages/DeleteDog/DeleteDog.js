import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../../Style/TableStyle.css'


function DeleteDog(props) {
    const [dog, setDog] = useState([]);

    useEffect(() => {
        const fetchDogs = async () => {
            let token;
            token = getTokenFromStorage();
            const dog_id = window.location.pathname.split('/').pop();
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
            {/*<div th:each="dog : ${dogs}" style="text-align: center;">
                <button type="submit" id="Take_dog_button" className="btn btn-success" style="width: 100%">Взять
                    собаку к себе домой
                </button>
            </div>*/}
        </div>
    );
}

export default DeleteDog;