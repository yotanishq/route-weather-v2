"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function CookiesPage() {
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
              Cookie Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              How Aether uses cookies and local storage
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
                <p>This Cookie Policy was last updated on {new Date().toLocaleDateString()}.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                <p>
                  Aether uses browser local storage to enhance your experience and improve the functionality of the application. This Cookie Policy explains how we use local storage and similar technologies, and your choices regarding their use.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">What is Local Storage?</h2>
                <p>
                  Local storage is a web browser feature that allows websites to store data locally on your device. Unlike cookies, local storage data is not sent to the server with every request. It's used to store application state, preferences, and other data that improves user experience.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">How Aether Uses Local Storage</h2>
                <p>Aether uses local storage for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li><strong>Application State:</strong> To store the current state of your route planning, including origin and destination locations</li>
                  <li><strong>Map Preferences:</strong> To remember your map view settings, zoom level, and preferred layers</li>
                  <li><strong>User Preferences:</strong> To store any custom settings or preferences you configure in the application</li>
                  <li><strong>Performance:</strong> To cache certain data and improve application loading speed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Types of Data Stored</h2>
                <p>The data stored in local storage may include:</p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Route coordinates and waypoints</li>
                  <li>Map center coordinates and zoom level</li>
                  <li>Selected map layers and display options</li>
                  <li>Application theme preferences</li>
                  <li>Temporary cache of weather and route data</li>
                </ul>
                <p className="mt-4">
                  This data is stored locally on your device and is not transmitted to our servers unless required for the application's functionality (such as fetching weather data for a location).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Cookies</h2>
                <p>
                  Aether does not use third-party cookies for tracking or advertising purposes. However, third-party services we use (such as OpenWeatherMap, GraphHopper, and TomTom) may set their own cookies when you access their APIs. These cookies are subject to the privacy policies of the respective third-party services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Session Storage</h2>
                <p>
                  In addition to local storage, Aether may use session storage, which is similar to local storage but is cleared when you close your browser tab or window. Session storage is used for temporary data that is only needed during your current session.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Managing Local Storage</h2>
                <p>You can control or delete local storage through your browser settings:</p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li><strong>Clear Site Data:</strong> Most browsers allow you to clear all data for a specific website, including local storage and cookies</li>
                  <li><strong>Incognito/Private Mode:</strong> Using incognito or private browsing mode prevents local storage from persisting after the session ends</li>
                  <li><strong>Browser Extensions:</strong> Some browser extensions allow you to manage or block local storage</li>
                </ul>
                <p className="mt-4">
                  Note that disabling or clearing local storage may affect the functionality of Aether. You may need to re-enter preferences or re-plan routes after clearing local storage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Security</h2>
                <p>
                  Local storage is subject to the same-origin policy, meaning that data stored by Aether can only be accessed by Aether and not by other websites. However, local storage is not encrypted by default. We recommend against using shared or public computers to access Aether, as local storage data may be accessible to other users of the same device.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Your Choices</h2>
                <p>You have the following choices regarding local storage:</p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li><strong>Accept:</strong> Continue using Aether with local storage enabled for the best experience</li>
                  <li><strong>Disable:</strong> Disable local storage through your browser settings (this may affect functionality)</li>
                  <li><strong>Clear:</strong> Clear local storage data at any time through your browser settings</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Cookie Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated Cookie Policy on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                <p>
                  If you have questions about this Cookie Policy or how we use local storage, please contact us through our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
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
