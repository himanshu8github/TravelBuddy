import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Cancel = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-black shadow-md z-50">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">TravelBuddy</h1>
        <div>
          <Button
            variant="ghost"
            className="text-base sm:text-lg font-medium"
            onClick={() => navigate("/dashboard")}
          >
            Home
          </Button>
        </div>
      </div>

      {/* Failure Message */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-red-500"> Payment Failed or Canceled</h2>
        <p className="text-lg sm:text-xl text-gray-300">
          Your subscription was not completed. Please try again later.
        </p>
        <Button
          variant="secondary"
          className="mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Cancel;
