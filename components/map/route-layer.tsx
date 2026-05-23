"use client"

import {
  Source,
  Layer
} from "react-map-gl/maplibre"

interface RouteLayerProps {
  routeGeoJSON: any
  routeColor: string
}

export function RouteLayer({
  routeGeoJSON,
  routeColor
}: RouteLayerProps) {

  if (!routeGeoJSON) return null

  return (

    <Source
      id="route"
      type="geojson"
      data={routeGeoJSON}
    >

      {/* outer glow - ambient bloom */}

      <Layer
        id="route-glow-outer"
        type="line"
        paint={{
          "line-color": routeColor,
          "line-width": 40,
          "line-opacity": 0.06,
          "line-blur": 32
        }}
      />

      {/* mid glow - energy field */}

      <Layer
        id="route-glow-mid"
        type="line"
        paint={{
          "line-color": routeColor,
          "line-width": 24,
          "line-opacity": 0.12,
          "line-blur": 18
        }}
      />

      {/* inner glow - core aura */}

      <Layer
        id="route-glow-inner"
        type="line"
        paint={{
          "line-color": routeColor,
          "line-width": 14,
          "line-opacity": 0.25,
          "line-blur": 10
        }}
      />

      {/* main route - core line */}

      <Layer
        id="route-line"
        type="line"
        paint={{
          "line-color": routeColor,
          "line-width": 4,
          "line-opacity": 1,
          "line-blur": 0.5
        }}
      />

      {/* bright core overlay */}

      <Layer
        id="route-core"
        type="line"
        paint={{
          "line-color": "#ffffff",
          "line-width": 1.5,
          "line-opacity": 0.4,
          "line-blur": 0
        }}
      />

    </Source>

  )

}