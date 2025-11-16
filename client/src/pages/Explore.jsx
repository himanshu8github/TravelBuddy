import React, { useState, useMemo } from "react";
import placesData from "../data/places";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase";

const Explore = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const filteredPlaces = useMemo(() => {
    if (!query.trim()) return placesData;
    return placesData.filter((stateGroup) => {
      const q = query.toLowerCase();
      const matchState = stateGroup.state.toLowerCase().includes(q);
      const matchDestinations = stateGroup.destinations.some((d) =>
        d.toLowerCase().includes(q)
      );
      return matchState || matchDestinations;
    });
  }, [query]);

  const totalDestinations = filteredPlaces.reduce(
    (acc, g) => acc + g.destinations.length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0b] via-[#101016] to-black text-white">
      {/* Navbar */}
      <nav
        className="fixed top-0 w-full z-50 px-6 py-4 bg-black/45 backdrop-blur border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        style={{ borderColor: "rgba(255,175,189,0.18)" }}
      >
        <div
          className="cursor-pointer text-center md:text-left"
          onClick={() => navigate("/dashboard")}
        >
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent tracking-wide">
            TravelBuddy
          </h1>
          <p className="text-[11px] text-gray-500">Plan. Explore. Adventure.</p>
        </div>
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
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
            className="text-sm text-white shadow-sm"
            style={{ backgroundColor: "#7a1d2f" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#5e1624")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#7a1d2f")}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
          Explore India
        </h2>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Discover states and destinations across India. Search to instantly filter
          places and start planning.
        </p>
        <div
          className="mx-auto mt-6 h-[3px] w-48 rounded-full animate-pulse"
          style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab)" }}
        />
      </section>

      {/* Search */}
      <div className="mt-10 max-w-xl mx-auto px-6">
        <div className="relative group">
          <Input
            type="text"
            placeholder="Search by state or destination..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#111217] border text-sm py-3 pl-4 pr-16 rounded-lg placeholder:text-gray-500 focus-visible:ring-0 focus:outline-none transition"
            style={{
              borderColor: query
                ? "#fb6f92"
                : "rgba(255,175,189,0.28)",
              color: "#fef6f8",
            }}
          />
          {query && (
            <button
              aria-label="Clear search"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-md bg-[#1a1b20] border border-[#ff8fab44] hover:border-[#ff8fabaa] hover:text-[#ff8fab] transition"
            >
              Clear
            </button>
          )}
        </div>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>
            Showing {filteredPlaces.length} state{filteredPlaces.length !== 1 && "s"}
          </span>
          <span>{totalDestinations} destinations</span>
        </div>
      </div>

      {/* Quick suggestion tags */}
      <div className="mt-6 max-w-xl mx-auto flex flex-wrap gap-2 px-6">
        {["Goa", "Jaipur", "Kashmir", "Kerala", "Manali", "Leh"].map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="text-[11px] px-3 py-1 rounded-full bg-[#16171c] border border-[#ff8fab33] text-[#ffcfd2] hover:border-[#ff8fab77] hover:text-[#ff8fab] transition"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="mt-12 px-6 pb-24">
        <Accordion
          type="multiple"
          className="max-w-3xl mx-auto space-y-3"
        >
          {filteredPlaces.length === 0 && (
            <div className="text-center py-16 border rounded-xl border-dashed"
                 style={{ borderColor: "rgba(255,175,189,0.28)" }}>
              <p className="text-sm text-gray-400">
                No matches found. Try a different search.
              </p>
            </div>
          )}
          {filteredPlaces.map((group, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="overflow-hidden rounded-xl border bg-[#111217]/85 backdrop-blur transition hover:border-[#fb6f92]/50"
              style={{ borderColor: "rgba(255,175,189,0.22)" }}
            >
              <div
                className="pointer-events-none inset-x-0 top-0 h-0.5"
                style={{
                  background:
                    "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)",
                }}
              />
              <AccordionTrigger className="px-5 py-4 text-left text-sm md:text-base font-semibold tracking-wide [&[data-state=open]]:text-[#ff8fab]">
                <span className="flex flex-col">
                  {group.state}
                  <span className="mt-0.5 text-[10px] font-medium text-gray-400">
                    {group.destinations.length} destination
                    {group.destinations.length !== 1 && "s"}
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-0">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs md:text-sm text-gray-300">
                  {group.destinations.map((place, i) => (
                    <li
                      key={i}
                      className="relative pl-3"
                    >
                      <span
                        className="absolute left-0 top-2 h-1.5 w-1.5 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg,#ffcfd2,#ff8fab)",
                        }}
                      />
                      {place}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Decorative backdrop */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, #ff8fab22, transparent 60%)",
        }}
      />
    </div>
  );
};

export default Explore;