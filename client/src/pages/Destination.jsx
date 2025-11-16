import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import places from "../data/places";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Destination = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = places.find((place) => String(place.id) === String(id));

  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black text-white flex items-center justify-center px-6">
        <Card className="max-w-md w-full bg-[#111217]/85 backdrop-blur border rounded-2xl"
              style={{ borderColor: "rgba(255,175,189,0.22)" }}>
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="text-xl font-semibold">Place not found</h2>
            <p className="text-sm text-gray-400">
              The destination you’re looking for doesn’t exist or has been moved.
            </p>
            <div className="flex gap-2 justify-center">
              <Button
                variant="ghost"
                className="text-sm"
                style={{ color: "#ffdfe5" }}
                onClick={() => navigate("/explore")}
              >
                Back to Explore
              </Button>
              <Button
                className="text-sm text-white"
                style={{ background: "linear-gradient(90deg,#ff8fab,#fb6f92)" }}
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black text-white pb-24">
      {/* Navbar */}
      <nav
        className="fixed top-0 w-full z-50 px-6 py-4 bg-black/45 backdrop-blur border-b flex items-center justify-between"
        style={{ borderColor: "rgba(255,175,189,0.18)" }}
      >
        <div className="cursor-pointer" onClick={() => navigate("/dashboard")}>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent tracking-wide">
            TravelBuddy
          </h1>
          <p className="text-[11px] text-gray-500">Plan. Explore. Adventure.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="text-sm"
            style={{ color: "#ffdfe5" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            onClick={() => navigate("/explore")}
          >
            Back
          </Button>
          <Button
            className="text-sm text-white"
            style={{ background: "linear-gradient(90deg,#ff8fab,#fb6f92)" }}
            onClick={() => navigate("/itenary")}
          >
            Plan Trip
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 px-6 max-w-6xl mx-auto">
        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border"
             style={{ borderColor: "rgba(255,175,189,0.22)" }}>
          <img
            src={destination.image}
            alt={destination.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              {destination.name}
            </h1>
            <div
              className="mt-3 h-[3px] w-32 rounded-full"
              style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
            />
          </div>
        </div>

        {/* Overview */}
        <Card
          className="mt-8 bg-[#111217]/85 backdrop-blur border rounded-2xl"
          style={{ borderColor: "rgba(255,175,189,0.22)" }}
        >
          <CardContent className="p-6">
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              {destination.description}
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="bg-[#111217]/85 backdrop-blur border rounded-2xl"
            style={{ borderColor: "rgba(255,175,189,0.22)" }}
          >
            <div
              className="pointer-events-none w-full h-0.5"
              style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
            />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-[#ffdfe5]">🏨 Top Stays</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {(destination.stays || []).map((stay, idx) => (
                  <li key={idx} className="relative pl-3">
                    <span
                      className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full"
                      style={{ background: "linear-gradient(90deg,#ffcfd2,#ff8fab)" }}
                    />
                    {stay}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card
            className="bg-[#111217]/85 backdrop-blur border rounded-2xl"
            style={{ borderColor: "rgba(255,175,189,0.22)" }}
          >
            <div
              className="pointer-events-none w-full h-0.5"
              style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
            />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-[#ffdfe5]">🍽️ Best Places to Eat</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {(destination.food || []).map((f, idx) => (
                  <li key={idx} className="relative pl-3">
                    <span
                      className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full"
                      style={{ background: "linear-gradient(90deg,#ffcfd2,#ff8fab)" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card
            className="bg-[#111217]/85 backdrop-blur border rounded-2xl"
            style={{ borderColor: "rgba(255,175,189,0.22)" }}
          >
            <div
              className="pointer-events-none w-full h-0.5"
              style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
            />
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-[#ffdfe5]">📍 Popular Attractions</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                {(destination.attractions || []).map((a, idx) => (
                  <li key={idx} className="relative pl-3">
                    <span
                      className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full"
                      style={{ background: "linear-gradient(90deg,#ffcfd2,#ff8fab)" }}
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-3">
          <Button
            className="w-full sm:w-auto text-sm text-white"
            style={{ background: "linear-gradient(90deg,#ff8fab,#fb6f92)", boxShadow: "0 4px 18px rgba(251,111,146,0.25)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
            onClick={() => navigate("/itenary")}
          >
            Build an Itinerary
          </Button>
          <Button
            variant="ghost"
            className="w-full sm:w-auto text-sm"
            style={{ color: "#ffdfe5" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            onClick={() => navigate("/explore")}
          >
            Explore More
          </Button>
        </div>
      </section>

      {/* Decorative backdrop */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{ background: "radial-gradient(circle at 20% 30%, #ff8fab22, transparent 60%)" }}
      />
    </div>
  );
};

export default Destination;