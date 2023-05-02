import React, { useState, useEffect } from 'react';
import {Container} from 'react-bootstrap';
import '../../../Style/TableStyle.css'


function GetDog(props) {
    const [dog, setDog] = useState([]);
    let token;
    const dog_id = window.location.pathname.split('/').pop();
    token = getTokenFromStorage();
    let user_id
    user_id = getIdFromStorage();

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

    const GetDog = async () => {
        const response = await fetch('http://localhost:8084/dogs/get/dog/home', {
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ dog_id, user_id })
        });
        let user_ordered_dog = document.getElementById("user_ordered_dog");

        if(response.ok){
            user_ordered_dog.style.visibility = "visible";
        }
        const data = await response.json();
        setDog(data);
    };

    function getTokenFromStorage(){
        return localStorage.getItem('token');
    }

    function getIdFromStorage(){
        return localStorage.getItem('id')
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
                        <td><img src={dog.img} alt={dog.name} style={{ width: '15vw', height: '15vw', objectFit: 'contain' }} /></td>
                    </tr>
                </tbody>
            </table>
            {/* ДОБАВИТЬ ВОЗМОЖНОСТЬ ЗАБРАТЬ СОБАКУ К СЕБЕ ДОМОЙ. СЕРВЕРУ ПЕРЕДАЕТСЯ ИМЯ ИЛИ АЙДИ ЧТОБЫ ЗАПИСАТЬ ЗАЯВКУ. РЕШУ.*/}
            <div>
                <button type="submit" onClick={GetDog} className="btn btn-success" style={{ 'width': '30%', 'margin': 'auto', 'display': 'flex' }}>
                    Отправить заявку на получение собаки
                </button>
                <div id="user_ordered_dog" style={{ "visibility": "hidden"}}>
                    <h3 style={{ "width" : "50%", "margin": "auto" }}>Вы успешно добавили заявку</h3>
                </div>
            </div>
        </div>
    );
}

export default GetDog;