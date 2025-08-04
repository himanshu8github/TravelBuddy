import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/authstore"; 
import { getAuth, signOut } from "firebase/auth";

const plans = [
  {
    title: "Basic",
    price: "₹49/Yr",
    features: ["1 trip/month", "Basic itinerary", "Limited support"],
  },
  {
    title: "Pro",
    price: "₹149/Yr",
    features: ["Unlimited trips", "Advanced itinerary", "Priority support"],
  },
  {
    title: "Ultimate",
    price: "₹299/Yr",
    features: ["Everything is Premium", "Group planning", "Premium hotels", "24/7 Support"],
  },
];

const PaidPlans = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const auth = getAuth();

  
   const handleLogout = async () => {
      try {
        await signOut(auth);
        navigate("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };

 const handleBuyNow = (planTitle) => {
  if (user) {
  navigate("/payment", { state: { plan: planTitle } });
  } else {
    navigate("/signup");
  }
};


  return (
    <div  className="bg-black text-white min-h-screen pt-28">
       {/* Navbar */}
<div className="fixed top-0 w-full bg-black shadow-md z-50">
  <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
    
    {/* Logo */}
    <div className="text-center sm:text-left">
      <h1 className="text-3xl font-bold text-white">TravelBuddy</h1>
    </div>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 text-xl font-bold">
      <Button variant="ghost" className="text-xl" onClick={() => navigate("/dashboard")}>
        Home
      </Button>

      <Button className="bg-red-600 text-white" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  </div>
</div>

        
      <h2 className="text-4xl font-bold text-center mb-10">Choose Your Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className="bg-white text-black flex flex-col justify-between shadow-xl"
          >
            <CardHeader>
              <CardTitle className="text-2xl text-center">{plan.title}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center space-y-4">
              <p className="text-3xl font-bold">{plan.price}</p>
              <ul className="text-sm space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Button
                className="bg-black text-white hover:bg-purple-600 w-full"
                onClick={() => handleBuyNow(plan.title)}
              >
                {`Buy ${plan.title}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaidPlans;
