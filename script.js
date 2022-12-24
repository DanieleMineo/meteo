// Recupero dalla pagina gli elementi che mi servono 
const weatherIcon = document.querySelector('.weather-icon');
const weatherLocation = document.querySelector('.weather-location');
const weatherTemperature = document.querySelector('.weather-temperature');
const suggestionParagraph = document.querySelector('.suggestion');

const rootElement = document.documentElement; // si accede al tag html (root)

// cercare di recuperare la geolocalizzazione tramite API

window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

// Funzione da eseguire in caso di errore
function onError(error){
    console.error(error)
    weatherLocation.innerHTML = 'Attiva la geolocalizzazione'
}

// Funzione da eseguire in caso di successo
function onSuccess(position){
    console.log(position);

    //Prepariamo i dati per l'API
    const apiKey = "c1c3cb1d933ea39b3592cfbc2030938d";
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const units = 'metric';
    const language = 'it';
    const endPoint = 'https://api.openweathermap.org/data/2.5/weather'

    const apiUri = `${endPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=${language}&units=${units}`
    
    //chiamiamo il nostro servizio esterno
    fetch(apiUri).
        then(function(response){
            // trasformo la risposta in un formato più leggibile
            const data = response.json();
            return data;
         })
        .then(function(data){
            console.log(data);

            //Estrapoliamo le informazioni necessarie

            const location = data.name;
            const temperature = Math.floor(data.main.temp)+'°';
            const iconCode = data.weather[0].icon;
            const description = data.weather[0].description;

            //Prepariamo il consiglio da fornire
            const suggestion = getSuggestion(iconCode);
            
            //Inserisco i dati dove voglio mostrarli 
            weatherLocation.innerHTML = location;
            weatherTemperature.innerHTML = temperature;
            weatherIcon.alt = description;
            weatherIcon.src = `images/${iconCode}.png`;
            suggestionParagraph.innerHTML = getSuggestion(iconCode);

            // Rimuovo classe JS loading
            rootElement.classList.remove('js-loading');
         });
}

//Funzione per recuperare il condiglio giusto

function getSuggestion (key){
    const suggestions = {
        '01d' : 'Ricordati la crema solare!',
        '01n' : 'Buonanotte!',
        '02d' : 'Oggi il sole va e viene...',
        '02n' : 'Attenti ai lupi mannari...',
        '03d' : 'Luce perfetta per fare foto!',
        '03n' : 'Domri sereno :)',
        '04d' : 'Che cielo grigio :(',
        '04n' : 'Non si vede nemmeno la luna!',
        '09d' : 'Prendi l\'ombrello',
        '09n' : 'Copriti bene!',
        '10d' : 'Prendi l\'ombrello',
        '10n' : 'Copriti bene!',
        '11d' : 'Attento ai fulmini!',
        '11n' : 'I lampi accendono la notte!',
        '13d' : 'Esci a fsre un pupazzo di neve!',
        '13n' : 'Notte perfetta per stare sotto al piumone',
        '50d' : 'Accendi i fendinebbia!',
        '50n' : 'Guida con prudenza!',
    }

    return suggestions[key];

}

