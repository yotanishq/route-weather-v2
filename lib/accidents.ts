export type IncidentType =
  | "accident"
  | "congestion"
  | "closure"
  | "construction"
  | "road_hazard"
  | "other"

export type AccidentZone = {
  lat: number
  lng: number
  severity: "low" | "medium" | "high"
  description: string
  roadName: string
  incidentType: IncidentType
  iconCategory: number
  magnitudeOfDelay: number
  isAccidentProne: boolean
}

const ROUTE_BBOX_BUFFER = 0.06
const MAX_BBOX_SPAN = 0.45
const ROUTE_CORRIDOR_KM = 3
const DEDUPE_RADIUS_KM = 2
const MAX_ACCIDENTS = 8

const FIELDS =
  "{incidents{type,geometry{type,coordinates},properties{iconCategory,magnitudeOfDelay,events{description},roadNumbers}}}"

const CATEGORY_FILTER = "0,1,2,3,4,5,6,7,8,9,10,11,14"

const SEVERITY_RANK: Record<AccidentZone["severity"], number> = {
  high: 3,
  medium: 2,
  low: 1
}

type TomTomIncident = {
  geometry?: {
    type?: string
    coordinates?: number[] | number[][]
  }
  properties?: {
    iconCategory?: number
    magnitudeOfDelay?: number
    events?: { description?: string }[]
    roadNumbers?: string[]
  }
}

function extractLngLat(geometry: TomTomIncident["geometry"]): [number, number] | null {
  if (!geometry?.coordinates) return null

  const { type, coordinates } = geometry

  if (type === "Point" && Array.isArray(coordinates) && coordinates.length >= 2) {
    const [lng, lat] = coordinates as number[]
    if (typeof lng === "number" && typeof lat === "number") {
      return [lng, lat]
    }
  }

  if (type === "LineString" && Array.isArray(coordinates) && coordinates.length > 0) {
    const first = coordinates[0] as number[]
    if (Array.isArray(first) && first.length >= 2) {
      return [first[0], first[1]]
    }
  }

  if (Array.isArray(coordinates[0]) && (coordinates[0] as number[]).length >= 2) {
    const first = coordinates[0] as number[]
    return [first[0], first[1]]
  }

  return null
}

function mapIncidentType(iconCategory?: number): IncidentType {
  switch (iconCategory) {
    case 1:
      return "accident"
    case 5:
    case 6:
    case 7:
      return "congestion"
    case 8:
    case 9:
      return "closure"
    case 10:
      return "construction"
    case 11:
      return "road_hazard"
    default:
      return "other"
  }
}

function mapSeverity(
  iconCategory?: number,
  magnitudeOfDelay?: number
): AccidentZone["severity"] {
  const delay = magnitudeOfDelay ?? 0

  if (iconCategory === 1) {
    if (delay >= 3) return "high"
    if (delay >= 1) return "medium"
    return "low"
  }

  if (iconCategory === 8 || iconCategory === 9) {
    return delay >= 3 ? "medium" : "low"
  }

  if (
    iconCategory === 5 ||
    iconCategory === 6 ||
    iconCategory === 7 ||
    iconCategory === 10 ||
    iconCategory === 11
  ) {
    return delay >= 3 ? "medium" : "low"
  }

  return "low"
}

const MEANINGFUL_INCIDENT_CATEGORIES = [1, 5, 6, 7, 8, 9, 10, 11]

function isAccidentIncident(
  iconCategory?: number,
  magnitudeOfDelay?: number
): boolean {
  if (iconCategory == null) return false
  if (!MEANINGFUL_INCIDENT_CATEGORIES.includes(iconCategory)) {
    return false
  }
  return (magnitudeOfDelay ?? 0) > 0
}

function parseIncident(incident: TomTomIncident): AccidentZone | null {
  const iconCategory = incident.properties?.iconCategory
  const magnitudeOfDelay = incident.properties?.magnitudeOfDelay
  if (!isAccidentIncident(iconCategory, magnitudeOfDelay)) return null

  const position = extractLngLat(incident.geometry)
  if (!position) return null

  const [lng, lat] = position
  const properties = incident.properties
  const description =
    properties?.events?.[0]?.description?.trim() || "Traffic incident reported"
  const roadName =
    properties?.roadNumbers?.[0]?.trim() ||
    properties?.roadNumbers?.join(", ") ||
    "Unknown road"

  const delay = magnitudeOfDelay ?? 0
  const incidentType = mapIncidentType(iconCategory)

  return {
    lat,
    lng,
    severity: mapSeverity(iconCategory, delay),
    description,
    roadName,
    incidentType,
    iconCategory: iconCategory ?? 0,
    magnitudeOfDelay: delay,
    isAccidentProne: iconCategory === 1
  }
}

