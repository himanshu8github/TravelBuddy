import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

const Pricing = () => {

 const navigate = useNavigate();
 
   const handleUpgradeClick = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 scroll-mt-20 text-white bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
        Our Paid Plans
      </h1>
      <div
        className="mx-auto mb-10 h-[3px] w-40 rounded-full animate-pulse"
        style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className="bg-[#111217]/85 text-white flex flex-col justify-between border rounded-2xl backdrop-blur shadow-xl hover:-translate-y-1 transition-all"
            style={{ borderColor: "rgba(255,175,189,0.22)" }}
          >
            <div
              className="pointer-events-none w-full h-0.5 rounded-t-2xl"
              style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
            />
            <CardHeader>
              <CardTitle className="text-2xl text-center text-[#ffdfe5]">{plan.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4 pb-6">
              <p className="text-3xl font-extrabold bg-gradient-to-r from-[#ffdfe5] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
                {plan.price}
              </p>
              <ul className="text-sm space-y-2 text-gray-300">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <Button
                className="w-full text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                  boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
                onClick={handleUpgradeClick}
              >
                {plan.title === "Free" ? "Get Started" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;