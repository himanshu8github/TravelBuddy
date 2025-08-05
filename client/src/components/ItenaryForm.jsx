import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { getAuth, signOut } from 'firebase/auth';

const ItineraryPlanner = () => {
  const [form, setForm] = useState({
    destination: '',
    days: '',
    groupType: '',
    budget: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const payload = {
    ...form,
    tripType: form.groupType,
  };
  delete payload.groupType;

  try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/createitinerary`, payload);
    setResult(res.data.data);
  } catch (err) {
    console.error('API Error:', err);
  } finally {
    setLoading(false);
  }
};


  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home after logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleConfirm = () => {
    console.log("Confirmed! Save this plan to DB.");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
   <nav className="bg-black px-4 py-4 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between">

  <div className="w-full text-center sm:text-left mb-2 sm:mb-0">
    <h1 className="text-3xl font-bold text-white">TravelBuddy</h1>
  </div>


  <div className="flex flex-row justify-center sm:justify-end items-center gap-4 w-full sm:w-auto">
    <Button variant="ghost" className="text-xl" onClick={() => navigate("/dashboard")}>
      Home
    </Button>

    <Link to="/aiplanner">
      <Button variant="ghost" className="text-xl">AiPlanner</Button>
    </Link>

    <Button className="bg-red-600 text-white" onClick={handleLogout}>
      Logout
    </Button>
  </div>
</nav>



      {/* Main Section */}
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className='text-4xl font-bold text-center mt-6 mb-2 text-purple-300'>Plan Your Next Adventure</h1>
        <p className='text-center text-lg text-gray-300 mb-10'>Fill in the details and get a personalized itinerary.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white text-black rounded-lg shadow-lg p-6 grid gap-4 grid-cols-1 md:grid-cols-2">
          <h2 className="col-span-full text-xl font-semibold text-gray-800">✈️ Trip Details</h2>

          <div className="col-span-full">
            <label className="block text-sm font-medium mb-1">Where do you want to go?</label>
            <input type="text" name="destination" placeholder="e.g. Rishikesh" onChange={handleChange} className="border p-2 rounded w-full" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">How many days?</label>
            <input type="number" name="days" placeholder="Number of Days" onChange={handleChange} className="border p-2 rounded w-full" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">With whom?</label>
            <select name="groupType" onChange={handleChange} className="border p-2 rounded w-full" required>
              <option value="">Select</option>
              <option value="friends">Friends</option>
              <option value="family">Family</option>
              <option value="couple">Couple</option>
              <option value="solo">Solo</option>
            </select>
          </div>

          <div className="col-span-full">
            <label className="block text-sm font-medium mb-1">Your budget preference</label>
            <select name="budget" onChange={handleChange} className="border p-2 rounded w-full" required>
              <option value="">Select Budget</option>
              <option value="cheap">Cheap</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>

          <button type="submit" className="col-span-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded mt-2 font-semibold">
            {loading ? "Generating..." : "Generate Itinerary"}
          </button>
        </form>

        {/* Output Cards */}
        {result && (
          <div className="mt-16 space-y-14">

            {/* Stays */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-purple-400">🏨 Suggested Stays</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {result.hostels?.map((hostel, idx) => (
                  <div key={idx} className="bg-white text-black p-4 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-purple-700">{hostel.name}</h3>
                    <p className="text-sm text-gray-700">{hostel.location}</p>
                    <p className="mt-1">💵 <strong>{hostel.pricePerNight}</strong> / night</p>
                    <p>⭐ {hostel.rating}</p>
                    <p className="text-sm mt-2">{hostel.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Restaurants */}
            <section>
              <h2 className="text-3xl font-bold mb-6 text-purple-400">🍽️ Recommended Restaurants</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {result.restaurants?.map((restro, idx) => (
                  <div key={idx} className="bg-white text-black p-4 rounded-xl shadow-lg">
                    <h3 className="text-xl font-bold text-purple-700">{restro.name}</h3>
                    <p className="text-sm text-gray-700">{restro.location}</p>
                    <p>🍛 Cuisine: {restro.cuisine}</p>
                    <p>💵 Avg. Price: {restro.avgPrice}</p>
                    <p>⭐ {restro.rating}</p>
                    <p className="text-sm mt-2">{restro.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Day-wise Itinerary */}
<section>
  <h2 className="text-3xl font-bold mb-6 text-purple-400">🗓️ Day-wise Itinerary</h2>
  <div className="space-y-6">
    {result.itinerary?.map((dayPlan, dayIdx) => {
      const showTicketInfo = parseInt(form.days) <= 20 || parseInt(dayPlan.day) <= 10;

      return (
        <div key={dayIdx} className="bg-white text-black p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold text-purple-700 mb-2">Day {dayPlan.day}</h3>
          <div className="space-y-3">
            {dayPlan.activities?.map((act, actIdx) => (
              <div key={actIdx} className="bg-gray-100 border-l-4 border-purple-600 p-4 rounded">
                <p className="font-semibold">{act.placeName}</p>
                <p className="text-sm">{act.details}</p>
                {showTicketInfo && act.ticketPrice && (
                  <p className="text-sm">🎟️ Ticket Price: {act.ticketPrice}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
</section>

            {/* Confirm Button */}
            <div className="flex justify-center mt-10">
              <button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-xl text-lg font-semibold transition">
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
