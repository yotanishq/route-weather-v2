"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ZoomIn,
  ZoomOut,
  Locate,
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Navigation,
  Thermometer,
  Droplets,
  Eye,
  Clock,
  MapPin,
  ChevronRight,
  Layers,
  Compass,
} from "lucide-react";

interface WeatherMarker {
  id: string;
  x: number;
  y: number;
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "windy";
  city: string;
  humidity: number;
  windSpeed: number;
}

const weatherMarkers: WeatherMarker[] = [
  { id: "1", x: 12, y: 38, temp: 68, condition: "sunny", city: "San Francisco", humidity: 62, windSpeed: 8 },
  { id: "2", x: 28, y: 32, temp: 72, condition: "cloudy", city: "Sacramento", humidity: 45, windSpeed: 5 },
  { id: "3", x: 48, y: 44, temp: 58, condition: "rainy", city: "Reno", humidity: 78, windSpeed: 12 },
  { id: "4", x: 68, y: 38, temp: 65, condition: "windy", city: "Salt Lake City", humidity: 38, windSpeed: 22 },
  { id: "5", x: 88, y: 50, temp: 74, condition: "sunny", city: "Denver", humidity: 32, windSpeed: 6 },
];

const routeWaypoints = [
  { x: 12, y: 38, label: "A", city: "San Francisco" },
  { x: 28, y: 32, label: "B", city: "Sacramento" },
  { x: 48, y: 44, label: "C", city: "Reno" },
  { x: 68, y: 38, label: "D", city: "Salt Lake City" },
  { x: 88, y: 50, label: "E", city: "Denver" },
];

const getWeatherIcon = (condition: string, size: string = "w-4 h-4") => {
  switch (condition) {
    case "sunny":
      return <Sun className={`${size} text-amber-500`} />;
    case "cloudy":
      return <Cloud className={`${size} text-slate-400`} />;
    case "rainy":
      return <CloudRain className={`${size} text-blue-500`} />;
    case "windy":
      return <Wind className={`${size} text-cyan-500`} />;
    default:
      return <Sun className={size} />;
  }
};

