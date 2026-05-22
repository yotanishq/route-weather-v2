"use client";

import {
  useRouteStore
} from "@/store/route-store"

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

function WeatherMetric({
  icon,
  label,
  value,
  subValue,
  trend,
  trendValue,
  status,
  delay = 0
}: WeatherMetricProps) {

  return (

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{
        y: -2,
        boxShadow:
          "0 8px 30px rgba(0,0,0,0.08)"
      }}
      className="
        relative
        p-4
        rounded-2xl
        bg-white
        border
        border-slate-100
        shadow-sm
        transition-all
        group
        cursor-pointer
      "
    >

      {status && (

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: delay + 0.2
          }}
          className={`
            absolute
            top-3
            right-3
            w-2
            h-2
            rounded-full

            ${
              status === "good"
                ? "bg-primary"

                : status === "warning"

                ? "bg-amber-500"

                : "bg-red-500"
            }
          `}
        />

      )}

      <motion.div
        whileHover={{
          scale: 1.05
        }}
        className={`
          w-10
          h-10
          rounded-xl
          flex
          items-center
          justify-center
          mb-3
          transition-all

          ${
            status === "warning"

            ? "bg-amber-50"

            : status === "alert"

            ? "bg-red-50"

            : "bg-primary/10"
          }
        `}
      >

        {icon}

      </motion.div>

      <div className="
        text-xs
        text-muted-foreground
        mb-1
        font-medium
      ">
        {label}
      </div>

      <div className="
        flex
        items-baseline
        gap-1
      ">

        <span className="
          text-xl
          font-bold
          text-foreground
        ">
          {value}
        </span>

        {subValue && (

          <span className="
            text-xs
            text-muted-foreground
          ">
            {subValue}
          </span>

        )}

      </div>

      {trend && (

        <div className={`
          flex
          items-center
          gap-1
          mt-2
          text-xs
          font-medium

          ${
            trend === "up"

            ? "text-primary"

            : "text-red-500"
          }
        `}>

          {trend === "up"

            ? <TrendingUp className="w-3 h-3" />

            : <TrendingDown className="w-3 h-3" />
          }

          {trendValue}

        </div>

      )}

    </motion.div>

  )
}

