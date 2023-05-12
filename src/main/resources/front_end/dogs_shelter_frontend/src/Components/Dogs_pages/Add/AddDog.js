import React, {useState} from "react";
import '../../../Style/style.css'

function AddDog() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const ordered = false;

    const addDog = async (event) => {
        // Если данные введены верно, можно отправлять запрос на сервер
        validateForm()

        event.preventDefault();
        let token;
        token = getTokenFromStorage();

        const response = await fetch('http://89.108.76.130:8084/dogs/admin/add_dogs', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://89.108.76.130:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify({breed, img, name, age, gender, description, ordered})
        });
        let admin_added_dog = document.getElementById("admin_added_dog");

        if (response.ok) {
            admin_added_dog.style.visibility = "visible";
        }
        /*console.log(username, password, phone_number);
        const data = await response.json();

        console.log(data);*/
    };

    function getTokenFromStorage(){
        return localStorage.getItem('token');
    }

    function validateForm() {
        let validation_text_name = document.getElementById("validation_text_name");
        let validation_text_gender = document.getElementById("validation_text_gender");
        let validation_text_age = document.getElementById("validation_text_age");
        let validation_text_breed = document.getElementById("validation_text_breed");
        let validation_text_img = document.getElementById("validation_text_img");

        let name = document.getElementById("name").value;
        if(name == ""){
            validation_text_name.innerHTML = "Кличка не может быть пустой";
        } else {
            validation_text_name.innerHTML = "";
        }

        let gender = document.getElementById("gender").value;
        if(gender == ""){
            validation_text_gender.innerHTML = "Пол не может быть пустым";
        }
        else if(gender !== "Мальчик" && gender !== "Девочка"){
            validation_text_gender.innerHTML = "Пол может содержать только 7 символов согласно формату {Мальчик, Девочка}";
        } else validation_text_gender.innerHTML = "";

        let age = document.getElementById("age").value;
        if(age == ""){
            validation_text_age.innerHTML = "Возраст не может быть пустым";
        } else if(!(/^\d+$/.test(age))){
            validation_text_age.innerHTML = "Возраст может содержать только цифры";
        }
        else {
            validation_text_age.innerHTML = "";
        }

        let breed = document.getElementById("breed").value;
        if(breed == ""){
            validation_text_breed.innerHTML = "Порода не может быть пустой";
        } else {
            validation_text_breed.innerHTML = "";
        }

        let img = document.getElementById("img").value;
        if(img == ""){
            validation_text_img.innerHTML = "Ссылка не может быть пустой";
        } else {
            validation_text_img.innerHTML = "";
        }

        if((validation_text_name == "") && (validation_text_gender == "") && (validation_text_age == "") && (validation_text_breed == "") && (validation_text_img == "")){
            return true;
        }else return false;
    }

    return (
        <form onSubmit={addDog} className="auth">
            <label className="required">
                Кличка:
            </label>
            <input className="form-control" type="text" value={name} id="name" onChange={(e) => setName(e.target.value)}/>

            <label className="required" style={{ "marginTop": "1vw" }} >
                Пол:
            </label>
            <input className="form-control" type="text" value={gender} id="gender" onChange={(e) => setGender(e.target.value)}/>

            <label className="required" style={{ "marginTop": "1vw" }} >
                Возраст:
            </label>
            <input className="form-control" type="text" value={age} id="age" onChange={(e) => setAge(e.target.value)} />

            <label className="required" style={{ "marginTop": "1vw" }} >
                Порода:
            </label>
            <input className="form-control" type="text" value={breed} id="breed" onChange={(e) => setBreed(e.target.value)} />

            <label style={{ "marginTop": "1vw" }} >
                Описание:
            </label>
            <input className="form-control" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

            <label className="required" style={{ "marginTop": "1vw" }} >
                Картинка:
            </label>
            <input className="form-control" type="text" value={img} id="img" onChange={(e) => setImg(e.target.value)} />

            <button type="submit" className="btn btn-primary" style={{ "marginTop": "1vw" }} >Добавить собаку</button>
            <div id="admin_added_dog" style={{ "visibility": "hidden"}}>
                <h3 style={{ "width" : "50%", "margin": "auto" }}>Вы успешно добавили собаку</h3>
            </div>

            <h3 id={"validation_text_name"}></h3>
            <h3 id={"validation_text_gender"}></h3>
            <h3 id={"validation_text_age"}></h3>
            <h3 id={"validation_text_breed"}></h3>
            <h3 id={"validation_text_img"}></h3>
            <h2 id={"validation_text"}></h2>
        </form>
    );
}

export default AddDog;