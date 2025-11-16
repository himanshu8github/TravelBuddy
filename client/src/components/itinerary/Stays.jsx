import React from "react";
import { FaStar, FaMapMarkerAlt, FaBed } from "react-icons/fa";

const Stays = ({ stays }) => {
  const brand = "#880d1e";
  const brandLight = "rgba(136,13,30,0.28)";

  if (!stays || stays.length === 0) {
    return (
      <div
        className="p-6 rounded-xl border text-center bg-[#0f1116]/70"
        style={{ borderColor: brandLight }}
      >
        <p className="text-sm text-gray-400">No stay recommendations available.</p>
        <p className="mt-1 font-medium" style={{ color: "#ffd8dd" }}>
          Generate itinerary first.
        </p>
      </div>
    );
  }

  // Flatten accommodations from all budgets
  const list = stays
    .flatMap((budgetBlock) => budgetBlock.accommodations || [])
    .filter((item) => item && item.name);

  if (list.length === 0) {
    return (
      <div
        className="p-6 rounded-xl border text-center bg-[#0f1116]/70"
        style={{ borderColor: brandLight }}
      >
        <p className="text-sm text-gray-400">No valid accommodation data found.</p>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl p-8 border bg-[#0f1116]/70 backdrop-blur"
      style={{ borderColor: brandLight }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaBed className="text-2xl" style={{ color: brand }} />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">Stays</h2>
        </div>
        <div
          className="h-1 w-24 rounded-full"
          style={{ background: `linear-gradient(90deg, ${brand}, #a3192c)` }}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((stay, i) => (
          <div
            key={i}
            className="group relative p-5 rounded-xl border bg-black/30 transition hover:-translate-y-0.5"
            style={{
              borderColor: brandLight,
              boxShadow: "0 0 0 rgba(0,0,0,0)",
            }}
          >
            {/* Name + Rating */}
            <div className="flex items-start justify-between gap-3">
              <p className="text-lg font-semibold text-gray-100">{stay.name}</p>
              {stay.rating && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-amber-200 bg-amber-500/10 border border-amber-400/30 text-xs">
                  <FaStar className="text-amber-300" />
                  {stay.rating}
                </span>
              )}
            </div>

            {/* Location */}
            <p className="text-gray-400 text-sm flex items-center gap-2 mt-2">
              <FaMapMarkerAlt style={{ color: brand }} />
              {stay.location || stay.address || "Location not available"}
            </p>

            {/* Price */}
            {stay.pricePerNight && (
              <span
                className="mt-3 inline-flex px-2.5 py-1 rounded-md text-white text-xs font-medium"
                style={{
                  background: `linear-gradient(90deg, ${brand}, #a3192c)`,
                }}
              >
                {stay.pricePerNight}
              </span>
            )}

            {/* Description */}
            {stay.description && (
              <p className="text-gray-300 mt-3 text-sm">{stay.description}</p>
            )}

            {/* Optional actions */}
            {(stay.link || stay.url) && (
              <div className="mt-4">
                <a
                  href={stay.link || stay.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm px-3 py-2 rounded-lg border hover:bg-white/5 transition text-gray-200"
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  View details
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stays;