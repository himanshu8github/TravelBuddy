import { useParams } from "react-router-dom";
import places from "../data/places";

const Destination = () => {
  const { id } = useParams();
  const destination = places.find((place) => place.id === id);

  if (!destination) return <p className="text-center">Place not found!</p>;

  return (
    <section className="py-12 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4">{destination.name}</h1>
      <img src={destination.image} alt={destination.name} className="mx-auto mb-6 w-full max-w-xl rounded" />
      <p className="text-lg mb-4">{destination.description}</p>

      <div className="text-left max-w-xl mx-auto space-y-4">
        <div>
          <h3 className="text-xl font-semibold">Top Stays</h3>
          <ul className="list-disc list-inside">
            {destination.stays.map((stay, idx) => <li key={idx}>{stay}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Best Places to Eat</h3>
          <ul className="list-disc list-inside">
            {destination.food.map((f, idx) => <li key={idx}>{f}</li>)}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Popular Attractions</h3>
          <ul className="list-disc list-inside">
            {destination.attractions.map((a, idx) => <li key={idx}>{a}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Destination;
