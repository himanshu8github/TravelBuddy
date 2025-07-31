import places from "../data/places";
import PlaceCard from "../components/PlaceCard";

const Explore = () => {
  return (
    <section className="py-12 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">All Destinations</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {places.map((place) => (
          <PlaceCard key={place.id} {...place} />
        ))}
      </div>
    </section>
  );
};

export default Explore;
