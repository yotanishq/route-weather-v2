import type { AccidentZone, IncidentType } from "@/lib/accidents"

export function getIncidentTypeLabel(type: IncidentType): string {
  switch (type) {
    case "accident":
      return "Accident reported"
    case "congestion":
      return "Traffic congestion"
    case "closure":
      return "Road closure"
    case "construction":
      return "Road works"
    case "road_hazard":
      return "Road hazard"
    default:
      return "Traffic alert"
  }
}

export function getSeverityLabel(zone: AccidentZone): string {
  if (zone.isAccidentProne) {
    switch (zone.severity) {
      case "high":
        return "High accident risk"
      case "medium":
        return "Moderate accident risk"
      default:
        return "Low accident risk"
    }
  }

  switch (zone.severity) {
    case "high":
    case "medium":
      return "Significant delay"
    default:
      return "Minor delay"
  }
}

export function getRiskScore(zone: AccidentZone): number {
  const delay = zone.magnitudeOfDelay ?? 0

  if (zone.isAccidentProne) {
    if (zone.severity === "high") return Math.min(98, 75 + delay * 5)
    if (zone.severity === "medium") return Math.min(85, 55 + delay * 5)
    return 45
  }

  if (zone.severity === "medium") return Math.min(55, 35 + delay * 4)
  return Math.min(35, 15 + delay * 3)
}

export function getSafetyWarning(zone: AccidentZone): string {
  if (zone.isAccidentProne) {
    if (zone.severity === "high") {
      return "Accident-prone area. Treat as high-risk until the scene is cleared."
    }
    return "Accident reported nearby. Drive defensively and watch for stopped traffic."
  }

  switch (zone.incidentType) {
    case "closure":
      return "Road closure ahead. Do not enter blocked lanes; follow official diversions."
    case "construction":
      return "Work zone ahead. Slow down and watch for workers and equipment."
    case "congestion":
      return "Congestion ahead. Brake early and avoid distractions in stop-and-go traffic."
    default:
      return "Traffic incident ahead. Stay alert for changing conditions."
  }
}

export function getSeverityColor(zone: AccidentZone): string {
  if (zone.isAccidentProne) {
    switch (zone.severity) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#f97316"
      default:
        return "#f59e0b"
    }
  }

  switch (zone.severity) {
    case "medium":
      return "#eab308"
    default:
      return "#94a3b8"
  }
}

export function getMarkerPresentation(zone: AccidentZone): {
  pingClass: string
  borderClass: string
  icon: string
  showPing: boolean
} {
  if (zone.isAccidentProne) {
    if (zone.severity === "high") {
      return {
        pingClass: "bg-red-400/25",
        borderClass: "border-red-500",
        icon: "⚠️",
        showPing: true
      }
    }
    if (zone.severity === "medium") {
      return {
        pingClass: "bg-orange-400/20",
        borderClass: "border-orange-400",
        icon: "⚠️",
        showPing: false
      }
    }
    return {
      pingClass: "bg-amber-400/15",
      borderClass: "border-amber-400",
      icon: "⚠️",
      showPing: false
    }
  }

  switch (zone.incidentType) {
    case "closure":
      return {
        pingClass: "",
        borderClass: "border-slate-400",
        icon: "⛔",
        showPing: false
      }
    case "construction":
      return {
        pingClass: "",
        borderClass: "border-yellow-500",
        icon: "🚧",
        showPing: false
      }
    case "congestion":
      return {
        pingClass: "",
        borderClass: "border-yellow-600/80",
        icon: "🚗",
        showPing: false
      }
    default:
      return {
        pingClass: "",
        borderClass: "border-white/30",
        icon: "ℹ️",
        showPing: false
      }
  }
}

export function buildCinematicPanelData(zone: AccidentZone) {
  return {
    name: zone.roadName,
    incidentLabel: getIncidentTypeLabel(zone.incidentType),
    riskScore: getRiskScore(zone),
    reason: zone.description,
    warning: getSafetyWarning(zone),
    severity: getSeverityLabel(zone),
    isAccidentProne: zone.isAccidentProne,
    magnitudeOfDelay: zone.magnitudeOfDelay,
    lastUpdated: "Live"
  }
}
