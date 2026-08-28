"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Search, MapPin, AlertCircle, RefreshCw, ExternalLink } from "lucide-react"

export default function HelpPage() {
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
              Help & Support
            </h1>
            <p className="text-xl text-muted-foreground">
              Get help using Aether and troubleshooting common issues
            </p>
          </motion.div>
        </div>

        {/* Help Sections */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="space-y-8">
            {/* How to Search Weather */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <Search className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">How to Search Weather</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>To search for weather at a specific location:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Enter the city name or location in the search field</li>
                      <li>Click the search button or press Enter</li>
                      <li>Weather information will display for that location</li>
                    </ol>
                    <p className="pt-2">
                      You can search for any location worldwide. The search supports city names, regions, and specific addresses. Weather data includes temperature, humidity, wind, precipitation, and forecasts.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How to Plan a Route */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">How to Plan a Route</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>To plan a route with weather information:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Enter your starting location in the "From" field</li>
                      <li>Enter your destination in the "To" field</li>
                      <li>Click "Generate Route" to calculate the path</li>
                      <li>View the route on the map with weather conditions</li>
                      <li>Check the analytics panel for detailed insights</li>
                    </ol>
                    <p className="pt-2">
                      The route will show distance, estimated travel time, and weather conditions at multiple points along the journey. You can toggle different map layers to view weather overlays and road events.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Location Permissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Location Permissions</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Aether does not require location permissions to function. You can search for weather at any location by manually entering the place name. The application does not track your location or store location data.
                    </p>
                    <p>
                      If your browser prompts for location permission, this may be from your browser's location features rather than Aether. You can safely deny location permissions and still use all features of Aether by manually entering locations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Troubleshooting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <RefreshCw className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Common Troubleshooting</h2>
                  <div className="space-y-6 text-muted-foreground">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Weather information not loading</h3>
                      <p>If weather data doesn't appear:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                        <li>Check your internet connection</li>
                        <li>Try refreshing the page</li>
                        <li>Verify the location name is spelled correctly</li>
                        <li>Clear your browser cache and try again</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Route not generating</h3>
                      <p>If route calculation fails:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                        <li>Ensure both origin and destination are entered</li>
                        <li>Check that location names are valid</li>
                        <li>Try using more specific location names</li>
                        <li>Verify your internet connection is stable</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Map not displaying correctly</h3>
                      <p>If the map has issues:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                        <li>Try refreshing the page</li>
                        <li>Check if you're using a supported browser</li>
                        <li>Disable any browser extensions that might interfere</li>
                        <li>Ensure JavaScript is enabled in your browser</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-primary/10 to-emerald-50 rounded-3xl border border-primary/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Still need help?</h2>
                <p className="text-muted-foreground">
                  If you can't find the answer you're looking for, please reach out to us.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
              >
                Contact Support
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
