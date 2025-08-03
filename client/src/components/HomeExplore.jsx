import React from "react";
import { useNavigate } from "react-router-dom";
import { HomePlaces } from "../data/places";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeExplore = () => {
  const navigate = useNavigate();
  const previewData = HomePlaces(); // using your new function

  return (
    <section className="pt-24 px-4 bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">Top Most Visit Destinations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {previewData.map((group, index) => (
        <Card
  key={index}
  onClick={() => navigate("/signup")}
  className="cursor-pointer bg-white text-black rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all p-0"
>
  <div className="w-full h-48">
    <img
      src={group.image}
      alt={group.state}
      className="w-full h-full object-cover"
    />
  </div>

  <CardContent className="p-4">
    <CardTitle className="text-center text-xl mb-2">{group.state}</CardTitle>
    <ul className="list-disc text-center list-inside text-sm text-black max-h-20 overflow-hidden">
      {group.destinations.map((dest, idx) => (
        <li key={idx}>{dest}</li>
      ))}
    </ul>
  </CardContent>
</Card>

        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 bg-purple-700 hover:bg-purple-800 rounded text-white"
        >
          Explore More
        </button>
      </div>
    </section>
  );
};

export default HomeExplore;
