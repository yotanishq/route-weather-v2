"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function TermsPage() {
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
              Terms of Use
            </h1>
            <p className="text-xl text-muted-foreground">
              Terms and conditions for using Aether
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
                <p>These Terms of Use were last updated on {new Date().toLocaleDateString()}.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                <p>
                  Welcome to Aether, a weather and route planning application developed at IIT Kharagpur. By accessing or using Aether, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptance of Terms</h2>
                <p>
                  By accessing and using Aether, you accept and agree to be bound by these Terms of Use. These terms constitute a legally binding agreement between you and Aether. If you do not agree to abide by these terms, you are not authorized to use the application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Service</h2>
                <p>
                  Aether provides weather information, route planning, and travel intelligence services. The application allows users to:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Search for weather conditions at specific locations</li>
                  <li>Plan routes between locations with distance and duration estimates</li>
                  <li>View weather conditions along planned routes</li>
                  <li>Access road event information including construction, closures, and hazards</li>
                  <li>Receive travel recommendations based on weather and road conditions</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">User Responsibilities</h2>
                <p>As a user of Aether, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Use the application for lawful purposes only</li>
                  <li>Not attempt to gain unauthorized access to the application or its servers</li>
                  <li>Not use the application to transmit malicious code or viruses</li>
                  <li>Not interfere with the operation of the application</li>
                  <li>Not use automated tools to scrape or harvest data from the application</li>
                  <li>Respect the intellectual property rights of Aether and its third-party service providers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Accuracy of Information</h2>
                <p>
                  Aether strives to provide accurate and up-to-date weather and route information. However, weather conditions can change rapidly, and route information may not reflect real-time road conditions. The information provided by Aether is for informational purposes only and should not be relied upon as the sole basis for travel decisions.
                </p>
                <p className="mt-4">
                  We do not guarantee the accuracy, completeness, or timeliness of any information provided. You should verify critical information from official sources before making travel decisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Weather and Travel Disclaimer</h2>
                <p>
                  Aether is not a substitute for official weather forecasts, road condition reports, or travel advisories. Weather conditions can be unpredictable and may change without notice. Aether does not guarantee safe travel conditions.
                </p>
                <p className="mt-4">
                  Users should:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Check official weather forecasts and road conditions before traveling</li>
                  <li>Exercise their own judgment when making travel decisions</li>
                  <li>Follow local authorities' guidance, road closures, and evacuation orders</li>
                  <li>Be prepared for changing weather conditions</li>
                  <li>Carry appropriate emergency supplies when traveling</li>
                </ul>
                <p className="mt-4">
                  Aether and its developers are not responsible for any travel decisions you make based on information provided by the application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
                <p>
                  Aether uses third-party services to provide weather data, routing information, and traffic conditions. These services include OpenWeatherMap, GraphHopper, and TomTom. Your use of Aether is also subject to the terms and conditions of these third-party service providers.
                </p>
                <p className="mt-4">
                  We are not responsible for the availability, accuracy, or reliability of third-party services. Third-party services may be discontinued or modified without notice.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, Aether and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 ml-4">
                  <li>Your use or inability to use the application</li>
                  <li>Any errors or defects in the application</li>
                  <li>Inaccurate or incomplete weather or route information</li>
                  <li>Travel decisions made based on information provided by the application</li>
                  <li>Unauthorized access to or use of our servers</li>
                  <li>Any other matter relating to the application</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                <p>
                  Aether and its original content, features, and functionality are owned by Aether and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, modify, create derivative works from, distribute, or exploit the application in any manner without our express written permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">User-Generated Content</h2>
                <p>
                  Aether does not currently allow users to submit content. If we add features that allow user submissions in the future, you will retain ownership of any content you submit, but you grant us a license to use, modify, and distribute such content in connection with the application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Privacy</h2>
                <p>
                  Your use of Aether is also governed by our Privacy Policy, which explains how we collect, use, and protect your information. Please review our Privacy Policy to understand our data practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Modifications to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Use at any time. We will notify users of material changes by posting the updated terms on this page and updating the "Last Updated" date. Your continued use of the application after such modifications constitutes your acceptance of the updated terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
                <p>
                  We reserve the right to terminate or suspend your access to Aether at any time, without prior notice or liability, for any reason, including but not limited to breach of these Terms of Use.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Governing Law</h2>
                <p>
                  These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in West Bengal, India.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
                <p>
                  If you have questions about these Terms of Use, please contact us through our <a href="/contact" className="text-primary hover:underline">Contact page</a>.
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
