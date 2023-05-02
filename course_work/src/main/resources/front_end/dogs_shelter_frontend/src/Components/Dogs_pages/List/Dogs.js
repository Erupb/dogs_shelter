import React, { useState, useEffect } from 'react';
import {Container, Card, Button} from 'react-bootstrap';
import '../../../Style/TableStyle.css'


function Dogs() {
    const [dogs, setDogs] = useState([]);
    const [user_role, setUser_role] = useState([]);
    let username;
    username = getUsernameFromStorage();

    let show_admin;
    if(user_role == "USER") {
        show_admin = false;
    }
    else if (user_role == "ADMIN"){
        show_admin = true;
    }

    let show_page;
    show_page = !!username;


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
            validateDogs(data);
            setDogs(data);

        };
        fetchDogs();
    }, []);

    function validateDogs(dogs){
        for (var i = 0; i<dogs.length; i++){
            if(dogs[i]["ordered"] === true){
                delete dogs[i];
            }
        }
    }

    const getUserRole = async () => {
        let token;
        token = getTokenFromStorage();
        const response = await fetch('http://localhost:8084/get/user_role/' + getUsernameFromStorage(), {
            method:"GET",
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `Bearer ${token}`

            },
        });
        const data = await response.json();
        setUser_role(data);
    };
    getUserRole();

   function getTokenFromStorage(){
       return localStorage.getItem('token');
   }

   function getUsernameFromStorage(){
       return localStorage.getItem('username')
   }

    return (
        <div>
            <h1 style={{'paddingLeft': '3vw'}}>Список собак</h1>
            {show_page ? (
                    <table className="table, table-bordered" style={{'margin': 'auto', 'width': '70%'}}>
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
                                                <button className="btn btn-success">Взять собаку к себе домой</button>
                                            </a>
                                        </div>
                                        {show_admin ? (<div>
                                            <a href={"/dogs/admin/" + dog.id}>
                                                <button className="btn btn-warning">Удалить сведения о собаке</button>
                                            </a>
                                        </div>) : null}
                                    </div>
                                </td>
                                <td>{dog.name}</td>
                                <td>{dog.breed}</td>
                                <td>{dog.age}</td>
                                <td><img src={dog.img} alt={dog.name}
                                         style={{width: '17vw', height: '17vw', objectFit: 'contain'}}/></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    ):(
                        <div style={{"width":"30%", "height":"30%" }}>
                                <Card style={{ width: '18rem', "margin":"auto" }}>
                                    <Card.Body>
                                        <Card.Title>Вы не авторизованы</Card.Title>
                                        <Card.Text>
                                            Перед использованием сервиса необходимо войти в аккаунт
                                        </Card.Text>
                                        <Button className="btn btn-info add_button"><a href="/login">Перейти</a></Button>
                                    </Card.Body>
                                </Card>
                        </div>
                    )
            }
            {show_admin && show_page ? (
                <div style={{'display': 'flex', 'flexDirection': 'row', 'margin': 'auto', 'width': '30%'}}
                     className={"mt-0, ms-1, px-2, p-3"}>
                    <a href="/dogs/admin/add_dogs">
                        <button type="button" className="btn btn-success add_button">
                            Добавить сведения о новой собаке
                        </button>
                    </a>
                    <a href="/dogs/admin/orders" style={{'paddingLeft': '3vw'}}>
                        <button type="button" className="btn btn-info add_button">
                            Посмотреть список заявок
                        </button>
                    </a>
                </div>
            ) : null}
                </div>

    );
}

export default Dogs;