const API_KEY =
  process.env.NEXT_PUBLIC_TOMTOM_API_KEY!

export interface TrafficIncident {
  id: string
  type: string
  geometry: {
    type: string
    coordinates: number[][]
  }
  properties: {
    iconCategory: number
    magnitudeOfDelay: number
    events: {
      description: string
    }[]
  }
  severity: 'HIGH' | 'MEDIUM' | 'LOW'
  color: string
}

export async function getTrafficIncidents(
  lat: number,
  lon: number,
  routeCoordinates?: [number, number][]
): Promise<TrafficIncident[]> {
  const bbox = [
    lon - 0.12,
    lat - 0.12,
    lon + 0.12,
    lat + 0.12,
  ].join(",")

  const url = `
https://api.tomtom.com/traffic/services/5/incidentDetails
?bbox=${bbox}
&fields={
incidents{
type,
geometry{
type,
coordinates
},
properties{
iconCategory,
magnitudeOfDelay,
events{
description
}
}
}
}
&language=en-GB
&t=1111
&key=${API_KEY}
`.replace(/\s+/g, "")

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(
      "Failed to fetch incidents"
    )
  }

  const data = await res.json()
  
  console.log('TomTom API Response:', data)
  
  if (!data.incidents) {
    console.log('No incidents in API response')
    return []
  }

  console.log('Total incidents from API:', data.incidents.length)

  // Filter and process meaningful incidents
  const meaningfulIncidents = data.incidents.filter((incident: any) => {
    const iconCategory = incident.properties?.iconCategory
    const magnitudeOfDelay = incident.properties?.magnitudeOfDelay || 0
    
    // Include: accidents (1), road closures (8-9), congestion (5-7), dangerous conditions (10)
    const meaningfulCategories = [1, 5, 6, 7, 8, 9, 10]
    
    return meaningfulCategories.includes(iconCategory) && magnitudeOfDelay > 0
  })

  console.log('Filtered meaningful incidents:', meaningfulIncidents.length)

  // Add severity classification and color coding
  const processedIncidents = meaningfulIncidents.map((incident: any, index: number) => {
    const magnitudeOfDelay = incident.properties?.magnitudeOfDelay || 0
    const iconCategory = incident.properties?.iconCategory
    
    let severity: 'HIGH' | 'MEDIUM' | 'LOW'
    let color: string

    if (magnitudeOfDelay >= 4 || iconCategory === 1 || iconCategory === 8 || iconCategory === 9) {
      severity = 'HIGH'
      color = '#ff3b5c' // neon red
    } else if (magnitudeOfDelay >= 2 || iconCategory === 5 || iconCategory === 6) {
      severity = 'MEDIUM'
      color = '#ffb020' // amber
    } else {
      severity = 'LOW'
      color = '#00ffd5' // cyan
    }

    return {
      id: `incident-${index}`,
      type: incident.type,
      geometry: incident.geometry,
      properties: incident.properties,
      severity,
      color
    }
  })

  console.log('Processed incidents with severity:', processedIncidents.length)
  console.log('Incident details:', processedIncidents)

  // Match incidents to nearest route coordinates if provided
  if (routeCoordinates && routeCoordinates.length > 0) {
    const matchedIncidents = processedIncidents.filter((incident: TrafficIncident) => {
      const incidentCoords = incident.geometry.coordinates[0]
      const incidentLat = incidentCoords[1]
      const incidentLon = incidentCoords[0]
      
      // Find nearest route coordinate
      let minDistance = Infinity
      for (const routeCoord of routeCoordinates) {
        const routeLat = routeCoord[1]
        const routeLon = routeCoord[0]
        
        const distance = Math.sqrt(
          Math.pow(incidentLat - routeLat, 2) + 
          Math.pow(incidentLon - routeLon, 2)
        )
        
        if (distance < minDistance) {
          minDistance = distance
        }
      }
      
      // Include incident if it's within 0.05 degrees of the route (approximately 5.5km)
      return minDistance < 0.05
    })
    
    console.log('Incidents matched to route:', matchedIncidents.length)
    return matchedIncidents
  }

  return processedIncidents
}