export function WeatherAnalytics() {

  
  const {
    weatherPoints
  } = useRouteStore()
  const temperatureData =
  weatherPoints.map(
    (point, index) => ({

      time:
        `${index + 1}`,

      temp:
        Math.round(
          point.weather.main.temp
        ),

      condition:
        point.weather.weather[0].main

    })
  )
  const temperatures =
    weatherPoints.map(
      (point) =>
        point.weather.main.temp
    )

  const avgTemp =
    temperatures.length > 0

      ? temperatures.reduce(
          (a, b) => a + b,
          0
        ) / temperatures.length

      : 0

  const hottestTemp =
    temperatures.length > 0

      ? Math.max(...temperatures)

      : 0

  const coldestTemp =
    temperatures.length > 0

      ? Math.min(...temperatures)

      : 0

  const routeWeatherSegments =
    weatherPoints.slice(0, 4).map((point) => ({

      segment:
        point.weather.name,

      condition:
        point.weather.weather[0].main,

      temp:
        Math.round(
          point.weather.main.temp
        ),

      status:

        point.weather.weather[0].main === "Rain" ||

        point.weather.weather[0].main === "Thunderstorm"

        ? "warning"

        : "good"

    }))

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5
      }}
      className="space-y-4"
    >

      {/* FORECAST */}

      <motion.div
        whileHover={{ y: -2 }}
        className="
          relative
          bg-white
          rounded-3xl
          shadow-xl
          shadow-black/5
          border
          border-slate-100
          overflow-hidden
        "
      >

        <div className="
          absolute
          top-0
          right-0
          w-40
          h-40
          bg-gradient-to-bl
          from-primary/5
          to-transparent
          rounded-full
          blur-2xl
        " />

        <div className="relative p-5">

          <div className="
            flex
            items-center
            justify-between
            mb-4
          ">

            <div className="
              flex
              items-center
              gap-3
            ">

              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotate: 5
                }}
                className="
                  w-10
                  h-10
                  rounded-2xl
                  bg-gradient-to-br
                  from-amber-400
                  to-orange-500
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-orange-500/20
                "
              >

                <Sun className="
                  w-5
                  h-5
                  text-white
                " />

              </motion.div>

              <div>

                <h3 className="
                  font-semibold
                  text-foreground
                ">
                  Temperature Forecast
                </h3>

                <p className="
                  text-xs
                  text-muted-foreground
                ">
                  Along your route
                </p>

              </div>

            </div>

            <div className="text-right">

              <div className="
                text-2xl
                font-bold
                text-foreground
              ">
                {avgTemp.toFixed(1)}°C
              </div>

              <div className="
                text-xs
                text-muted-foreground
              ">
                Average
              </div>

            </div>

          </div>

          <div className="h-36 mt-2">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart data={temperatureData}>

                <defs>

                  <linearGradient
                    id="tempGradientNew"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="rgb(16, 185, 129)"
                      stopOpacity={0.25}
                    />

                    <stop
                      offset="100%"
                      stopColor="rgb(16, 185, 129)"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill:
                      "var(--muted-foreground)"
                  }}
                />

                <YAxis
  domain={[
    "dataMin - 2",
    "dataMax + 2"
  ]}
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 10,
                    fill:
                      "var(--muted-foreground)"
                  }}
                  width={28}
                />

               <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,0.08)"
                  }}
                  formatter={(value: any) => [
                    `${value}°C`,
                    "Temperature"
                  ]}
                />

                <Area
                  type="natural"
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

      {/* METRICS */}

      <div className="
        grid
        grid-cols-2
        gap-3
      ">

        <WeatherMetric
          icon={
            <Thermometer className="
              w-5
              h-5
              text-primary
            " />
          }
          label="Average Temp"
          value={`${avgTemp.toFixed(1)}°C`}
          status="good"
          delay={0.1}
        />

        <WeatherMetric
          icon={
            <Droplets className="
              w-5
              h-5
              text-blue-500
            " />
          }
          label="Hottest Point"
          value={`${hottestTemp.toFixed(1)}°C`}
          status="warning"
          delay={0.15}
        />

        <WeatherMetric
          icon={
            <Wind className="
              w-5
              h-5
              text-cyan-500
            " />
          }
          label="Coldest Point"
          value={`${coldestTemp.toFixed(1)}°C`}
          status="good"
          delay={0.2}
        />

        <WeatherMetric
          icon={
            <Eye className="
              w-5
              h-5
              text-slate-500
            " />
          }
          label="Weather Points"
          value={`${weatherPoints.length}`}
          subValue="zones"
          status="good"
          delay={0.25}
        />

      </div>

      {/* ROUTE SEGMENTS */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.3
        }}
        whileHover={{
          y: -2
        }}
        className="
          relative
          bg-white
          rounded-3xl
          shadow-xl
          shadow-black/5
          border
          border-slate-100
          overflow-hidden
        "
      >

        <div className="
          absolute
          bottom-0
          left-0
          w-32
          h-32
          bg-gradient-to-tr
          from-primary/5
          to-transparent
          rounded-full
          blur-2xl
        " />

        <div className="relative p-5">

          <div className="
            flex
            items-center
            gap-3
            mb-4
          ">

            <motion.div
              whileHover={{
                scale: 1.05
              }}
              className="
                w-10
                h-10
                rounded-2xl
                bg-gradient-to-br
                from-primary
                to-emerald-600
                flex
                items-center
                justify-center
                shadow-lg
                shadow-primary/20
              "
            >

              <Gauge className="
                w-5
                h-5
                text-white
              " />

            </motion.div>

            <div>

              <h3 className="
                font-semibold
                text-foreground
              ">
                Route Segments
              </h3>

              <p className="
                text-xs
                text-muted-foreground
              ">
                Live route weather
              </p>

            </div>

          </div>

          <div className="space-y-2">

            {routeWeatherSegments.map(
              (segment, index) => (

                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: -10
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay:
                      0.4 + index * 0.1
                  }}
                  className={`
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl

                    ${
                      segment.status === "warning"

                      ? `
                        bg-amber-50/50
                      `

                      : `
                        bg-slate-50/50
                      `
                    }
                  `}
                >

                  <div className={`
                    w-8
                    h-8
                    rounded-lg
                    flex
                    items-center
                    justify-center

                    ${
                      segment.status === "good"

                      ? "bg-primary/10"

                      : "bg-amber-100"
                    }
                  `}>

                    {segment.status === "good"

                      ? (
                        <CheckCircle className="
                          w-4
                          h-4
                          text-primary
                        " />
                      )

                      : (
                        <CloudRain className="
                          w-4
                          h-4
                          text-amber-600
                        " />
                      )
                    }

                  </div>

                  <div className="
                    flex-1
                    min-w-0
                  ">

                    <div className="
                      text-sm
                      font-medium
                      text-foreground
                      truncate
                    ">
                      {segment.segment}
                    </div>

                    <div className="
                      text-xs
                      text-muted-foreground
                    ">
                      {segment.condition}
                    </div>

                  </div>

                  <div className="
                    text-sm
                    font-semibold
                    text-foreground
                  ">
                    {segment.temp}°C
                  </div>

                </motion.div>

              )
            )}

          </div>

        </div>

      </motion.div>

      {/* ALERT */}

      <motion.div
        initial={{
          opacity: 0,
          y: 10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.6
        }}
        whileHover={{
          scale: 1.01
        }}
        className="
          flex
          items-center
          gap-3
          p-4
          bg-amber-50
          rounded-2xl
          border
          border-amber-100
          cursor-pointer
        "
      >

        <div className="
          w-10
          h-10
          rounded-xl
          bg-amber-100
          flex
          items-center
          justify-center
          flex-shrink-0
        ">

          <AlertTriangle className="
            w-5
            h-5
            text-amber-600
          " />

        </div>

        <div className="
          flex-1
          min-w-0
        ">

          <div className="
            text-sm
            font-medium
            text-amber-900
          ">
            Route Advisory
          </div>

          <div className="
            text-xs
            text-amber-700
          ">
            Weather conditions update
            dynamically along your route.
          </div>

        </div>

      </motion.div>

    </motion.div>

  )
}