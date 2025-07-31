import { FaMapMarkedAlt, FaClipboardList, FaPlaneDeparture, FaHotel } from "react-icons/fa";

const steps = [
  {
    icon: <FaMapMarkedAlt size={40} className="text-purple-600" />,
    title: "Search Destination",
    desc: "Browse and pick from popular destinations.",
  },
  {
    icon: <FaClipboardList size={40} className="text-purple-600" />,
    title: "Plan Your Trip",
    desc: "Customize preferences, group size, and budget.",
  },
  {
    icon: <FaPlaneDeparture size={40} className="text-purple-600" />,
    title: "Get Itinerary",
    desc: "Receive a personalized travel plan instantly.",
  },
  {
    icon: <FaHotel size={40} className="text-purple-600" />,
    title: "Book Services",
    desc: "Explore stays, restaurants, and experiences.",
  },
];

const HowItWork = () => {
  return (
<section className="py-16 px-6 bg-black text-white text-center border-t border-neutral-800">
  <h2 className="text-3xl font-bold mb-10">How It Works</h2>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center p-4 shadow-md rounded-lg hover:shadow-xl transition">
            {step.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWork;
