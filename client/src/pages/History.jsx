import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#0e0e10] to-black text-white pb-24">
      {/* Navbar */}
      <nav
        className="fixed top-0 w-full z-50 px-6 py-4 bg-black/50 backdrop-blur border-b"
        style={{ borderColor: "rgba(255,175,189,0.18)" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div
            className="cursor-pointer text-center sm:text-left"
            onClick={() => navigate("/home")}
          >
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent tracking-wide">
              TravelBuddy
            </h1>
            <p className="text-[11px] text-gray-500">Plan. Explore. Adventure.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="text-sm"
              style={{ color: "#ffdfe5" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              onClick={() => navigate("/dashboard")}
            >
              Home
            </Button>
            <Button
              className="text-sm text-white"
              style={{ backgroundColor: "#7a1d2f" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5e1624")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7a1d2f")}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
          Your Travel History
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Keep track of your adventures and memories here. Start planning your first trip today.
        </p>
        <div
          className="mx-auto mt-6 h-[3px] w-48 rounded-full animate-pulse"
          style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
        />
      </section>

      {/* Empty State */}
      <div className="px-6 mt-10">
        <Card
          className="max-w-3xl mx-auto bg-[#111217]/85 backdrop-blur border rounded-2xl"
          style={{ borderColor: "rgba(255,175,189,0.22)" }}
        >
          <div
            className="pointer-events-none w-full h-0.5"
            style={{
              background:
                "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)",
            }}
          />
          <CardContent className="p-8 text-center space-y-4">
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2">
              <Button
                className="text-sm text-white"
                style={{
                  background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                  boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(90deg,#ffcfd2,#fb6f92)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background =
                    "linear-gradient(90deg,#ff8fab,#fb6f92)")
                }
                onClick={() => navigate("/dashboard")}
              >
                Start Planning
              </Button>
              <Button
                variant="ghost"
                className="text-sm"
                style={{ color: "#ffdfe5" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,207,210,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                onClick={() => navigate("/explore")}
              >
                Explore Places
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Coming soon: detailed trip timeline.</p>
          </CardContent>
        </Card>
      </div>

      {/* Decorative backdrop */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background: "radial-gradient(circle at 20% 30%, #ff8fab22, transparent 60%)",
        }}
      />

      <style>{`
        .animate-pulse {
          animation: pulse-soft 2.6s ease-in-out infinite;
        }
        @keyframes pulse-soft {
          0%,100% { opacity:.35; transform:scaleX(.96); }
          50% { opacity:.75; transform:scaleX(1); }
        }
      `}</style>
    </div>
  );
};

export default History;