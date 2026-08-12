import type { AccidentZone } from "@/lib/accidents"

export interface WeatherPoint {
  coord: [number, number]
  weather: {
    name: string
    main: {
      temp: number
    }
    weather: {
      main: string
      description: string
    }[]
  }
}

export interface Journey {
  origin: string
  destination: string
  departureDate: string
  departureTime: string
  routeGeoJSON: any
  distance: number
  duration: number
  weatherPoints: WeatherPoint[]
  accidentZones: AccidentZone[]
  travelAdvice: string
}

export function createEmptyJourney(): Journey {
  return {
    origin: "",
    destination: "",
    departureDate: new Date().toISOString().split("T")[0],
    departureTime: new Date().toTimeString().slice(0, 5),
    routeGeoJSON: null,
    distance: 0,
    duration: 0,
    weatherPoints: [],
    accidentZones: [],
    travelAdvice: "",
  }
}
