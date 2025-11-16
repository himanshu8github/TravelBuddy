import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div
      id="hero"
      className="relative min-h-[120vh] pt-28 pb-12 flex flex-col items-center justify-center px-4 text-center text-white overflow-hidden bg-cover bg-top sm:bg-center"
      style={{
        backgroundImage: "url('/hero.jpeg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Text content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="italic text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
          Ready for your next adventure?
        </h1>
        <h3 className="italic text-xl sm:text-2xl md:text-3xl mb-8 text-gray-200">
          Plan your trip with TravelBuddy...
        </h3>
        <Button
          variant="default"
          className="text-white rounded-md transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
            boxShadow: "0 6px 24px rgba(251,111,146,0.28)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
          onClick={() => navigate("/signup")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;