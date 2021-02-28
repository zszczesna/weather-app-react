import React, { useState } from "react";
import "./Weather.css";
import axios from "axios";
export default function Weather() {
  let weatherData = {
    city: "New York",
    date: "Tuesday, 10:00",
    day: "22/05",
  };

  const [temperature, setTemperature] = useState(null);
  const [city, setCity] = useState(weatherData.city);
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});

   function displayWeather(response) {
    setLoaded(true);
    
    setWeather({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${
        response.data.weather[0].icon
      }@2x.png`,
      description: response.data.weather[0].description
    });

  }

      

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "094780c710fa4efd669f0df8c3991927";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function updateCity(event) {
    setCity(event.target.value.trim());
  }

  function fahrenheit(event) {
    event.preventDefault();
    let fahrenheitValue = Math.round((weather.temperature * 9) / 5 + 32);
    setTemperature(fahrenheitValue);
  }

  function celsius(event) {
    event.preventDefault();
    setTemperature(Math.round(weather.temperature));
  }

 
  
  if(loaded){

  return (
    <div className="Weather">
        <div className="weather-app">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="City search"
          onChange={updateCity}
          autoFocus="on"
          autoComplete="off"
          className="form-control form-control-sm shadow-sm"
        />

        <input type="submit" value="🔍" className="btn btn-light shadow-sm" />
        <button className="btn btn-info shadow-sm"> Current Location </button>
      </form>

      <h1>{weather.city}</h1>

      <ul>
        <li className="description">{weather.description}</li>

        <li>
          {" "}
          <span className="temperature">{Math.round(weather.temperature)}</span>{" "}
          <span className="units">
            <a href="#"  onClick={celsius}>
              °C
            </a>{" "}
            |{" "}
            <a href="#" onClick={fahrenheit}>
              °F
            </a>{" "}
          </span>{" "}
        </li>

        <li>
          <img
            src={weather.icon}
            alt={weather.description}
            className="weatherIcon"
          />
        </li>

        <li className="date-now">{weatherData.day}</li>

        <li>
          {" "}
          <i className="fas fa-water"></i>
          <span className="humidity"> {weather.humidity}%</span>
        </li>

        <li>
          <i className="fas fa-wind"></i>{" "}
          <span className="wind-speed"> {weather.wind}km/h</span>{" "}
        </li>

        <li className="current-time">{weatherData.date}</li>
      </ul>
      </div>
      <small>This project was coded by <a href="mailto:szczesna.zuzia@gmail.com" target="_blank"> Zuzanna Szczęsna </a>and is
    <a href="https://github.com/zszczesna/my-weather-app" target="_blank"> open-sourced on GitHub</a>
   {" "} and <a href="https://www.netlify.com/" target="_blank">{" "}hosted on Netlify</a></small>
    </div>
  );
  }
  else{
        return (
    <div className="Weather">
        <div className="weather-app">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="City search"
          onChange={updateCity}
          autoFocus="on"
          autoComplete="off"
          className="form-control form-control-sm shadow-sm"
        />

        <input type="submit" value="🔍" className="btn btn-light shadow-sm" />
        <button className="btn btn-info shadow-sm"> Current Location </button>
      </form>
      
      </div>
       <small>This project was coded by <a href="mailto:szczesna.zuzia@gmail.com" target="_blank"> Zuzanna Szczęsna </a>and is
    <a href="https://github.com/zszczesna/my-weather-app" target="_blank"> open-sourced on GitHub</a>
   {" "} and <a href="https://www.netlify.com/" target="_blank">{" "}hosted on Netlify</a></small>
      </div>
);
  }
}