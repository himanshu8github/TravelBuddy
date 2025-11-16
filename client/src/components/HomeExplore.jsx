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
    <section className="pt-24 px-4 min-h-screen text-white bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
        Top Most Visit Destinations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {previewData.map((group, index) => (
          <Card
            key={index}
            onClick={() => navigate("/signup")}
            className="cursor-pointer bg-[#111217]/85 text-white rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-all p-0 border backdrop-blur"
            style={{ borderColor: "rgba(255,175,189,0.22)" }}
          >
            <div className="w-full h-48">
              <img
                src={group.image}
                alt={group.state}
                className="w-full h-full object-cover"
              />
            </div>

            <CardContent className="p-4">
              <CardTitle className="text-center text-lg md:text-xl mb-2 text-[#ffdfe5]">
                {group.state}
              </CardTitle>
              <ul className="list-disc text-center list-inside text-sm text-gray-300 max-h-20 overflow-hidden">
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
          className="px-6 py-2 rounded text-white transition-colors duration-200"
          style={{ background: "linear-gradient(90deg,#ff8fab,#fb6f92)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg,#ffcfd2,#fb6f92)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(90deg,#ff8fab,#fb6f92)")
          }
        >
          Explore More
        </button>
      </div>
    </section>
  );
};

export default HomeExplore;