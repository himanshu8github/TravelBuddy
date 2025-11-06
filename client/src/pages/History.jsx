import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

const History = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
     <nav className="w-full bg-black text-white shadow-md fixed top-0 z-50 px-6 py-4">
  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
    
    {/* Logo */}
    <h1
      className="text-3xl font-bold text-white cursor-pointer"
      onClick={() => navigate("/home")}
    >
      TravelBuddy
    </h1>

    {/* Buttons */}
    <div className="flex gap-4">
      <Button
        className="bg-white text-black hover:bg-purple-800"
        onClick={() => navigate("/dashboard")}
      >
        Home
      </Button>
      <Button
        className="bg-red-600 hover:bg-red-700"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>

  </div>
</nav>


      <div className="pt-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Your Travel History</h1>
        <p className="text-gray-300">No trips yet? Start planning!</p>
         <p className="text-gray-300">Coming Soon!</p>
        {/* Add trip history list here if available */}
      </div>
    </div>
  );
};

export default History;
