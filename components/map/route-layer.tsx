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

      {/* glow */}

      <Layer
        id="route-glow"
        type="line"
        paint={{
          "line-color": routeColor,
          "line-width": 14,
          "line-opacity": 0.18,
          "line-blur": 12
        }}
      />

      {/* main route */}

      <Layer
        id="route-line"
        type="line"
        paint={{
          "line-color": routeColor,
          "line-width": 5,
          "line-opacity": 0.95,
          "line-blur": 1
        }}
      />

    </Source>

  )

}