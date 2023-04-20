import React, { useState, useEffect } from 'react';

function Dogs() {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        const fetchDogs = async () => {
            const response = await fetch('http://localhost:8084/dogs', {method:"GET"});
            const data = await response.json();
            setDogs(data);
        };
        fetchDogs();
    }, []);

    return (
        <div>
            <h1>Список собак</h1>
            <ul>
                {dogs.map((dog) => (
                    <li key={dog.id}>{dog.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dogs;