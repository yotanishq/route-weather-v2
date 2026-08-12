"use client"

import { motion, AnimatePresence } from "framer-motion"

interface FullscreenCinematicAccidentPanelProps {
  isVisible: boolean
  onClose: () => void
  zone: {
    name: string
    incidentLabel: string
    riskScore: number
    reason: string
    warning: string
    severity: string
    isAccidentProne: boolean
    magnitudeOfDelay: number
    lastUpdated: string
  }
}

export function FullscreenCinematicAccidentPanel({
  isVisible,
  onClose,
  zone
}: FullscreenCinematicAccidentPanelProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed left-1/2 -translate-x-1/2 bottom-[140px] z-[100] w-[52vw]"
        >
          <div className="relative bg-gradient-to-br from-[rgba(2,4,8,0.88)] via-[rgba(1,3,6,0.92)] to-[rgba(0,2,5,0.90)] backdrop-blur-3xl rounded-[23px] border border-[rgba(255,255,255,0.16)] shadow-[0_8px_64px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.06),0_0_80px_rgba(0,255,200,0.04),0_0_40px_rgba(239,68,68,0.06),inset_0_0_80px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)] p-[16px]">
            
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/6 via-transparent to-teal-500/6 rounded-[23px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent rounded-[23px] pointer-events-none" />
            <div className={`absolute inset-0 bg-gradient-to-bl ${zone.isAccidentProne ? "from-red-500/3" : "from-amber-500/3"} via-transparent to-transparent rounded-[23px] pointer-events-none`} />
            
            <div className="relative flex items-center mb-3">
              
              <div className="flex items-center gap-3">
                <div className={`relative w-[44px] h-[44px] rounded-full border-2 ${zone.isAccidentProne ? "border-red-400/60" : "border-amber-400/50"} flex items-center justify-center`}>
                  <div className={`absolute inset-0 ${zone.isAccidentProne ? "bg-red-500/30" : "bg-amber-500/20"} rounded-full blur-xl`} />
                  <span className="text-xl relative z-10">
                    {zone.isAccidentProne ? "⚠️" : "ℹ️"}
                  </span>
                </div>
                
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-[21px] font-medium text-white/95 leading-tight">
                      {zone.name}
                    </h2>
                    
                    <div className={`px-2 py-0.5 rounded-full border ${zone.isAccidentProne ? "bg-gradient-to-r from-red-500/40 to-red-600/35 border-red-400/50" : "bg-amber-500/20 border-amber-400/40"}`}>
                      <span className={`text-[10px] font-medium ${zone.isAccidentProne ? "text-red-50" : "text-amber-100"}`}>
                        {zone.severity}
                      </span>
                    </div>
                    
                    <span className="text-xs text-white/40">
                      {zone.riskScore}/100
                    </span>
                  </div>
                  <span className="text-[11px] text-white/45">
                    {zone.incidentLabel}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="relative grid grid-cols-3 gap-2">

              <div className="bg-gradient-to-br from-black/40 to-black/35 backdrop-blur-2xl rounded-[17px] p-[12px] border border-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(0,0,0,0.3)]">
                <div className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30 mb-1">
                  {zone.isAccidentProne ? "Accident reason" : "Incident details"}
                </div>
                <div className="text-xs text-white/95 font-normal leading-relaxed">
                  {zone.reason}
                </div>
              </div>

              <div className={`bg-gradient-to-br from-black/40 to-black/35 backdrop-blur-2xl rounded-[17px] p-[12px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(0,0,0,0.3)] ${zone.isAccidentProne ? "border-yellow-500/25" : "border-white/14"}`}>
                <div className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30 mb-1 flex items-center gap-1">
                  <span className={`text-[10px] ${zone.isAccidentProne ? "text-yellow-300" : "text-white/50"}`}>
                    {zone.isAccidentProne ? "⚠" : "ℹ"}
                  </span>
                  Safety warning
                </div>
                <div className="text-xs text-white/95 font-normal leading-relaxed">
                  {zone.warning}
                </div>
              </div>

              <div className="bg-gradient-to-br from-black/40 to-black/35 backdrop-blur-2xl rounded-[17px] p-[12px] border border-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(0,0,0,0.3)] flex flex-col justify-center gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30">
                    Severity
                  </span>
                  <span className={`text-xs font-medium ${zone.isAccidentProne ? "text-red-100" : "text-amber-100"}`}>
                    {zone.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30">
                    Delay level
                  </span>
                  <span className="text-xs font-medium text-white/95">
                    {zone.magnitudeOfDelay}/4
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30">
                    Updated
                  </span>
                  <span className="text-xs font-medium text-white/95">
                    {zone.lastUpdated}
                  </span>
                </div>
              </div>

            </div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
