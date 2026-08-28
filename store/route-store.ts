import { create } from "zustand"
import type { Journey, RouteCheckpoint, JourneyAnalysis } from "@/lib/journey"
import { createEmptyJourney } from "@/lib/journey"

interface RouteStore {
  journey: Journey

  setJourney: (journey: Journey) => void

  setJourneyOrigin: (origin: string) => void
  setJourneyDestination: (destination: string) => void
  setCheckpoints: (checkpoints: RouteCheckpoint[]) => void
  setAnalysis: (analysis: JourneyAnalysis) => void

  setRouteGeoJSON: (data: any) => void
  setWeatherPoints: (points: any[]) => void
  setDistance: (distance: number) => void
  setDuration: (duration: number) => void
  setTravelAdvice: (advice: string) => void
  setAccidentZones: (zones: any[]) => void
  setDepartureDate: (date: string) => void
  setDepartureTime: (time: string) => void
}

export const useRouteStore =
  create<RouteStore>((set) => {

    const emptyJourney = createEmptyJourney()

    return {

      journey: emptyJourney,

      setJourney: (journey) =>
        set(() => ({
          journey
        })),

      setRouteGeoJSON: (data) =>
        set((state) => ({
          journey: { ...state.journey, routeGeoJSON: data }
        })),

      setWeatherPoints: (points) =>
        set((state) => ({
          journey: { ...state.journey, weatherPoints: points }
        })),

      setDistance: (distance) =>
        set((state) => ({
          journey: { ...state.journey, distance }
        })),

      setDuration: (duration) =>
        set((state) => ({
          journey: { ...state.journey, duration }
        })),

      setTravelAdvice: (advice) =>
        set((state) => ({
          journey: { ...state.journey, travelAdvice: advice }
        })),

      setAccidentZones: (zones) =>
        set((state) => ({
          journey: { ...state.journey, accidentZones: zones }
        })),

      setDepartureDate: (date) =>
        set((state) => ({
          journey: { ...state.journey, departureDate: date }
        })),

      setDepartureTime: (time) =>
        set((state) => ({
          journey: { ...state.journey, departureTime: time }
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