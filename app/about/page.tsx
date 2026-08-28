"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Wind, MapPin, GraduationCap, Target, Users, Lightbulb } from "lucide-react"

export default function AboutPage() {
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
              About Aether
            </h1>
            <p className="text-xl text-muted-foreground">
              Weather intelligence for smarter travel decisions, developed at IIT Kharagpur
            </p>
          </motion.div>
        </div>

        {/* What is Aether */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-semibold text-foreground mb-6">What is Aether?</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Aether is a weather and route planning application that combines real-time weather data with intelligent route analysis. We help travelers make informed decisions by providing comprehensive weather information along their planned journeys.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Weather conditions significantly impact travel safety, comfort, and timing. Aether addresses this by integrating weather forecasts with route planning, giving users a complete picture of conditions they'll encounter on the road.
            </p>
          </motion.div>
        </div>

        {/* Why Aether Exists */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-semibold text-foreground mb-6">Why Aether Exists</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Traditional weather apps show conditions at a single point, but travelers need to understand weather across their entire route. A bridge closure due to flooding 50km ahead, or unexpected snow on a mountain pass—these are the details that matter for journey planning.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Aether was created to fill this gap by mapping weather conditions to route geometry, providing travelers with actionable insights for safer, more comfortable journeys.
            </p>
          </motion.div>
        </div>

        {/* How It Works */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">How Aether Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 mx-auto mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Plan Your Route</h3>
                <p className="text-muted-foreground">
                  Enter your origin and destination. Aether calculates optimal routes with distance and duration estimates.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 mx-auto mb-6">
                  <Wind className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Weather Analysis</h3>
                <p className="text-muted-foreground">
                  Weather data is retrieved and mapped along your route, showing conditions at multiple points.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 mx-auto mb-6">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Travel Insights</h3>
                <p className="text-muted-foreground">
                  View weather and road conditions along your route to make informed travel decisions.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* IIT Kharagpur */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
          >
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold text-foreground mb-4">Developed at IIT Kharagpur</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Aether is developed at the Indian Institute of Technology Kharagpur, one of India's premier technical institutions. The project leverages cutting-edge technology to solve real-world travel challenges.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Located in West Bengal, India, IIT Kharagpur has a long history of innovation in technology and engineering. Aether continues this tradition by applying advanced data processing and visualization techniques to weather and route planning.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold text-foreground mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl border border-slate-100"
              >
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">User-Centric</h3>
                <p className="text-muted-foreground">
                  We prioritize user needs, designing features that genuinely help travelers make better decisions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-white rounded-2xl border border-slate-100"
              >
                <Lightbulb className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We combine weather data with route planning in novel ways to provide unique insights.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
