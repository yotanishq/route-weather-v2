"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { RoutePlanner } from "@/components/route-planner"
import { InteractiveMap } from "@/components/map/interactive-map"
import { WeatherAnalytics } from "@/components/weather-analytics"
import { TransportFeasibility } from "@/components/transport-feasibility"
import { DashboardSections } from "@/components/dashboard-sections"
import { Footer } from "@/components/footer"
import { useRouteStore } from "@/store/route-store"

export default function HomePage() {

  const [startPlace, setStartPlace] = useState("")
  const [endPlace, setEndPlace] = useState("")

  const [triggerRoute, setTriggerRoute] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const { distance, duration, travelAdvice, weatherPoints } = useRouteStore()

  function handleGenerateRoute() {
    setTriggerRoute(prev => prev + 1)
  }

  function getWeatherCondition() {
    if (!weatherPoints || weatherPoints.length === 0) return { text: "--", color: "text-foreground" }
    
    const weather = weatherPoints[0].weather
    const condition = weather.weather[0].main.toLowerCase()
    const description = weather.weather[0].description.toLowerCase()
    
    if (condition.includes("clear") || condition.includes("sunny")) {
      return { text: "Good", color: "text-green-500" }
    } else if (condition.includes("rain") || condition.includes("drizzle") || condition.includes("hail") || description.includes("rain") || description.includes("drizzle")) {
      return { text: "Moderate", color: "text-yellow-500" }
    } else if (condition.includes("snow") || condition.includes("thunderstorm") || description.includes("heavy")) {
      return { text: "Bad", color: "text-red-500" }
    } else if (condition.includes("clouds") || condition.includes("mist") || condition.includes("fog")) {
      return { text: "Moderate", color: "text-yellow-500" }
    }
    
    return { text: "Good", color: "text-green-500" }
  }

  function formatDurationHours() {
    if (!duration) return "--"
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`
    } else if (hours > 0) {
      return `${hours}h`
    } else {
      return `${minutes}m`
    }
  }

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isFullscreen])

  // Prevent body scroll when fullscreen is active
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFullscreen])

  return (

    <div className="min-h-screen bg-background">

      <AnimatePresence>
        {!isFullscreen && (
          <>
            <Navbar />
            <HeroSection />
          </>
        )}
      </AnimatePresence>

      {/* MAIN MAP */}

      <section className={`relative ${isFullscreen ? 'fixed inset-0 z-[999] w-screen h-screen' : 'py-8 lg:py-12'}`}>

        {!isFullscreen && (
          <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white pointer-events-none" />
        )}

        <div className={`relative ${isFullscreen ? 'w-full h-full' : 'max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8'}`}>

          {/* HEADER */}

          {!isFullscreen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center justify-between mb-6"
            >

              <div>

                <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
                  Route Intelligence
                </h2>

                <p className="text-muted-foreground mt-1">
                  Real-time weather visualization for your journey
                </p>

              </div>

              <div className="hidden md:flex items-center gap-2">

                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium">

                  <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />

                  Live Data

                </span>

              </div>

            </motion.div>
          )}

          {/* GRID */}

          <div className={`grid ${isFullscreen ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-12'} gap-6`}>

            {/* SIDEBAR - Hidden in fullscreen */}

            {!isFullscreen && (
              <div className="xl:col-span-3 order-2 xl:order-1">

                <div className="xl:sticky xl:top-24 space-y-6">

                  <RoutePlanner
                    startPlace={startPlace}
                    endPlace={endPlace}
                    setStartPlace={setStartPlace}
                    setEndPlace={setEndPlace}
                    onGenerateRoute={handleGenerateRoute}
                    distance={distance ? `${distance} km` : undefined}
                    duration={formatDurationHours()}
                    condition={getWeatherCondition().text}
                    conditionColor={getWeatherCondition().color}
                  />

                </div>

              </div>
            )}

            {/* MAP */}

            <div className={`${isFullscreen ? 'col-span-1 h-screen' : 'xl:col-span-9 order-1 xl:order-2'}`}>

              <InteractiveMap
                startPlace={startPlace}
                endPlace={endPlace}
                triggerRoute={triggerRoute}
                isFullscreen={isFullscreen}
                onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
              />

            </div>

          </div>

        </div>

      </section>

      {/* ANALYTICS - Hidden in fullscreen */}

      {!isFullscreen && (
        <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >

            <h2 className="text-2xl lg:text-3xl font-semibold text-foreground">
              Weather Intelligence
            </h2>

            <p className="text-muted-foreground mt-1">
              Detailed analytics and transport recommendations
            </p>

          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <WeatherAnalytics />

            <div className="space-y-6">

              <TransportFeasibility />

            </div>

          </div>

        </div>

      </section>
      )}

      {!isFullscreen && (
        <>
          <DashboardSections />
          <Footer />
        </>
      )}

    </div>

  )
}