import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { addTrip, fetchTripsByUser } from '../utils/firebaseDBUtils';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  FaPlaneDeparture,
  FaComments,
  FaMapMarkedAlt,
  FaWallet,
  FaHistory,
  FaChevronDown,
} from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchParams] = useSearchParams();
  const checkoutStatus = searchParams.get("checkout");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const loadTrips = async () => {
      try {
        const trips = await fetchTripsByUser(user.uid);
        console.log("User Trips: ", trips);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };
    loadTrips();
  }, [user]);


  useEffect(() => {
    if (checkoutStatus === 'success') {
      toast.success("🎉 Payment successful! Welcome to premium.");
    } else if (checkoutStatus === 'cancel') {
      toast.error("❌ Payment cancelled.");
    }
  }, [checkoutStatus]);

  const handleAddTrip = async () => {
    if (!user) {
      console.error("User not signed in");
      return;
    }
    const newTrip = {
      userId: user.uid,
      destination: "Manali",
      budget: 20000,
      startDate: "2025-08-05",
    };
    try {
      const id = await addTrip(newTrip);
      console.log("New trip ID:", id);
    } catch (error) {
      console.error("Failed to add trip:", error);
    }
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const cards = [
    {
      title: "Plan Your Itenary",
      icon: <FaPlaneDeparture className="text-purple-600 text-5xl mr-2" />,
      desc: "Plan your whole travel journey.",
      path: "/itenary",
    },
    {
      title: "Try AiTravel Suggestions",
      icon: <FaComments className="text-purple-600 text-5xl mr-2" />,
      desc: "Ask our AI for recommendations.",
      path: "/aiplanner",
    },
    {
      title: "Explore Paid Plans",
      icon: <FaHistory className="text-purple-600 text-5xl mr-2" />,
      desc: "Upgrade now and experience the best!",
      path: "/paidplans",
    },
    {
      title: "Explore Top Destinations",
      icon: <FaMapMarkedAlt className="text-purple-600 text-5xl mr-2" />,
      desc: "Explore the most visited spots.",
      path: "/explore",
    },
    {
      title: "Expense Tracker",
      icon: <FaWallet className="text-purple-600 text-5xl mr-2" />,
      desc: "Track your travel expenses.",
      path: "/expense",
    },
    {
      title: "See History",
      icon: <FaHistory className="text-purple-600 text-5xl mr-2" />,
      desc: "See your previous trips.",
      path: "/history",
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <Toaster position="top-center" />

      {/* Navbar */}
      <nav className="w-full bg-black text-white shadow-md fixed top-0 z-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1
            className="text-3xl font-bold text-white cursor-pointer"
            onClick={() => navigate('/home')}
          >
            TravelBuddy
          </h1>

          <div className="flex items-center flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center gap-1 cursor-pointer">
              <span className="text-white">Profile</span>
              <FaChevronDown className="text-white" />
            </div>
            <span
              className="text-white cursor-pointer hover:text-purple-300"
              onClick={() => {
                const section = document.getElementById('contact-section');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Contact
            </span>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Welcome section */}
      <main className="pt-28 px-6 max-w-7xl mx-auto text-center">
        <div className="py-10 px-4 mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome, Explorer!</h1>
          <p className="text-2xl text-white">
            Are you ready for your next travel journey with us?
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="w-80 h-76 bg-black text-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between items-center text-center p-4"
            >
              <CardHeader className="flex flex-col items-center">
                <CardTitle className="flex flex-col items-center justify-center text-xl font-bold mb-2">
                  {card.icon}
                  <span className="mt-2">{card.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-base mb-3">{card.desc}</p>
                <Button
                  className="bg-white text-black border border-gray-400 hover:bg-gray-100"
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
      <footer id="contact-section" className="bg-black text-white py-10 px-6 mt-16">
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
