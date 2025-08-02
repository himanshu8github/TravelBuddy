import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTrip, fetchTripsByUser } from '../utils/firebaseDBUtils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { FaPlaneDeparture, FaComments, FaMapMarkedAlt, FaWallet, FaHistory, FaStar } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import gsap from 'gsap';

const Dashboard = () => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  useEffect(() => {
    const loadTrips = async () => {
      const trips = await fetchTripsByUser("abc123");
      console.log("User Trips: ", trips);
    };
    loadTrips();

    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
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

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black shadow-md fixed top-0 w-full z-10">
        <h1 className="text-3xl font-bold text-white">TravelBuddy</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-white">Profile</span>
            <FaChevronDown className="text-white" />
          </div>
          <Button className="bg-red-600 hover:bg-red-500" onClick={logout}>Logout</Button>
        </div>
      </nav>

      {/* Content */}
      <main className="pt-24 px-6 max-w-7xl mx-auto bg-black text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome (User Name)</h1>
        <p className="text-lg mb-6 text-[#e0d4f7]">Ready for your next travel journey with us?</p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Itenary",
              icon: <FaPlaneDeparture className="text-xl mr-2" />,
              desc: "Plan your whole travel journey.",
              path: "/itenary"
            },
            {
              title: "AI Chat",
              icon: <FaComments className="text-xl mr-2" />,
              desc: "Ask our AI for recommendations.",
              path: "/aiplanner"
            },
            {
              title: "Top Destinations",
              icon: <FaMapMarkedAlt className="text-xl mr-2" />,
              desc: "Explore the most visited spots.",
              path: "/explore"
            },
            {
              title: "Expense Tracker",
              icon: <FaWallet className="text-xl mr-2" />,
              desc: "Track your travel expenses.",
              path: "/expense"
            },
            {
              title: "History",
              icon: <FaHistory className="text-xl mr-2" />,
              desc: "See your previous trips.",
              path: "/history"
            },
            {
              title: "Featured",
              icon: <FaStar className="text-xl mr-2" />,
              desc: "See top featured places!",
              path: "/featured"
            }
          ].map((card, index) => (
            <Card
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="bg-white text-black shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center font-bold">
                  {card.icon}
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{card.desc}</p>
                <Button className="mt-3 bg-black text-white hover:bg-gray-800" onClick={() => navigate(card.path)}>
                  Go
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-10 px-6 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p>Email: info@travelbuddy.com</p>
            <p>Phone: +91-8565000001</p>
            <p>Address: New Delhi, India</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold">Follow Us</h2>
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
