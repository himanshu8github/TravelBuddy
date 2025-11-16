import { setPersistence, browserLocalPersistence,GoogleAuthProvider,signInWithPopup, } from "firebase/auth";
import { auth,  analytics } from "../firebase";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Nav from "../components/Nav";
import useAuthStore from "../store/authstore";
import { logEvent } from "firebase/analytics";



const Signup = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");


  const handleGoogleSignup = async () => {
    if (loading) return;

     if (auth.currentUser) {
    console.log("Already signed in");
    navigate("/dashboard");
    return;
  }
    setLoading(true);


    
    try {
      const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      console.log("User signed up:", result.user);

   if (analytics) {
     logEvent(analytics, "sign_up", {
  method: "google",
  email: result.user.email,
  uid: result.user.uid,
});
    }

      useAuthStore.getState().setUser({
  uid: result.user.uid,
  name: result.user.displayName,
  email: result.user.email,
});

      setSuccess(true);
      setError("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setError(error.message);

      console.error("Google signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Fixed navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Signup content with padding to avoid overlap */}
      <div className="min-h-screen pt-24 flex items-center justify-center text-white bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black">
        <div
          className="w-full max-w-md text-center rounded-2xl border bg-[#111217]/85 backdrop-blur shadow-xl"
          style={{ borderColor: "rgba(255,175,189,0.22)" }}
        >
          <div
            className="w-full h-0.5 rounded-t-2xl"
            style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
          />
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
              Welcome to TravelBuddy
            </h2>
            <p className="text-s font-bold mb-6 text-gray-300">New User? Create Account</p>

            {error && (
              <div className="mb-4 text-rose-400 font-semibold">
                {error}
              </div>
            )}

            <Button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-2 text-white border-0 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
              }}
              variant="outline"
              disabled={loading} //  Disable while signing up
              onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
            >
              <FcGoogle size={20} />
              {loading ? "Signing up..." : "Sign Up with Google"}
            </Button>

            {success && (
              <div className="mt-4 text-green-400 font-semibold">
                 Successfully signed up!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative backdrop */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background: "radial-gradient(circle at 20% 30%, #ff8fab22, transparent 60%)",
        }}
      />
    </>
  );
};

export default Signup;