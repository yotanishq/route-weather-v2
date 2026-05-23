const API_KEY =
  process.env.NEXT_PUBLIC_TOMTOM_API_KEY!

export async function getTrafficIncidents(
  lat: number,
  lon: number
) {
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

  return res.json()
}