import React, { useState } from 'react';
import alert from "bootstrap/js/src/alert.js";

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
        validateForm();
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

        let validation_text = document.getElementById("validation_text");
        const status = response.status;
        if(status == 401){
            validation_text.innerHTML = "Введены неверные данные для входа";
        } else if(status == 500){
            validation_text.innerHTML = "Сервер не ответил на ваш запрос";
        }
        const data = await response.json();

        /*const response_info = response;
        let validation_text = document.getElementById("validation_text");
        let response_data = (await response_info.text()).split("[[")[0];
        if(response_data == "Bad credentials"){
            validation_text.innerHTML = "Введены неверные данные для авторизации";
        }
        else {
            const data = await response_info.json();
            console.log(data);
*/

        localStorage.setItem('username', data.username);
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
        if (response.ok) {
            window.location.href = "/"
        }


    };

    function getCurrentUser() {
        return localStorage.getItem('username');
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
    if (getCurrentUser()) {
        let user_login = getCurrentUser();
        return <div>
            <p>{user_login}, you are ready loggged in!</p>
            <button onClick={ ()=>{
                localStorage.clear();
                window.location.reload();
            }}>Сменить пользователя</button>
        </div>;
    }

    function validateForm() {
        let validation_text_login = document.getElementById("validation_text_login");
        let validation_text_pass = document.getElementById("validation_text_pass");

        let uname = document.getElementById("uname").value;
        if(uname == ""){
            validation_text_login.innerHTML = "Логин не может быть пустым";
        }
        else {
            validation_text_login.innerHTML = "";
        }

        let passwd = document.getElementById("passwd").value;
        if(passwd == ""){
            validation_text_pass.innerHTML = "Пароль не может быть пустым";
        }
        else if(!(/[A-Z]/.test(passwd))){
            validation_text_pass.innerHTML = "Пароль должен содержать хотя бы одну заглавную букву";
        }
        else if(!(/\d/.test(passwd))){
            validation_text_pass.innerHTML = "Пароль должен содержать хотя бы одну заглавную цифру";
        } else validation_text_pass.innerHTML = "";
    }

    // if there's no user, show the login form
    return (
        <form onSubmit={login}>
            <label htmlFor="username">Username: </label>
            <input
                type="text"
                id={"uname"}
                value={username}
                placeholder="Введите логин"
                onChange={({target}) => setUsername(target.value)}
            />
            <div>
                <label htmlFor="password">password: </label>
                <input
                    type="password"
                    id={"passwd"}
                    value={password}
                    placeholder="Введите пароль"
                    onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <a href="/register">Еще не зарегистрированы?</a>
            {/* onClick={()=>{window.location.reload();}}*/}
            <h3 id={"validation_text_login"}></h3>
            <h3 id={"validation_text_pass"}></h3>
            <h3 id={"validation_text"}></h3>
        </form>

    );
}

export default Login;