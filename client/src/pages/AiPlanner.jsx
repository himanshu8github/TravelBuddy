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
      <div className="min-h-screen bg-black text-white pb-20">
        {/* Navbar */}
        <div className="w-full bg-black shadow-md sticky top-0 z-50 px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-3xl font-bold text-white text-center sm:text-left">
              TravelBuddy
            </h1>
            <div className="flex flex-row sm:flex-row sm:items-center gap-2 text-lg font-semibold justify-center sm:justify-end">
              <Button variant="ghost" className="text-white" onClick={() => navigate("/dashboard")}>
                Home
              </Button>
              <Link to="/itenary">
                <Button variant="ghost" className="text-white">
                  Itinerary
                </Button>
              </Link>
              <Button className="bg-red-600 text-white" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Headings */}
        <h1 className="text-3xl font-bold text-center my-6">Welcome to TravelBuddy</h1>
        <h2 className="text-2xl font-bold text-center my-6">AI Destination Suggestions</h2>

        {/* Input */}
        <div className="max-w-xl mx-auto space-y-4 px-2 sm:px-0">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-500 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none"
            placeholder="Enter Indian State (e.g., Uttarakhand, Kashmir)"
          />
          <Button className="w-full sm:w-auto" onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Get Suggestions"}
          </Button>
        </div>

        {/* Results */}
        <div className="mt-10 space-y-12 max-w-4xl mx-auto px-2 sm:px-0">
          {responses.map((res, index) => (
            <div key={index} className="space-y-6">
             <h3 className="text-2xl font-semibold text-purple-400 mb-4 break-words">
  Destination: {res?.data?.destination || "Unknown"}
</h3>

              {(res?.answer?.cities || []).map((city, i) => (
                <Card key={i} className="shadow-lg bg-gray-900 text-white border border-purple-500">
                  <CardContent className="p-4 sm:p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-2 break-words">{city.name}</h4>

                    {city.spots?.length > 0 && (
                      <div className="mb-3">
                        <p className="font-semibold">📍 Places to Visit:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300">
                          {city.spots.map((spot, idx) => (
                            <li key={idx}>{spot}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {city.experiences?.length > 0 && (
                      <div className="mb-3">
                        <p className="font-semibold">🌟 Unique Experiences:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300">
                          {city.experiences.map((exp, idx) => (
                            <li key={idx}>{exp}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {city.seasonalTips?.length > 0 && (
                      <div className="mb-3">
                        <p className="font-semibold">❄️ Seasonal Tips:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300">
                          {city.seasonalTips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {city.localFoods?.length > 0 && (
                      <div className="mb-3">
                        <p className="font-semibold">🍲 Local Foods:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300">
                          {city.localFoods.map((food, idx) => (
                            <li key={idx}>{food}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {city.travelTips?.length > 0 && (
                      <div className="mb-3">
                        <p className="font-semibold">💡 Travel Tips:</p>
                        <ul className="list-disc list-inside text-sm text-gray-300">
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
    </>
  );
};

export default AiPlanner;
