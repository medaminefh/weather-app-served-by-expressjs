// import Api Key
import  { apiKey }  from "./keys.js"



const convertSecondsToTime = (seconds) => new Date(seconds * 1000).toLocaleTimeString()

const main = document.querySelector("#main")
const extraInfo = document.querySelector("#extraInfo")
const times = document.querySelector("#times")

// options when trying to get the coords
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
};


// Try to Get the Coordinations
navigator.geolocation.getCurrentPosition(
    (result) => {
        
        // Floor the numbers
        const latitude =  Math.floor(result.coords.latitude);
        const longitude =  Math.floor(result.coords.longitude);
        const url =
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          //Fetching and doing the work
    fetch(url).then(res => res.json()).then(res => {
        console.log(res)
        const weather = res.weather[0]
        const mainTemp = res.main

        // get the Image
        const icon = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const img = document.createElement("img")
        h3.textContent = weather.description
        img.src = icon
        img.className = 'w-28 h-28'
        p.textContent = mainTemp.temp +' C°'
        h3.className = "text-3xl font-bold capitalize";
        p.className = 'text-2xl font-bold'
        main.appendChild(img)
        main.appendChild(h3)
        main.appendChild(p)

        // CITY Name and Country (Inaccurate)
        main.innerHTML += `<p class="text-4xl capital"> ${res.name}, ${res.sys.country} </p>`

        // Max Temp
        extraInfo.innerHTML = `<button class="bg-white text-blue-400	border border-blue-400 pointer-events-none py-4 rounded-lg px-5">MAX: ${mainTemp.temp_max} C°</button>`

        // Min Temp
        extraInfo.innerHTML += `<button class="bg-white text-blue-400	border border-blue-400 pointer-events-none py-4 rounded-lg px-5">MIN: ${mainTemp.temp_min} C° </button>`

        // Humidity
        extraInfo.innerHTML += `<button class="bg-white text-blue-400	border border-blue-400 pointer-events-none py-4 rounded-lg px-5">HUMIDITY: ${mainTemp.humidity} %</button>`

        // Wind Speed
        extraInfo.innerHTML += `<button class="bg-white text-blue-400	border border-blue-400 pointer-events-none py-4 rounded-lg px-5">WIND: ${res.wind.speed} Km/h</button>`

        // Sunrise
        times.innerHTML = `<button class="bg-blue-400 text-white border border-white pointer-events-none py-4 rounded-lg px-5">SUNRISE: ${convertSecondsToTime(res.sys?.sunrise)}</button>`

        // Sunset
        times.innerHTML += `<button class="bg-blue-400 text-white border border-white pointer-events-none py-4 rounded-lg px-5">SUNSET: ${convertSecondsToTime(res.sys?.sunset)}</button>`

    })
    // Catch the error of Fetching the data
    .catch(err => {
        console.log("Error",err)
    })
  },
  // Catch the error while trying to get the Coordinations
  (error) => console.log("Error", error),
  options
);
