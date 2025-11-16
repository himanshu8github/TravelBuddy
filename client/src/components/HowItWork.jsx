import { FaMapMarkedAlt, FaClipboardList, FaPlaneDeparture, FaHotel } from "react-icons/fa";

const steps = [
  {
    icon: <FaMapMarkedAlt size={40} className="text-[#ff8fab]" />,
    title: "Search Destination",
    desc: "Browse and pick from popular destinations.",
  },
  {
    icon: <FaClipboardList size={40} className="text-[#ff8fab]" />,
    title: "Plan Your Trip",
    desc: "Customize preferences, group size, and budget.",
  },
  {
    icon: <FaPlaneDeparture size={40} className="text-[#ff8fab]" />,
    title: "Get Itinerary",
    desc: "Receive a personalized travel plan instantly.",
  },
  {
    icon: <FaHotel size={40} className="text-[#ff8fab]" />,
    title: "Book Services",
    desc: "Explore stays, restaurants, and experiences.",
  },
];

const HowItWork = () => {
  return (
    <section
      className="py-16 px-6 text-white text-center bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black border-t"
      style={{ borderColor: "rgba(255,175,189,0.18)" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
        How It Works
      </h2>
      <div
        className="mx-auto mb-10 h-[3px] w-40 rounded-full animate-pulse"
        style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center p-6 bg-[#111217]/85 backdrop-blur border rounded-2xl hover:-translate-y-1 transition-all duration-300"
            style={{ borderColor: "rgba(255,175,189,0.22)" }}
          >
            <div
              className="pointer-events-none absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
            />
            {step.icon}
            <h3 className="text-lg md:text-xl font-semibold mt-4 mb-2 text-[#ffdfe5]">
              {step.title}
            </h3>
            <p className="text-sm text-gray-300">{step.desc}</p>
          </div>
        ))}
      </div>

      <style>{`
        .animate-pulse { animation: pulse-soft 2.6s ease-in-out infinite; }
        @keyframes pulse-soft { 0%,100% { opacity:.35; transform:scaleX(.96); } 50% { opacity:.75; transform:scaleX(1); } }
      `}</style>
    </section>
  );
};

export default HowItWork;