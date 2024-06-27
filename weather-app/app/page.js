'use client';

import Head from "next/head";
import NextImage from "next/image";

// Imports for the app running
import { useState } from "react";
import {BsSearch} from "react-icons/bs";
import axios from "axios"; // For https requests

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
        console.log(res.data);
      });
      setCity("");
      setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Weather - Next Appp</title>
        <meta name="description" content="Weather App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Weather App</h1>

      {/* Overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/35 z-[1]" />
      {/* Backgroung Image */}
      <NextImage src="https://images.unsplash.com/photo-1580193769210-b8d1c049a7d9?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Weather"
                layout='fill'
                className="object-cover"
      />

      {/* Search Bar */}
      <div className="relative flex justify-center items-center max-w-[500px] m-auto">
        <form onSubmit={getWeather} className="flex items-center bg-white rounded-full p-3 focus: outline-none z-[1]">
          <div>
          <input 
            type="text"
            placeholder="Enter City"
            onChange={(e) => setCity(e.target.value)}
            className="outline-none"
          />
          </div>
          <button
            type="submit"
            className="text-blue-500"
            onClick={getWeather}
          >
            <BsSearch />
          </button>
        </form>
      </div>
    </div>
  );
}
