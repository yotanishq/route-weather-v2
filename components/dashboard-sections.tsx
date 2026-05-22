"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Clock,
  AlertCircle,
  Calendar,
  TrendingUp,
  Zap,
  MapPin,
  CloudRain,
  Sun,
  Snowflake,
  ArrowUpRight,
  Shield,
  Navigation,
  Thermometer,
  Wind,
  Route,
  Star,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

const weeklyData = [
  { day: "Mon", score: 85 },
  { day: "Tue", score: 72 },
  { day: "Wed", score: 45 },
  { day: "Thu", score: 68 },
  { day: "Fri", score: 92 },
  { day: "Sat", score: 88 },
  { day: "Sun", score: 78 },
];

const recentRoutes = [
  { id: 1, from: "San Francisco", to: "Los Angeles", date: "Today", score: 92, distance: "382 mi" },
  { id: 2, from: "Denver", to: "Phoenix", date: "Yesterday", score: 78, distance: "602 mi" },
  { id: 3, from: "Seattle", to: "Portland", date: "May 5", score: 85, distance: "174 mi" },
];

const alerts = [
  {
    id: 1,
    type: "warning",
    message: "Heavy rain expected on I-80 between 2-5 PM",
    icon: <CloudRain className="w-4 h-4" />,
    time: "2h ago",
  },
  {
    id: 2,
    type: "info",
    message: "Clear conditions forecasted for tomorrow",
    icon: <Sun className="w-4 h-4" />,
    time: "4h ago",
  },
  {
    id: 3,
    type: "alert",
    message: "Snow advisory for mountain passes this weekend",
    icon: <Snowflake className="w-4 h-4" />,
    time: "6h ago",
  },
];

const quickStats = [
  { label: "Routes Saved", value: "12", icon: <Route className="w-4 h-4" />, change: "+3 this week" },
  { label: "Miles Tracked", value: "2,847", icon: <Navigation className="w-4 h-4" />, change: "+156 mi" },
  { label: "Avg Score", value: "84", icon: <Star className="w-4 h-4" />, change: "Good conditions" },
  { label: "Alerts Handled", value: "8", icon: <Shield className="w-4 h-4" />, change: "All resolved" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function DashboardSections() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-tl from-emerald-50 to-transparent rounded-full blur-3xl"
      />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-semibold text-foreground">Dashboard Overview</h2>
            <p className="text-muted-foreground mt-1">Your travel intelligence at a glance</p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" className="gap-2 rounded-xl border-slate-200 hover:bg-slate-50">
              <Calendar className="w-4 h-4" />
              This Week
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}
              className="relative bg-white rounded-2xl p-5 border border-slate-100 shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
                >
                  {stat.icon}
                </motion.div>
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              <div className="text-[10px] text-primary mt-2 font-medium">{stat.change}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Forecast Score */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="relative bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-full blur-2xl" />
            
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20"
                >
                  <TrendingUp className="w-5 h-5 text-white" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-foreground">Weekly Travel Score</h3>
                  <p className="text-xs text-muted-foreground">7-day forecast quality</p>
                </div>
              </div>

              <div className="h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} barCategoryGap="20%">
                    <XAxis
                      dataKey="day"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                    />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {weeklyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.score >= 80 ? "rgb(16, 185, 129)" : entry.score >= 60 ? "#94a3b8" : "#f59e0b"}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <div>
                  <div className="text-3xl font-bold text-foreground">75</div>
                  <div className="text-xs text-muted-foreground">Weekly Average</div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm font-medium text-primary">
                    <ArrowUpRight className="w-4 h-4" />
                    +12%
                  </div>
                  <div className="text-xs text-muted-foreground">vs last week</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Routes */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="relative bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5 overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-50 to-transparent rounded-full blur-2xl" />
            
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center shadow-lg shadow-slate-500/20"
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">Recent Routes</h3>
                    <p className="text-xs text-muted-foreground">Your latest trips</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs text-primary hover:bg-primary/5">
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {recentRoutes.map((route, index) => (
                  <motion.div
                    key={route.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {route.from} → {route.to}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{route.date}</span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span>{route.distance}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-lg">
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="text-sm font-bold text-primary">{route.score}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Weather Alerts */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="relative bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-50 to-transparent rounded-full blur-2xl" />
            
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20"
                  >
                    <AlertCircle className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-foreground">Weather Alerts</h3>
                    <p className="text-xs text-muted-foreground">Active notifications</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-full border border-red-100">
                  3 Active
                </span>
              </div>

              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className={`
                      flex items-start gap-3 p-3 rounded-2xl transition-colors cursor-pointer
                      ${alert.type === "warning"
                        ? "bg-amber-50/50 hover:bg-amber-50"
                        : alert.type === "alert"
                        ? "bg-red-50/50 hover:bg-red-50"
                        : "bg-primary/5 hover:bg-primary/10"}
                    `}
                  >
                    <div
                      className={`
                        w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                        ${alert.type === "warning"
                          ? "bg-amber-100 text-amber-600"
                          : alert.type === "alert"
                          ? "bg-red-100 text-red-600"
                          : "bg-primary/20 text-primary"}
                      `}
                    >
                      {alert.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground leading-snug">{alert.message}</p>
                      <span className="text-xs text-muted-foreground mt-1 block">{alert.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom insights row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Travel Insight */}
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            className="flex items-center gap-4 p-5 bg-gradient-to-r from-primary/10 to-emerald-50 rounded-2xl border border-primary/10 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Thermometer className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">Best Travel Window</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Tomorrow 6-10 AM offers optimal conditions with 92+ weather scores
              </div>
            </div>
            <Button size="sm" className="rounded-xl bg-primary text-white hover:bg-primary/90">
              View Details
            </Button>
          </motion.div>

          {/* Wind Advisory */}
          <motion.div
            whileHover={{ scale: 1.01, y: -2 }}
            className="flex items-center gap-4 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl border border-cyan-100 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <Wind className="w-6 h-6 text-cyan-600" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-foreground">Wind Patterns</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Cross-winds of 15-20 mph expected on mountain passes
              </div>
            </div>
            <Button size="sm" variant="outline" className="rounded-xl border-cyan-200 text-cyan-700 hover:bg-cyan-50">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
