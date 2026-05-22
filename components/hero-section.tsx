"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play, MapPin, Cloud, Zap } from "lucide-react";

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

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-medium shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 gap-2"
              >
                Start Planning Free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-14 px-8 rounded-2xl border-slate-200 hover:bg-slate-50 gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                  <Play className="w-3 h-3 text-foreground ml-0.5" />
                </div>
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust indicators - realistic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 border-2 border-white"
                  />
                ))}
              </div>
              <span>Join thousands of travelers</span>
            </div>
            <span className="hidden sm:block text-slate-300">|</span>
            <div className="hidden sm:flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
              <span className="ml-1">Loved by users</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
