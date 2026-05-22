// store/playback-store.ts

import { create } from "zustand"

interface PlaybackStore {

  isPlaying: boolean

  setIsPlaying: (
    value: boolean
  ) => void

  replaySpeed: number

  setReplaySpeed: (
    speed: number
  ) => void

  currentIndex: number

  setCurrentIndex: (
    index: number
  ) => void
}

export const usePlaybackStore =
  create<PlaybackStore>((set) => ({

    isPlaying: true,

    setIsPlaying: (value) =>
      set({
        isPlaying: value
      }),

    replaySpeed: 1,

    setReplaySpeed: (speed) =>
      set({
        replaySpeed: speed
      }),

    currentIndex: 0,

    setCurrentIndex: (index) =>
      set({
        currentIndex: index
      })

  }))