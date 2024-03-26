import React, { useState } from "react";
import "./WeatherApp.css";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import humidity from "../Assets/humidity.png";
import rain from "../Assets/rain.png";
import Search from "../Assets/search.png";
import snow from "../Assets/snow.png";
import wind from "../Assets/wind.png";

const WeatherApp = () => {
  let api_key = "87d3668b649a9ce9a9299834e316f519";
  const [wicon, setWicon] = useState(cloud);
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https:api.openweathermap.org/data/2.5/weather?q=${element[0].value}&appid=${api_key}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-speed");
    const temprature = document.getElementsByClassName("weather_temp");
    const location = document.getElementsByClassName("weather_location");
    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
    temprature[0].innerHTML = Math.floor(data.main.temp)+ " °C";
    location[0].innerHTML = data.name;
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setWicon(clear);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setWicon(cloud);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setWicon(drizzle);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setWicon(drizzle);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setWicon(rain);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setWicon(rain);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setWicon(snow);
    } else {
      wicon(clear);
    }
  };
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-md-4 mx-auto p-2 bg-dark text-light">
          <div className="d-flex">
            <input
              type="text"
              className="form-control cityInput"
              placeholder="Select Your City"
            />
            <div
              className="search-icon bg-light p-2"
              onClick={() => {
                search();
              }}
            >
              <img src={Search} alt="" />
            </div>
          </div>
          <div className="">
            <img src={wicon} className="w-50" alt="" />
          </div>
          <div className="weather_temp fs-1">24 °c</div>
          <div className="weather_location fs-2">Dhaka</div>
          <div className="data-container d-flex">
            <div className="element">
              <img src={humidity} className="icon" alt="" />
              <div className="data">
                <div className="humidity-percent">64%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind} className="icon" alt="" />
              <div className="data">
                <div className="wind-speed">18 KM/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
