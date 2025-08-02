import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { addTrip, fetchTripsByUser } from '../utils/firebaseDBUtils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import {
  FaPlaneDeparture,
  FaComments,
  FaMapMarkedAlt,
  FaWallet,
  FaHistory,
  FaChevronDown,
} from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loadTrips = async () => {
      const trips = await fetchTripsByUser("abc123");
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

  const logout = () => {
    navigate('/home');
  };

  const cards = [
    {
      title: "Itenary",
      icon: <FaPlaneDeparture className="text-purple-600 text-xl mr-2" />,
      desc: "Plan your whole travel journey.",
      path: "/itenary",
    },
    {
      title: "AI Chat",
      icon: <FaComments className="text-purple-600 text-xl mr-2" />,
      desc: "Ask our AI for recommendations.",
      path: "/aiplanner",
    },
    {
      title: "Top Destinations",
      icon: <FaMapMarkedAlt className="text-purple-600 text-xl mr-2" />,
      desc: "Explore the most visited spots.",
      path: "/explore",
    },
    {
      title: "Expense Tracker",
      icon: <FaWallet className="text-purple-600 text-xl mr-2" />,
      desc: "Track your travel expenses.",
      path: "/expense",
    },
    {
      title: "History",
      icon: <FaHistory className="text-purple-600 text-xl mr-2" />,
      desc: "See your previous trips.",
      path: "/history",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen ">
      {/* Navbar */}
      <nav className="flex justify-between items-center text-white px-6 py-4 bg-black shadow-md fixed top-0 w-full z-10 ">
        <h1
          className="text-3xl font-bold text-white cursor-pointer"
          onClick={() => navigate('/home')}
        >
          TravelBuddy
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-white">Profile</span>
            <FaChevronDown className="text-black" />
           <span
  className="text-white cursor-pointer hover:underline"
  onClick={() => {
    const section = document.getElementById('contact-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
  Contact
</span>
          </div>
          <Button className="bg-red-600 hover:bg-red-500 text-white" onClick={logout}>
            Logout
          </Button>
        </div>
      </nav>

      {/* Welcome section */}
      <main className="pt-28 px-6 max-w-7xl mx-auto text-center">
        <div className="py-10 px-4 mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome, Explorer!</h1>
          <p className="text-2xl  text-white">
            Are you ready for your next travel journey with us?
          </p>
        </div>

        {/* Cards in single row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="bg-black text-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-300 text-left"
            >
              <CardHeader>
                <CardTitle className="flex items-center font-semibold text-l">
                  {card.icon}
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white">{card.desc}</p>
                <Button
                  className="mt-4 bg-white text-black border border-gray-400 hover:bg-gray-100"
                  onClick={() => navigate(card.path)}
                >
                  Go
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer  id="contact-section" className="bg-black text-white py-10 px-6 mt-16 ">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
            <p>Email: info@travelbuddy.com</p>
            <p>Phone: +91-8565000001</p>
            <p>Address: New Delhi, India</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
