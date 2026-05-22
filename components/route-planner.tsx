"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  MapPin,
  Navigation,
  Calendar,
  Clock,
  Plus,
  Sparkles,
  Route,
} from "lucide-react";

interface RoutePlannerProps {
  startPlace: string;
  endPlace: string;
  setStartPlace: (value: string) => void;
  setEndPlace: (value: string) => void;
  onGenerateRoute: () => void;
}

export function RoutePlanner({
  startPlace,
  endPlace,
  setStartPlace,
  setEndPlace,
  onGenerateRoute,
}: RoutePlannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative bg-white rounded-3xl shadow-2xl shadow-black/5 border border-slate-100 overflow-hidden"
    >
      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50/50" />

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl" />

      <div className="relative p-6">

        {/* HEADER */}

        <div className="flex items-center gap-3 mb-6">

          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20"
          >
            <Navigation className="w-5 h-5 text-white" />
          </motion.div>

          <div>
            <h3 className="font-semibold text-foreground text-lg">
              Route Planner
            </h3>

            <p className="text-xs text-muted-foreground">
              Plan your journey
            </p>
          </div>

        </div>

        {/* START INPUT */}

        <div className="space-y-4 mb-5">

          <div className="relative group">

            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-100 group-focus-within:bg-primary/10 flex items-center justify-center transition-colors">
              <MapPin className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>

            <Input
              placeholder="Starting point"
              value={startPlace}
              onChange={(e) => setStartPlace(e.target.value)}
              className="pl-14 h-12 bg-slate-50/80 border-slate-200 rounded-2xl text-sm placeholder:text-muted-foreground/60 focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10 transition-all"
            />

          </div>

          {/* DESTINATION INPUT */}

          <div className="relative group">

            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-100 group-focus-within:bg-red-500/10 flex items-center justify-center transition-colors">
              <MapPin className="w-4 h-4 text-muted-foreground group-focus-within:text-red-500 transition-colors" />
            </div>

            <Input
              placeholder="Destination"
              value={endPlace}
              onChange={(e) => setEndPlace(e.target.value)}
              className="pl-14 h-12 bg-slate-50/80 border-slate-200 rounded-2xl text-sm placeholder:text-muted-foreground/60 focus:bg-white focus:border-red-400/30 focus:ring-2 focus:ring-red-400/10 transition-all"
            />

          </div>

        </div>

        {/* ADD STOP */}

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >

          <Button
            variant="ghost"
            size="sm"
            className="w-full mb-5 h-10 rounded-xl text-primary hover:text-primary hover:bg-primary/5 border border-dashed border-primary/30 hover:border-primary/50 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Stop
          </Button>

        </motion.div>

        {/* DATE TIME */}

        <div className="grid grid-cols-2 gap-3 mb-5">

          <div className="relative">

            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </div>

            <Input
              type="date"
              className="pl-14 h-12 bg-slate-50/80 border-slate-200 rounded-2xl text-sm focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
              defaultValue={new Date().toISOString().split("T")[0]}
            />

          </div>

          <div className="relative">

            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>

            <Input
              type="time"
              className="pl-14 h-12 bg-slate-50/80 border-slate-200 rounded-2xl text-sm focus:bg-white focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
              defaultValue="09:00"
            />

          </div>

        </div>

        {/* BUTTON */}

        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >

          <Button
            onClick={onGenerateRoute}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-medium shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
          >

            <Route className="w-4 h-4 mr-2" />

            Calculate Route Weather

          </Button>

        </motion.div>

        {/* STATS */}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100"
        >

          <div className="grid grid-cols-3 gap-3 text-center">

            <div>
              <div className="text-xl font-bold text-foreground">
                247 mi
              </div>

              <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                Distance
              </div>
            </div>

            <div className="border-x border-slate-200">

              <div className="text-xl font-bold text-foreground">
                3h 45m
              </div>

              <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                Duration
              </div>

            </div>

            <div>

              <div className="text-xl font-bold text-primary">
                Good
              </div>

              <div className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                Conditions
              </div>

            </div>

          </div>

        </motion.div>

        {/* AI SUGGESTION */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.01 }}
          className="mt-4 flex items-center gap-2 p-3 bg-primary/5 rounded-xl border border-primary/10 cursor-pointer"
        >

          <Sparkles className="w-4 h-4 text-primary" />

          <span className="text-xs text-muted-foreground">
            AI suggests departing at{" "}
            <span className="font-medium text-foreground">
              6:00 AM
            </span>{" "}
            for optimal conditions
          </span>

        </motion.div>

      </div>
    </motion.div>
  );
}