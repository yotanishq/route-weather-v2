import { AccidentZone } from "./accident-zones"

export interface RouteDangerAnalysis {
  totalDangerZones: number
  nearbyZones: AccidentZone[]
  highestRiskZone: string
  routeSafetyScore: string
  routeSafetyPercentage: number
}

export function analyzeRouteDanger(
  routeCoordinates: [number, number][],
  accidentZones: AccidentZone[]
): RouteDangerAnalysis {

  const nearbyZones: AccidentZone[] = []
  const thresholdKm = 50 // 50km threshold for considering a zone "nearby"

  for (const zone of accidentZones) {
    for (const coord of routeCoordinates) {
      const distance = calculateDistance(
        coord[1],
        coord[0],
        zone.coordinates[1],
        zone.coordinates[0]
      )

      if (distance <= thresholdKm) {
        nearbyZones.push(zone)
        break // Only count each zone once
      }
    }
  }

  const totalDangerZones = nearbyZones.length
  const highestRiskZone = nearbyZones.length > 0
    ? nearbyZones.reduce((highest, zone) =>
        zone.riskScore > highest.riskScore ? zone : highest
      ).name
    : "None"

  // Calculate safety score based on number and severity of danger zones
  let riskScore = 0
  for (const zone of nearbyZones) {
    if (zone.severity === "high") riskScore += 30
    else if (zone.severity === "medium") riskScore += 15
    else riskScore += 5
  }

  const routeSafetyPercentage = Math.max(0, 100 - riskScore)
  let routeSafetyScore = "Safe"

  if (routeSafetyPercentage < 40) {
    routeSafetyScore = "High Risk"
  } else if (routeSafetyPercentage < 70) {
    routeSafetyScore = "Moderate Risk"
  }

  return {
    totalDangerZones,
    nearbyZones,
    highestRiskZone,
    routeSafetyScore,
    routeSafetyPercentage
  }
}

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}
