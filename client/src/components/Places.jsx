import places from "../data/places";
import PlaceCard from "../components/PlaceCard";
import { Button } from "@/components/ui/button";

const PlacesComponent = () => (
  <section id="places" className="pt-24 scroll-mt-20 text-white bg-black">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold">Popular Destinations</h2>
      <p className="text-gray-400 mt-2 text-sm">
        Handpicked places loved by travelers across India.
      </p>
    </div>

    <div className="flex flex-wrap justify-center gap-6 px-4">
      {places.slice(0, 4).map((place) => (
        <PlaceCard
          key={place.id}
          name={place.name}
          description={place.description}
          state={place.state}
          // Ensure the image path is absolute from public folder
          image={place.image.startsWith('/') ? place.image : `/${place.image}`}
        />
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
