import React, {useState} from "react";

function AddDog() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [breed, setBreed] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('');
    const ordered = false;

    const addDog = async (event) => {
        event.preventDefault();
        let token;
        token = getTokenFromStorage();

        const response = await fetch('http://localhost:8084/dogs/admin/add_dogs', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:8084',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `Bearer ${token}`

            },
            body: JSON.stringify({ breed, img, name, age, description, ordered })
        });
        let admin_added_dog = document.getElementById("admin_added_dog");

        if(response.ok){
            admin_added_dog.style.visibility = "visible";
        }
        /*console.log(username, password, phone_number);
        const data = await response.json();

        console.log(data);*/
    };

    function getTokenFromStorage(){
        return localStorage.getItem('token');
    }

    return (
        <form/* onSubmit={handleSubmit}*/>
            <label>
                Кличка:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <br/>
            <label>
                Возраст:
                <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <br/>
            <label>
                Порода:
                <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} />
            </label>
            <br/>
            <label>
                Описание:
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br/>
            <label>
                Картинка:
                <input type="text" value={img} onChange={(e) => setImg(e.target.value)} />
            </label>
            <br/>
            <button onClick={addDog} type="submit">Добавить собаку</button>
            <div id="admin_added_dog" style={{ "visibility": "hidden"}}>
                <h3 style={{ "width" : "50%", "margin": "auto" }}>Вы успешно добавили собаку</h3>
            </div>
        </form>
    );
}

export default AddDog;