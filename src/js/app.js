let toggleButtons = document.getElementById('toggle-btns');
let locationButton = document.getElementById('locationBtn');
let locationString = document.getElementById("location");

let celsius;
let fahrenheit;

locationButton.addEventListener('click', locatieOphalen);
//   Bij een klik op de container van de toggle buttons wordt de toggleTemperatuurSchaal getriggerd.
toggleButtons.addEventListener('click', toggleTemperatuurSchaal);

/* Bij een klik op de 'locatie' knop start geolocation met draaien, wanneer er een locatie is gevonden 
pakken we de breedtegraad en lengtegraad en zetten ze in de API url. Hierdoor krijgen we weergegevens uit de locatie
om weerdata te tonen op de pagina zetten we toonLokaleWeerGegevens in nadat we de data hebben ontvangen.  */
function locatieOphalen() {
  if (!navigator.geolocation) {
    locationString.textContent = "Geolocation wordt niet door je browser ondersteund";
  } else {
    locationString.textContent = "Locatie ophalen...";
    navigator.geolocation.getCurrentPosition(
      locatieOntvangen,
      locatieNietOntvangen
    );
  }
}

function locatieNietOntvangen() {
  locationString.textContent = "Kan je locatie niet ophalen";
}

function locatieOntvangen(coordinaten) {
  const breedteGraad = coordinaten.coords.latitude;
  const lengteGraad = coordinaten.coords.longitude;
  const api_url = `https://fcc-weather-api.glitch.me/api/current?lat=${breedteGraad}&lon=${lengteGraad}`;
  ontvangLokaleWeerGegevens(api_url);
}

async function ontvangLokaleWeerGegevens(data) {
  const response = await fetch(data);
  const weerData = await response.json();
  toonLokaleWeerGegevens(weerData);
}
// Functie die weerdata vanuit de locatieOntvangen functie plaatst op de webpagina.
function toonLokaleWeerGegevens(weerData) {
  plaatsDataInHTML(weerData);
  toggleBackgroundThema();
  // De togglebuttons om te switchen van celsius naar fahrenheit is beschikbaar nadat alle data op de pagina is getoond.
  toggleButtons.style.display = "flex";
}

function plaatsDataInHTML(data) {
  let temperature = document.getElementById("temperature");
  let description = document.getElementById("weather-description");

  celsius = Math.round(data.main.temp);
  fahrenheit = Math.trunc(celsius * 1.8 + 32);

  temperature.textContent = celsius + "℃";
  description.textContent = data.weather[0].description
  locationString.textContent = data.name + ", " + data.sys.country;
}

/*  Wanneer het warmer is dan 16 graden celsius dan tonen we een 'hot' theme en anders 'cold'
  middels de data attribute op de HTML pagina. */
  function toggleBackgroundThema() {
    if (celsius >= 16) {
      setThema('hot');
    } else {
      setThema('cold');
    }
  }

/* Bekijkt of de click heeft plaatsgevonden op een element zonder de class 'active' én welke id het bevat.
Wanneer dit waar is krijgt het element waar op is geklikt de class 'active' en wordt de class 'active' van een vorige of
volgende element in de parent verwijderd. */
function toggleTemperatuurSchaal(event) {
  if (event.target.classList[1] !== 'active' && event.target.id === 'btn-celsius') {
    event.target.classList.add('active');
    temperature.textContent = celsius + '℃';
    event.target.nextElementSibling.classList.remove('active');
  } else if (event.target.classList[1] !== 'active' && event.target.id === 'btn-fahrenheit') {
    event.target.classList.add('active');
    temperature.textContent = fahrenheit + '℉';
    event.target.previousElementSibling.classList.remove('active');
  }
}

function setThema (themaNaam) {
  document.documentElement.setAttribute('data-theme', themaNaam);
}