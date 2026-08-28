"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function PrivacyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              How Aether collects, uses, and protects your information
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="prose prose-slate max-w-none"
          >
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Last Updated</h2>
                <p>This Privacy Policy was last updated on {new Date().toLocaleDateString()}.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                <p>
                  Aether ("we," "our," or "the application") is a weather and route planning application developed at IIT Kharagpur. This Privacy Policy explains how we collect, use, and protect your information when you use Aether.
                </p>
                <p className="mt-4">
                  We are committed to protecting your privacy and being transparent about our data practices. Please read this Privacy Policy carefully to understand how we handle your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                
                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Location Information</h3>
                <p>
                  Aether allows you to search for weather information at specific locations. When you enter a location name (such as a city or address), we use this information to fetch relevant weather data from our weather service provider. We do not automatically track your current location unless you explicitly choose to use location-based features.
                </p>
                <p className="mt-4">
                  Location data is used solely to provide weather and route information for your requested searches. We do not store your search history or track your movements over time.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Route Information</h3>
                <p>
                  When you plan a route, we process the origin and destination locations you provide to calculate optimal paths and retrieve weather conditions along the route. This route data is processed in real-time and is not stored persistently on our servers.
                </p>

                <h3 className="text-lg font-semibold text-foreground mt-6 mb-3">Browser Data</h3>
                <p>
                  Like most web applications, Aether may automatically collect certain technical information when you visit our site, including your browser type, operating system, IP address, and referring website. This information is collected for analytics and to improve the performance and security of the application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>To provide weather and route information you request</li>
                  <li>To calculate optimal routes and travel times</li>
                  <li>To display weather conditions along your planned routes</li>
                  <li>To improve the functionality and performance of the application</li>
                  <li>To analyze usage patterns for product improvement</li>
                  <li>To ensure the security and integrity of the application</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
                <p>
                  Aether uses third-party services to provide weather data, routing information, and traffic conditions:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li><strong>OpenWeatherMap:</strong> Provides weather data and forecasts</li>
                  <li><strong>GraphHopper:</strong> Provides routing and navigation services</li>
                  <li><strong>TomTom:</strong> Provides traffic incident and road condition data</li>
                </ul>
                <p className="mt-4">
                  These third-party services may collect information in accordance with their own privacy policies. We encourage you to review the privacy policies of these service providers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Data Storage and Retention</h2>
                <p>
                  Aether does not create user accounts or require registration. We do not store personal information such as your name, email address, or phone number. Route calculations and weather searches are processed in real-time and are not persistently stored on our servers.
                </p>
                <p className="mt-4">
                  Some data may be stored temporarily in your browser's local storage to improve application performance. This data is stored locally on your device and is not transmitted to our servers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies and Local Storage</h2>
                <p>
                  Aether may use browser local storage to store application state and preferences. Local storage is similar to cookies but stored directly in your browser. This helps improve your experience by remembering your preferences and settings.
                </p>
                <p className="mt-4">
                  You can control or delete local storage through your browser settings. Note that disabling local storage may affect the functionality of the application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
                <p>
                  We implement reasonable security measures to protect your information from unauthorized access, alteration, or destruction. However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
                <p>
                  Since Aether does not collect personal information or create user accounts, we do not maintain personal data profiles. You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Access the application without providing personal information</li>
                  <li>Clear your browser's local storage at any time</li>
                  <li>Choose not to use location-based features</li>
                  <li>Stop using the application at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
                <p>
                  Aether is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Weather Disclaimer</h2>
                <p>
                  Weather information provided by Aether is for informational purposes only. Weather conditions can change rapidly and may not be accurately predicted. Aether should not be used as the sole basis for travel decisions. Always check current conditions and forecasts from official sources before traveling.
                </p>
                <p className="mt-4">
                  Aether does not guarantee safe travel conditions. Users should exercise their own judgment and follow local authorities' guidance and road closures.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or how we handle your information, please contact us through our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
