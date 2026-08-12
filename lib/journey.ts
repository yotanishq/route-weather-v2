import type { AccidentZone } from "@/lib/accidents"

export interface WeatherPoint {
  coord: [number, number]
  weather: {
    name: string
    main: {
      temp: number
    }
    weather: {
      main: string
      description: string
    }[]
  }
}

export interface RouteCheckpoint {
  latitude: number
  longitude: number
  progress: number // 0 to 1
  distanceFromStart: number // in km
  elapsedDuration: number // in seconds
  estimatedArrivalTime: Date
}

export interface Journey {
  origin: string
  destination: string
  departureDate: string
  departureTime: string
  routeGeoJSON: any
  distance: number
  duration: number
  weatherPoints: WeatherPoint[]
  accidentZones: AccidentZone[]
  travelAdvice: string
  checkpoints: RouteCheckpoint[]
}

export function createEmptyJourney(): Journey {
  return {
    origin: "",
    destination: "",
    departureDate: new Date().toISOString().split("T")[0],
    departureTime: new Date().toTimeString().slice(0, 5),
    routeGeoJSON: null,
    distance: 0,
    duration: 0,
    weatherPoints: [],
    accidentZones: [],
    travelAdvice: "",
    checkpoints: [],
  }
}

/**
 * Generate route checkpoints based on distance intervals
 * Includes origin, destination, and intermediate checkpoints
 */
export function generateCheckpoints(
  coordinates: [number, number][],
  totalDistanceKm: number,
  totalDurationSeconds: number,
  departureDateTime: Date
): RouteCheckpoint[] {
  if (!coordinates || coordinates.length < 2) {
    return []
  }

  const checkpoints: RouteCheckpoint[] = []

  // Always include origin
  checkpoints.push({
    latitude: coordinates[0][1],
    longitude: coordinates[0][0],
    progress: 0,
    distanceFromStart: 0,
    elapsedDuration: 0,
    estimatedArrivalTime: new Date(departureDateTime),
  })

  // Determine checkpoint interval based on total distance
  // Short routes (< 50km): fewer checkpoints
  // Medium routes (50-200km): moderate checkpoints
  // Long routes (> 200km): more checkpoints
  let intervalKm: number
  if (totalDistanceKm < 50) {
    intervalKm = 10 // Checkpoints every 10km for short routes
  } else if (totalDistanceKm < 200) {
    intervalKm = 25 // Checkpoints every 25km for medium routes
  } else {
    intervalKm = 50 // Checkpoints every 50km for long routes
  }

  // Calculate cumulative distance along route
  const cumulativeDistances: number[] = [0]
  let currentDistance = 0

  for (let i = 1; i < coordinates.length; i++) {
    const [lon1, lat1] = coordinates[i - 1]
    const [lon2, lat2] = coordinates[i]
    const segmentDistance = haversineDistance(lat1, lon1, lat2, lon2)
    currentDistance += segmentDistance
    cumulativeDistances.push(currentDistance)
  }

  // Generate intermediate checkpoints at distance intervals
  let nextCheckpointDistance = intervalKm
  while (nextCheckpointDistance < totalDistanceKm) {
    // Find the coordinate closest to this distance
    const closestIndex = findClosestCoordinateIndex(cumulativeDistances, nextCheckpointDistance)

    if (closestIndex > 0 && closestIndex < coordinates.length - 1) {
      const [lon, lat] = coordinates[closestIndex]
      const progress = cumulativeDistances[closestIndex] / totalDistanceKm
      const elapsedDuration = progress * totalDurationSeconds
      const estimatedArrivalTime = new Date(departureDateTime.getTime() + elapsedDuration * 1000)

      checkpoints.push({
        latitude: lat,
        longitude: lon,
        progress,
        distanceFromStart: cumulativeDistances[closestIndex],
        elapsedDuration,
        estimatedArrivalTime,
      })
    }

    nextCheckpointDistance += intervalKm
  }

  // Always include destination
  checkpoints.push({
    latitude: coordinates[coordinates.length - 1][1],
    longitude: coordinates[coordinates.length - 1][0],
    progress: 1,
    distanceFromStart: totalDistanceKm,
    elapsedDuration: totalDurationSeconds,
    estimatedArrivalTime: new Date(departureDateTime.getTime() + totalDurationSeconds * 1000),
  })

  return checkpoints
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometers
 */
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180)
}

/**
 * Find the index of the coordinate closest to the target distance
 */
function findClosestCoordinateIndex(cumulativeDistances: number[], targetDistance: number): number {
  let closestIndex = 0
  let closestDiff = Math.abs(cumulativeDistances[0] - targetDistance)

  for (let i = 1; i < cumulativeDistances.length; i++) {
    const diff = Math.abs(cumulativeDistances[i] - targetDistance)
    if (diff < closestDiff) {
      closestDiff = diff
      closestIndex = i
    }
  }

  return closestIndex
}
