"use client"

interface MapControlsProps {
  mapMode: "normal" | "terrain" | "heatmap"
  setMapMode: React.Dispatch<React.SetStateAction<"normal" | "terrain" | "heatmap">>
}

export function MapControls({ mapMode, setMapMode }: MapControlsProps) {
  return (
    <div className="absolute top-5 right-14 z-50 flex items-center gap-2">
      {(["normal", "terrain", "heatmap"] as const).map((mode) => (
        <button
          key={mode}
          onClick={() => setMapMode(mode)}
          className={`
            px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wide
            transition-all duration-300
            ${mapMode === mode
              ? "bg-emerald-500 text-white shadow-lg"
              : "bg-black/40 backdrop-blur-xl text-white/60 hover:bg-black/60 hover:text-white border border-white/10"
            }
          `}
        >
          {mode}
        </button>
      ))}
    </div>
  )
}