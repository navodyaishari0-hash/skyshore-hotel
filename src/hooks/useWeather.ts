'use client';

import { useState, useEffect } from 'react';
import type { WeatherData } from '@/types';

const MOCK_WEATHER: WeatherData = {
  temp: 28,
  condition: 'Sunny',
  icon: '☀️',
  humidity: 65,
  wind: 12,
  forecast: [
    { day: 'Mon', temp: 28, condition: 'Sunny', icon: '☀️' },
    { day: 'Tue', temp: 26, condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Wed', temp: 24, condition: 'Cloudy', icon: '☁️' },
    { day: 'Thu', temp: 22, condition: 'Rainy', icon: '🌧️' },
    { day: 'Fri', temp: 25, condition: 'Sunny', icon: '☀️' },
    { day: 'Sat', temp: 27, condition: 'Clear', icon: '🌤️' },
    { day: 'Sun', temp: 29, condition: 'Sunny', icon: '☀️' },
  ],
};

const WEATHER_VARIATIONS: WeatherData[] = [
  MOCK_WEATHER,
  {
    temp: 24,
    condition: 'Partly Cloudy',
    icon: '⛅',
    humidity: 72,
    wind: 18,
    forecast: [
      { day: 'Mon', temp: 24, condition: 'Partly Cloudy', icon: '⛅' },
      { day: 'Tue', temp: 22, condition: 'Cloudy', icon: '☁️' },
      { day: 'Wed', temp: 20, condition: 'Rainy', icon: '🌧️' },
      { day: 'Thu', temp: 19, condition: 'Rainy', icon: '🌧️' },
      { day: 'Fri', temp: 23, condition: 'Partly Cloudy', icon: '⛅' },
      { day: 'Sat', temp: 25, condition: 'Sunny', icon: '☀️' },
      { day: 'Sun', temp: 26, condition: 'Sunny', icon: '☀️' },
    ],
  },
  {
    temp: 18,
    condition: 'Rainy',
    icon: '🌧️',
    humidity: 88,
    wind: 24,
    forecast: [
      { day: 'Mon', temp: 18, condition: 'Rainy', icon: '🌧️' },
      { day: 'Tue', temp: 17, condition: 'Rainy', icon: '🌧️' },
      { day: 'Wed', temp: 19, condition: 'Cloudy', icon: '☁️' },
      { day: 'Thu', temp: 21, condition: 'Partly Cloudy', icon: '⛅' },
      { day: 'Fri', temp: 23, condition: 'Sunny', icon: '☀️' },
      { day: 'Sat', temp: 24, condition: 'Sunny', icon: '☀️' },
      { day: 'Sun', temp: 22, condition: 'Partly Cloudy', icon: '⛅' },
    ],
  },
];

export function useWeather(): WeatherData {
  const [weather, setWeather] = useState<WeatherData>(MOCK_WEATHER);

  useEffect(() => {
    const index = Math.floor(Math.random() * WEATHER_VARIATIONS.length);
    setWeather(WEATHER_VARIATIONS[index]);

    const interval = setInterval(() => {
      const variation = WEATHER_VARIATIONS[Math.floor(Math.random() * WEATHER_VARIATIONS.length)];
      setWeather((prev: WeatherData) => ({
        ...variation,
        temp: prev.temp + Math.round((Math.random() - 0.5) * 2),
        humidity: Math.min(100, Math.max(30, prev.humidity + Math.round((Math.random() - 0.5) * 10))),
        wind: Math.max(0, prev.wind + Math.round((Math.random() - 0.5) * 6)),
      }));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return weather;
}
