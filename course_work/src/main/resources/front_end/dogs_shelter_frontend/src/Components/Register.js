import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const register = async (event) => {
        event.preventDefault();


        const response = await fetch('http://localhost:8084/auth/register', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',

            },
            body: JSON.stringify({ username, password, phone_number })
        });
        console.log(username, password, phone_number);
        const data = await response.json();
        
        console.log(data);
    };
    /*async function register(){
        console.log(username, password, phone_number);
        let item={username, password, phone_number};
        let result = await fetch("http://localhost:8084/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, phone_number })
        });
        console.log(username, password, phone_number);
        const data = await result.json();

        console.log(data);
    }*/

    return (
        <form/* onSubmit={handleSubmit}*/>
            <label>
                Логин:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <br/>
            <label>
                Пароль:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br/>
            <label>
                Номер телефона:
                <input type="text" value={[phone_number]} onChange={(e) => setPhone_number(e.target.value)} />
            </label>
            <br/>
            <button onClick={register} type="submit">Зарегистрироваться</button>
            <a href="/login">Уже зарегистрированы?</a>
        </form>
    );
}

export default Register;