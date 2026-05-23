export type AirQualityLevel = "Good" | "Moderate" | "Poor"
export type UvLevel = "low" | "medium" | "high"

export function getWeatherEmoji(condition?: string): string {
  const main = (condition ?? "").toLowerCase()

  if (main === "thunderstorm") return "⛈️"
  if (main === "rain" || main === "drizzle") return "🌧️"
  if (main === "snow") return "❄️"
  if (main === "mist" || main === "fog" || main === "haze") return "🌫️"
  if (main === "clouds") return "☁️"
  if (main === "clear") return "☀️"

  return "🌤️"
}

export interface WeatherPanelData {
  weather?: { main: string; description: string }[]
  main?: {
    temp?: number
    feels_like?: number
    humidity?: number
  }
  visibility?: number
  wind?: { speed?: number; deg?: number }
  air_quality?: number
  uvi?: number
}

export function formatVisibilityKm(visibilityMeters?: number): string {
  if (visibilityMeters == null || Number.isNaN(visibilityMeters)) {
    return "N/A"
  }
  const km = visibilityMeters / 1000
  if (km >= 10) return `${Math.round(km)} km`
  return `${km.toFixed(1)} km`
}

export function getWindDirection(degrees?: number): string {
  if (degrees == null || Number.isNaN(degrees)) return "N/A"
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]
  const index = Math.round(degrees / 45) % 8
  return directions[index]
}

export function getAirQualityLabel(aqi?: number): AirQualityLevel | "N/A" {
  if (aqi == null) return "N/A"
  if (aqi <= 2) return "Good"
  if (aqi === 3) return "Moderate"
  return "Poor"
}

export function getAirQualityColorClass(
  label: AirQualityLevel | "N/A"
): string {
  switch (label) {
    case "Good":
      return "text-teal-400"
    case "Moderate":
      return "text-amber-400"
    case "Poor":
      return "text-red-400"
    default:
      return "text-white/60"
  }
}

export function getUvLevel(uvi?: number): UvLevel | null {
  if (uvi == null || Number.isNaN(uvi)) return null
  if (uvi < 3) return "low"
  if (uvi < 6) return "medium"
  return "high"
}

export function formatUvIndex(uvi?: number): string {
  if (uvi == null || Number.isNaN(uvi)) return "N/A"
  return `UV ${Math.round(uvi)}`
}

export function getUvColorClass(level: UvLevel | null): string {
  switch (level) {
    case "low":
      return "text-teal-400"
    case "medium":
      return "text-amber-400"
    case "high":
      return "text-red-400"
    default:
      return "text-white/60"
  }
}

export function generateTravelInsight(data: WeatherPanelData): string {
  const condition = data.weather?.[0]?.main?.toLowerCase() ?? ""
  const description = data.weather?.[0]?.description ?? ""
  const visibilityKm =
    data.visibility != null ? data.visibility / 1000 : null
  const windSpeed = data.wind?.speed ?? 0
  const windDirection = getWindDirection(data.wind?.deg)

  if (condition === "thunderstorm") {
    return "Severe weather detected. Storm conditions — avoid travel if possible."
  }

  if (condition === "rain" || condition === "drizzle") {
    return "Wet road conditions detected. Drive cautiously."
  }

  if (
    condition === "mist" ||
    condition === "fog" ||
    condition === "haze"
  ) {
    return "Reduced visibility ahead. Extra caution advised."
  }

  if (condition === "snow") {
    return "Snow conditions detected. Hazardous winter driving conditions."
  }

  if (windSpeed > 10) {
    return `Strong crosswinds detected along this route. ${windDirection} winds at ${windSpeed.toFixed(1)} m/s.`
  }

  if (condition === "clear") {
    if (visibilityKm != null && visibilityKm >= 10) {
      return "Clear visibility and dry conditions make this route favorable for travel."
    }
    return "Clear skies with favorable conditions for travel ahead."
  }

  if (condition === "clouds") {
    return "Overcast conditions on route. Moderate visibility with stable conditions."
  }

  if (description) {
    const text =
      description.charAt(0).toUpperCase() + description.slice(1)
    return `${text}. Monitor conditions while traveling.`
  }

  return "Monitor local conditions and adjust travel plans as needed."
}
