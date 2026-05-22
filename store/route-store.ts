// store/route-store.ts

import { create } from "zustand"

interface RouteStore {

  routeGeoJSON: any

  setRouteGeoJSON: (
    data: any
  ) => void

  routeColor: string

  setRouteColor: (
    color: string
  ) => void

  weatherPoints: any[]

  setWeatherPoints: (
    points: any[]
  ) => void

  vehiclePosition:
    [number, number] | null

  setVehiclePosition: (
    pos: [number, number] | null
  ) => void

  distance: string

  setDistance: (
    value: string
  ) => void

  duration: string

  setDuration: (
    value: string
  ) => void
}

export const useRouteStore =
  create<RouteStore>((set) => ({

    routeGeoJSON: null,

    setRouteGeoJSON: (data) =>
      set({
        routeGeoJSON: data
      }),

    routeColor: "#34d399",

    setRouteColor: (color) =>
      set({
        routeColor: color
      }),

    weatherPoints: [],

    setWeatherPoints: (points) =>
      set({
        weatherPoints: points
      }),

    vehiclePosition: null,

    setVehiclePosition: (pos) =>
      set({
        vehiclePosition: pos
      }),

    distance: "--",

    setDistance: (value) =>
      set({
        distance: value
      }),

    duration: "--",

    setDuration: (value) =>
      set({
        duration: value
      })

  }))