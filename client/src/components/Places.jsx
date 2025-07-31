import places from "../data/places";
import PlaceCard from "../components/PlaceCard";
import { Button } from "@/components/ui/button";

const PlacesComponent = () => (
  <section id="places" className="pt-24 scroll-mt-20 text-white bg-black">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold">Popular Destinations</h2>
    </div>

    <div className="flex flex-wrap justify-center gap-6 px-4">
      {places.slice(0, 3).map((place) => (
        <PlaceCard key={place.id} {...place} />
      ))}
    </div>

    <div className="text-center mt-8">
      <Button onClick={() => window.location.href = "/explore"}>
        Explore More
      </Button>
    </div>
  </section>
);

export default PlacesComponent;
