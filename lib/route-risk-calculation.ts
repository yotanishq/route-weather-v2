import { TrafficIncident } from "./tomtomTraffic"

export interface RiskFactors {
  incidents: TrafficIncident[]
  visibility?: number
  rain?: boolean
  windSpeed?: number
  isNight: boolean
}

export function calculateRouteRiskScore(factors: RiskFactors): number {
  let baseScore = 100

  // Incident impact
  const highSeverityIncidents = factors.incidents.filter(i => i.severity === 'HIGH').length
  const mediumSeverityIncidents = factors.incidents.filter(i => i.severity === 'MEDIUM').length
  const lowSeverityIncidents = factors.incidents.filter(i => i.severity === 'LOW').length

  // Deduct points based on incident severity
  baseScore -= highSeverityIncidents * 15
  baseScore -= mediumSeverityIncidents * 8
  baseScore -= lowSeverityIncidents * 3

  // Visibility impact (in meters)
  if (factors.visibility) {
    if (factors.visibility < 1000) {
      baseScore -= 20
    } else if (factors.visibility < 5000) {
      baseScore -= 10
    } else if (factors.visibility < 10000) {
      baseScore -= 5
    }
  }

  // Rain impact
  if (factors.rain) {
    baseScore -= 10
  }

  // Wind impact (in m/s)
  if (factors.windSpeed && factors.windSpeed > 15) {
    baseScore -= 15
  } else if (factors.windSpeed && factors.windSpeed > 10) {
    baseScore -= 8
  }

  // Time of day impact
  if (factors.isNight) {
    baseScore -= 5
  }

  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, baseScore))
}

export function getRiskLevel(score: number): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (score >= 75) return 'LOW'
  if (score >= 50) return 'MEDIUM'
  return 'HIGH'
}

export function getRiskColor(score: number): string {
  if (score >= 75) return '#34d399' // green
  if (score >= 50) return '#f59e0b' // amber
  return '#ef4444' // red
}