function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const earthRadiusKm = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusKm * c
}

function distancePointToSegmentKm(
  pLat: number,
  pLng: number,
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number
): number {
  const dx = bLng - aLng
  const dy = bLat - aLat

  if (dx === 0 && dy === 0) {
    return distanceKm(pLat, pLng, aLat, aLng)
  }

  const t = Math.max(
    0,
    Math.min(1, ((pLng - aLng) * dx + (pLat - aLat) * dy) / (dx * dx + dy * dy))
  )

  return distanceKm(pLat, pLng, aLat + t * dy, aLng + t * dx)
}

function distanceToRouteKm(
  lat: number,
  lng: number,
  route: [number, number][]
): number {
  let min = Infinity

  const step = route.length > 400 ? 3 : 1
  for (let i = 0; i < route.length - 1; i += step) {
    const [lng1, lat1] = route[i]
    const [lng2, lat2] = route[i + 1]
    const d = distancePointToSegmentKm(lat, lng, lat1, lng1, lat2, lng2)
    if (d < min) min = d
  }

  return min
}

function closestRouteIndex(
  lat: number,
  lng: number,
  route: [number, number][]
): number {
  let bestIndex = 0
  let bestDist = Infinity

  const step = route.length > 400 ? 3 : 1
  for (let i = 0; i < route.length - 1; i += step) {
    const [lng1, lat1] = route[i]
    const [lng2, lat2] = route[i + 1]
    const d = distancePointToSegmentKm(lat, lng, lat1, lng1, lat2, lng2)
    if (d < bestDist) {
      bestDist = d
      bestIndex = i
    }
  }

  return bestIndex
}

function incidentKey(zone: AccidentZone): string {
  return `${zone.lat.toFixed(4)}:${zone.lng.toFixed(4)}:${zone.description}`
}

function dedupeIncidents(accidents: AccidentZone[]): AccidentZone[] {
  const sorted = [...accidents].sort(
    (a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity]
  )

  const kept: AccidentZone[] = []
  const seenKeys = new Set<string>()

  for (const accident of sorted) {
    const key = incidentKey(accident)
    if (seenKeys.has(key)) continue

    const isNearExisting = kept.some(
      (existing) =>
        distanceKm(
          accident.lat,
          accident.lng,
          existing.lat,
          existing.lng
        ) < DEDUPE_RADIUS_KM
    )

    if (isNearExisting) continue

    seenKeys.add(key)
    kept.push(accident)
  }

  return kept
}

type ScoredIncident = AccidentZone & { routeIndex: number }

function selectSpreadAlongRoute(
  incidents: ScoredIncident[],
  routeLength: number,
  max: number
): AccidentZone[] {
  if (incidents.length === 0) return []

  const bins: (ScoredIncident | null)[] = Array.from({ length: max }, () => null)

  const sorted = [...incidents].sort(
    (a, b) => SEVERITY_RANK[b.severity] - SEVERITY_RANK[a.severity]
  )

  for (const incident of sorted) {
    const fraction =
      routeLength <= 1 ? 0 : incident.routeIndex / (routeLength - 1)
    const bin = Math.min(max - 1, Math.floor(fraction * max))

    const current = bins[bin]
    if (
      !current ||
      SEVERITY_RANK[incident.severity] > SEVERITY_RANK[current.severity]
    ) {
      bins[bin] = incident
    }
  }

  const picked = bins.filter((z): z is ScoredIncident => z !== null)

  if (picked.length >= max) {
    return picked
      .sort((a, b) => a.routeIndex - b.routeIndex)
      .map(({ routeIndex: _routeIndex, ...zone }) => zone)
  }

  const used = new Set(picked.map((z) => incidentKey(z)))
  for (const incident of sorted) {
    if (picked.length >= max) break
    const key = incidentKey(incident)
    if (used.has(key)) continue
    const tooClose = picked.some(
      (existing) =>
        Math.abs(existing.routeIndex - incident.routeIndex) <
          Math.max(8, Math.floor(routeLength / max)) ||
        distanceKm(
          incident.lat,
          incident.lng,
          existing.lat,
          existing.lng
        ) < DEDUPE_RADIUS_KM
    )
    if (tooClose) continue
    picked.push(incident)
    used.add(key)
  }

  return picked
    .sort((a, b) => a.routeIndex - b.routeIndex)
    .map(({ routeIndex: _routeIndex, ...zone }) => zone)
}

