'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, MapPin, ChevronDown } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';

function getConditionIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes('storm') || c.includes('thunder')) return <CloudLightning className="h-5 w-5 text-purple-400" />;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return <CloudRain className="h-5 w-5 text-blue-400" />;
  if (c.includes('snow') || c.includes('blizzard') || c.includes('sleet')) return <CloudSnow className="h-5 w-5 text-sky-300" />;
  if (c.includes('cloud') || c.includes('overcast') || c.includes('partly')) return <Cloud className="h-5 w-5 text-gray-400" />;
  return <Sun className="h-5 w-5 text-[#C8A951]" />;
}

function getSmallConditionIcon(condition: string) {
  const c = condition.toLowerCase();
  if (c.includes('storm') || c.includes('thunder')) return <CloudLightning className="h-3.5 w-3.5 text-purple-400" />;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return <CloudRain className="h-3.5 w-3.5 text-blue-400" />;
  if (c.includes('snow') || c.includes('blizzard') || c.includes('sleet')) return <CloudSnow className="h-3.5 w-3.5 text-sky-300" />;
  if (c.includes('cloud') || c.includes('overcast') || c.includes('partly')) return <Cloud className="h-3.5 w-3.5 text-gray-400" />;
  return <Sun className="h-3.5 w-3.5 text-[#C8A951]" />;
}

export default function WeatherWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const weather = useWeather();

  return (
    <motion.div
      layout
      className="w-full cursor-pointer select-none overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md"
      onClick={() => setIsExpanded((prev) => !prev)}
      initial={false}
    >
      {/* Main row */}
      <div className="flex items-center gap-3 px-4 py-3">
        {getConditionIcon(weather.condition)}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold text-white">{weather.temp}°C</span>
            <span className="truncate text-xs text-gray-400">{weather.condition}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            <MapPin className="h-2.5 w-2.5" />
            <span>Maldives</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </motion.div>
      </div>

      {/* Expanded details */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' as const }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-4 pt-3 pb-3">
              {/* Stats row */}
              <div className="mb-3 flex items-center gap-4 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Droplets className="h-3.5 w-3.5 text-blue-400" />
                  <span>{weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Wind className="h-3.5 w-3.5 text-gray-300" />
                  <span>{weather.wind} km/h</span>
                </div>
              </div>

              {/* 3-day mini forecast */}
              <div className="flex items-center gap-2">
                {weather.forecast.slice(0, 3).map((day) => (
                  <div
                    key={day.day}
                    className="flex flex-1 flex-col items-center gap-1 rounded-lg bg-white/5 px-2 py-2"
                  >
                    <span className="text-[10px] font-medium text-gray-400">{day.day}</span>
                    {getSmallConditionIcon(day.condition)}
                    <span className="text-xs font-semibold text-white">{day.temp}°</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
