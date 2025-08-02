import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const navigate = useNavigate();


  return (
    <div  id="hero"
      className="relative min-h-screen pt-20 flex flex-col items-center justify-center px-4 text-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      {/* Text content */}
      <div className="relative z-10 max-w-xl">
        <h1 className="text-4xl font-bold mb-4">Ready for your next adventure?</h1>
        <h3 className="text-xl mb-6">Plan your trip with us today.</h3>
        <Button variant="default" className="text-black bg-white hover:bg-gray-200"   onClick={() => navigate("/signup")}>
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
