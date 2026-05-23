export interface AccidentZone {
  id: string
  name: string
  coordinates: [number, number]
  severity: "low" | "medium" | "high"
  reason: string
  riskScore: number
  radius?: number
}

export const accidentZones: AccidentZone[] = [
  {
    id: "zone-1",
    name: "Mumbai-Pune Expressway",
    coordinates: [73.7124, 18.5548],
    severity: "high",
    reason: "Frequent landslide area during monsoon",
    riskScore: 92,
    radius: 15000
  },
  {
    id: "zone-2",
    name: "Delhi-Gurgaon Highway",
    coordinates: [77.0266, 28.4594],
    severity: "high",
    reason: "High traffic congestion and accident-prone junctions",
    riskScore: 88,
    radius: 12000
  },
  {
    id: "zone-3",
    name: "Bangalore-Mysore Road",
    coordinates: [77.5999, 12.9716],
    severity: "medium",
    reason: "Poor visibility during fog season",
    riskScore: 72,
    radius: 10000
  },
  {
    id: "zone-4",
    name: "Chennai-Bangalore Highway",
    coordinates: [79.1382, 13.0827],
    severity: "medium",
    reason: "Narrow bridges and sharp curves",
    riskScore: 68,
    radius: 11000
  },
  {
    id: "zone-5",
    name: "Kolkata-Durgapur Expressway",
    coordinates: [88.3639, 22.5726],
    severity: "low",
    reason: "Occasional flooding during heavy rains",
    riskScore: 45,
    radius: 8000
  },
  {
    id: "zone-6",
    name: "Ahmedabad-Vadodara Expressway",
    coordinates: [72.5726, 23.0225],
    severity: "medium",
    reason: "High-speed corridor with multiple intersections",
    riskScore: 65,
    radius: 9000
  },
  {
    id: "zone-7",
    name: "Hyderabad-Warangal Highway",
    coordinates: [78.4867, 17.3850],
    severity: "low",
    reason: "Construction zones with lane closures",
    riskScore: 42,
    radius: 7500
  },
  {
    id: "zone-8",
    name: "Jaipur-Ajmer Highway",
    coordinates: [75.8223, 26.9124],
    severity: "medium",
    reason: "Steep gradients and blind spots",
    riskScore: 70,
    radius: 9500
  },
  {
    id: "zone-9",
    name: "Lucknow-Kanpur Highway",
    coordinates: [80.9462, 26.8467],
    severity: "low",
    reason: "Uneven road surface in sections",
    riskScore: 38,
    radius: 7000
  },
  {
    id: "zone-10",
    name: "Coimbatore-Salem Highway",
    coordinates: [76.9558, 11.0168],
    severity: "high",
    reason: "Mountainous terrain with hairpin bends",
    riskScore: 85,
    radius: 13000
  }
]

export function getSeverityColor(severity: AccidentZone["severity"]): string {
  switch (severity) {
    case "low":
      return "#f59e0b" // amber
    case "medium":
      return "#f97316" // orange
    case "high":
      return "#ef4444" // red
  }
}

export function getSeverityLabel(severity: AccidentZone["severity"]): string {
  switch (severity) {
    case "low":
      return "Low Risk"
    case "medium":
      return "Medium Risk"
    case "high":
      return "High Risk"
  }
}
