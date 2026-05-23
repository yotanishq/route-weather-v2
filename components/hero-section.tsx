"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Cloud, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-white" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/8 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-gradient-to-bl from-emerald-100/50 to-transparent rounded-full blur-3xl"
      />
      
      {/* Floating decorative elements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute top-32 left-[10%] w-12 h-12 bg-white rounded-2xl shadow-lg shadow-black/5 border border-slate-100 flex items-center justify-center"
      >
        <MapPin className="w-5 h-5 text-primary" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-48 right-[15%] w-10 h-10 bg-white rounded-xl shadow-lg shadow-black/5 border border-slate-100 flex items-center justify-center"
      >
        <Cloud className="w-4 h-4 text-slate-400" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-24 left-[20%] w-14 h-14 bg-white rounded-2xl shadow-lg shadow-black/5 border border-slate-100 flex items-center justify-center"
      >
        <Zap className="w-6 h-6 text-amber-500" />
      </motion.div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-primary to-emerald-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-medium text-foreground">
              AI-Powered Travel Intelligence
            </span>
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-slate-100 rounded-full">
              v2.0
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground tracking-tight leading-[1.1] text-balance"
          >
            Navigate Weather,
            <br />
            <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Master Your Route
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty"
          >
            Real-time weather intelligence for every mile of your journey. 
            Plan smarter routes, avoid delays, and travel with confidence.
          </motion.p>

        </div>
      </div>
    </section>
  );
}
