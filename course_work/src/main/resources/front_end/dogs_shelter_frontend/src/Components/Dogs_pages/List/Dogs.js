import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../../Style/TableStyle.css'


function Dogs() {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        const fetchDogs = async () => {
            let token;
            token = getTokenFromStorage();
            const response = await fetch('http://localhost:8084/dogs', {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:8084',
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `Bearer ${token}`

                },
            });
            const data = await response.json();
            setDogs(data);
        };
        fetchDogs();
    }, []);

   function getTokenFromStorage(){
       return localStorage.getItem('token');
   }

    return (
        <div>
            <h1>Список собак</h1>
            <table className="table, table-bordered">
                <thead>
                <tr>
                    <th>Действия</th>
                    <th>Кличка</th>
                    <th>Порода</th>
                    <th>Возраст</th>
                    <th>Фото</th>
                </tr>
                </thead>
                <tbody>
                {dogs.map(dog => (
                    <tr key={dog.id}>
                        <td>
                            <div>
                                <div>
                                    <a href={"/dogs/get/" + dog.id}>
                                        <button className="btn btn-success"> Взять собаку к себе домой</button>
                                    </a>
                                </div>
                                <div>
                                    <a href={"/dogs/admin/" + dog.id}>
                                        <button className="btn btn-warning">Удалить сведения о собаке</button>
                                    </a>
                                </div>
                            </div>
                        </td>
                        <td>{dog.name}</td>
                        <td>{dog.breed}</td>
                        <td>{dog.age}</td>
                        <td><img src={dog.img} alt={dog.name} style={{ width: '15vw', height: '15vw', objectFit: 'contain' }} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div style={{ 'display': 'flex', 'flex-direction': 'row', 'margin': 'auto', 'width': '50%' }}>
                <a href="/dogs/admin/add_dogs">
                    <button type="button" className="btn btn-success add_button">Добавить сведения о новой собаке
                    </button>
                </a>
                <a href="/dogs/admin/orders">
                    <button type="button" className="btn btn-info add_button">Посмотреть список заявок</button>
                </a>
            </div>
        </div>
    );
}

export default Dogs;