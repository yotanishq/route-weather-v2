"use client"

import { motion, AnimatePresence } from "framer-motion"

interface FullscreenCinematicAccidentPanelProps {
  isVisible: boolean
  onClose: () => void
  zone: {
    name: string
    riskScore: number
    reason: string
    recommendation: string
    warning: string
    severity: string
    incidentsReported: number
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
            
            {/* Cinematic glow overlays */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/6 via-transparent to-teal-500/6 rounded-[23px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent rounded-[23px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-transparent rounded-[23px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-l from-teal-400/4 via-transparent to-transparent rounded-[23px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/4 via-transparent to-transparent rounded-[23px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/4 via-transparent to-transparent rounded-[23px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-bl from-red-500/3 via-transparent to-transparent rounded-[23px] pointer-events-none" />
            
            {/* Header */}
            <div className="relative flex items-center mb-3">
              
              {/* Left: Danger Icon */}
              <div className="flex items-center gap-3">
                <div className="relative w-[44px] h-[44px] rounded-full border-2 border-red-400/60 flex items-center justify-center">
                  <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/25 to-red-600/20 rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-transparent rounded-full" />
                  <div className="absolute inset-0 bg-red-500/40 rounded-full blur-2xl animate-pulse" />
                  <span className="text-xl relative z-10 opacity-100 drop-shadow-[0_0_12px_rgba(255,50,80,1)]">⚠️</span>
                </div>
                
                {/* Center: Title and Badge */}
                <div className="flex items-center gap-3">
                  <h2 className="text-[21px] font-medium text-white/95 leading-tight">
                    {zone.name}
                  </h2>
                  
                  <div className="px-2 py-0.5 bg-gradient-to-r from-red-500/40 to-red-600/35 border border-red-400/50 rounded-full shadow-[0_0_40px_rgba(255,50,80,0.8),0_0_80px_rgba(255,0,50,0.5),0_0_120px_rgba(255,0,80,0.3)]">
                    <span className="text-[10px] font-medium text-red-50 drop-shadow-[0_0_12px_rgba(255,50,80,1)]">
                      High Risk
                    </span>
                  </div>
                  
                  <span className="text-xs text-white/40">
                    {zone.riskScore}/100
                  </span>
                </div>
              </div>
            </div>
            
            {/* Content Grid */}
            <div className="relative grid grid-cols-4 gap-2">
              
              {/* Column 1: Accident Reason */}
              <div className="bg-gradient-to-br from-black/40 to-black/35 backdrop-blur-2xl rounded-[17px] p-[12px] border border-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(0,0,0,0.3)]">
                <div className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30 mb-1">
                  Accident Reason
                </div>
                <div className="text-xs text-white/95 font-normal leading-relaxed">
                  {zone.reason}
                </div>
              </div>
              
              {/* Column 2: Travel Recommendation */}
              <div className="bg-gradient-to-br from-black/40 to-black/35 backdrop-blur-2xl rounded-[17px] p-[12px] border border-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(0,0,0,0.3)]">
                <div className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30 mb-1">
                  Travel Recommendation
                </div>
                <div className="text-xs text-white/95 font-normal leading-relaxed">
                  {zone.recommendation}
                </div>
              </div>
              
              {/* Column 3: Safety Warning */}
              <div className="bg-gradient-to-br from-black/40 to-black/35 backdrop-blur-2xl rounded-[17px] p-[12px] border border-yellow-500/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(0,0,0,0.3),0_0_30px_rgba(234,179,8,0.15),0_0_60px_rgba(234,179,8,0.08)]">
                <div className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30 mb-1 flex items-center gap-1">
                  <span className="text-yellow-300 text-[10px] drop-shadow-[0_0_8px_rgba(234,179,8,1)]">⚠</span>
                  Safety Warning
                </div>
                <div className="text-xs text-white/95 font-normal leading-relaxed">
                  {zone.warning}
                </div>
              </div>
              
              {/* Column 4: Info Stack */}
              <div className="bg-gradient-to-br from-black/40 to-black/35 backdrop-blur-2xl rounded-[17px] p-[12px] border border-white/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_0_40px_rgba(0,0,0,0.3)] flex flex-col justify-center gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30">
                    Severity
                  </span>
                  <span className="text-xs font-medium text-red-100 drop-shadow-[0_0_15px_rgba(255,50,80,1.2)]">
                    {zone.severity}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-medium tracking-[0.18em] uppercase text-white/30">
                    Incidents
                  </span>
                  <span className="text-xs font-medium text-white/95">
                    {zone.incidentsReported}
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
