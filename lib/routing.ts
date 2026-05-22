const GRAPHHOPPER_API_KEY =
  process.env
    .NEXT_PUBLIC_GRAPHHOPPER_KEY

/* GEOCODING */

export async function getCoordinates(
  place: string
): Promise<[number, number] | null>{

  const res = await fetch(

    `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(
      place
    )}&limit=1&key=${GRAPHHOPPER_API_KEY}`

  )

  const data = await res.json()

  if (
    !data.hits ||
    data.hits.length === 0
  ) {
    return null
  }

  return [
    data.hits[0].point.lng,
    data.hits[0].point.lat
  ]
}

/* ROUTING */

export async function getRoute(
  start: [number, number],
  end: [number, number]
) {

  const res = await fetch(

    `https://graphhopper.com/api/1/route?point=${start[1]},${start[0]}&point=${end[1]},${end[0]}&vehicle=car&points_encoded=false&key=${GRAPHHOPPER_API_KEY}`

  )

  const data = await res.json()

  /* CONVERT TO GEOJSON */

  return {

    type: "FeatureCollection",

    features: [

      {

        type: "Feature",

        properties: {

          summary: {
            distance:
              data.paths[0].distance,

            duration:
              data.paths[0].time / 1000
          }

        },

        geometry: {

          type: "LineString",

          coordinates:
            data.paths[0]
              .points.coordinates
        }

      }

    ]

  }

}