"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Wind,
  Menu,
  X,
  Bell,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-4 mt-4">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-lg shadow-black/5">
          <div className="px-4 sm:px-6">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center gap-2.5"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/20">
                  <Wind className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-lg font-semibold text-foreground tracking-tight">
                    Aether
                  </span>
                  <span className="hidden sm:inline-block ml-2 text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                    PRO
                  </span>
                </div>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-1">
                {["Dashboard", "Routes", "Analytics", "Alerts"].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`rounded-xl transition-all duration-200 ${
                        index === 0 
                          ? "text-foreground font-medium" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item}
                      {item === "Analytics" && <ChevronDown className="w-3 h-3 ml-1" />}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Right Section */}
              <div className="hidden md:flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative text-muted-foreground hover:text-foreground rounded-xl"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                  </Button>
                </motion.div>
                <div className="w-px h-6 bg-slate-200" />
                <motion.div 
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-sm font-medium text-foreground cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  JD
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="sm" 
                    className="h-9 px-4 rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white font-medium shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/25 gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Upgrade
                  </Button>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-xl"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="py-4 border-t border-slate-100">
                    <div className="flex flex-col gap-1">
                      {["Dashboard", "Routes", "Analytics", "Alerts"].map((item) => (
                        <Button 
                          key={item}
                          variant="ghost" 
                          className={`justify-start rounded-xl ${
                            item === "Dashboard" ? "text-foreground font-medium" : "text-muted-foreground"
                          }`}
                        >
                          {item}
                        </Button>
                      ))}
                      <div className="pt-3 border-t border-slate-100 mt-2">
                        <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-emerald-600 text-white gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Upgrade to Pro
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