export function InteractiveMap() {
  const [activeMarker, setActiveMarker] = useState<string | null>(null);
  const [mapLayer, setMapLayer] = useState<"weather" | "traffic" | "terrain">("weather");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full h-[75vh] min-h-[600px] lg:h-[85vh] lg:min-h-[700px] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-slate-200/50"
    >
      {/* Premium map background - Apple Maps inspired */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8faf8] via-[#f4f7f4] to-[#eef2ee]" />
      
      {/* Subtle terrain texture */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(16, 185, 129, 0.03) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.02) 0%, transparent 60%)
          `,
        }}
      />
      
      {/* Soft grid lines - like a premium map */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow around route area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-gradient-to-r from-primary/5 via-emerald-100/20 to-primary/5 rounded-full blur-3xl"
      />

      {/* Stylized route line with premium glow */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="routeGradientPremium" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="1" />
            <stop offset="50%" stopColor="rgb(5, 150, 105)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8" />
          </linearGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgb(16, 185, 129)" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {/* Ambient route glow */}
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.15 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M 12% 38% Q 20% 34% 28% 32% Q 38% 36% 48% 44% Q 58% 40% 68% 38% Q 78% 42% 88% 50%"
          fill="none"
          stroke="rgb(16, 185, 129)"
          strokeWidth="40"
          strokeLinecap="round"
        />
        
        {/* Main route line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          d="M 12% 38% Q 20% 34% 28% 32% Q 38% 36% 48% 44% Q 58% 40% 68% 38% Q 78% 42% 88% 50%"
          fill="none"
          stroke="url(#routeGradientPremium)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#dropShadow)"
        />
        
        {/* Animated dash overlay */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          d="M 12% 38% Q 20% 34% 28% 32% Q 38% 36% 48% 44% Q 58% 40% 68% 38% Q 78% 42% 88% 50%"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 20"
          opacity="0.7"
          className="animate-[dash_15s_linear_infinite]"
        />
      </svg>

      {/* Route Waypoint Markers */}
      {routeWaypoints.map((waypoint, index) => (
        <motion.div
          key={`waypoint-${index}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: `${waypoint.x}%`, top: `${waypoint.y}%` }}
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className={`
              w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shadow-lg cursor-pointer
              ${index === 0 
                ? "bg-primary text-white ring-4 ring-primary/20 shadow-primary/30" 
                : index === routeWaypoints.length - 1 
                ? "bg-emerald-600 text-white ring-4 ring-emerald-500/20 shadow-emerald-500/30" 
                : "bg-white text-foreground border-2 border-slate-200 shadow-slate-200/50"}
            `}
          >
            {waypoint.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Weather Markers - Floating cards */}
      {weatherMarkers.map((marker, index) => (
        <motion.div
          key={marker.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 300, damping: 20 }}
          className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-20"
          style={{ left: `${marker.x}%`, top: `${marker.y - 10}%` }}
          onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl 
              bg-white/95 backdrop-blur-md shadow-lg shadow-black/8 
              border border-white/80 transition-all duration-200
              ${activeMarker === marker.id ? "ring-2 ring-primary/50 shadow-xl" : ""}
            `}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center shadow-inner">
              {getWeatherIcon(marker.condition, "w-5 h-5")}
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{marker.temp}°</div>
              <div className="text-[10px] text-muted-foreground capitalize font-medium">{marker.condition}</div>
            </div>
          </motion.div>

          {/* Expanded Tooltip */}
          <AnimatePresence>
            {activeMarker === marker.id && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 p-4 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/15 border border-slate-100 z-30"
              >
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    {getWeatherIcon(marker.condition, "w-6 h-6")}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{marker.city}</div>
                    <div className="text-xs text-muted-foreground capitalize">{marker.condition}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80">
                    <Thermometer className="w-4 h-4 text-primary/70" />
                    <div>
                      <div className="text-[10px] text-muted-foreground">Temp</div>
                      <div className="text-sm font-semibold">{marker.temp}°F</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80">
                    <Droplets className="w-4 h-4 text-blue-400" />
                    <div>
                      <div className="text-[10px] text-muted-foreground">Humidity</div>
                      <div className="text-sm font-semibold">{marker.humidity}%</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80">
                    <Wind className="w-4 h-4 text-cyan-500" />
                    <div>
                      <div className="text-[10px] text-muted-foreground">Wind</div>
                      <div className="text-sm font-semibold">{marker.windSpeed} mph</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50/80">
                    <Eye className="w-4 h-4 text-slate-400" />
                    <div>
                      <div className="text-[10px] text-muted-foreground">Visibility</div>
                      <div className="text-sm font-semibold">10 mi</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Map Controls - Right side, Apple-style */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute top-6 right-6 flex flex-col gap-3"
      >
        <div className="flex flex-col gap-1.5 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg shadow-black/8 border border-white/80">
          {[
            { icon: <ZoomIn className="w-4 h-4" />, label: "Zoom in" },
            { icon: <ZoomOut className="w-4 h-4" />, label: "Zoom out" },
          ].map((control, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-slate-100 text-muted-foreground hover:text-foreground"
              >
                {control.icon}
                <span className="sr-only">{control.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5 p-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg shadow-black/8 border border-white/80">
          {[
            { icon: <Locate className="w-4 h-4" />, label: "My location" },
            { icon: <Compass className="w-4 h-4" />, label: "Compass" },
            { icon: <Layers className="w-4 h-4" />, label: "Layers" },
          ].map((control, index) => (
            <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-slate-100 text-muted-foreground hover:text-foreground"
              >
                {control.icon}
                <span className="sr-only">{control.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Layer Toggle - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute top-6 left-6"
      >
        <div className="flex items-center gap-1 p-1.5 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg shadow-black/8 border border-white/80">
          {(["weather", "traffic", "terrain"] as const).map((layer) => (
            <motion.div key={layer} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                size="sm"
                className={`
                  h-9 px-4 rounded-xl text-xs font-medium capitalize transition-all
                  ${mapLayer === layer
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-slate-100"}
                `}
                onClick={() => setMapLayer(layer)}
              >
                {layer}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Legend - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-6 left-6 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg shadow-black/8 border border-white/80"
      >
        <div className="text-[11px] font-semibold text-foreground mb-3 uppercase tracking-wide">Weather</div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
          {[
            { icon: <Sun className="w-3.5 h-3.5 text-amber-500" />, label: "Sunny", bg: "bg-amber-50" },
            { icon: <Cloud className="w-3.5 h-3.5 text-slate-400" />, label: "Cloudy", bg: "bg-slate-100" },
            { icon: <CloudRain className="w-3.5 h-3.5 text-blue-500" />, label: "Rainy", bg: "bg-blue-50" },
            { icon: <Wind className="w-3.5 h-3.5 text-cyan-500" />, label: "Windy", bg: "bg-cyan-50" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className={`w-6 h-6 rounded-lg ${item.bg} flex items-center justify-center`}>
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Route Info Card - Bottom Right - Premium floating card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 right-6 w-80"
      >
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/10 border border-white/80"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/25">
                <Navigation className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-foreground">Active Route</div>
                <div className="text-xs text-muted-foreground">San Francisco → Denver</div>
              </div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Live
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4 p-3.5 bg-slate-50/80 rounded-xl">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">1,254</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Miles</div>
            </div>
            <div className="text-center border-x border-slate-200">
              <div className="text-lg font-bold text-foreground">18h 45m</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Duration</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">92</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">Score</div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-emerald-50/50 rounded-xl border border-primary/10 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-primary" />
            <div className="flex-1">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">Optimal departure</div>
              <div className="text-sm font-medium text-foreground">Tomorrow, 6:00 AM</div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* CSS for dash animation */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </motion.div>
  );
}
