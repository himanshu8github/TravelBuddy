const PlaceCard = ({ name, description, state, image }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg w-72 shadow hover:shadow-xl transition-all duration-300">
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full h-40 object-cover rounded-md mb-3"
      />
      <h3 className="text-xl font-bold mb-1 text-white">{name}</h3>
      <p className="text-sm text-gray-300">{description}</p>
      <p className="text-xs text-gray-400 mt-2">{state}</p>
    </div>
  );
};

export default PlaceCard;
