
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;

  useEffect(() => {
    const createSession = async () => {
      if (!plan) {
        navigate("/paidplans");
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/api/payment/create-checkout-session", {
          plan,
        });

        if (res.data?.url) {
        window.location.assign(res.data.url); // Redirect to Stripe
        } else {
          throw new Error("No URL returned");
        }
      } catch (err) {
        console.error("Stripe session creation failed:", err);
        navigate("/paidplans");
      }
    };

    createSession();
  }, [plan, navigate]);

  return <p className="text-white p-8">Redirecting to payment...</p>;
};

export default Payment;
