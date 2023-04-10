import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8084/registration', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*',

            },
            body: JSON.stringify({ username, password, phone_number })
        });
        /*console.log(username, password, phone_number);*/
        const data = await response.json();

        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Логин:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
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
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}

export default Login;