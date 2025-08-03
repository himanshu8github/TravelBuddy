import { useEffect } from "react";
import useAuthStore from "../store/authstore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const updatePlan = async () => {
      if (!user?.email) return;

      try {
        await axios.post("http://localhost:5000/api/payment/update-plan", {
          email: user.email,
          status: "active",
        });

        navigate("/dashboard");
      } catch (err) {
        console.error("Error updating plan:", err.message);
      }
    };

    updatePlan();
  }, [user]);

  return <h2 className="text-center text-xl mt-32">🎉 Payment Successful! Updating your plan...</h2>;
};

export default PaymentSuccess;
