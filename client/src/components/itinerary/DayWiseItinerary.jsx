import React from "react";
import { FaCalendarAlt, FaTicketAlt } from "react-icons/fa";

const DayWiseItinerary = ({ itinerary, days }) => {
  const brand = "#880d1e";
  const brandLight = "rgba(136,13,30,0.28)";

  if (!itinerary) {
    return (
      <div
        className="p-6 rounded-xl border text-center bg-[#0f1116]/70"
        style={{ borderColor: brandLight }}
      >
        <p className="text-sm text-gray-400">No itinerary available.</p>
        <p className="mt-1 font-medium" style={{ color: "#ffd8dd" }}>
          Generate plan first.
        </p>
      </div>
    );
  }

  const total = Number(days) || 0;
  const maxDays = Math.min(total, 10);
  const showWarning = total > 10;

  return (
    <div
      className="rounded-2xl p-8 border bg-[#0f1116]/70 backdrop-blur"
      style={{ borderColor: brandLight }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FaCalendarAlt className="text-2xl" style={{ color: brand }} />
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-100">
            Day-wise Itinerary
          </h2>
        </div>
        <div
          className="h-1 w-32 rounded-full"
          style={{ background: `linear-gradient(90deg, ${brand}, #a3192c)` }}
        />
      </div>

      {showWarning && (
        <div className="mb-6 p-4 rounded-lg bg-amber-500/15 border" style={{ borderColor: "rgba(245, 158, 11, .35)" }}>
          <p className="text-amber-200 text-sm">
            Showing first {maxDays} days. Extend remaining {total - maxDays} day(s) manually.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {itinerary.slice(0, maxDays).map((dayPlan, dayIdx) => (
          <div
            key={dayIdx}
            className="p-5 rounded-xl border bg-black/30"
            style={{ borderColor: brandLight }}
          >
            {/* Day header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-semibold text-gray-100">
                Day {dayPlan.day}
              </h3>
              <span className="text-xs text-gray-400">
                {Array.isArray(dayPlan.activities) ? dayPlan.activities.length : 0} activities
              </span>
            </div>

            {/* Divider */}
            <div
              className="h-1 w-24 rounded-full mb-4"
              style={{ background: `linear-gradient(90deg, ${brand}, #a3192c)` }}
            />

            {/* Activities timeline */}
            <div className="space-y-3">
              {dayPlan.activities?.map((activity, actIdx) => (
                <div
                  key={actIdx}
                  className="relative rounded-lg border bg-white/[0.03] hover:bg-white/[0.05] transition"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  {/* left accent */}
                  <span
                    className="absolute left-0 top-0 h-full w-1 rounded-l-lg"
                    style={{ background: `linear-gradient(${brand}, #a3192c)` }}
                  />
                  <div className="pl-4 pr-4 md:pl-5 md:pr-5 py-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {/* Time chip */}
                      {activity.time && (
                        <span
                          className="px-2 py-1 text-xs rounded-md border text-gray-200"
                          style={{ borderColor: "rgba(255,255,255,0.12)" }}
                        >
                          {activity.time}
                        </span>
                      )}

                      {/* Ticket chip (if any) */}
                      {activity.ticketPrice && (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-white text-xs font-medium"
                          style={{
                            background: `linear-gradient(90deg, ${brand}, #a3192c)`,
                          }}
                        >
                          <FaTicketAlt /> {activity.ticketPrice}
                        </span>
                      )}
                    </div>

                    {/* Place-name */}
                    {activity.placeName && (
                      <p className="mt-2 font-semibold" style={{ color: "#ffd8dd" }}>
                        {activity.placeName}
                      </p>
                    )}

                    {/* Details */}
                    {activity.details && (
                      <p className="text-sm text-gray-300 mt-1">{activity.details}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayWiseItinerary;