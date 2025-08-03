import React, { useState } from "react";
import placesData from "../data/places";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase.js";


const Explore = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
    const auth = getAuth(app);

   const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

  const filteredPlaces = placesData.filter((stateGroup) => {
    const matchState = stateGroup.state.toLowerCase().includes(query.toLowerCase());
    const matchDestinations = stateGroup.destinations.some((d) =>
      d.toLowerCase().includes(query.toLowerCase())
    );
    return matchState || matchDestinations;
  });

  return (
    <section className="pt-24 px-4 text-white bg-black min-h-screen">
       <nav className="flex justify-between items-center px-6 py-4 bg-black shadow-md fixed top-0 w-full z-10">
              <h1
                className="text-3xl font-bold cursor-pointer"
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
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            </nav>
      
      <h1 className="text-3xl font-bold text-center mb-8">Explore India</h1>

      <div className="max-w-md mx-auto mb-8">
        <Input
          type="text"
          placeholder="Search by state or destination..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-white text-black"
        />
      </div>

      <Accordion type="multiple" className="max-w-2xl mx-auto space-y-2">
        {filteredPlaces.map((group, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-semibold">
              {group.state}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside text-gray-300">
                {group.destinations.map((place, i) => (
                  <li key={i}>{place}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Explore;
