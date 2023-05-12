import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../../Style/TableStyle.css'


function DeleteDog(props) {
    const [dog, setDog] = useState([]);
    let token = getTokenFromStorage();
    const dog_id = window.location.pathname.split('/').pop();
    useEffect(() => {
        const fetchDogs = async () => {
            const response = await fetch('http://89.108.76.130:8084/dogs/admin/' + dog_id, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': 'http://89.108.76.130:8084',
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
        const response = await fetch('http://89.108.76.130:8084/dogs/admin/' + dog_id + '/remove', {
            method:"DELETE",
            headers: {
                'Access-Control-Allow-Origin': 'http://89.108.76.130:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `Bearer ${token}`

            },
        });
        let admin_deleted_dog = document.getElementById("admin_deleted_dog");

        if(response.ok){
            admin_deleted_dog.style.visibility = "visible";
        }
        /*const data = await response.json();
        setDog(data);*/
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
                    <th>Пол</th>
                    <th>Возраст</th>
                    <th>Описание</th>
                    <th>Фото</th>
                </tr>
                </thead>
                <tbody>
                <tr key={dog.id}>
                    <td>{dog.name}</td>
                    <td>{dog.breed}</td>
                    <td>{dog.gender}</td>
                    <td>{dog.age}</td>
                    <td>{dog.description}</td>
                    <td><img src={dog.img} alt={dog.name} style={{ width: '17vw', height: '17vw', objectFit: 'contain' }} /></td>
                </tr>
                </tbody>
            </table>
            <div>
                <button type="submit" onClick={DeleteDog} className="btn btn-danger" style={{ 'width': '30%', 'margin': 'auto', 'display': 'flex' }}>
                    Удалить собаку
                </button>
                <div id="admin_deleted_dog" style={{ "visibility": "hidden"}}>
                    <h3 style={{ "width" : "50%", "margin": "auto" }}>Вы успешно удалили сведения о собаке</h3>
                </div>
            </div>
        </div>
    );
}

export default DeleteDog;