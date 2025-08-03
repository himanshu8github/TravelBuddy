import React from "react";
import places from "../data/places";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PlacesComponent = () => {
  const navigate = useNavigate();
  const previewPlaces = places.slice(0, 4); // Show only 4 states

  return (
    <section className="pt-24 scroll-mt-20 text-white bg-black">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Popular Destinations</h2>
        <p className="text-gray-400">Top places loved by travelers across India.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {previewPlaces.map((group, index) => (
          <div key={index} className="bg-gray-900 rounded-xl p-4"  onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-2">{group.state}</h3>
            <ul className="list-disc list-inside text-gray-300">
              {group.destinations.slice(0, 2).map((dest, idx) => (
                <li key={idx}>{dest}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Button onClick={() => navigate("/signup")} className="bg-purple-700 hover:bg-purple-800 text-white">
          Explore More
        </Button>
      </div>
    </section>
  );
};

export default PlacesComponent;