function getRouteBboxes(coordinates: [number, number][]): string[] {
  const lngs = coordinates.map((c) => c[0])
  const lats = coordinates.map((c) => c[1])
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)

  const lngSpan = maxLng - minLng
  const latSpan = maxLat - minLat

  if (lngSpan <= MAX_BBOX_SPAN && latSpan <= MAX_BBOX_SPAN) {
    return [
      `${minLng - ROUTE_BBOX_BUFFER},${minLat - ROUTE_BBOX_BUFFER},${maxLng + ROUTE_BBOX_BUFFER},${maxLat + ROUTE_BBOX_BUFFER}`
    ]
  }

  const chunkCount = Math.max(
    2,
    Math.ceil(Math.max(lngSpan, latSpan) / MAX_BBOX_SPAN)
  )
  const chunkSize = Math.ceil(coordinates.length / chunkCount)
  const bboxes: string[] = []

  for (let i = 0; i < coordinates.length; i += chunkSize) {
    const chunk = coordinates.slice(i, i + chunkSize)
    if (chunk.length === 0) continue

    const cLngs = chunk.map((c) => c[0])
    const cLats = chunk.map((c) => c[1])
    bboxes.push(
      `${Math.min(...cLngs) - ROUTE_BBOX_BUFFER},${Math.min(...cLats) - ROUTE_BBOX_BUFFER},${Math.max(...cLngs) + ROUTE_BBOX_BUFFER},${Math.max(...cLats) + ROUTE_BBOX_BUFFER}`
    )
  }

  return bboxes
}

async function fetchIncidentsForBbox(
  bbox: string,
  apiKey: string
): Promise<AccidentZone[]> {
  try {
    const url = new URL(
      "https://api.tomtom.com/traffic/services/5/incidentDetails"
    )
    url.searchParams.set("key", apiKey)
    url.searchParams.set("bbox", bbox)
    url.searchParams.set("fields", FIELDS)
    url.searchParams.set("language", "en-GB")
    url.searchParams.set("categoryFilter", CATEGORY_FILTER)
    url.searchParams.set("timeValidityFilter", "present")

    const res = await fetch(url.toString())
    if (!res.ok) return []

    const data = (await res.json()) as { incidents?: TomTomIncident[] }
    const incidents = data.incidents ?? []

    const parsed: AccidentZone[] = []
    for (const incident of incidents) {
      const accident = parseIncident(incident)
      if (accident) parsed.push(accident)
    }

    return parsed
  } catch {
    return []
  }
}

export async function getAccidentsAlongRoute(
  coordinates: [number, number][],
  apiKey: string
): Promise<AccidentZone[]> {
  try {
    if (!apiKey || coordinates.length === 0) return []

    const bboxes = getRouteBboxes(coordinates)
    const results = await Promise.all(
      bboxes.map((bbox) => fetchIncidentsForBbox(bbox, apiKey))
    )

    const nearRoute: ScoredIncident[] = []

    for (const batch of results) {
      for (const accident of batch) {
        const dist = distanceToRouteKm(accident.lat, accident.lng, coordinates)
        if (dist > ROUTE_CORRIDOR_KM) continue

        nearRoute.push({
          ...accident,
          routeIndex: closestRouteIndex(
            accident.lat,
            accident.lng,
            coordinates
          )
        })
      }
    }

    const deduped = dedupeIncidents(nearRoute)
    const scored = deduped.map((zone) => ({
      ...zone,
      routeIndex: closestRouteIndex(zone.lat, zone.lng, coordinates)
    }))

    return selectSpreadAlongRoute(scored, coordinates.length, MAX_ACCIDENTS)
  } catch {
    return []
  }
}
