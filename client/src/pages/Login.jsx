import { useEffect, useState } from "react";
import { setPersistence, browserLocalPersistence, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, analytics } from "../firebase";
import { logEvent } from "firebase/analytics";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import useAuthStore from "../store/authstore";


const Login = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    if (auth.currentUser) {
      navigate("/dashboard");
    }
  }, [navigate]);


  const handleGoogleLogin = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
         provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in:", result.user);

     if (analytics) {
  logEvent(analytics, "login_with_google", {
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

      setTimeout(() => {
        navigate("/dashboard"); //  Redirect to dashboard
      }, 1000);
    } catch (error) {
      console.error("Google login error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      <div className="bg-black min-h-screen pt-24 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-black">Welcome to TravelBuddy</h2>
          <p className="text-s font-bold mb-6">Login using your Google account</p>

          <Button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-white text-black border hover:bg-gray-100"
            variant="outline"
            disabled={loading}
          >
            <FcGoogle size={20} />
            {loading ? "Logging in..." : "Login with Google"}
          </Button>

          {success && (
            <div className="mt-4 text-green-600 font-semibold">
              Successfully Logged In!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
