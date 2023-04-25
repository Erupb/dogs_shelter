import React, { useState } from 'react';
import axios from "axios";

function Login() {
    /*const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /!*var details = {
        'username': username,
        'password': password,
    };*!/
    var requestData = new URLSearchParams();
    requestData.append('username', username);
    requestData.append('password', password);

    /!*const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');*!/
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
            /!*body: JSON.stringify({ username, password })*!/
            /!*body: {username, password}*!/
            body: requestData
        });
        const data = await response.json();

        console.log(data);

    };

    if (username) {
        return <div>{username} is loggged in</div>;
    }

    return (
        <form/!* onSubmit={handleSubmit}*!/>
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
    );*/
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState()

    var requestData = new URLSearchParams();
    requestData.append('username', username);
    requestData.append('password', password);

    const login = async (event) => {
        event.preventDefault();


        const response = await fetch('http://localhost:8084/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',

            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();

        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
    };

    function getCurrentUser() {
        return JSON.parse(localStorage.getItem('username'));
    }

    /*const handleSubmit = async e => {
        e.preventDefault();
        const user = {username, password};
        // send the username and password to the server
        const response = await axios.post(
            "http://localhost:8084/auth/login",
            user
        );
        // set the state of the user
        setUser(response.data)
        // store the user in localStorage
        localStorage.setItem('user', response.data)
        console.log(response.data)
    };*/

// if there's a user show the message below
    if (user) {
        return <div>{user.name} is loggged in</div>;
    }

    // if there's no user, show the login form
    return (
        <form onSubmit={login}>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                value={username}
                placeholder="enter a username"
                onChange={({target}) => setUsername(target.value)}
            />
            <div>
                <label htmlFor="password">password: </label>
                <input
                    type="password"
                    value={password}
                    placeholder="enter a password"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;