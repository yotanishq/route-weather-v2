"use client"

import {
  Source,
  Layer
} from "react-map-gl/maplibre"

interface HeatmapLayerProps {
  weatherPoints: any[]
}

export function HeatmapLayer({
  weatherPoints
}: HeatmapLayerProps) {

  if (
    !weatherPoints ||
    weatherPoints.length === 0
  ) {
    return null
  }

  const heatmapGeoJSON = {

    type: "FeatureCollection",

    features:
      weatherPoints.map((point) => {

        const temp =
          point.weather.main.temp

        let intensity = 0.2

        /* TEMPERATURE RANGES */

        if (temp <= 0) {
          intensity = 0.15
        }

        else if (temp <= 15) {
          intensity = 0.28
        }

        else if (temp <= 25) {
          intensity = 0.42
        }

        else if (temp <= 35) {
          intensity = 0.58
        }

        else if (temp <= 40) {
          intensity = 0.75
        }

        else {
          intensity = 0.92
        }

        return {

          type: "Feature",

          properties: {

            temperature: temp,

            intensity

          },

          geometry: {

            type: "Point",

            coordinates:
              point.coord

          }

        }

      })

  }

  return (

    <Source
      id="heatmap-source-static"
      type="geojson"
      data={heatmapGeoJSON as any}
    >

      <Layer
        id="heatmap-layer-static"
        type="heatmap"

        paint={{

          /* HOW STRONG EACH POINT IS */

          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],

            0, 0.08,
            1, 1.15
          ],

          /* GLOBAL HEATMAP STRENGTH */

          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],

            0, 0.55,
            5, 1,
            8, 1.6,
            12, 2.2
          ],

          /* SPREAD */

          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],

            0, 14,
            5, 24,
            8, 40,
            12, 62
          ],

          /* OVERALL VISIBILITY */

          "heatmap-opacity": 0.74,

          /* COLOR TRANSITIONS */

          "heatmap-color": [

  "interpolate",
  ["linear"],
  ["heatmap-density"],

  0,
  "rgba(0,0,0,0)",

  /* deep cold */

  0.12,
  "rgba(0,120,255,0.38)",

  /* cold */

  0.25,
  "rgba(0,210,255,0.45)",

  /* pleasant */

  0.42,
  "rgba(0,255,170,0.52)",

  /* warm */

  0.58,
  "rgba(255,230,0,0.68)",

  /* hot */

  0.76,
  "rgba(255,145,0,0.8)",

  /* extreme */

  0.94,
  "rgba(255,60,60,0.92)"
]
        }}
      />

    </Source>

  )

}