'use client';

import Head from "next/head";
import NextImage from "next/image";

// Imports for the app running
import { useState } from "react";
import {BsSearch} from "react-icons/bs";
import axios from "axios"; // For https requests

function Weather( {data} ) {
  console.log("inside component",data);
  return (
    <div className="relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-white z-[10]">
      {/* Top part */}
      <div className="relative flex justify-between pt-12">
          <div className="flex flex-col items-center">
            <NextImage src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="Weather Icon" width={100} height={100}/>
            <p className="text-2xl">{data.weather[0].description}</p>
          </div>
          <p className="text-9xl">{data.main.temp.toFixed(0)}&#176;</p>
      </div>
      {/* Bottom part */}
      <div className="relative bg-black/75 p-8 rounded-md mb-auto mt-auto">
        <p className="text-2xl text-center pb-6">Weather in {data.name}</p>
          <div className="flex justify-between">
            <div>
              <p className="text-xl">Feels Like</p>
              <p className="text-2xl font-bold">{data.main.feels_like.toFixed(0)}&#176;</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{data.main.humidity.toFixed(0)}%</p>
              <p className="text-xl">Humidity</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{data.wind.speed.toFixed(0)} MPH</p>
              <p className="text-xl">Winds</p>
            </div>
          </div>
      </div>
    </div>
  );

}

export default function Home() {

  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`; 
  // The process.env.NEXT_PUBLIC_WEATHER_KEY is the environment variable that we set in the .env.local file
  // states for the data and users

  const getWeather = (e) => { // e is event
    e.preventDefault();
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
      setCity("");
  };
  
  return (
    <div>
      <Head>
        <title>Weather - Next Appp</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Weather App</h1>

      {/* Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        </div>
      )}
      
      {/* Backgroung Image */}
      <NextImage src="https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Weather"
                layout='fill'
                className="object-cover"
      />

      {/* Search Bar */}
      <div className="relative flex justify-center items-center max-w-[500px] m-auto">
        <form className="flex items-center bg-transparent border rounded-full p-3 focus: outline-none z-[1] w-full">
          <div className="w-full">
          <input 
            type="text"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            className="bg-transparent outline-none w-full text-white placeholder-grey text-2xl"
          />
          </div>
          <button
            type="submit"
            className="text-blue-500"
            onClick={getWeather}
          >
            <BsSearch size={25}/>
          </button>
        </form>
      </div>

      {/* Weather Data */}
      {weather.main && <Weather data={weather}/>}
    </div>
  );
}
