"use client"

import { AccidentZone, getSeverityColor, getSeverityLabel } from "@/lib/accident-zones"

interface AccidentDetailPanelProps {
  zone: AccidentZone
  onClose: () => void
}

export default function AccidentDetailPanel({
  zone,
  onClose
}: AccidentDetailPanelProps) {

  const severityColor = getSeverityColor(zone.severity)
  const severityLabel = getSeverityLabel(zone.severity)

  return (
    <div
      className="
        absolute
        bottom-6
        right-6
        z-50

        w-[360px]

        rounded-2xl

        bg-black/40
        backdrop-blur-2xl

        p-5

        shadow-[0_8px_32px_rgba(0,0,0,0.4)]
      "
    >

      <div className="flex items-start justify-between">

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <div className="text-xl font-semibold text-white">
              {zone.name}
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <div
              className="px-2.5 py-1 rounded-md text-xs font-semibold text-white"
              style={{ backgroundColor: severityColor }}
            >
              {severityLabel}
            </div>
            <div className="text-sm text-white/40">
              Risk Score: {zone.riskScore}/100
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="
            w-8
            h-8

            rounded-full

            bg-white/5
            border border-white/10

            text-white/60

            hover:bg-white/10
            transition-all
          "
        >
          ✕
        </button>

      </div>

      <div className="mt-5 space-y-3">

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase">
            Accident Reason
          </div>
          <div className="mt-2 text-sm text-white font-medium leading-relaxed">
            {zone.reason}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase">
            Travel Recommendation
          </div>
          <div className="mt-2 text-sm text-white font-medium leading-relaxed">
            {zone.severity === "high"
              ? "Consider alternate route. Exercise extreme caution if this route is unavoidable."
              : zone.severity === "medium"
              ? "Drive with caution. Maintain safe distance and reduce speed in this area."
              : "Route is generally safe. Stay alert for changing conditions."}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase">
            Safety Warning
          </div>
          <div className="mt-2 text-sm text-white font-medium leading-relaxed">
            {zone.severity === "high"
              ? "⚠️ High-risk zone. Avoid during adverse weather conditions."
              : zone.severity === "medium"
              ? "⚡ Moderate risk. Check local traffic updates before traveling."
              : "✅ Low risk area. Standard driving precautions apply."}
          </div>
        </div>

      </div>

    </div>
  )
}
