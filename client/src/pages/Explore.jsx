import React, { useState } from "react";
import placesData from "../data/places";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

const Explore = () => {
  const [query, setQuery] = useState("");

  const filteredPlaces = placesData.filter((stateGroup) => {
    const matchState = stateGroup.state.toLowerCase().includes(query.toLowerCase());
    const matchDestinations = stateGroup.destinations.some((d) =>
      d.toLowerCase().includes(query.toLowerCase())
    );
    return matchState || matchDestinations;
  });

  return (
    <section className="pt-24 px-4 text-white bg-black min-h-screen">
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
