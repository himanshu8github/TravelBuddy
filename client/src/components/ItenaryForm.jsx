import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"; // make sure your firebase file exports `auth`

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
    if (!formData.destination || !formData.from || !formData.to) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));

    console.log("Trip Data:", formData);
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/home");
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
        <div className="space-x-4">
          <Button
            className="bg-white text-black hover:bg-purple-800"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Button>
          <Button
            className="bg-white text-black hover:bg-purple-800"
            onClick={() => navigate("/aiplanner")}
          >
            AI Planner
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
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
                <Label className="text-black text-lg">
                  Where do you want to go?
                </Label>
                <Input
                  placeholder="e.g. Rishikesh"
                  value={formData.destination}
                  onChange={(e) => handleChange("destination", e.target.value)}
                />
              </div>

              {/* People */}
              <div>
                <Label className="text-black text-lg">
                  How many people are going?
                </Label>
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
                  <Label className="text-black text-lg">From which date?</Label>
                  <Input
                    type="date"
                    value={formData.from}
                    onChange={(e) => handleChange("from", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-black text-lg">To which date?</Label>
                  <Input
                    type="date"
                    value={formData.to}
                    onChange={(e) => handleChange("to", e.target.value)}
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <Label className="text-black text-lg">
                  What is your budget?
                </Label>
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
                <Label className="text-black text-lg">
                  Who are you traveling with?
                </Label>
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
