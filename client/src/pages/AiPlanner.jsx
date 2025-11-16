import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";
import { Toaster, toast } from "sonner";

const AiPlanner = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a destination.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat-suggestions`,
        { prompt }
      );
      setResponses([res.data]);
    } catch (err) {
      console.error(err);
      toast.error("Invalid input. Please enter a valid Indian state, city, or tourist destination.");
    }
    setLoading(false);
  };

  return (
    <>
      <Toaster richColors position="top-center" />
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black text-white pb-24">
        {/* Navbar */}
        <nav
          className="w-full sticky top-0 z-50 px-5 py-4 bg-black/50 backdrop-blur border-b flex items-center justify-between"
          style={{ borderColor: "rgba(255,175,189,0.18)" }}
        >
          <div
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent tracking-wide">
              TravelBuddy
            </h1>
            <p className="text-[11px] text-gray-500">Plan. Explore. Adventure.</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="ghost"
              className="text-sm"
              style={{ color: "#ffdfe5" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            <Link to="/itenary">
              <Button
                variant="ghost"
                className="text-sm"
                style={{ color: "#ffdfe5" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                Itinerary
              </Button>
            </Link>
            <Button
              className="text-sm text-white shadow-sm"
              style={{ backgroundColor: "#7a1d2f" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5e1624")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7a1d2f")}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </nav>

        {/* Header */}
        <section className="max-w-3xl mx-auto text-center pt-12 px-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
            AI Destination Suggestions
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            Get curated destination ideas, local food, seasonal tips & experiences.
          </p>
          <div
            className="mx-auto mt-6 h-[3px] w-44 rounded-full animate-pulse"
            style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
          />
        </section>

        {/* Input */}
        <div className="max-w-xl mx-auto mt-10 space-y-4 px-4">
          <div className="relative group">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 bg-[#111217] border rounded-lg outline-none text-sm placeholder:text-gray-500 focus:ring-0 transition"
              style={{
                borderColor: "rgba(255,175,189,0.28)",
                color: "#fef6f8",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#fb6f92")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,175,189,0.28)")}
              placeholder="Enter Indian destination (e.g., Kashmir, Goa, Jaipur)"
            />
          </div>
          <Button
            className="w-full sm:w-auto px-8 py-3 font-semibold rounded-xl disabled:opacity-50 transition-all"
            style={{
              background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
              boxShadow: "0 4px 18px rgba(251,111,146,0.25)"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Get Suggestions"}
          </Button>
        </div>

        {/* Results */}
        <div className="mt-14 space-y-12 max-w-5xl mx-auto px-4">
          {responses.map((res, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
                Destination: {res?.data?.destination || "Unknown"}
              </h3>

              {(res?.answer?.cities || []).map((city, i) => (
                <Card
                  key={i}
                  className="relative overflow-hidden bg-[#121318]/90 backdrop-blur border rounded-xl transition hover:border-[#fb6f92]/50"
                  style={{ borderColor: "rgba(255,175,189,0.22)" }}
                >
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-0.5"
                    style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
                  />
                  <CardContent className="p-5 md:p-6">
                    <h4 className="text-xl font-bold mb-3 text-[#ffb3c4] break-words">
                      {city.name}
                    </h4>

                    {city.spots?.length > 0 && (
                      <div className="mb-4">
                        <p className="font-semibold text-[#ffdfe5] text-sm">📍 Places to Visit</p>
                        <ul className="mt-1 list-disc list-inside text-xs md:text-sm text-gray-300 space-y-0.5">
                          {city.spots.map((spot, idx) => (
                            <li key={idx}>{spot}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {city.experiences?.length > 0 && (
                      <div className="mb-4">
                        <p className="font-semibold text-[#ffdfe5] text-sm">🌟 Unique Experiences</p>
                        <ul className="mt-1 list-disc list-inside text-xs md:text-sm text-gray-300 space-y-0.5">
                          {city.experiences.map((exp, idx) => (
                            <li key={idx}>{exp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {city.seasonalTips?.length > 0 && (
                      <div className="mb-4">
                        <p className="font-semibold text-[#ffdfe5] text-sm">❄️ Seasonal Tips</p>
                        <ul className="mt-1 list-disc list-inside text-xs md:text-sm text-gray-300 space-y-0.5">
                          {city.seasonalTips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {city.localFoods?.length > 0 && (
                      <div className="mb-4">
                        <p className="font-semibold text-[#ffdfe5] text-sm">🍲 Local Foods</p>
                        <ul className="mt-1 list-disc list-inside text-xs md:text-sm text-gray-300 space-y-0.5">
                          {city.localFoods.map((food, idx) => (
                            <li key={idx}>{food}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {city.travelTips?.length > 0 && (
                      <div className="mb-2">
                        <p className="font-semibold text-[#ffdfe5] text-sm">💡 Travel Tips</p>
                        <ul className="mt-1 list-disc list-inside text-xs md:text-sm text-gray-300 space-y-0.5">
                          {city.travelTips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .animate-pulse {
          animation: pulse-soft 2.6s ease-in-out infinite;
        }
        @keyframes pulse-soft {
          0%,100% { opacity:.35; transform:scaleX(.96); }
          50% { opacity:.75; transform:scaleX(1); }
        }
      `}</style>
    </>
  );
};

export default AiPlanner;