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
    <div className="bg-black pt-24 scroll-mt-20 text-white py-12">
      <h1 className="text-3xl font-bold text-center mb-10">Our Paid Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto">

        {plans.map((plan, index) => (
          <Card key={index} className="bg-white text-black flex flex-col justify-between shadow-xl">
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
              <Button className="bg-black text-white hover:bg-purple-600 w-full"    onClick={handleUpgradeClick}>
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
