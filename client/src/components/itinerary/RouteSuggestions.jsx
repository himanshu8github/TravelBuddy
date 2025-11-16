import React from "react";
import { FaRoute } from "react-icons/fa";

const RouteSuggestions = () => {
  const brand = "#880d1e";
  const brandLight = "rgba(136,13,30,0.35)";

  return (
    <div
      className="p-6 rounded-xl border bg-[#0f1116]/70"
      style={{ borderColor: brandLight }}
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-gray-100">
        <FaRoute className="text-2xl" style={{ color: brand }} />
        Route Suggestions
      </h2>

      {/* Coming soon message */}
      <div
        className="mt-2 p-4 rounded-lg border bg-black/30"
        style={{ borderColor: "rgba(136,13,30,0.45)" }}
      >
        <p className="font-medium" style={{ color: "#ffd8dd" }}>
          This feature is coming soon.
        </p>
        <p className="text-sm mt-2 text-gray-400">
          Enhanced route details will be available shortly.
        </p>
      </div>

      
    </div>
  );
};

export default RouteSuggestions;