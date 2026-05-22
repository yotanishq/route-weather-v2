"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Car,
  Bike,
  Plane,
  Train,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Zap,
} from "lucide-react";

interface TransportMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "optimal" | "caution" | "poor";
  score: number;
  reason: string;
  eta?: string;
}

const transportModes: TransportMode[] = [
  {
    id: "car",
    name: "Driving",
    icon: <Car className="w-5 h-5" />,
    status: "optimal",
    score: 92,
    reason: "Clear roads, good visibility",
    eta: "3h 45m",
  },
  {
    id: "bike",
    name: "Cycling",
    icon: <Bike className="w-5 h-5" />,
    status: "caution",
    score: 65,
    reason: "High winds expected after 2PM",
    eta: "12h 30m",
  },
  {
    id: "flight",
    name: "Flight",
    icon: <Plane className="w-5 h-5" />,
    status: "optimal",
    score: 88,
    reason: "Minor turbulence possible",
    eta: "1h 15m",
  },
  {
    id: "train",
    name: "Train",
    icon: <Train className="w-5 h-5" />,
    status: "optimal",
    score: 95,
    reason: "No weather disruptions",
    eta: "5h 20m",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "optimal":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
          <CheckCircle className="w-3 h-3" />
          Optimal
        </span>
      );
    case "caution":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-600 border border-amber-200">
          <AlertTriangle className="w-3 h-3" />
          Caution
        </span>
      );
    case "poor":
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600 border border-red-200">
          <AlertTriangle className="w-3 h-3" />
          Not Recommended
        </span>
      );
    default:
      return null;
  }
};

export function TransportFeasibility() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative bg-white rounded-3xl shadow-xl shadow-black/5 border border-slate-100 overflow-hidden"
    >
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-50 to-transparent rounded-full blur-2xl" />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <Car className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">Transport Feasibility</h3>
              <p className="text-xs text-muted-foreground">Weather-based recommendations</p>
            </div>
          </div>
          <motion.div whileHover={{ x: 2 }}>
            <Button variant="ghost" size="sm" className="text-primary text-xs hover:bg-primary/5">
              Compare All
              <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </motion.div>
        </div>

        {/* Transport Options */}
        <div className="space-y-3">
          {transportModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01, y: -1 }}
              className={`
                relative flex items-center gap-4 p-4 rounded-2xl 
                transition-all cursor-pointer
                ${mode.status === "caution" 
                  ? "bg-amber-50/30 hover:bg-amber-50/50 border border-amber-100/50" 
                  : "bg-slate-50/50 hover:bg-slate-100/50 border border-slate-100"}
              `}
            >
              {/* Best pick indicator */}
              {index === 3 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="absolute -top-2 left-4 px-2 py-0.5 bg-primary text-white text-[10px] font-medium rounded-full flex items-center gap-1"
                >
                  <Zap className="w-2.5 h-2.5" />
                  Best Pick
                </motion.div>
              )}
              
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`
                  w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                  ${mode.status === "caution" 
                    ? "bg-amber-100 text-amber-700" 
                    : "bg-white border border-slate-200 text-foreground shadow-sm"}
                `}
              >
                {mode.icon}
              </motion.div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-foreground">{mode.name}</span>
                  {getStatusBadge(mode.status)}
                </div>
                <p className="text-xs text-muted-foreground truncate">{mode.reason}</p>
              </div>

              {/* Score & ETA */}
              <div className="text-right">
                <div className={`text-2xl font-bold ${
                  mode.score >= 90 ? "text-primary" : 
                  mode.score >= 70 ? "text-foreground" : 
                  "text-amber-600"
                }`}>
                  {mode.score}
                </div>
                <div className="text-xs text-muted-foreground">{mode.eta}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Score Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-5 pt-4 border-t border-slate-100"
        >
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium">Weather feasibility score</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                90+ Excellent
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                70-89 Good
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                {"<70"} Caution
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
