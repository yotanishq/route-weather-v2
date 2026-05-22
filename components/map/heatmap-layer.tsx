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
      weatherPoints.map((point) => ({

        type: "Feature",

        properties: {

          intensity:
            Math.min(
              Math.max(
                (
                  point.weather.main.temp - 15
                ) / 30,
                0
              ),
              1
            )

        },

        geometry: {

          type: "Point",

          coordinates:
            point.coord

        }

      }))
  }

  return (

    <Source
      id="heatmap-source"
      type="geojson"
      data={heatmapGeoJSON as any}
    >

      <Layer
        id="heatmap-layer"
        type="heatmap"

        paint={{

          "heatmap-weight": [
            "interpolate",
            ["linear"],
            ["get", "intensity"],
            0, 0,
            1, 1
          ],

          "heatmap-intensity": 1,

          "heatmap-radius": [
            "interpolate",
            ["linear"],
            ["zoom"],

            3, 10,
            6, 20,
            9, 35,
            12, 50
          ],

          "heatmap-opacity": 0.8,

          "heatmap-color": [

            "interpolate",
            ["linear"],
            ["heatmap-density"],

            0,
            "rgba(0,0,0,0)",

            0.2,
            "#0ea5e9",

            0.4,
            "#22c55e",

            0.6,
            "#eab308",

            0.8,
            "#f97316",

            1,
            "#ef4444"
          ]
        }}
      />

    </Source>

  )

}