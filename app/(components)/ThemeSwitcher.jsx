"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCog, FaCheck } from "react-icons/fa";
import themes from "../(utils)/themes";

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState("aurora");
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleThemeChange = (theme) => {
    setActiveTheme(theme.name);
    document.body.dataset.theme = theme.name;
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Settings Button */}
      <motion.button
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDropdown}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors backdrop-blur-md border border-white/10"
        aria-label="Theme Settings"
      >
        <FaCog className="text-xl" />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 w-64 p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl z-50 max-h-[80vh] overflow-y-auto custom-scrollbar"
          >
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
              Select Theme
            </h3>
            
            <div className="grid grid-cols-1 gap-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeChange(theme)}
                  className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 group ${
                    activeTheme === theme.name
                      ? "bg-white/10 border border-white/20"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {/* Color Preview */}
                  <div
                    className="w-8 h-8 rounded-full shadow-sm border border-white/10"
                    style={{ background: theme.preview }}
                  />
                  
                  {/* Label */}
                  <span className={`flex-1 text-left text-sm font-medium ${
                    activeTheme === theme.name ? "text-white" : "text-gray-300 group-hover:text-white"
                  }`}>
                    {theme.label}
                  </span>

                  {/* Active Checkmark */}
                  {activeTheme === theme.name && (
                    <FaCheck className="text-cyan-400 text-sm" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
