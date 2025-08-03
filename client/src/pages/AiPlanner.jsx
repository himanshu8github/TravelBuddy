import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase.js"; // adjust path if needed

const AiPlanner = () => {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/generate-itinerary", {
        prompt,
      });
      setResponses([...responses, res.data]);
    } catch (err) {
      console.error(err);
      alert("Error generating itinerary");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 pb-20">
      {/* Custom Navbar */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700 bg-black shadow-md sticky top-0 z-50">
        <h1 className="text-xl font-bold text-white">TravelBuddy</h1>
        <div className="space-x-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Home
          </Button>
          <Button variant="ghost" onClick={() => navigate("/itinerary")}>
            Itinerary
          </Button>
          <Button variant="ghost" onClick={handleSignOut}>
            Logout
          </Button>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center my-6">AI Destination Suggestions</h2>

      <div className="max-w-xl mx-auto space-y-4">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full px-4 py-2 border border-gray-500 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none"
          placeholder="Enter Indian State (e.g., Uttarakhand, Kashmir)"
        />
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Get Suggestions"}
        </Button>
      </div>

      <div className="mt-10 space-y-12 max-w-4xl mx-auto">
        {responses.map((res, index) => (
          <div key={index} className="space-y-6">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">
              State: {res?.answer?.state || "Unknown"}
            </h3>

            {(res?.answer?.cities || []).map((city, i) => (
              <Card key={i} className="shadow-lg bg-gray-900 text-white border border-purple-500">
                <CardContent className="p-6">
                  <h4 className="text-xl font-bold text-purple-300 mb-2">{city.name}</h4>

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
  );
};

export default AiPlanner;
