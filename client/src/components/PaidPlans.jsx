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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#101116] to-black text-white pt-20 sm:pt-24 md:pt-28">
      {/* Navbar */}
      <div className="fixed top-0 w-full bg-black/55 backdrop-blur border-b border-[rgba(255,175,189,0.18)] z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-4">
          <div
            className="cursor-pointer text-center sm:text-left"
            onClick={() => navigate("/dashboard")}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent tracking-wide">
              TravelBuddy
            </h1>
            <p className="text-[10px] sm:text-[11px] text-gray-500">Plan. Explore. Adventure.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <Button
              variant="ghost"
              className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 min-h-[36px] sm:min-h-[40px]"
              style={{ color: "#ffdfe5" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            <Button
              className="text-xs sm:text-sm text-white shadow-sm px-3 py-1.5 sm:px-4 sm:py-2 min-h-[36px] sm:min-h-[40px]"
              style={{ backgroundColor: "#7a1d2f" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5e1624")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7a1d2f")}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2 sm:mb-3 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base px-2">
          Unlock smarter planning, richer itineraries, and premium travel utilities.
        </p>
        <div
          className="mx-auto mt-4 sm:mt-5 md:mt-6 h-[2px] sm:h-[3px] w-24 sm:w-32 md:w-40 rounded-full animate-pulse"
          style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
        />
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-4 sm:gap-5 md:gap-7 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 pb-12 sm:pb-16 md:pb-20">
        {plans.map((plan, index) => {
          const highlight = plan.title === "Pro";
          const ultimate = plan.title === "Ultimate";
          return (
            <Card
              key={index}
              className={`group relative h-full overflow-hidden flex flex-col justify-between rounded-xl sm:rounded-2xl border backdrop-blur bg-[#111217]/85 text-white shadow-sm md:hover:shadow-lg transition-all duration-300 ${
                highlight ? "border-[#fb6f92]/50" : "border-[rgba(255,175,189,0.22)]"
              } ${ultimate ? "lg:scale-[1.03]" : ""}`}
            >
              {/* top accent bar */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] sm:h-1"
                style={{
                  background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)",
                  opacity: ultimate ? 1 : 0.8,
                }}
              />
              {/* subtle glow */}
              <div
                className="pointer-events-none absolute -inset-24 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300"
                style={{ background: "radial-gradient(circle at 70% 20%,#ff8fab33,transparent 60%)" }}
              />

              <CardHeader className="pt-5 sm:pt-6 pb-2 text-center">
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
                  {plan.title}
                </CardTitle>
                {highlight && (
                  <span className="mt-2 inline-block text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:py-1 rounded-full bg-[#fb6f92]/20 text-[#ff8fab] border border-[#fb6f92]/40">
                    Popular
                  </span>
                )}
                {ultimate && (
                  <span className="mt-2 inline-block text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 sm:py-1 rounded-full bg-[#ff8fab]/20 text-[#fb6f92] border border-[#ff8fab]/40">
                    Best Value
                  </span>
                )}
              </CardHeader>

              <CardContent className="flex flex-col items-center text-center space-y-4 sm:space-y-5 px-3 sm:px-4 md:px-6 pb-5 sm:pb-6 md:pb-7">
                <p
                  className="text-2xl sm:text-2xl md:text-3xl font-extrabold tracking-tight"
                  style={{
                    background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {plan.price}
                </p>
                <ul className="text-xs sm:text-xs md:text-sm space-y-2 text-gray-300 w-full">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span
                        className="mt-[3px] h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full flex-shrink-0"
                        style={{ background: "linear-gradient(90deg,#ffcfd2,#ff8fab)" }}
                      />
                      <span className="text-left">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full font-semibold text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 rounded-lg transition-all duration-300 md:hover:-translate-y-0.5 min-h-[44px] sm:min-h-[48px]"
                  style={{
                    background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                    boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
                    color: "#fff",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
                  onClick={() => handleBuyNow(plan.title)}
                >
                  {`Buy ${plan.title}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <style>{`
        .animate-pulse { animation: pulse-soft 2.6s ease-in-out infinite; }
        @keyframes pulse-soft { 0%,100% { opacity:.35; transform:scaleX(.96); } 50% { opacity:.75; transform:scaleX(1); } }
      `}</style>
    </div>
  );
};

export default PaidPlans;