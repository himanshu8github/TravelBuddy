import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const ItineraryPlanner = () => {
  const [form, setForm] = useState({
    destination: '',
    days: '',
    groupType: '',
    budget: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/generate-itinerary', form);
      setResult(res.data);
    } catch (err) {
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    // Logic to save to MongoDB can be written here
    console.log("Confirmed! Save this plan to DB.");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <div className="bg-black p-4 shadow-md flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">TravelBuddy</h1>
        <div className="space-x-4">
          <Link to='/aiplanner' className="text-white u">AI Planner</Link>
          <Button className="bg-red-700 hover:bg-red-800 text-white">Logout</Button>
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto">
        <h1 className='font-bold text-4xl text-center mb-2'>Welcome to TravelBuddy</h1>
        <h3 className='font-bold text-xl text-center mb-8'>Start planning your trip with us!</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white text-black rounded-lg shadow-md p-6 grid gap-4 grid-cols-1 md:grid-cols-2">
          <h2 className="col-span-full text-xl font-semibold text-gray-800">✈️ Trip Details</h2>

          <input type="text" name="destination" placeholder="Destination (e.g. Rishikesh)" onChange={handleChange} className="border p-2 rounded" required />
          <input type="number" name="days" placeholder="Number of Days" onChange={handleChange} className="border p-2 rounded" required />
          
          <select name="groupType" onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Group Type</option>
            <option value="friends">Friends</option>
            <option value="family">Family</option>
            <option value="couple">Couple</option>
            <option value="solo">Solo</option>
          </select>

          <select name="budget" onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Budget</option>
            <option value="cheap">Cheap</option>
            <option value="moderate">Moderate</option>
            <option value="luxury">Luxury</option>
          </select>

          <button type="submit" className="col-span-full bg-black hover:bg-gray-900 text-white py-2 rounded mt-2">
            {loading ? "Generating..." : "Generate Itinerary"}
          </button>
        </form>

        {/* Output Cards */}
        {result && (
          <div className="mt-12 space-y-10">

            {/* Stays */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">🏨 Suggested Stays</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {result.hostels?.map((hostel, idx) => (
                  <div key={idx} className="bg-white text-black p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg">{hostel.name}</h3>
                    <p className="text-sm">{hostel.location}</p>
                    <p className="mt-1">💵 <strong>{hostel.pricePerNight}</strong> per night</p>
                    <p className="mt-1">⭐ {hostel.rating}</p>
                    <p className="mt-2 text-sm">{hostel.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Restaurants */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">🍽️ Recommended Restaurants</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {result.restaurants?.map((restro, idx) => (
                  <div key={idx} className="bg-white text-black p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg">{restro.name}</h3>
                    <p className="text-sm">{restro.location}</p>
                    <p className="mt-1">🍛 Cuisine: {restro.cuisine}</p>
                    <p className="mt-1">💵 Avg. Food Price: {restro.avgPrice}</p>
                    <p className="mt-1">⭐ {restro.rating}</p>
                    <p className="mt-2 text-sm">{restro.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Day-wise Itinerary */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-white">🗓️ Day-wise Itinerary</h2>
              {result.itinerary?.map((dayPlan, dayIdx) => (
                <div key={dayIdx} className="bg-white text-black rounded-lg shadow p-4 mb-6">
                  <h3 className="text-lg font-semibold mb-2">Day {dayPlan.day}</h3>
                  <div className="space-y-2">
                    {dayPlan.activities?.map((act, actIdx) => (
                      <div key={actIdx} className="border border-gray-300 p-3 rounded bg-gray-50">
                        <p className="font-semibold">{act.placeName}</p>
                        <p className="text-sm">{act.details}</p>
                        <p className="text-sm">🕒 Travel Time: {act.travelTime}</p>
                        <p className="text-sm">🎟️ Ticket Price: {act.ticketPrice}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center mt-8">
              <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded text-lg">
                ✅ Confirm This Plan
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryPlanner;
