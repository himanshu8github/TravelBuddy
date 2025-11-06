import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false); // close menu on click
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm px-6 py-4 fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1
          className="text-3xl md:text-4xl text-white cursor-pointer drop-shadow-[0_2px_6px_rgba(255,255,255,0.5)]"
          onClick={() => scrollToSection("hero")}
        >
          TravelBuddy
        </h1>

        {/* Hamburger Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu - Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
          {["places", "how-it-works", "pricing", "reviews", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="text-white text-lg font-medium px-2 py-1 rounded
                border border-transparent hover:border-white transition duration-300
                drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            >
              {id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}

          <Link
            to="/login"
            className="bg-white text-black px-4 py-1 rounded shadow hover:shadow-lg transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-black px-4 py-1 rounded shadow hover:shadow-lg transition duration-300"
          >
            Signup
          </Link>
        </div>
      </div>

      {/* Menu - Mobile */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-black/70 rounded px-4 py-3 backdrop-blur-sm">
          {["places", "how-it-works", "pricing", "reviews", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="block w-full text-left text-white text-lg font-medium"
            >
              {id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </button>
          ))}
          <Link
            to="/login"
            className="block text-white text-lg mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block text-white text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
