import React, { useState, useEffect } from "react";
import { FaClock, FaBus, FaShieldAlt, FaGem, FaCheckCircle } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

const LocalTips = ({ tips }) => {
  const [expanded, setExpanded] = useState({ transport: false, safety: false, gems: false });
  const brand = "#880d1e";
  const brandLight = "rgba(136,13,30,0.28)";

  if (!tips) {
    return (
      <div className="p-6 rounded-xl border text-center bg-[#0f1116]/70" style={{ borderColor: brandLight }}>
        <p className="text-sm text-gray-400">No local tips available.</p>
        <p className="mt-1 font-medium" style={{ color: "#ffd8dd" }}>Generate itinerary first.</p>
      </div>
    );
  }

  // Normalize fields
  const bestTime =
    tips.bestTime ||
    tips.best_time ||
    tips.time ||
    (typeof tips.bestTime === "string" ? tips.bestTime : "Not specified");

  const transportObj =
    tips.localTransport ||
    tips.transport ||
    tips.transit ||
    (Array.isArray(tips.transport) ? Object.fromEntries(tips.transport.map((v, i) => [`option_${i + 1}`, v])) : {}) ||
    {};

  const safetyList = (() => {
    if (Array.isArray(tips.safetyTips)) return tips.safetyTips;
    if (Array.isArray(tips.safety)) return tips.safety;
    if (Array.isArray(tips.safety?.tips)) return tips.safety.tips;
    if (typeof tips.safetyTips === "string") return [tips.safetyTips];
    if (typeof tips.safety === "string") return [tips.safety];
    return [];
  })();

  const gemsList = (() => {
    if (Array.isArray(tips.hiddenGems)) return tips.hiddenGems;
    if (Array.isArray(tips.gems)) return tips.gems;
    if (typeof tips.hiddenGems === "string") return [tips.hiddenGems];
    if (typeof tips.gems === "string") return [tips.gems];
    return [];
  })();

  useEffect(() => {
    setExpanded({
      transport: Object.keys(transportObj).length > 0,
      safety: safetyList.length > 0,
      gems: gemsList.length > 0,
    });
  }, [transportObj, safetyList, gemsList]);

  const toggle = (key) => setExpanded((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="rounded-2xl p-8 border bg-[#0f1116]/70 backdrop-blur" style={{ borderColor: brandLight }}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">Local Tips & Insights</h2>
        <div className="mt-3 h-1 w-28 rounded-full" style={{ background: `linear-gradient(90deg, ${brand}, #a3192c)` }} />
      </div>

      <div className="space-y-4">
        {/* Best Time */}
        <div className="p-4 rounded-xl border bg-black/30" style={{ borderColor: brandLight }}>
          <p className="text-gray-300 flex items-center gap-3">
            <FaClock style={{ color: brand }} />
            <span className="font-semibold" style={{ color: "#ffd8dd" }}>Best Time:</span>
            <span className="text-gray-300">{bestTime}</span>
          </p>
        </div>

        {/* Transport */}
        <div className="rounded-xl border" style={{ borderColor: brandLight }}>
          <button
            type="button"
            aria-expanded={expanded.transport}
            onClick={() => toggle("transport")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-black/30 hover:bg-white/5 transition"
          >
            <span className="flex items-center gap-2 text-gray-100 font-semibold">
              <FaBus style={{ color: brand }} /> Local Transport
            </span>
            <FiChevronDown
              className="transition-transform"
              style={{ transform: expanded.transport ? "rotate(180deg)" : "rotate(0deg)", color: "#ffd8dd" }}
            />
          </button>
          {expanded.transport && (
            <div className="px-4 pb-4 pt-2">
              {Object.keys(transportObj).length === 0 ? (
                <p className="text-xs text-gray-400">No transport data.</p>
              ) : (
                <div className="mt-1 space-y-2 text-sm text-gray-300">
                  {Object.entries(transportObj).map(([k, v], i) => (
                    <p key={i}>
                      <span className="capitalize font-medium" style={{ color: "#ffd8dd" }}>{k}:</span> {String(v)}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Safety Tips */}
        <div className="rounded-xl border" style={{ borderColor: brandLight }}>
          <button
            type="button"
            aria-expanded={expanded.safety}
            onClick={() => toggle("safety")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-black/30 hover:bg白/5 transition"
          >
            <span className="flex items-center gap-2 text-gray-100 font-semibold">
              <FaShieldAlt style={{ color: brand }} /> Safety Tips
            </span>
            <FiChevronDown
              className="transition-transform"
              style={{ transform: expanded.safety ? "rotate(180deg)" : "rotate(0deg)", color: "#ffd8dd" }}
            />
          </button>
          {expanded.safety && (
            <div className="px-4 pb-4 pt-2 space-y-2 text-sm">
              {safetyList.length === 0 ? (
                <p className="text-xs text-gray-400">No safety tips.</p>
              ) : (
                safetyList.map((tip, idx) => (
                  <p key={idx} className="flex items-center gap-2 text-gray-300">
                    <FaCheckCircle className="text-emerald-400" /> {tip}
                  </p>
                ))
              )}
            </div>
          )}
        </div>

        {/* Hidden Gems */}
        <div className="rounded-xl border" style={{ borderColor: brandLight }}>
          <button
            type="button"
            aria-expanded={expanded.gems}
            onClick={() => toggle("gems")}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-black/30 hover:bg-white/5 transition"
          >
            <span className="flex items-center gap-2 text-gray-100 font-semibold">
              <FaGem style={{ color: brand }} /> Hidden Gems
            </span>
            <FiChevronDown
              className="transition-transform"
              style={{ transform: expanded.gems ? "rotate(180deg)" : "rotate(0deg)", color: "#ffd8dd" }}
            />
          </button>
          {expanded.gems && (
            <div className="px-4 pb-4 pt-2">
              {gemsList.length === 0 ? (
                <p className="text-xs text-gray-400">No hidden gems.</p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {gemsList.map((gem, idx) => (
                    <li key={idx} className="text-gray-300 list-disc ml-5">{gem}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalTips;