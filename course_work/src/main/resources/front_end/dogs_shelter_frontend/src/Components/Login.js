import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /*var details = {
        'username': username,
        'password': password,
    };*/
    var requestData = new URLSearchParams();
    requestData.append('username', username);
    requestData.append('password', password);

    /*const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');*/
    const login = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8084/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': 'http://localhost:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',

            },
            /*body: JSON.stringify({ username, password })*/
            /*body: {username, password}*/
            body: requestData
        });
        const data = await response.json();

        console.log(data);
    };

    return (
        <form/* onSubmit={handleSubmit}*/>
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
            <button onClick={login} type="submit">Войти</button>
            <a href="/registration">Еще не зарегистрированы?</a>
        </form>
    );
}

export default Login;