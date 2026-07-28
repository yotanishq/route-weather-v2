"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { MapPin, ExternalLink } from "lucide-react"

export default function ContactPage() {
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
              Contact
            </h1>
            <p className="text-xl text-muted-foreground">
              Get in touch with the Aether team
            </p>
          </motion.div>
        </div>

        {/* Contact Information */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Location</h2>
                  <div className="text-muted-foreground">
                    <p className="text-lg font-medium text-foreground mb-2">IIT Kharagpur</p>
                    <p>Kharagpur, West Bengal</p>
                    <p>India</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* About the Project */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <h2 className="text-2xl font-semibold text-foreground mb-4">About the Project</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Aether is a weather and route planning application developed at the Indian Institute of Technology Kharagpur. The project combines real-time weather data with intelligent route analysis to help travelers make informed decisions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For questions about the project, feature requests, or to report issues, please visit our GitHub repository or reach out through the channels below.
              </p>
            </motion.div>
          </div>
        </div>

        {/* GitHub */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-primary/10 to-emerald-50 rounded-3xl border border-primary/20"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">Open Source</h2>
                <p className="text-muted-foreground">
                  Aether is open source. View the code, report issues, or contribute on GitHub.
                </p>
              </div>
              <a
                href="https://github.com/yotanishq/route-weather-v2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
              >
                View on GitHub
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Additional Resources */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-semibold text-foreground mb-6">Additional Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <a
                href="/faq"
                className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">FAQ</h3>
                <p className="text-muted-foreground">Find answers to frequently asked questions about Aether.</p>
              </a>

              <a
                href="/help"
                className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">Help & Support</h3>
                <p className="text-muted-foreground">Get help using Aether and troubleshooting common issues.</p>
              </a>

              <a
                href="https://www.iitkgp.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">IIT Kharagpur</h3>
                <p className="text-muted-foreground">Learn more about the Indian Institute of Technology Kharagpur.</p>
              </a>

              <a
                href="/about"
                className="p-6 bg-white rounded-2xl border border-slate-100 hover:border-primary/30 transition-colors group"
              >
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">About Aether</h3>
                <p className="text-muted-foreground">Learn more about the Aether project and its mission.</p>
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
