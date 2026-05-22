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

          temperature:
            point.weather.main.temp,

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
      id="heatmap-source-static"
      type="geojson"
      data={heatmapGeoJSON as any}
    >

      <Layer
        id="heatmap-layer-static"
        type="heatmap"

        paint={{

          "heatmap-weight": [
  "interpolate",
  ["linear"],
  ["get", "intensity"],
  0,   0.05,
  0.3, 0.2,
  0.6, 0.5,
  1,   1
],

"heatmap-intensity": [
  "interpolate",
  ["linear"],
  ["zoom"],
  0,  0.3,
  5,  0.6,
  7,  1.0,
  10, 1.5,
  13, 2.0
],

"heatmap-radius": [
  "interpolate",
  ["linear"],
  ["zoom"],
  3,  12,
  5,  18,
  7,  26,
  10, 36,
  13, 48
],
          "heatmap-opacity": 0.88,

          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,   "rgba(0,0,0,0)",
            0.2, "#0ea5e9",
            0.4, "#22c55e",
            0.6, "#eab308",
            0.8, "#f97316",
            1,   "#ef4444"
          ]

        }}
      />

    </Source>

  )

}