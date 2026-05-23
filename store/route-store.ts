import { create } from "zustand"
import { TrafficIncident } from "@/lib/tomtomTraffic"

interface RouteStore {

  routeGeoJSON: any
  weatherPoints: any[]
  trafficIncidents: TrafficIncident[]

  distance: number
  duration: number

  travelAdvice: string
  routeSafetyScore: number

  setRouteGeoJSON: (
    data: any
  ) => void

  setWeatherPoints: (
    points: any[]
  ) => void

  setTrafficIncidents: (
    incidents: TrafficIncident[]
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

  setRouteSafetyScore: (
    score: number
  ) => void
}

export const useRouteStore =
  create<RouteStore>((set) => ({

    routeGeoJSON: null,

    weatherPoints: [],
    trafficIncidents: [],

    distance: 0,

    duration: 0,

    travelAdvice: "",
    routeSafetyScore: 85,

    setRouteGeoJSON: (data) =>
      set({
        routeGeoJSON: data
      }),

    setWeatherPoints: (points) =>
      set({
        weatherPoints: points
      }),

    setTrafficIncidents: (incidents) =>
      set({
        trafficIncidents: incidents
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

    setRouteSafetyScore: (score) =>
      set({
        routeSafetyScore: score
      })

  }))