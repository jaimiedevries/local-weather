let toggleButtons = document.getElementById('toggle-btns');
let locationButton = document.getElementById('locationBtn');
let locationString = document.getElementById("location");
let celsius;
let fahrenheit;
function locatieOntvangen(position) {
    const breedteGraad = position.coords.latitude;
    const lengteGraad = position.coords.longitude;
    const api_url = `https://fcc-weather-api.glitch.me/api/current?lat=${breedteGraad}&lon=${lengteGraad}`;
    async function ontvangLokaleWeerGegevens() {
        const response = await fetch(api_url);
        const weerData = await response.json();
        toonLokaleWeerGegevens(weerData);
    }
    ontvangLokaleWeerGegevens();
}
function toonLokaleWeerGegevens(data) {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("weather-description");
    celsius = Math.round(data.main.temp);
    fahrenheit = Math.trunc(celsius * 1.8 + 32);
    temperature.textContent = celsius + "℃";
    description.textContent = data.weather[0].description;
    locationString.textContent = data.name + ", " + data.sys.country;
    toggleButtons.style.display = "flex";
    // Wanneer het warmer is dan 16 graden celsius dan tonen we een 'hot' theme en anders 'cold'
    if (celsius >= 16) document.documentElement.setAttribute('data-theme', 'hot');
    else document.documentElement.setAttribute('data-theme', 'cold');
    toggleButtons.addEventListener('click', toggleTemperatuurSchaal);
}
function toggleTemperatuurSchaal(e) {
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
function locatieOphalen() {
    function locatieNietOntvangen() {
        locationString.textContent = "Kan je locatie niet ophalen";
    }
    if (!navigator.geolocation) locationString.textContent = "Geolocation wordt niet door je browser ondersteund";
    else {
        locationString.textContent = "Locatie ophalen...";
        navigator.geolocation.getCurrentPosition(locatieOntvangen, locatieNietOntvangen);
    }
}
locationButton.addEventListener('click', locatieOphalen); // Code over toggle buttons 
 /* function toggleScaleToFahrenheit(){
  const btn = document.getElementById('btn-fahrenheit');
  const btnc = document.getElementById('btn-celsius');
  if (!btn.classList.contains('active')){
    btn.classList.add('active');
    btnc.classList.remove('active');
    temperature.textContent = fahrenheit + '℉';
  }
}

function toggleScaleToCelsius(){
  const btn = document.getElementById('btn-celsius');
  const btnf = document.getElementById('btn-fahrenheit');
  if (!btn.classList.contains('active')){
    btn.classList.add('active');
    btnf.classList.remove('active');
    temperature.textContent = celsius + '℃';
    
  }
} */ 

//# sourceMappingURL=index.8f0c9192.js.map
