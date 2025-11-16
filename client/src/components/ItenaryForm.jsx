import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getAuth, signOut } from "firebase/auth";

import TabButtons from "./itinerary/TabButtons";
import CostPredictor from "./itinerary/CostPredictor";
import WeatherForecast from "./itinerary/WeatherForecast";
import PackingList from "./itinerary/PackingList";
import RouteSuggestions from "./itinerary/RouteSuggestions";
import LocalTips from "./itinerary/LocalTips";
import Stays from "./itinerary/Stays";
import Restaurants from "./itinerary/Restaurants";
import DayWiseItinerary from "./itinerary/DayWiseItinerary";

import {
  FaPlane,
  FaRegCalendarAlt,
  FaUsers,
  FaCoins,
  FaMapMarkedAlt,
  FaRoute,
  FaLightbulb,
  FaBed,
  FaUtensils,
} from "react-icons/fa";
import { WiDayCloudy } from "react-icons/wi";
import { FiPackage, FiSend } from "react-icons/fi";

const ItineraryPlanner = () => {
  const [form, setForm] = useState({
    destination: "",
    days: "",
    groupType: "",
    budget: "",
    startDate: "",
  });

const [activeTab, setActiveTab] = useState("itinerary");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateEndDate = () => {
    if (!form.startDate || !form.days) return "";
    const start = new Date(form.startDate);
    const endDate = new Date(start);
    endDate.setDate(start.getDate() + parseInt(form.days));
    return endDate.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endDate = calculateEndDate();

    const payload = {
      ...form,
      tripType: form.groupType,
      endDate,
    };
    delete payload.groupType;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/createitinerary`,
        payload
      );
      setResult(res.data.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // For desktop TabButtons (kept as-is)
  const tabList = [
     { id: "itinerary", label: "Itinerary" },
    { id: "cost", label: "Cost" },
    { id: "weather", label: "Weather" },
    { id: "packing", label: "Packing" },
    { id: "route", label: "Route" },
    { id: "tips", label: "Tips" },
    { id: "stays", label: "Stays" },
    { id: "restaurants", label: "Restaurants" },
   
  ];

  // Mobile tabs with icon + label
  const tabMeta = [
     { id: "itinerary", label: "Itinerary", icon: <FaRegCalendarAlt className="text-pink-300/90" /> },
    { id: "cost", label: "Cost", icon: <FaCoins className="text-pink-300/90" /> },
    { id: "weather", label: "Weather", icon: <WiDayCloudy className="text-pink-300/90" /> },
    { id: "packing", label: "Packing", icon: <FiPackage className="text-pink-300/90" /> },
    { id: "route", label: "Route", icon: <FaRoute className="text-pink-300/90" /> },
    { id: "tips", label: "Tips", icon: <FaLightbulb className="text-pink-300/90" /> },
    { id: "stays", label: "Stays", icon: <FaBed className="text-pink-300/90" /> },
    { id: "restaurants", label: "Restaurants", icon: <FaUtensils className="text-pink-300/90" /> },
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black text-white font-sans">
      {/* Navbar */}
      <nav
      className="bg-black/40 backdrop-blur-lg px-3 sm:px-6 py-3 sm:py-4 border-b sticky top-0 z-50"
        style={{ borderColor: "rgba(255,175,189,0.18)" }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
          <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent tracking-wide">
              TravelBuddy
            </h1>
            <p className="text-[10px] sm:text-xs text-gray-500">Plan. Explore. Adventure.</p>
          </div>
         <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            <Button
              variant="ghost"
             className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
              style={{ color: "#ffdfe5" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            <Link to="/aiplanner">
              <Button
                variant="ghost"
                className="text-sm"
                style={{ color: "#ffdfe5" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                AI Planner
              </Button>
            </Link>
            <Button
              className="text-sm"
              style={{ backgroundColor: "#7a1d2f" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5e1624")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7a1d2f")}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Hero */}
        <div className="relative text-center py-16 overflow-hidden">
          <h1 className="animated-title text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Plan Your Next Adventure
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Calm, structured planning with realistic budgets, weather, routes &
            local insights.
          </p>

          {/* Underline animation */}
          <div
            className="mx-auto mt-5 h-[3px] w-40 rounded-full animate-pulse-soft"
            style={{
              background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)",
            }}
          />
        </div>

        {/* Form */}
        <div
          className="bg-[#101014]/80 border backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl"
          style={{ borderColor: "rgba(255,175,189,0.22)" }}
        >
          <h2
            className="text-2xl font-bold mb-7 flex items-center gap-3 tracking-wide"
            style={{ color: "#ffdfe5" }}
          >
            <FaPlane style={{ color: "#ff8fab" }} /> Trip Details
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
          >
            {/* Destination */}
            <div className="md:col-span-6">
              <label className="block text-sm mb-2" style={{ color: "#ffe5ec" }}>
                Destination *
              </label>
              <div className="relative">
                <FaMapMarkedAlt
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#f7b2c0" }}
                />
                <input
                  type="text"
                  name="destination"
                  placeholder="e.g. Goa, Manali, Rishikesh"
                  onChange={handleChange}
                  required
                  className="w-full min-w-0 pl-10 py-3 bg-[#0c0c12] border rounded-lg outline-none transition text-sm placeholder:text-gray-500 focus:ring-0"
                  style={{
                    borderColor: "rgba(255,175,189,0.25)",
                    color: "#fef6f8",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.25)")}
                />
              </div>
            </div>

            {/* Start Date */}
            <div className="md:col-span-3">
              <label className="block text-sm mb-2" style={{ color: "#ffe5ec" }}>
                Start Date *
              </label>
              <div className="relative">
                <FaRegCalendarAlt
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#f7b2c0" }}
                />
                <input
                  type="date"
                  name="startDate"
                  required
                  onChange={handleChange}
                  className="w-full min-w-0 pl-10 py-3 bg-[#0c0c12] border rounded-lg outline-none text-sm focus:ring-0"
                  style={{
                    borderColor: "rgba(255,175,189,0.25)",
                    color: "#fef6f8",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.25)")}
                />
              </div>
            </div>

            {/* Days */}
            <div className="md:col-span-3">
              <label className="block text-sm mb-2" style={{ color: "#ffe5ec" }}>
                Days *
              </label>
              <div className="relative">
                <FaRegCalendarAlt
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#f7b2c0" }}
                />
                <input
                  type="number"
                  name="days"
                  min="1"
                  required
                  onChange={handleChange}
                  className="w-full min-w-0 pl-10 py-3 bg-[#0c0c12] border rounded-lg outline-none text-sm focus:ring-0"
                  style={{
                    borderColor: "rgba(255,175,189,0.25)",
                    color: "#fef6f8",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.25)")}
                />
              </div>
            </div>

            {/* Group */}
            <div className="md:col-span-4">
              <label className="block text-sm mb-2" style={{ color: "#ffe5ec" }}>
                Travel With *
              </label>
              <div className="relative">
                <FaUsers
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#f7b2c0" }}
                />
                <select
                  name="groupType"
                  required
                  onChange={handleChange}
                  className="w-full min-w-0 pl-10 py-3 bg-[#0c0c12] border rounded-lg outline-none text-sm focus:ring-0"
                  style={{
                    borderColor: "rgba(255,175,189,0.25)",
                    color: "#fef6f8",
                    backgroundColor: "#0c0c12",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.25)")}
                >
                  <option value="">Select</option>
                  <option value="friends">Friends</option>
                  <option value="family">Family</option>
                  <option value="couple">Couple</option>
                  <option value="solo">Solo</option>
                </select>
              </div>
            </div>

            {/* Budget */}
            <div className="md:col-span-4">
              <label className="block text-sm mb-2" style={{ color: "#ffe5ec" }}>
                Budget *
              </label>
              <div className="relative">
                <FaCoins
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#f7b2c0" }}
                />
                <select
                  name="budget"
                  required
                  onChange={handleChange}
                  className="w-full min-w-0 pl-10 py-3 bg-[#0c0c12] border rounded-lg outline-none text-sm focus:ring-0"
                  style={{
                    borderColor: "rgba(255,175,189,0.25)",
                    color: "#fef6f8",
                    backgroundColor: "#0c0c12",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.25)")}
                >
                  <option value="">Select</option>
                  <option value="cheap">Low / Budget</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-12 flex justify-center pt-2">
              <button
                type="submit"
                disabled={loading}
                className="disabled:opacity-50 px-10 sm:px-12 py-3 rounded-xl text-black font-bold tracking-wide text-sm flex items-center gap-2 transition-transform hover:scale-[1.02]"
                style={{
                  background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                  boxShadow: "0 6px 20px rgba(251,111,146,0.22)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(90deg,#ffcfd2,#fb6f92)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(90deg,#ff8fab,#fb6f92)")
                }
              >
                <FiSend />
                {loading ? "Generating..." : "Generate Itinerary"}
              </button>
            </div>
          </form>
        </div>

        {/* Tabs (desktop) */}
        <div className="mt-10 hidden md:block">
          <TabButtons
            activeTab={activeTab}
            onTabClick={setActiveTab}
            themeColor="pink"
            includeItinerary
            alwaysVisible
            disabled={!result}
          />
        </div>

        {/* Tabs (mobile: icon + label together) */}
        <div className="mt-4 md:hidden">
          <div className="grid grid-cols-4 gap-2 px-1 py-2">
            {tabMeta.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  title={t.label}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex flex-col items-center justify-center gap-1 px-1.5 py-2 rounded-md text-xs font-medium border transition-colors
                    ${isActive
                      ? "bg-[#111217]/70 border-[#ff8fab66] text-white"
                      : "bg-[#0b0b0d]/40 border-transparent text-gray-300 hover:bg-[#111217]/50"}`}
                >
                 <span className="text-sm">{t.icon}</span>
         <span className="whitespace-nowrap text-[9px] leading-tight">{t.label}</span>
        </button>
              );
            })}
          </div>
        </div>

        {/* Sections */}
        {result && (
          <div className="mt-10 space-y-12">
            {activeTab === "cost" && <CostPredictor cost={result.cost} />}
            {activeTab === "weather" && (
              <WeatherForecast weather={result.weather} />
            )}
            {activeTab === "packing" && (
              <PackingList packing={result.packing} />
            )}
            {activeTab === "route" && (
              <RouteSuggestions routes={result.routes} />
            )}
            {activeTab === "tips" && <LocalTips tips={result.tips} />}
            {activeTab === "stays" && <Stays stays={result.stays} />}
            {activeTab === "restaurants" && (
              <Restaurants restaurants={result.restaurants} />
            )}
            {activeTab === "itinerary" && (
              <DayWiseItinerary itinerary={result.itinerary} days={form.days} />
            )}
          </div>
        )}
      </div>

      {/* Styles */}
      <style>{`
        .animated-title {
          background: linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#ffe5ec);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          background-size: 300% 100%;
          animation: shimmer 9s linear infinite, subtle-pop 700ms ease-out 1, float-y 8s ease-in-out infinite;
          letter-spacing: .5px;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes subtle-pop {
          0% { transform: translateY(6px) scale(0.98); opacity: .9; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes float-y {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-pulse-soft {
          animation: pulse-soft 2.6s ease-in-out infinite;
        }
        @keyframes pulse-soft {
          0%, 100% { opacity: .35; transform: scaleX(0.98); }
          50% { opacity: .7; transform: scaleX(1); }
        }
        .animate-float-slow {
          animation: float-plane 10s ease-in-out infinite;
        }
        @keyframes float-plane {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-2deg); }
        }
        /* hide scrollbar for horizontal tab row on mobile */
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        /* Ensure input containers don't overflow on very small screens */
        input, select, textarea { min-width: 0; }
      `}</style>
    </div>
  );
};

export default ItineraryPlanner;