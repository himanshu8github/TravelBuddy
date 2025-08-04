import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuthStore from "../store/authstore";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const plan = location.state?.plan;
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const createSession = async () => {
      if (!plan || !user?.email) {
        navigate("/paidplans");
        return;
      }

     try {
  const res = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/api/payment/create-checkout-session`,
    {
      plan,
      email: user.email,
    }
  );


        if (res.data?.url) {
          window.location.assign(res.data.url);
        } else {
          throw new Error("No URL returned");
        }
      } catch (err) {
        console.error("Stripe session creation failed:", err);
        navigate("/paidplans");
      }
    };

    createSession();
  }, [plan, user, navigate]);

  return <p className="text-white p-8">Redirecting to payment...</p>;
};

export default Payment;
