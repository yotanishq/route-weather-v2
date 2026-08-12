import type { CheckpointWeatherPoint } from "./weather"
import type { AccidentZone } from "./accidents"

export type RiskLevel = "Low" | "Moderate" | "High" | "Severe"

export interface JourneyRiskAssessment {
  level: RiskLevel
  score: number // 0-100 (100 is safest)
  badgeText: string
  colorClass: string
  borderColorClass: string
  summaryReason: string
}

export interface TransportModeFeasibility {
  id: "car" | "bike" | "walking"
  name: string
  status: "optimal" | "caution" | "poor"
  score: number
  reason: string
  eta: string
  durationSeconds: number
}

function formatDurationText(totalSeconds: number): string {
  if (!totalSeconds || totalSeconds <= 0) return "--"
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`
  } else if (hours > 0) {
    return `${hours}h`
  } else {
    return `${minutes}m`
  }
}

export function calculateJourneyRisk(
  weatherPoints: CheckpointWeatherPoint[],
  accidentZones: AccidentZone[]
): JourneyRiskAssessment {
  if (!weatherPoints || weatherPoints.length === 0) {
    return {
      level: "Low",
      score: 95,
      badgeText: "Good",
      colorClass: "text-green-500",
      borderColorClass: "border-green-500/20",
      summaryReason: "Clear conditions expected along the route."
    }
  }

  let baseScore = 100
  const severeWeatherFound = weatherPoints.some((p) => {
    const main = p.weather.condition.toLowerCase()
    return main.includes("thunderstorm") || main.includes("snow")
  })

  const rainFound = weatherPoints.some((p) => {
    const main = p.weather.condition.toLowerCase()
    const desc = p.weather.description.toLowerCase()
    return main.includes("rain") || main.includes("drizzle") || desc.includes("rain")
  })

  const fogFound = weatherPoints.some((p) => {
    const main = p.weather.condition.toLowerCase()
    const vis = p.weather.visibility ?? 10000
    return main.includes("fog") || main.includes("mist") || vis < 3000
  })

  const highWindFound = weatherPoints.some((p) => (p.weather.windSpeed ?? 0) > 12)
  const extremeTempFound = weatherPoints.some((p) => p.weather.temperature < 0 || p.weather.temperature > 38)

  if (severeWeatherFound) baseScore -= 35
  else if (rainFound) baseScore -= 15

  if (fogFound) baseScore -= 20
  if (highWindFound) baseScore -= 15
  if (extremeTempFound) baseScore -= 10

  // Deductions from traffic incidents
  const highIncidents = accidentZones.filter((z) => z.severity === "high").length
  const medIncidents = accidentZones.filter((z) => z.severity === "medium").length
  const lowIncidents = accidentZones.filter((z) => z.severity === "low").length

  baseScore -= highIncidents * 20
  baseScore -= medIncidents * 10
  baseScore -= lowIncidents * 5

  const finalScore = Math.max(10, Math.min(100, Math.round(baseScore)))

  let level: RiskLevel = "Low"
  let badgeText = "Good"
  let colorClass = "text-green-500"
  let borderColorClass = "border-green-500/20"
  let summaryReason = "Conditions remain favorable throughout the route."

  if (finalScore < 45 || severeWeatherFound || highIncidents > 1) {
    level = "Severe"
    badgeText = "Severe"
    colorClass = "text-red-600"
    borderColorClass = "border-red-600/30"
    summaryReason = "Hazardous conditions or severe road incidents detected."
  } else if (finalScore < 70 || highIncidents === 1 || (rainFound && highWindFound)) {
    level = "High"
    badgeText = "Risky"
    colorClass = "text-red-500"
    borderColorClass = "border-red-500/20"
    summaryReason = "Multiple weather or traffic hazards along journey."
  } else if (finalScore < 85 || rainFound || fogFound || medIncidents > 0) {
    level = "Moderate"
    badgeText = "Caution"
    colorClass = "text-amber-500"
    borderColorClass = "border-amber-500/20"
    summaryReason = "Mild precipitation or road cautions expected."
  }

  return {
    level,
    score: finalScore,
    badgeText,
    colorClass,
    borderColorClass,
    summaryReason
  }
}

export function generateJourneyInsights(
  weatherPoints: CheckpointWeatherPoint[],
  accidentZones: AccidentZone[]
): string[] {
  const insights: string[] = []

  if (!weatherPoints || weatherPoints.length === 0) {
    return ["Enter route details to view journey weather insights."]
  }

  const unavailable = weatherPoints.filter((p) => p.isForecastUnavailable)
  if (unavailable.length > 0) {
    return ["Forecast data is unavailable for the selected departure time."]
  }

  // Check precipitation pattern
  const rainCheckpoints = weatherPoints.filter((p) => {
    const main = p.weather.condition.toLowerCase()
    return main.includes("rain") || main.includes("drizzle") || main.includes("thunderstorm")
  })

  if (rainCheckpoints.length > 0) {
    const firstRain = rainCheckpoints[0]
    const lastRain = rainCheckpoints[rainCheckpoints.length - 1]

    if (rainCheckpoints.length === weatherPoints.length) {
      insights.push("Precipitation expected across the entire route.")
    } else if (firstRain.checkpoint.progress > 0.6) {
      insights.push(
        `Rain expected during the final part of your journey (around ${firstRain.checkpoint.etaFormatted}).`
      )
    } else if (lastRain.checkpoint.progress < 0.4) {
      insights.push(
        `Rain expected near origin; conditions improve later in the journey.`
      )
    } else {
      insights.push(
        `Rain expected near ${firstRain.weather.city || "en route"} around ${firstRain.checkpoint.etaFormatted}.`
      )
    }
  }

  // Check wind speed
  const highWindPt = weatherPoints.find((p) => (p.weather.windSpeed ?? 0) > 10)
  if (highWindPt) {
    insights.push(
      `Strong winds (${highWindPt.weather.windSpeed.toFixed(1)} m/s) expected near ${highWindPt.weather.city || "route checkpoints"}.`
    )
  }

  // Check visibility
  const lowVisPt = weatherPoints.find((p) => (p.weather.visibility ?? 10000) < 4000)
  if (lowVisPt) {
    insights.push(
      `Reduced visibility expected near ${lowVisPt.weather.city || "destination"}. Drive cautiously.`
    )
  }

  // Check temperature extremes
  const maxTempPt = weatherPoints.reduce(
    (max, p) => (p.weather.temperature > max.weather.temperature ? p : max),
    weatherPoints[0]
  )
  const minTempPt = weatherPoints.reduce(
    (min, p) => (p.weather.temperature < min.weather.temperature ? p : min),
    weatherPoints[0]
  )

  if (maxTempPt.weather.temperature > 35) {
    insights.push(`High temperature of ${maxTempPt.weather.temperature}°C expected near ${maxTempPt.weather.city}.`)
  } else if (minTempPt.weather.temperature < 2) {
    insights.push(`Freezing temperatures (${minTempPt.weather.temperature}°C) expected near ${minTempPt.weather.city}.`)
  }

  // Check traffic incidents
  const highIncidents = accidentZones.filter((z) => z.severity === "high")
  if (highIncidents.length > 0) {
    insights.push(
      `High-severity traffic alert: ${highIncidents[0].description} on ${highIncidents[0].roadName}.`
    )
  }

  if (insights.length === 0) {
    insights.push("Weather and road conditions remain mostly stable throughout the route.")
  }

  return insights
}

export function calculateTransportFeasibility(
  distanceKm: number,
  routeDurationSeconds: number,
  weatherPoints: CheckpointWeatherPoint[],
  accidentZones: AccidentZone[]
): TransportModeFeasibility[] {
  const hasRain = weatherPoints.some((p) => {
    const main = p.weather.condition.toLowerCase()
    return main.includes("rain") || main.includes("drizzle") || main.includes("thunderstorm")
  })

  const hasHighWind = weatherPoints.some((p) => (p.weather.windSpeed ?? 0) > 10)
  const hasLowVis = weatherPoints.some((p) => (p.weather.visibility ?? 10000) < 3000)
  const hasHighTraffic = accidentZones.some((z) => z.severity === "high")

  // Car Feasibility
  let carScore = 95
  let carStatus: "optimal" | "caution" | "poor" = "optimal"
  let carReason = "Clear visibility and stable road conditions"

  if (hasHighTraffic || hasLowVis) {
    carScore = 60
    carStatus = "caution"
    carReason = "Traffic alerts or reduced visibility en route"
  } else if (hasRain) {
    carScore = 80
    carStatus = "optimal"
    carReason = "Wet roads expected; drive within speed limits"
  }

  // Bike Feasibility (Speed ~ 20 km/h = 5.55 m/s)
  const bikeDurationSec = distanceKm > 0 ? Math.round((distanceKm / 20) * 3600) : routeDurationSeconds * 2.5
  let bikeScore = 85
  let bikeStatus: "optimal" | "caution" | "poor" = "optimal"
  let bikeReason = "Favorable conditions for two-wheelers"

  if (distanceKm > 60 || hasRain || hasHighWind) {
    bikeScore = 45
    bikeStatus = "caution"
    if (hasRain && hasHighWind) {
      bikeStatus = "poor"
      bikeScore = 25
      bikeReason = "Heavy rain and strong crosswinds along route"
    } else if (hasRain) {
      bikeReason = "Slippery road surfaces and wet weather expected"
    } else if (hasHighWind) {
      bikeReason = "Strong crosswinds along exposed route sections"
    } else {
      bikeReason = "Long distance journey for two-wheelers"
    }
  }

  // Walking Feasibility (Speed ~ 5 km/h = 1.38 m/s)
  const walkingDurationSec = distanceKm > 0 ? Math.round((distanceKm / 5) * 3600) : routeDurationSeconds * 10
  let walkingScore = 80
  let walkingStatus: "optimal" | "caution" | "poor" = "optimal"
  let walkingReason = "Comfortable temperatures and clear visibility"

  if (distanceKm > 15) {
    walkingStatus = "poor"
    walkingScore = 20
    walkingReason = `Distance too far (${distanceKm} km) for walking`
  } else if (hasRain) {
    walkingStatus = "caution"
    walkingScore = 50
    walkingReason = "Precipitation expected en route; bring rain gear"
  }

  return [
    {
      id: "car",
      name: "Car / 4-Wheeler",
      status: carStatus,
      score: carScore,
      reason: carReason,
      eta: formatDurationText(routeDurationSeconds),
      durationSeconds: routeDurationSeconds
    },
    {
      id: "bike",
      name: "Bike / 2-Wheeler",
      status: bikeStatus,
      score: bikeScore,
      reason: bikeReason,
      eta: formatDurationText(bikeDurationSec),
      durationSeconds: bikeDurationSec
    },
    {
      id: "walking",
      name: "Walking / Hiking",
      status: walkingStatus,
      score: walkingScore,
      reason: walkingReason,
      eta: formatDurationText(walkingDurationSec),
      durationSeconds: walkingDurationSec
    }
  ]
}
