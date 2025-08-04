import { useEffect } from "react";
import useAuthStore from "../store/authstore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const updatePlan = async () => {
      if (!user?.email) return;

     try {
  await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/payment/update-plan`,
    {
      email: user.email,
      status: "active",
    }
  );


        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (err) {
        console.error("Error updating plan:", err.message);
      }
    };

    updatePlan();
  }, [user, navigate]);

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

      {/* Success Message */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center space-y-4">
        <h2 className="text-3xl sm:text-4xl font-bold">🎉 Payment Successful!</h2>
        <p className="text-lg sm:text-xl text-gray-300">
          Updating your plan... Redirecting shortly.
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
