import React from "react";
import { FaUtensils, FaMapMarkerAlt, FaStar } from "react-icons/fa";

const Restaurants = ({ restaurants }) => {
  const brand = "#880d1e";
  const brandLight = "rgba(136,13,30,0.28)";

  if (!restaurants || restaurants.length === 0) {
    return (
      <div
        className="p-6 rounded-xl border text-center bg-[#0f1116]/70"
        style={{ borderColor: brandLight }}
      >
        <p className="text-sm text-gray-400">No restaurant recommendations available.</p>
        <p className="mt-1 font-medium" style={{ color: "#ffd8dd" }}>
          Generate itinerary first.
        </p>
      </div>
    );
  }

  // Flatten nested structure: [{ budget, restaurants:[...] }]
  const allRestaurants = restaurants.flatMap((r) => r.restaurants || []);
  if (allRestaurants.length === 0) {
    return (
      <div
        className="p-6 rounded-xl border text-center bg-[#0f1116]/70"
        style={{ borderColor: brandLight }}
      >
        <p className="text-sm text-gray-400">No valid restaurant data found.</p>
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
          <FaUtensils className="text-2xl" style={{ color: brand }} />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">
            Recommended Restaurants
          </h2>
        </div>
        <div
          className="h-1 w-28 rounded-full"
          style={{ background: `linear-gradient(90deg, ${brand}, #a3192c)` }}
        />
      </div>

      {/* Cards */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allRestaurants.map((restro, idx) => (
          <div
            key={idx}
            className="group relative p-5 rounded-xl border bg-black/30 transition hover:-translate-y-0.5"
            style={{ borderColor: brandLight }}
          >
            {/* Name + Rating */}
            <div className="flex items-start justify-between gap-3">
              <p className="text-lg font-semibold text-gray-100">{restro.name}</p>
              {restro.rating && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-amber-200 bg-amber-500/10 border border-amber-400/30 text-xs">
                  <FaStar className="text-amber-300" />
                  {restro.rating}
                </span>
              )}
            </div>

            {/* Address */}
            {(restro.address || restro.location) && (
              <p className="text-gray-400 text-sm flex items-center gap-2 mt-2">
                <FaMapMarkerAlt style={{ color: brand }} />
                {restro.address || restro.location}
              </p>
            )}

            {/* Cuisine */}
            {restro.cuisine && (
              <span className="mt-3 inline-flex px-2.5 py-1 rounded-md text-gray-200 text-xs border"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                {restro.cuisine}
              </span>
            )}

            {/* Avg Price */}
            {restro.avgPrice && (
              <span
                className="mt-3 inline-flex px-2.5 py-1 rounded-md text-white text-xs font-medium"
                style={{ background: `linear-gradient(90deg, ${brand}, #a3192c)` }}
              >
                {restro.avgPrice}
              </span>
            )}

            {/* Description */}
            {restro.description && (
              <p className="text-gray-300 mt-3 text-sm">{restro.description}</p>
            )}

            {/* Optional link */}
            {(restro.link || restro.url) && (
              <div className="mt-4">
                <a
                  href={restro.link || restro.url}
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

export default Restaurants;