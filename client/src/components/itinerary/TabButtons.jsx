import React from "react";
import {
  FaMoneyBillWave,
  FaSuitcase,
  FaRoute,
  FaLightbulb,
  FaBed,
  FaUtensils,
  FaCalendarAlt,
} from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi";

// Full‑width, no scroll, always switchable. Brand accent: #880d1e
const TabButtons = ({
  activeTab,
  onTabClick,
  themeColor = "#880d1e",
  includeItinerary = true,
}) => {
  const tabs = [
    ...(includeItinerary
      ? [{ id: "itinerary", label: "Day-wise Itinerary", Icon: FaCalendarAlt }]
      : []),
    { id: "cost", label: "Cost Predictor", Icon: FaMoneyBillWave },
    { id: "weather", label: "Weather", Icon: WiDaySunny },
    { id: "packing", label: "Packing List", Icon: FaSuitcase },
    { id: "route", label: "Route", Icon: FaRoute },
    { id: "tips", label: "Local Tips", Icon: FaLightbulb },
    { id: "stays", label: "Stays", Icon: FaBed },
    { id: "restaurants", label: "Restaurants", Icon: FaUtensils },
  ];

  const accent = themeColor;
  const accent2 = "#a3192c"; // lighter for gradient

  return (
    <div
      role="tablist"
      aria-label="Itinerary sections"
      className="w-full grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4"
    >
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabClick(id)}
            className={`w-full h-11 md:h-12 rounded-xl font-medium flex items-center justify-center gap-2
              border transition-[transform,background,box-shadow,color,border] duration-200
              focus-visible:outline-none focus-visible:ring-2 hover:scale-[1.01]
              ${isActive ? "text-white" : "text-gray-300 hover:bg-white/10"}`}
            style={{
              background: isActive
                ? `linear-gradient(90deg, ${accent}, ${accent2})`
                : "rgba(255,255,255,0.06)",
              borderColor: isActive ? "rgba(136,13,30,0.55)" : "rgba(255,255,255,0.08)",
              boxShadow: isActive ? "0 8px 24px rgba(136,13,30,0.28)" : "none",
            }}
          >
            <Icon className="text-base md:text-lg" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabButtons;