import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ItineraryPlanner = () => {
  const [formData, setFormData] = useState({
    destination: "",
    from: "",
    to: "",
    people: 1,
    group: "friends",
    budget: "moderate",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculateDays = () => {
    const start = new Date(formData.from);
    const end = new Date(formData.to);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const handleSubmit = async () => {
    if (!formData.destination || !formData.from || !formData.to) {
      alert("Please fill in all fields.");
      return;
    }

    const days = calculateDays();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://localhost:5000/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination: formData.destination,
          days,
          groupType: formData.group,
          budget: formData.budget,
        }),
      });

      const data = await res.json();
      if (data && data.itinerary) {
       setResult(data);
      } else {
        setResult("No itinerary generated. Please try again.");
      }
    } catch (error) {
      console.error("Error generating itinerary:", error);
      setResult("Error generating itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-6 bg-black min-h-screen text-black">
      <Card className="bg-white text-black mb-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Plan Your Trip</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Where do you want to go?</label>
            <Input
              placeholder="Destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">From</label>
              <Input
                type="date"
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">To</label>
              <Input
                type="date"
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">No. of People</label>
            <Input
              type="number"
              min={1}
              placeholder="Number of People"
              value={formData.people}
              onChange={(e) => setFormData({ ...formData, people: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Group Type</label>
              <select
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="bg-zinc-100 text-black rounded p-2 w-full"
              >
                <option value="solo">Solo</option>
                <option value="friends">Friends</option>
                <option value="family">Family</option>
                <option value="couple">Couple</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Budget</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="bg-zinc-100 text-black rounded p-2 w-full"
              >
                <option value="cheap">Cheap</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-purple-700 hover:bg-purple-800"
          >
            {loading ? "Generating..." : "Generate Itinerary"}
          </Button>
        </CardContent>
      </Card>

      
   {result && (
  <div className="space-y-6">
    {/* Hostels Section */}
    <Card className="bg-white text-black">
      <CardHeader>
        <CardTitle className="text-xl">Recommended Stays</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {result.hostels?.map((hostel, index) => (
          <Card key={index} className="border border-gray-300">
            <img src={hostel.imageUrl} alt={hostel.name} className="w-full h-40 object-cover rounded-t" />
            <CardContent className="p-3">
              <h3 className="text-lg font-semibold">{hostel.name}</h3>
              <p className="text-sm text-gray-600">{hostel.address}</p>
              <p>₹{hostel.pricePerNight} / night</p>
              <p className="text-sm">Rating: {hostel.rating} ⭐</p>
              <p className="text-xs mt-1">{hostel.description}</p>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>

    {/* Itinerary Section */}
    <Card className="bg-white text-black">
      <CardHeader>
        <CardTitle className="text-xl">Itinerary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {result.itinerary?.map((day, index) => (
          <Card key={index} className="border border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle>Day {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {day.activities?.map((activity, idx) => (
                <div key={idx} className="flex gap-4">
                  <img
                    src={activity.imageUrl}
                    alt={activity.placeName}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{activity.placeName}</h4>
                    <p className="text-sm">{activity.details}</p>
                    <p className="text-xs text-gray-500">
                      🎟️ ₹{activity.ticketPrice} | ⏱️ {activity.travelTime}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  </div>
)}

    </section>
  );
};

export default ItineraryPlanner;
