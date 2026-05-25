/**
 * Isolated accident-fetching utility
 * Completely independent from weather, route, and map rendering systems
 */

export type AccidentZone = {
  id: string
  lat: number
  lng: number
  severity: 'low' | 'medium' | 'high'
  description: string
  roadName: string
}

/**
 * Calculate distance between two coordinates in kilometers using Haversine formula
 */
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Sample route coordinates approximately every 15km
 */
function sampleRouteCoordinates(coordinates: [number, number][]): [number, number][] {
  if (coordinates.length === 0) return []

  const sampled: [number, number][] = [coordinates[0]]
  const samplingIntervalKm = 15

  for (let i = 1; i < coordinates.length; i++) {
    const [lng, lat] = coordinates[i]
    const [prevLng, prevLat] = sampled[sampled.length - 1]
    const distance = calculateDistance(prevLat, prevLng, lat, lng)

    if (distance >= samplingIntervalKm) {
      sampled.push([lng, lat])
    }
  }

  // Always include the last coordinate
  if (sampled.length > 0 && sampled[sampled.length - 1] !== coordinates[coordinates.length - 1]) {
    sampled.push(coordinates[coordinates.length - 1])
  }

  return sampled
}

/**
 * Normalize TomTom incident response to AccidentZone
 */
function normalizeIncident(incident: any): AccidentZone | null {
  try {
    const position = incident.position || incident.geometry?.coordinates
    if (!position || !Array.isArray(position) || position.length < 2) {
      return null
    }

    const lng = position[0]
    const lat = position[1]

    // Map TomTom severity to our severity levels
    let severity: 'low' | 'medium' | 'high' = 'low'
    if (incident.magnitudeOfDelay === 'major' || incident.impact === 'high') {
      severity = 'high'
    } else if (incident.magnitudeOfDelay === 'moderate' || incident.impact === 'medium') {
      severity = 'medium'
    }

    const description = incident.description || incident.incidentType || 'Unknown incident'
    const roadName = incident.roadName || incident.primaryRoadName || 'Unknown road'

    return {
      id: incident.id || `${lng}-${lat}-${Date.now()}`,
      lat,
      lng,
      severity,
      description,
      roadName
    }
  } catch (error) {
    return null
  }
}

/**
 * Deduplicate incidents within 5km, keeping higher severity
 */
function deduplicateIncidents(incidents: AccidentZone[]): AccidentZone[] {
  const severityOrder = { high: 3, medium: 2, low: 1 }
  const deduped: AccidentZone[] = []

  for (const incident of incidents) {
    let isDuplicate = false

    for (const existing of deduped) {
      const distance = calculateDistance(incident.lat, incident.lng, existing.lat, existing.lng)
      if (distance < 5) { // Within 5km
        // Keep the one with higher severity
        if (severityOrder[incident.severity] > severityOrder[existing.severity]) {
          // Replace existing with higher severity
          const index = deduped.indexOf(existing)
          deduped[index] = incident
        }
        isDuplicate = true
        break
      }
    }

    if (!isDuplicate) {
      deduped.push(incident)
    }
  }

  return deduped
}

/**
 * Sort incidents by severity (high → medium → low)
 */
function sortIncidents(incidents: AccidentZone[]): AccidentZone[] {
  const severityOrder = { high: 3, medium: 2, low: 1 }
  return incidents.sort((a, b) => severityOrder[b.severity] - severityOrder[a.severity])
}

/**
 * Fetch accidents along route using TomTom Incidents API v5
 * 
 * @param coordinates - Route coordinates as [lng, lat] arrays
 * @param apiKey - TomTom API key
 * @returns Array of AccidentZone objects, empty array on failure
 */
export async function getAccidentsAlongRoute(
  coordinates: [number, number][],
  apiKey: string
): Promise<AccidentZone[]> {
  try {
    if (!coordinates || coordinates.length === 0) {
      console.log('No coordinates provided for accident fetching')
      return []
    }

    if (!apiKey) {
      console.log('No API key provided for accident fetching')
      return []
    }

    // Sample route approximately every 15km
    const sampledCoordinates = sampleRouteCoordinates(coordinates)
    console.log(`Sampling ${sampledCoordinates.length} points from ${coordinates.length} route coordinates`)

    const allIncidents: AccidentZone[] = []

    // Fetch incidents for each sampled coordinate
    for (const [lng, lat] of sampledCoordinates) {
      try {
        // Use small bbox (±0.05 degrees)
        const bbox = `${lng - 0.05},${lat - 0.05},${lng + 0.05},${lat + 0.05}`
        const url = `https://api.tomtom.com/traffic/services/5/incidentDetails?bbox=${bbox}&timeValidityFilter=present&key=${apiKey}`

        const response = await fetch(url)
        if (!response.ok) {
          console.log(`Failed to fetch incidents for coordinate [${lng}, ${lat}]: ${response.status}`)
          continue
        }

        const data = await response.json()
        const incidents = data.incidents || []

        // Normalize each incident
        for (const incident of incidents) {
          const normalized = normalizeIncident(incident)
          if (normalized) {
            allIncidents.push(normalized)
          }
        }
      } catch (error) {
        console.log(`Error fetching incidents for coordinate [${lng}, ${lat}]:`, error)
        // Continue with next coordinate
      }
    }

    console.log(`Total fetched incidents: ${allIncidents.length}`)

    // Deduplicate incidents
    const deduped = deduplicateIncidents(allIncidents)
    console.log(`After deduplication: ${deduped.length}`)

    // Sort by severity
    const sorted = sortIncidents(deduped)

    // Hard cap at 8 incidents
    const capped = sorted.slice(0, 8)
    console.log(`Final returned count: ${capped.length}`)

    return capped
  } catch (error) {
    console.log('Error in getAccidentsAlongRoute:', error)
    return []
  }
}
