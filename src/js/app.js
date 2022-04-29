let locationStringElement = document.getElementById("location");
let temperatureElement = document.getElementById("temperature");

// Bij een klik op de container van de toggle buttons wordt de toggleTemperatuurSchaal getriggerd.
let toggleButtons = document.getElementById('toggle-btns');
toggleButtons.addEventListener('click', toggleTemperatuurSchaal);

let locationButton = document.getElementById('location-btn');
locationButton.addEventListener('click', locatieOphalen);

let celsius;
let fahrenheit;

/**
 *  Bij een klik op de 'locatie' knop start geolocation met draaien, wanneer er een locatie is gevonden 
 * pakken we de breedtegraad en lengtegraad en zetten ze in de API url. Hierdoor krijgen we weergegevens uit de locatie
 * om weerdata te tonen op de pagina zetten we toonLokaleWeerGegevens in nadat we de data hebben ontvangen.
 */
function locatieOphalen() {
  if (!navigator.geolocation) {
    locationStringElement.textContent = "Geolocation wordt niet door je browser ondersteund";
    return;
  }

  locationStringElement.textContent = "Locatie ophalen...";
  navigator.geolocation.getCurrentPosition(
    onLocatieOntvangen,
    () => locationStringElement.textContent = "Kan je locatie niet ophalen"
  );
}

async function onLocatieOntvangen(position) {
  const weerData = await vraagWeerOp(position.coords);
  celsius = Math.round(weerData.main.temp);
  fahrenheit = Math.trunc(celsius * 1.8 + 32);
  toonLokaleWeerGegevens(weerData);
}

async function vraagWeerOp(coords) {
  const response = await fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${coords.latitude}&lon=${coords.longitude}`);
  const weerData = await response.json();
  return weerData;
}

function toonLokaleWeerGegevens(weerData) {
  let description = document.getElementById("weather-description");
  temperatureElement.textContent = `${celsius} ℃`;
  description.textContent = weerData.weather[0].description
  locationStringElement.textContent =  `${weerData.naam}, ${weerData.sys.country}`;
  
  setThema(celsius >= 16 ? 'hot' : 'cold');

  // De togglebuttons om te switchen van celsius naar fahrenheit is beschikbaar nadat alle data op de pagina is getoond.
  toggleButtons.style.display = "flex";
}

/**
 * Bekijkt of de click heeft plaatsgevonden op een element zonder de class 'active' én welke id het bevat.
 * Wanneer dit waar is krijgt het element waar op is geklikt de class 'active' en wordt de class 'active' van een vorige of
 * volgende element in de parent verwijderd
 */
function toggleTemperatuurSchaal(event) {
  const isNotActive = event.target.classList[1] !== 'active';
  if (event.target.id === 'btn-celsius' && isNotActive) {
    updateActiveState(event.target, `${celsius} ℃`, event.target.nextElementSibling);
  } else if (event.target.id === 'btn-fahrenheit' && isNotActive) {
    updateActiveState(event.target, `${fahrenheit} ℉`, event.target.previousElementSibling);
  }
}

function updateActiveState(target, weerOmschrijving, huidigActieveElement) {
  target.classList.add('active');
  temperatureElement.textContent = weerOmschrijving;
  huidigActieveElement.classList.remove('active');
}

function setThema(themaNaam) {
  document.documentElement.setAttribute('data-theme', themaNaam);
}