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
      icon: <FaPlaneDeparture className="text-[#ff8fab] text-5xl mr-2 transition-transform duration-300 group-hover:-translate-y-1" />,
      desc: "Plan your whole travel journey.",
      path: "/itenary",
    },
    {
      title: "Try AiTravel Suggestions",
      icon: <FaComments className="text-[#ff8fab] text-5xl mr-2 transition-transform duration-300 group-hover:-translate-y-1" />,
      desc: "Ask our AI for recommendations.",
      path: "/aiplanner",
    },
    {
      title: "Explore Paid Plans",
      icon: <FaHistory className="text-[#ff8fab] text-5xl mr-2 transition-transform duration-300 group-hover:-translate-y-1" />,
      desc: "Upgrade now and experience the best!",
      path: "/paidplans",
    },
    {
      title: "Explore Top Destinations",
      icon: <FaMapMarkedAlt className="text-[#ff8fab] text-5xl mr-2 transition-transform duration-300 group-hover:-translate-y-1" />,
      desc: "Explore the most visited spots.",
      path: "/explore",
    },
    {
      title: "Expense Tracker",
      icon: <FaWallet className="text-[#ff8fab] text-5xl mr-2 transition-transform duration-300 group-hover:-translate-y-1" />,
      desc: "Track your travel expenses.",
      path: "/expense",
    },
    {
      title: "See History",
      icon: <FaHistory className="text-[#ff8fab] text-5xl mr-2 transition-transform duration-300 group-hover:-translate-y-1" />,
      desc: "See your previous trips.",
      path: "/history",
    },
  ];

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black">
      <Toaster position="top-center" />

      {/* Navbar */}
      <nav
        className="w-full fixed top-0 z-50 px-4 py-4 bg-black/40 backdrop-blur-lg border-b"
        style={{ borderColor: "rgba(255,175,189,0.18)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="cursor-pointer" onClick={() => navigate('/home')}>
             <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent tracking-wide">
              TravelBuddy
            </h1>
            <p className="text-xs text-gray-500">Plan. Explore. Adventure.</p>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-3 text-sm">
            <Button
              variant="ghost"
              className="h-9 px-3 text-sm"
              style={{ color: "#ffdfe5" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <span className="flex items-center gap-1">
                Profile <FaChevronDown className="opacity-80" />
              </span>
            </Button>
            <Button
              variant="ghost"
              className="h-9 px-3 text-sm"
              style={{ color: "#ffdfe5" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => {
                const section = document.getElementById('contact-section');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </Button>
            <Button
              className="h-9 px-3 text-sm text-white shadow-sm hover:shadow-pink-300/20 transition"
              style={{ backgroundColor: "#7a1d2f" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5e1624")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7a1d2f")}
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
          <h1 className="text-4xl font-bold mb-2 tracking-tight text-white">
            Welcome, Explorer!
          </h1>
          <p className="text-2xl text-white/90">
            Are you ready for your next travel journey with us?
          </p>
          <div
            className="mx-auto mt-6 h-1 w-40 rounded-full"
            style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {cards.map((card, index) => (
            <Card
              key={index}
              className="group relative w-80 min-h-[14rem] overflow-hidden bg-[#0a0a0c]/95 backdrop-blur border rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10"
              style={{ borderColor: "rgba(255,175,189,0.25)" }}
            >
              {/* top accent bar */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left transition-transform duration-500 scale-x-50 group-hover:scale-x-100"
                style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
              />

              {/* subtle corner glow on hover */}
              <div className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300"
                   style={{ background: "radial-gradient(600px circle at 80% 20%, #ff8fab33, transparent 40%)" }} />

              <CardHeader className="flex flex-col items-center pb-3">
                <CardTitle className="flex flex-col items-center justify-center text-lg font-bold mb-2">
                  {card.icon}
                  <span className="mt-2 text-gray-100">{card.title}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex flex-col items-center pt-0">
                <p className="text-sm mb-4 text-gray-300/90">{card.desc}</p>
                <Button
                  className="bg-gradient-to-r from-[#ff8fab] to-[#fb6f92] text-white border-0 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-pink-500/30"
                  onClick={() => navigate(card.path)}
                >
                  Explore
                </Button>
              </CardContent>

              {/* bottom divider */}
              <div className="pointer-events-none absolute bottom-0 inset-x-5 h-px bg-white/10" />
            </Card>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        id="contact-section"
        className="bg-black/80 border-t text-white py-10 px-6 mt-16"
        style={{ borderColor: "rgba(255,175,189,0.18)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "#ffdfe5" }}>Contact Us</h2>
            <p className="text-white/80">Email: info@travelbuddy.com</p>
            <p className="text-white/80">Phone: +91-8565000001</p>
            <p className="text-white/80">Address: New Delhi, India</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "#ffdfe5" }}>Follow Us</h2>
            <div className="flex space-x-4 mt-2">
              <a className="hover:text-[#ff8fab] transition" href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter</a>
              <a className="hover:text-[#ff8fab] transition" href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a>
              <a className="hover:text-[#ff8fab] transition" href="https://github.com/" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;