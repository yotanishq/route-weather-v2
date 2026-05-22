"use client";

import { motion } from "framer-motion";
import {
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sun,
  TrendingUp,
  TrendingDown,
  CloudRain,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const temperatureData = [
  { time: "6AM", temp: 58, feels: 56 },
  { time: "9AM", temp: 65, feels: 63 },
  { time: "12PM", temp: 72, feels: 74 },
  { time: "3PM", temp: 78, feels: 80 },
  { time: "6PM", temp: 74, feels: 72 },
  { time: "9PM", temp: 68, feels: 66 },
];

interface WeatherMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
  trend?: "up" | "down";
  trendValue?: string;
  status?: "good" | "warning" | "alert";
  delay?: number;
}

function WeatherMetric({ icon, label, value, subValue, trend, trendValue, status, delay = 0 }: WeatherMetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
      className="relative p-4 rounded-2xl bg-white border border-slate-100 shadow-sm transition-all group cursor-pointer"
    >
      {status && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.2 }}
          className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
            status === "good" ? "bg-primary" : status === "warning" ? "bg-amber-500" : "bg-red-500"
          }`}
        />
      )}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-all ${
          status === "warning" ? "bg-amber-50" : status === "alert" ? "bg-red-50" : "bg-primary/10"
        }`}
      >
        {icon}
      </motion.div>
      <div className="text-xs text-muted-foreground mb-1 font-medium">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-bold text-foreground">{value}</span>
        {subValue && <span className="text-xs text-muted-foreground">{subValue}</span>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${
          trend === "up" ? "text-primary" : "text-red-500"
        }`}>
          {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trendValue}
        </div>
      )}
    </motion.div>
  );
}

const routeWeatherSegments = [
  { segment: "SF - Sacramento", condition: "Clear", temp: 68, status: "good" },
  { segment: "Sacramento - Reno", condition: "Light Rain", temp: 58, status: "warning" },
  { segment: "Reno - Salt Lake", condition: "Windy", temp: 65, status: "warning" },
  { segment: "Salt Lake - Denver", condition: "Clear", temp: 74, status: "good" },
];

export function WeatherAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* Temperature Forecast Card */}
      <motion.div
        whileHover={{ y: -2 }}
        className="relative bg-white rounded-3xl shadow-xl shadow-black/5 border border-slate-100 overflow-hidden"
      >
        {/* Subtle gradient */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl" />
        
        <div className="relative p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20"
              >
                <Sun className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground">Temperature Forecast</h3>
                <p className="text-xs text-muted-foreground">Along your route</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">72°F</div>
              <div className="text-xs text-muted-foreground">Current</div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-36 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={temperatureData}>
                <defs>
                  <linearGradient id="tempGradientNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                />
                <YAxis
                  domain={[50, 85]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
                  width={28}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="rgb(16, 185, 129)"
                  strokeWidth={2.5}
                  fill="url(#tempGradientNew)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </motion.div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 gap-3">
        <WeatherMetric
          icon={<Thermometer className="w-5 h-5 text-primary" />}
          label="Feels Like"
          value="74°F"
          trend="up"
          trendValue="+3°"
          status="good"
          delay={0.1}
        />
        <WeatherMetric
          icon={<Droplets className="w-5 h-5 text-blue-500" />}
          label="Humidity"
          value="45%"
          subValue="avg"
          trend="down"
          trendValue="-5%"
          status="good"
          delay={0.15}
        />
        <WeatherMetric
          icon={<Wind className="w-5 h-5 text-cyan-500" />}
          label="Wind Speed"
          value="12"
          subValue="mph"
          status="warning"
          delay={0.2}
        />
        <WeatherMetric
          icon={<Eye className="w-5 h-5 text-slate-500" />}
          label="Visibility"
          value="10"
          subValue="mi"
          status="good"
          delay={0.25}
        />
      </div>

      {/* Route Weather Segments */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        whileHover={{ y: -2 }}
        className="relative bg-white rounded-3xl shadow-xl shadow-black/5 border border-slate-100 overflow-hidden"
      >
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-2xl" />
        
        <div className="relative p-5">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Gauge className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-foreground">Route Segments</h3>
              <p className="text-xs text-muted-foreground">Weather by section</p>
            </div>
          </div>

          <div className="space-y-2">
            {routeWeatherSegments.map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                  segment.status === "warning" ? "bg-amber-50/50 hover:bg-amber-50" : "bg-slate-50/50 hover:bg-slate-100/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  segment.status === "good" ? "bg-primary/10" : "bg-amber-100"
                }`}>
                  {segment.status === "good" ? (
                    <CheckCircle className="w-4 h-4 text-primary" />
                  ) : segment.condition === "Light Rain" ? (
                    <CloudRain className="w-4 h-4 text-amber-600" />
                  ) : (
                    <Wind className="w-4 h-4 text-amber-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground truncate">{segment.segment}</div>
                  <div className="text-xs text-muted-foreground">{segment.condition}</div>
                </div>
                <div className="text-sm font-semibold text-foreground">{segment.temp}°F</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Weather Alert Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.01 }}
        className="flex items-center gap-3 p-4 bg-amber-50 rounded-2xl border border-amber-100 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-amber-900">Weather Advisory</div>
          <div className="text-xs text-amber-700">Light rain expected near Reno between 1-4 PM</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
