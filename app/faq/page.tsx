"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Common questions about Aether and how it works
            </p>
          </motion.div>
        </div>

        {/* FAQ */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  What is Aether?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Aether is a weather and route planning application that combines real-time weather data with intelligent route analysis. It helps travelers make informed decisions by providing comprehensive weather information along their planned journeys, developed at IIT Kharagpur.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  What is route weather?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Route weather refers to weather conditions mapped specifically along your travel route. Instead of showing weather only at your destination, Aether displays conditions at multiple points along your entire journey, giving you a complete picture of what to expect on the road.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  How does Aether use my location?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Aether uses your location only when you explicitly search for weather at a specific place or plan a route. The application does not track your location continuously or store your location data. Location data is used solely to fetch relevant weather information for your requested searches.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  Can I search weather without sharing my location?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes, you can search for weather at any location by entering the place name manually. Aether does not require access to your device's location unless you choose to use location-based features. You can search weather for any city or region worldwide without sharing your current location.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  How are route conditions calculated?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Route conditions are calculated by combining multiple data sources. Weather data is retrieved for points along your route, and road event information (construction, closures, congestion, hazards) is fetched from traffic services. These are analyzed together to provide comprehensive route insights and recommendations.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  Does Aether guarantee safe travel conditions?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  No, Aether does not guarantee safe travel conditions. Weather and road conditions can change rapidly. Aether provides information to help you make informed decisions, but you should always use your own judgment, check current conditions before traveling, and follow local authorities' guidance and road closures.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  Where does weather information come from?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Weather information is retrieved from OpenWeatherMap, a global weather data provider. This service provides current weather conditions, forecasts, and historical data for locations worldwide. Route information is calculated using GraphHopper routing services, and road events come from TomTom Traffic services.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  Is Aether free to use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes, Aether is currently free to use. The application is developed as a project at IIT Kharagpur and is available for anyone to use for weather and route planning. There are no premium tiers or subscription fees at this time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  How accurate is the weather data?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Weather data accuracy depends on the data provider and local conditions. While Aether uses reputable weather services, weather conditions can change unpredictably. Always check the most current conditions before traveling and be prepared for changes. Forecasts become less accurate further into the future.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="p-6 bg-white rounded-2xl border border-slate-100">
                <AccordionTrigger className="text-left font-semibold text-foreground">
                  Can I save my routes?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Currently, Aether does not have a saved routes feature. You can plan routes and view weather conditions, but routes are not saved between sessions. This feature may be added in future updates based on user feedback.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-primary/10 to-emerald-50 rounded-3xl border border-primary/20 text-center"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find the answer you're looking for? Please reach out to us through our contact page.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
