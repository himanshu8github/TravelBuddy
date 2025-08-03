import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios"; // adjust based on your Gemini API call

const ItineraryPlanner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    from: "",
    to: "",
    people: 1,
    group: "friends",
    budget: "moderate", // default
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const getPrompt = () => {
    let accommodationType = "moderately priced";
    if (formData.budget === "cheap") accommodationType = "budget";
    else if (formData.budget === "luxury") accommodationType = "luxurious";

    return `
Generate a travel itinerary for a trip to ${formData.destination} from ${formData.from} to ${formData.to} for ${formData.people} people.
Group type: ${formData.group}.
Preferred budget: ${formData.budget}.
Include recommendations for ${accommodationType} hotels, top tourist spots, and local street food.
Keep the itinerary short, readable, and organized day-wise.
    `;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const prompt = getPrompt();
    try {
      const response = await axios.post("http://localhost:5000/gemini", {
        prompt,
      });
      setResult(response.data?.content || "No response received.");
    } catch (err) {
      setResult("Error generating itinerary. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-black min-h-screen text-white">
      <Card className="bg-zinc-900 mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-white">Plan Your Trip</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={formData.from}
              onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            />
            <Input
              type="date"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
            />
          </div>
          <Input
            type="number"
            min={1}
            placeholder="No. of People"
            value={formData.people}
            onChange={(e) => setFormData({ ...formData, people: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.group}
              onChange={(e) => setFormData({ ...formData, group: e.target.value })}
              className="bg-zinc-800 text-white rounded p-2"
            >
              <option value="solo">Solo</option>
              <option value="friends">Friends</option>
              <option value="family">Family</option>
              <option value="couple">Couple</option>
            </select>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="bg-zinc-800 text-white rounded p-2"
            >
              <option value="cheap">Cheap</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <Button onClick={handleSubmit} className="w-full bg-purple-700 hover:bg-purple-800">
            {loading ? "Generating..." : "Generate Itinerary"}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="bg-white text-black">
          <CardHeader>
            <CardTitle className="text-xl">Suggested Itinerary</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={result}
              rows={12}
              readOnly
              className="resize-none border-none focus:outline-none bg-white"
            />
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default ItineraryPlanner;
