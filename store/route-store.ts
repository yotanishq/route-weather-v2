import { create } from "zustand"

interface RouteStore {

  routeGeoJSON: any
  weatherPoints: any[]

  distance: number
  duration: number

  travelAdvice: string

  setRouteGeoJSON: (
    data: any
  ) => void

  setWeatherPoints: (
    points: any[]
  ) => void

  setDistance: (
    distance: number
  ) => void

  setDuration: (
    duration: number
  ) => void

  setTravelAdvice: (
    advice: string
  ) => void
}

export const useRouteStore =
  create<RouteStore>((set) => ({

    routeGeoJSON: null,

    weatherPoints: [],

    distance: 0,

    duration: 0,

    travelAdvice: "",

    setRouteGeoJSON: (data) =>
      set({
        routeGeoJSON: data
      }),

    setWeatherPoints: (points) =>
      set({
        weatherPoints: points
      }),

    setDistance: (distance) =>
      set({
        distance
      }),

    setDuration: (duration) =>
      set({
        duration
      }),

    setTravelAdvice: (advice) =>
      set({
        travelAdvice: advice
      })

  }))