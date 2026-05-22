// store/map-store.ts

import { create } from "zustand"

interface ViewState {
  longitude: number
  latitude: number
  zoom: number
}

interface MapStore {

  mapMode: "normal" | "terrain" | "heatmap"

  setMapMode: (
    mode: "normal" | "terrain" | "heatmap"
  ) => void

  minimizedAnalytics: boolean

  setMinimizedAnalytics: (
    minimized: boolean
  ) => void

  popupInfo: any

  setPopupInfo: (
    info: any
  ) => void

  zoom: number

  setZoom: (
    zoom: number
  ) => void

  viewState: ViewState

  setViewState: (
    viewState: ViewState
  ) => void
}

export const useMapStore =
  create<MapStore>((set) => ({

    mapMode: "normal",

    setMapMode: (mode) =>
      set({ mapMode: mode }),

    minimizedAnalytics: false,

    setMinimizedAnalytics: (value) =>
      set({
        minimizedAnalytics: value
      }),

    popupInfo: null,

    setPopupInfo: (info) =>
      set({
        popupInfo: info
      }),

    zoom: 4.5,

    setZoom: (zoom) =>
      set({ zoom }),

    viewState: {
      longitude: 78.9629,
      latitude: 20.5937,
      zoom: 4.5
    },

    setViewState: (viewState) =>
      set({ viewState })

  }))