import { create } from "zustand"
import type { AccidentZone } from "@/lib/accidents"
import type { Journey, WeatherPoint, RouteCheckpoint, JourneyAnalysis } from "@/lib/journey"
import { createEmptyJourney } from "@/lib/journey"

interface RouteStore {
  journey: Journey

  // Computed fields for backward compatibility
  routeGeoJSON: any
  weatherPoints: WeatherPoint[]
  distance: number
  duration: number
  travelAdvice: string
  accidentZones: AccidentZone[]
  departureDate: string
  departureTime: string

  setJourney: (journey: Journey) => void

  setJourneyOrigin: (origin: string) => void
  setJourneyDestination: (destination: string) => void
  setCheckpoints: (checkpoints: RouteCheckpoint[]) => void
  setAnalysis: (analysis: JourneyAnalysis) => void

  setRouteGeoJSON: (data: any) => void
  setWeatherPoints: (points: WeatherPoint[]) => void
  setDistance: (distance: number) => void
  setDuration: (duration: number) => void
  setTravelAdvice: (advice: string) => void
  setAccidentZones: (zones: AccidentZone[]) => void
  setDepartureDate: (date: string) => void
  setDepartureTime: (time: string) => void
}

export const useRouteStore =
  create<RouteStore>((set) => {

    const emptyJourney = createEmptyJourney()

    return {

      journey: emptyJourney,

      // Legacy fields for backward compatibility - derived from journey
      routeGeoJSON: emptyJourney.routeGeoJSON,
      weatherPoints: emptyJourney.weatherPoints,
      distance: emptyJourney.distance,
      duration: emptyJourney.duration,
      travelAdvice: emptyJourney.travelAdvice,
      accidentZones: emptyJourney.accidentZones,
      departureDate: emptyJourney.departureDate,
      departureTime: emptyJourney.departureTime,

      setJourney: (journey) =>
        set((state) => ({
          journey,
          routeGeoJSON: journey.routeGeoJSON,
          weatherPoints: journey.weatherPoints,
          distance: journey.distance,
          duration: journey.duration,
          travelAdvice: journey.travelAdvice,
          accidentZones: journey.accidentZones,
          departureDate: journey.departureDate,
          departureTime: journey.departureTime,
        })),

      setRouteGeoJSON: (data) =>
        set((state) => ({
          journey: { ...state.journey, routeGeoJSON: data },
          routeGeoJSON: data
        })),

      setWeatherPoints: (points) =>
        set((state) => ({
          journey: { ...state.journey, weatherPoints: points },
          weatherPoints: points
        })),

      setDistance: (distance) =>
        set((state) => ({
          journey: { ...state.journey, distance },
          distance
        })),

      setDuration: (duration) =>
        set((state) => ({
          journey: { ...state.journey, duration },
          duration
        })),

      setTravelAdvice: (advice) =>
        set((state) => ({
          journey: { ...state.journey, travelAdvice: advice },
          travelAdvice: advice
        })),

      setAccidentZones: (zones) =>
        set((state) => ({
          journey: { ...state.journey, accidentZones: zones },
          accidentZones: zones
        })),

      setDepartureDate: (date) =>
        set((state) => ({
          journey: { ...state.journey, departureDate: date },
          departureDate: date
        })),

      setDepartureTime: (time) =>
        set((state) => ({
          journey: { ...state.journey, departureTime: time },
          departureTime: time
        })),

      setJourneyOrigin: (origin) =>
        set((state) => ({
          journey: { ...state.journey, origin }
        })),

      setJourneyDestination: (destination) =>
        set((state) => ({
          journey: { ...state.journey, destination }
        })),

      setCheckpoints: (checkpoints) =>
        set((state) => ({
          journey: { ...state.journey, checkpoints }
        })),

      setAnalysis: (analysis) =>
        set((state) => ({
          journey: { ...state.journey, analysis }
        }))

    }
  })