"use client"

import type { AccidentZone } from "@/lib/accidents"
import {
  getIncidentTypeLabel,
  getRiskScore,
  getSafetyWarning,
  getSeverityColor,
  getSeverityLabel,
  getTravelRecommendation
} from "@/lib/accident-incident-copy"

interface AccidentDetailPanelProps {
  zone: AccidentZone
  onClose: () => void
}

export default function AccidentDetailPanel({
  zone,
  onClose
}: AccidentDetailPanelProps) {
  const severityColor = getSeverityColor(zone)
  const severityLabel = getSeverityLabel(zone)
  const incidentLabel = getIncidentTypeLabel(zone.incidentType)

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
            <span className="text-xl">
              {zone.isAccidentProne ? "⚠️" : "ℹ️"}
            </span>
            <div>
              <div className="text-xl font-semibold text-white">
                {zone.roadName}
              </div>
              <div className="mt-0.5 text-xs text-white/45">
                {incidentLabel}
              </div>
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
              {zone.isAccidentProne ? "Risk" : "Delay"} score:{" "}
              {getRiskScore(zone)}/100
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
            {zone.isAccidentProne ? "Accident reason" : "Incident details"}
          </div>
          <div className="mt-2 text-sm text-white font-medium leading-relaxed">
            {zone.description}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase">
            Travel recommendation
          </div>
          <div className="mt-2 text-sm text-white font-medium leading-relaxed">
            {getTravelRecommendation(zone)}
          </div>
        </div>

        <div className="rounded-2xl bg-white/[0.03] p-4">
          <div className="text-[10px] text-white/40 font-semibold tracking-widest uppercase">
            Safety warning
          </div>
          <div className="mt-2 text-sm text-white font-medium leading-relaxed">
            {getSafetyWarning(zone)}
          </div>
        </div>

      </div>

    </div>
  )
}
