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
      
      <div className="bg-black min-h-screen pt-20 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Welcome to TravelBuddy</h2>
          <p className="text-s font-bold mb-6">New User? Create Account</p>
          
           {error && (
    <div className="mb-4 text-red-600 font-semibold">{error}</div>
  )}

          <Button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 bg-white text-black border"
            variant="outline"
            disabled={loading} //  Disable while signing up
          >
            <FcGoogle size={20} />
            {loading ? "Signing up..." : "Sign Up with Google"}
          </Button>

          {success && (
            <div className="mt-4 text-green-600 font-semibold">
               Successfully signed up!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Signup;
