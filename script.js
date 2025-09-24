
const apiKey = "4bfbb44cb6f75d9d44c221b485446d25";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button"); /*when people click the search button, 
it will send the city information */
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city){
    const response = await fetch(apiUrl + city + '&APPID=' + apiKey + '&units=metric' );
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
        var data = await response.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    } else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/main5.png"
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png"
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/mist.png"
    }
    


    

    document.querySelector(".weather").style.display = "block"
    document.querySelector(".error").style.display = "none";
    }
}
searchBtn. addEventListener("click", ()=>{
    checkWeather(searchBox.value); /*will give city name*/
    
    
});


async function getAverageResponseTime(apiUrl, numRequests) {
    let totalResponseTime = 0;
    for (let i = 0; i < numRequests; i++) {
        const startTime = performance.now();
        await fetch(apiUrl); // Adjust the API endpoint here
        const endTime = performance.now();
        totalResponseTime += (endTime - startTime);
    }
    const averageResponseTime = totalResponseTime / numRequests;
    return averageResponseTime.toFixed(3); // Round to 3 decimal places
}

searchBtn.addEventListener("click", async () => {
    const city = searchBox.value;
    checkWeather(city); // Fetch weather data

    // Now measure API response time
    const numRequests = 10; // Number of requests for calculating average response time
    const averageResponseTime = await getAverageResponseTime(apiUrl + city + '&APPID=' + apiKey + '&units=metric', numRequests);
    document.getElementById('averageResponseTime').innerText = `The Average API Response TIme: ${averageResponseTime} milliseconds`;
});
