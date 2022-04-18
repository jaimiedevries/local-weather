let toggleButtons = document.getElementById('toggle-btns');
let locationButton = document.getElementById('locationBtn');
let locationString = document.getElementById("location");
let celsius;
let fahrenheit;
// Functie die weerdata vanuit de locatieOntvangen functie plaatst op de webpagina.
function toonLokaleWeerGegevens(data) {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("weather-description");
    celsius = Math.round(data.main.temp);
    fahrenheit = Math.trunc(celsius * 1.8 + 32);
    temperature.textContent = celsius + "℃";
    description.textContent = data.weather[0].description;
    locationString.textContent = data.name + ", " + data.sys.country;
    // De togglebuttons om te switchen van celsius naar fahrenheit is beschikbaar nadat alle data op de pagina is getoond.
    toggleButtons.style.display = "flex";
    /*  Wanneer het warmer is dan 16 graden celsius dan tonen we een 'hot' theme en anders 'cold'
  middels de data attribute op de HTML pagina. */ if (celsius >= 16) document.documentElement.setAttribute('data-theme', 'hot');
    else document.documentElement.setAttribute('data-theme', 'cold');
    //   Bij een klik op de container van de toggle buttons wordt de toggleTemperatuurSchaal getriggerd.
    toggleButtons.addEventListener('click', toggleTemperatuurSchaal);
}
/* Bekijkt of de click heeft plaatsgevonden op een element zonder de class 'active' én welke id het bevat.
Wanneer dit waar is krijgt het element waar op is geklikt de class 'active' en wordt de class 'active' van een vorige of
volgende element in de parent verwijderd. */ function toggleTemperatuurSchaal(e) {
    if (e.target.classList[1] !== 'active' && e.target.id === 'btn-celsius') {
        e.target.classList.add('active');
        temperature.textContent = celsius + '℃';
        e.target.nextElementSibling.classList.remove('active');
    } else if (e.target.classList[1] !== 'active' && e.target.id === 'btn-fahrenheit') {
        e.target.classList.add('active');
        temperature.textContent = fahrenheit + '℉';
        e.target.previousElementSibling.classList.remove('active');
    }
}
/* 
Bij een klik op de 'locatie' knop start geolocation met draaien, wanneer er een locatie is gevonden 
pakken we de breedtegraad en lengtegraad en zetten ze in de API url. Hierdoor krijgen we weergegevens uit de locatie
om weerdata te tonen op de pagina zetten we toonLokaleWeerGegevens in nadat we de data hebben ontvangen.  */ function locatieOphalen() {
    function locatieNietOntvangen() {
        locationString.textContent = "Kan je locatie niet ophalen";
    }
    function locatieOntvangen(locatie) {
        const breedteGraad = locatie.coords.latitude;
        const lengteGraad = locatie.coords.longitude;
        const api_url = `https://fcc-weather-api.glitch.me/api/current?lat=${breedteGraad}&lon=${lengteGraad}`;
        async function ontvangLokaleWeerGegevens() {
            const response = await fetch(api_url);
            const weerData = await response.json();
            toonLokaleWeerGegevens(weerData);
        }
        ontvangLokaleWeerGegevens();
    }
    if (!navigator.geolocation) locationString.textContent = "Geolocation wordt niet door je browser ondersteund";
    else {
        locationString.textContent = "Locatie ophalen...";
        navigator.geolocation.getCurrentPosition(locatieOntvangen, locatieNietOntvangen);
    }
}
locationButton.addEventListener('click', locatieOphalen);

//# sourceMappingURL=index.8f0c9192.js.map
