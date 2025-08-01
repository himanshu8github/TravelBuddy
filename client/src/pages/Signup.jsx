import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User signed up:", result.user);
      setSuccess(true);

      // show popup for 1 second then redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Google signup error:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-black">Welcome to TravelBuddy</h2>
        <p className="text-lg mb-6">New User? Create Account</p>

        <Button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-white text-black border"
          variant="outline"
        >
          <FcGoogle size={20} />
          Sign Up with Google
        </Button>

        {success && (
          <div className="mt-4 text-green-600 font-semibold">✅ Successfully signed up!</div>
        )}
      </div>
    </div>
  );
};

export default Signup;
