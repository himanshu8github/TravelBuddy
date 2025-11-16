import React from "react";
import { WiDaySunny } from "react-icons/wi";


const WeatherForecast = () => {
  return (
    <div
      className="p-6 rounded-xl border bg-[#0f1116]/70"
      style={{ borderColor: "rgba(136,13,30,0.35)" }}
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-gray-100">
        <WiDaySunny className="text-3xl" style={{ color: "#880d1e" }} />
        Weather
      </h2>

      <div
        className="mt-2 p-4 rounded-lg border bg-black/30"
        style={{ borderColor: "rgba(136,13,30,0.45)" }}
      >
        <p className="font-medium" style={{ color: "#ffd8dd" }}>
          This feature is not available right now coming soon.
        </p>
        <p className="text-sm mt-1 text-gray-400">
          Detailed forecasts and insights will appear here shortly.
        </p>
      </div>
    </div>
  );
};

export default WeatherForecast;