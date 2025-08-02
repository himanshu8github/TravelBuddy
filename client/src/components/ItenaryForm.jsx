import { useState } from "react";
import { Input} from "@/components/ui/input";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import { Label} from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Itenary = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: "",
    people: 1,
    from: "",
    to: "",
    budget: "",
    group: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.destination || !formData.from || !formData.to) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));

    console.log("Trip Data:", formData);

    // TODO: Send to backend or Gemini API

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      {/* Navbar */}
      <nav className="flex justify-between items-center text-white px-6 py-4 bg-black shadow-md fixed top-0 w-full z-10">
        <h1
          className="text-3xl font-bold text-white cursor-pointer"
          onClick={() => navigate("/home")}
        >
          TravelBuddy
        </h1>
       
 
      </nav>

      {/* Form Card */}
      <div className="pt-24">
        <Card className="w-full max-w-xl mx-auto shadow-lg border border-white/10">
          <CardHeader>
            <CardTitle className="text-black font-bold text-center text-2xl">
              Plan Your Itinerary ✈️
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Destination */}
              <div>
                <Label className="text-white">Destination</Label>
                <Input
                  placeholder="e.g. Rishikesh"
                  value={formData.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                />
              </div>

              {/* People */}
              <div>
                <Label className="text-white">Number of People</Label>
                <Input
                  type="number"
                  min={1}
                  value={formData.people}
                  onChange={(e) =>
                    handleChange("people", Number(e.target.value))
                  }
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">From</Label>
                  <Input
                    type="date"
                    value={formData.from}
                    onChange={(e) => handleChange("from", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-white">To</Label>
                  <Input
                    type="date"
                    value={formData.to}
                    onChange={(e) => handleChange("to", e.target.value)}
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <Label className="text-white">Budget</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleChange("budget", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select budget" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cheap">Cheap</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Travel Group */}
              <div>
                <Label className="text-white">Travel With</Label>
                <Select
                  value={formData.group}
                  onValueChange={(value) => handleChange("group", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo</SelectItem>
                    <SelectItem value="family">Family</SelectItem>
                    <SelectItem value="friends">Friends</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-white hover:bg-purple-700 border text-black"
              >
                {loading ? "Generating..." : "Generate Itinerary"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Itenary;
