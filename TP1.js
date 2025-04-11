function clickbutton(event) {
    event.preventDefault();

    const city = document.getElementById("cityinput").value.trim();
    const mydiv = document.getElementById("weatherinfo");

    if (!city) {
        mydiv.innerHTML = "<p style='color:white;'>Veuillez entrer une ville.</p>";
        return;
    }

    // Appel API météo
    getWeather(city);

    // Enregistrement dans les favoris
    fetch('http://localhost:3000/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city })
    })
    .then(res => res.json())
    .then(data => console.log("Favoris :", data.message))
    .catch(err => console.error("Erreur ajout favoris:", err));
}

document.getElementById("cityform").addEventListener("submit",event => clickbutton(event));



function getWeather(city) {
    
    const apiKey = 'a2e8ba03ccb241da8ff145339231312'; // Remplacez par votre propre clé API
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error);
        });
}
    

function displayError(error){

}

function displayWeather(data){
    console.log(data);
    const mydiv = document.getElementById("weatherinfo");
    mydiv.innerHTML = data.location.country;
    const newBlock = document.createElement("p");
    newBlock.innerHTML= data.location.temp_c;
    mydiv.appendChild(newBlock);
}

document.getElementById("cityform").addEventListener("submit",event=> clickbutton(event))
