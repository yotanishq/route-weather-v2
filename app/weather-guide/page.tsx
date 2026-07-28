"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Thermometer, Droplets, Wind, Eye, AlertTriangle } from "lucide-react"

export default function WeatherGuidePage() {
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
              Weather Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Understanding weather metrics for better travel planning
            </p>
          </motion.div>
        </div>

        {/* Weather Metrics */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="space-y-8">
            {/* Temperature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <Thermometer className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">Temperature</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Temperature measures how hot or cold the air is at a specific location. Aether displays both actual temperature and "feels like" temperature, which accounts for humidity and wind conditions.
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-2">What to Consider</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Extreme temperatures can affect vehicle performance and comfort</li>
                      <li>• "Feels like" temperature often reflects real-world conditions better</li>
                      <li>• Temperature variations along your route may require clothing adjustments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Precipitation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <Droplets className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">Precipitation</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Precipitation includes rain, snow, sleet, and hail. Aether shows current precipitation levels and forecasts, helping you anticipate wet or snowy conditions on your route.
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-2">Impact on Travel</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Rain reduces visibility and increases stopping distance</li>
                      <li>• Snow and ice can make roads hazardous or impassable</li>
                      <li>• Heavy precipitation may require route delays or alternatives</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Wind */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <Wind className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">Wind</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Wind speed and direction affect driving conditions, especially for high-profile vehicles. Strong crosswinds can be dangerous, while headwinds or tailwinds impact fuel efficiency and travel time.
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-2">Wind Categories</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Light winds (0-15 km/h): Minimal impact on driving</li>
                      <li>• Moderate winds (15-30 km/h): May affect high-profile vehicles</li>
                      <li>• Strong winds (30+ km/h): Significant impact, exercise caution</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Visibility */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">Visibility</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Visibility measures how far you can see clearly. Reduced visibility due to fog, mist, heavy rain, or snow significantly impacts travel safety and may require slower speeds or route changes.
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-2">Visibility Levels</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Excellent (10+ km): Normal driving conditions</li>
                      <li>• Moderate (4-10 km): Use headlights, reduce speed</li>
                      <li>• Poor (1-4 km): Consider delaying travel</li>
                      <li>• Very poor (&lt;1 km): Avoid travel if possible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weather Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-slate-100 shadow-lg shadow-black/5"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20 flex-shrink-0">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-foreground mb-3">Weather Alerts</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                    Severe weather alerts indicate conditions that may be dangerous for travel. These include thunderstorms, blizzards, hurricanes, tornadoes, and extreme temperature warnings.
                  </p>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h3 className="font-semibold text-foreground mb-2">When Alerts Are Active</h3>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Consider postponing non-essential travel</li>
                      <li>• If travel is necessary, prepare emergency supplies</li>
                      <li>• Monitor conditions closely and be ready to change plans</li>
                      <li>• Follow local authorities' guidance and road closures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="p-8 bg-gradient-to-br from-primary/10 to-emerald-50 rounded-3xl border border-primary/20"
          >
            <h2 className="text-2xl font-semibold text-foreground mb-4">Travel Tips</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>• Check weather conditions before you leave, not just at your destination</li>
              <li>• Allow extra time for travel in adverse weather conditions</li>
              <li>• Keep emergency supplies in your vehicle (water, food, blankets)</li>
              <li>• Inform someone of your travel plans and expected arrival time</li>
              <li>• Know alternative routes in case of road closures or severe weather</li>
            </ul>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
