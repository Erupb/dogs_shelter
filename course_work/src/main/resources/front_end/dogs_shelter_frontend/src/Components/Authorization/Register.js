import React, { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone_number, setPhone_number] = useState('');

    const register = async (event) => {
        validateForm();
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
        let validation_text = document.getElementById("validation_text");
        const status = response.status;
        if(status == 409){
            validation_text.innerHTML = "Ваши данные не соответствуют критериям";
        } else if(status == 500){
            validation_text.innerHTML = "Сервер не ответил на ваш запрос";
        }
        if (response.ok) {
            window.location.href = "/login"
        }
        /*const data = await response.json();
        
        console.log(data);*/
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

    function validateForm() {
        let validation_text_login = document.getElementById("validation_text_login");
        let validation_text_pass = document.getElementById("validation_text_pass");
        let validation_text_phone = document.getElementById("validation_text_phone");

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
            validation_text_pass.innerHTML = "Пароль должен содержать хотя бы одну цифру";
        }else if(passwd.length < 8){
            /*console.log(passwd.length);*/
            validation_text_pass.innerHTML = "Пароль должен содержать хотя бы 8 символов";
        }
        else validation_text_pass.innerHTML = "";

        let phone = document.getElementById("phone").value;
        if(phone == ""){
            validation_text_phone.innerHTML = "Номер телефона не может быть пустым";
        }
        else if(!(/\d{10}/.test(phone))){
            validation_text_phone.innerHTML = "Номер телефона должен содержать 10 цифр";
        } else validation_text_phone.innerHTML = "";
    }

    return (
        <form/* onSubmit={handleSubmit}*/>
            <label>
                Логин:
                <input id={"uname"} type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </label>
            <br/>
            <label>
                Пароль:
                <input id={"passwd"} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br/>
            <label>
                Номер телефона:
                <input id={"phone"} type="text" value={[phone_number]} onChange={(e) => setPhone_number(e.target.value)} />
            </label>
            <br/>
            <button onClick={register} type="submit">Зарегистрироваться</button>
            <a href="/login">Уже зарегистрированы?</a>
            <h3 id={"validation_text_login"}></h3>
            <h3 id={"validation_text_pass"}></h3>
            <h3 id={"validation_text_phone"}></h3>
            <h3 id={"validation_text"}></h3>
        </form>
    );
}

export default Register;