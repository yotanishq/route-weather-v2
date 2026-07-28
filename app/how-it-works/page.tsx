"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { MapPin, Wind, Activity, ArrowRight } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground">
              Plan your journey with weather intelligence in four simple steps
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="space-y-12">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-start gap-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Choose Your Location or Route</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Enter your origin and destination to plan a route. Aether calculates optimal paths with distance, duration, and ETA estimates using advanced routing algorithms.
                </p>
                <p className="text-muted-foreground">
                  You can also search for weather at a specific location without planning a route—perfect for checking conditions at your destination before you travel.
                </p>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-start gap-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Aether Retrieves Weather Information</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Once your route is calculated, Aether fetches weather data for multiple points along your journey. This includes temperature, humidity, wind speed, precipitation, visibility, and weather conditions.
                </p>
                <p className="text-muted-foreground">
                  Weather data is retrieved from reliable meteorological sources and mapped to the route geometry, giving you a comprehensive view of conditions you'll encounter.
                </p>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-start gap-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Weather Conditions Are Mapped to Your Journey</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Weather data is visualized on an interactive map, showing conditions at various points along your route. Color-coded indicators help you quickly identify areas with favorable or challenging weather.
                </p>
                <p className="text-muted-foreground">
                  You can see temperature gradients, precipitation patterns, wind conditions, and visibility—all mapped to the exact route you'll travel.
                </p>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-start gap-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-foreground mb-3">Understand Conditions Before Traveling</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Aether provides travel recommendations and safety insights based on the weather and road conditions along your route. This helps you make informed decisions about when to travel, what to expect, and how to prepare.
                </p>
                <p className="text-muted-foreground">
                  Get alerts for severe weather, understand potential delays, and plan alternative routes if needed—all before you begin your journey.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Key Features */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl border border-slate-100"
              >
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Route-Based Weather</h3>
                <p className="text-muted-foreground">
                  Weather data mapped specifically to your route, not just at your destination.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl border border-slate-100"
              >
                <Wind className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Real-Time Data</h3>
                <p className="text-muted-foreground">
                  Current weather conditions and forecasts updated regularly for accurate planning.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl border border-slate-100"
              >
                <Activity className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Road Events</h3>
                <p className="text-muted-foreground">
                  Information about construction, closures, congestion, and hazards on your route.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-primary to-emerald-600 rounded-3xl text-center"
          >
            <h2 className="text-3xl font-semibold text-white mb-4">Ready to Plan Your Journey?</h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">
              Start using Aether today to make smarter travel decisions with weather intelligence.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-xl shadow-lg"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
