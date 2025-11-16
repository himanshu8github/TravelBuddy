import React from "react";
import {
  FaMoneyBillWave,
  FaUtensils,
  FaBus,
  FaTicketAlt,
  FaCheckCircle,
} from "react-icons/fa";

const CostPredictor = ({ cost }) => {
  if (!cost) {
    return (
      <div
        className="p-6 rounded-xl border bg-[#0f1116]/70 text-center"
        style={{ borderColor: "rgba(136,13,30,0.35)" }}
      >
        <p className="text-sm text-gray-400">No cost data available.</p>
        <p className="mt-1 font-medium" style={{ color: "#ffd8dd" }}>
          Generate itinerary first.
        </p>
      </div>
    );
  }

  // Helpers
  const getTotal = (obj) => (typeof obj === "string" ? obj : obj?.total || "N/A");
  const getItems = (obj) => (Array.isArray(obj?.items) ? obj.items : []);
  const brand = "#880d1e";
  const brandLight = "rgba(136,13,30,0.28)";

  // Render a simple K:V list for transport, skipping null/objects
  const renderTransport = (transport) => {
    if (!transport || typeof transport !== "object") return null;
    const entries = Object.entries(transport).filter(
      ([key, val]) =>
        key.toLowerCase() !== "total" &&
        (typeof val === "string" || typeof val === "number")
    );
    if (!entries.length) return <p className="text-gray-400 text-sm">No transport details.</p>;
    return (
      <ul className="text-gray-300 text-sm space-y-1">
        {entries.map(([key, value], idx) => (
          <li key={idx} className="capitalize">
            {key.replace(/_/g, " ")}:{" "}
            <span className="text-gray-200">{String(value)}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div
      className="rounded-2xl p-8 border bg-[#0f1116]/70 backdrop-blur"
      style={{ borderColor: "rgba(136,13,30,0.30)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <FaMoneyBillWave className="text-3xl" style={{ color: brand }} />
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">
          Cost Breakdown
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Accommodation */}
        <div
          className="p-6 rounded-xl border bg-black/30"
          style={{ borderColor: brandLight }}
        >
          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <FaMoneyBillWave style={{ color: brand }} /> Accommodation
          </p>
          <p className="text-2xl md:text-3xl font-bold" style={{ color: "#ffd8dd" }}>
            {getTotal(cost.accommodation)}
          </p>
          {cost.accommodation?.pricePerNight && (
            <p className="text-xs text-gray-400 mt-2">
              {cost.accommodation.pricePerNight}/night
            </p>
          )}
        </div>

        {/* Food */}
        <div
          className="p-6 rounded-xl border bg-black/30"
          style={{ borderColor: brandLight }}
        >
          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <FaUtensils style={{ color: brand }} /> Food
          </p>
          <p className="text-2xl md:text-3xl font-bold" style={{ color: "#ffd8dd" }}>
            {getTotal(cost.food)}
          </p>
          {getItems(cost.food).length > 0 && (
            <ul className="text-gray-400 text-sm mt-2 list-disc pl-5">
              {getItems(cost.food).map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Transport */}
        <div
          className="p-6 rounded-xl border bg-black/30"
          style={{ borderColor: brandLight }}
        >
          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <FaBus style={{ color: brand }} /> Transport
          </p>
          {renderTransport(cost.transport)}
        </div>

        {/* Activities */}
        <div
          className="p-6 rounded-xl border bg-black/30"
          style={{ borderColor: brandLight }}
        >
          <p className="text-gray-300 mb-2 flex items-center gap-2">
            <FaTicketAlt style={{ color: brand }} /> Activities
          </p>
          <p className="text-2xl md:text-3xl font-bold" style={{ color: "#ffd8dd" }}>
            {getTotal(cost.activities)}
          </p>
          {getItems(cost.activities).length > 0 && (
            <ul className="text-gray-400 text-sm mt-2 list-disc pl-5">
              {getItems(cost.activities).map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Total */}
      <div
        className="p-6 rounded-xl mb-6 text-white"
        style={{
          background: `linear-gradient(90deg, ${brand}, #a3192c)`,
          boxShadow: "0 10px 28px rgba(136,13,30,0.28)",
        }}
      >
        <p className="text-white/80 text-sm mb-1">Total Estimated Cost</p>
        <p className="text-4xl md:text-5xl font-extrabold tracking-tight">
          {cost.totalEstimate}
        </p>
        <p
          className={`mt-3 text-base md:text-lg font-semibold flex items-center gap-2 ${
            String(cost.budgetStatus).toLowerCase().includes("within")
              ? "text-emerald-200"
              : "text-amber-200"
          }`}
        >
          <FaCheckCircle /> {cost.budgetStatus}
        </p>
      </div>

      {/* Summary */}
      {cost.summary && (
        <div
          className="p-4 rounded-lg border bg-black/30"
          style={{ borderColor: "rgba(136,13,30,0.2)" }}
        >
          <p className="text-gray-300">{cost.summary}</p>
        </div>
      )}
    </div>
  );
};

export default CostPredictor;