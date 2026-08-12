export interface RouteCheckpoint {
  lat: number
  lng: number
  progress: number // 0 to 1
  distanceFromStart: number // in km
  elapsedSeconds: number
  etaIso: string
  etaFormatted: string
  etaTimestamp: number // epoch ms
}

function haversineDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const R = 6371 // Earth's radius in km
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function formatEtaTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  })
}

export function generateRouteCheckpoints(
  coordinates: [number, number][],
  totalDistanceMeters: number,
  totalDurationSeconds: number,
  departureDate: Date
): RouteCheckpoint[] {
  if (!coordinates || coordinates.length === 0) {
    return []
  }

  if (coordinates.length === 1) {
    const [lng, lat] = coordinates[0]
    return [
      {
        lat,
        lng,
        progress: 0,
        distanceFromStart: 0,
        elapsedSeconds: 0,
        etaIso: departureDate.toISOString(),
        etaFormatted: formatEtaTime(departureDate),
        etaTimestamp: departureDate.getTime()
      }
    ]
  }

  // Calculate cumulative distances along coordinates
  const cumDistances: number[] = [0]
  for (let i = 1; i < coordinates.length; i++) {
    const [prevLng, prevLat] = coordinates[i - 1]
    const [lng, lat] = coordinates[i]
    const segDist = haversineDistanceKm(prevLat, prevLng, lat, lng)
    cumDistances.push(cumDistances[i - 1] + segDist)
  }

  const calcTotalDistKm = cumDistances[cumDistances.length - 1]
  const totalKm = totalDistanceMeters > 0 ? totalDistanceMeters / 1000 : calcTotalDistKm

  // Determine optimal checkpoint count
  let targetCount = 5
  if (totalKm < 15 || totalDurationSeconds < 1800) {
    targetCount = 3
  } else if (totalKm < 50 || totalDurationSeconds < 3600) {
    targetCount = 5
  } else if (totalKm < 150 || totalDurationSeconds < 10800) {
    targetCount = 7
  } else if (totalKm < 300) {
    targetCount = 9
  } else {
    targetCount = 11
  }

  const checkpoints: RouteCheckpoint[] = []
  const stepFraction = 1 / (targetCount - 1)

  for (let c = 0; c < targetCount; c++) {
    const progress = Math.min(1, Math.max(0, c * stepFraction))
    const targetDist = progress * calcTotalDistKm

    // Find nearest coordinate segment
    let coordIdx = 0
    while (
      coordIdx < cumDistances.length - 1 &&
      cumDistances[coordIdx + 1] < targetDist
    ) {
      coordIdx++
    }

    let lat = coordinates[coordIdx][1]
    let lng = coordinates[coordIdx][0]

    // Interpolate exact position if between coordinates
    if (coordIdx < cumDistances.length - 1) {
      const segStart = cumDistances[coordIdx]
      const segEnd = cumDistances[coordIdx + 1]
      const segLen = segEnd - segStart

      if (segLen > 0) {
        const segRatio = (targetDist - segStart) / segLen
        const [lng1, lat1] = coordinates[coordIdx]
        const [lng2, lat2] = coordinates[coordIdx + 1]

        lng = lng1 + (lng2 - lng1) * segRatio
        lat = lat1 + (lat2 - lat1) * segRatio
      }
    }

    const distanceFromStart = parseFloat((progress * totalKm).toFixed(1))
    const elapsedSeconds = Math.round(progress * totalDurationSeconds)
    const etaTimestamp = departureDate.getTime() + elapsedSeconds * 1000
    const etaDate = new Date(etaTimestamp)

    checkpoints.push({
      lat,
      lng,
      progress,
      distanceFromStart,
      elapsedSeconds,
      etaIso: etaDate.toISOString(),
      etaFormatted: formatEtaTime(etaDate),
      etaTimestamp
    })
  }

  return checkpoints
}
