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

  <div className="flex items-center justify-center min-h-screen bg-black text-white text-xl">
    <p>Preparing secure checkout... Please wait</p>
  </div>
};

export default Payment;
