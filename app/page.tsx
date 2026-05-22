"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { RoutePlanner } from "@/components/route-planner"
import { InteractiveMap } from "@/components/map/interactive-map"
import { WeatherAnalytics } from "@/components/weather-analytics"
import { TransportFeasibility } from "@/components/transport-feasibility"
import { DashboardSections } from "@/components/dashboard-sections"
import { Footer } from "@/components/footer"

export default function HomePage() {

  const [startPlace, setStartPlace] = useState("")
  const [endPlace, setEndPlace] = useState("")

  const [triggerRoute, setTriggerRoute] = useState(0)

  function handleGenerateRoute() {
    setTriggerRoute(prev => prev + 1)
  }

  return (

    <div className="min-h-screen bg-background">

      <Navbar />

      <HeroSection />

      {/* MAIN MAP */}

      <section className="relative py-8 lg:py-12">

        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* HEADER */}

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

          {/* GRID */}

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

            {/* SIDEBAR */}

            <div className="xl:col-span-3 order-2 xl:order-1">

              <div className="xl:sticky xl:top-24 space-y-6">

                <RoutePlanner
                  startPlace={startPlace}
                  endPlace={endPlace}
                  setStartPlace={setStartPlace}
                  setEndPlace={setEndPlace}
                  onGenerateRoute={handleGenerateRoute}
                />

              </div>

            </div>

            {/* MAP */}

            <div className="xl:col-span-9 order-1 xl:order-2">

              <InteractiveMap
                startPlace={startPlace}
                endPlace={endPlace}
                triggerRoute={triggerRoute}
              />

            </div>

          </div>

        </div>

      </section>

      {/* ANALYTICS */}

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

      <DashboardSections />

      <Footer />

    </div>

  )
}