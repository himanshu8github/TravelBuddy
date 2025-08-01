import React, { useEffect } from 'react';
import { addTrip, fetchTripsByUser } from '../utils/firebaseDBUtils'; 

const Dashboard = () => {
  useEffect(() => {
    const loadTrips = async () => {
      const trips = await fetchTripsByUser("abc123"); // Later replace with actual user ID from auth
      console.log("User Trips: ", trips);
    };

    loadTrips();
  }, []);

  const handleAddTrip = async () => {
    const newTrip = {
      userId: "abc123", 
      destination: "Manali",
      budget: 20000,
      startDate: "2025-08-05",
    };

    const id = await addTrip(newTrip);
    console.log("New trip ID:", id);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={handleAddTrip}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Add Trip
      </button>
    </div>
  );
};

export default Dashboard;
