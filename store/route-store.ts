import { create } from "zustand"
import type { AccidentZone } from "@/lib/accidents"

interface RouteStore {

  routeGeoJSON: any
  weatherPoints: any[]

  distance: number
  duration: number

  travelAdvice: string

  accidentZones: AccidentZone[]

  departureDate: string
  departureTime: string

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

  setAccidentZones: (
    zones: AccidentZone[]
  ) => void

  setDepartureDate: (
    date: string
  ) => void

  setDepartureTime: (
    time: string
  ) => void
}

export const useRouteStore =
  create<RouteStore>((set) => ({

    routeGeoJSON: null,

    weatherPoints: [],

    distance: 0,

    duration: 0,

    travelAdvice: "",

    accidentZones: [],

    departureDate: new Date().toISOString().split("T")[0],

    departureTime: new Date().toTimeString().slice(0, 5),

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
      }),

    setAccidentZones: (zones) =>
      set({
        accidentZones: zones
      }),

    setDepartureDate: (date) =>
      set({
        departureDate: date
      }),

    setDepartureTime: (time) =>
      set({
        departureTime: time
      })

  }))