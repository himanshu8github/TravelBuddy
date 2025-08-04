import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; 


const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const isSignup = path === "/signup";
  const isLogin = path === "/login";

  return (
    <div className="bg-black/30 backdrop-blur-sm px-6 py-4 fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <h1 className="text-3xl md:text-4xl text-white cursor-pointer drop-shadow-[0_2px_6px_rgba(255,255,255,0.5)]">
            TravelBuddy
          </h1>
        </Link>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-white"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-white text-lg font-medium px-2 py-1 rounded border border-white hover:border-gray-300 transition duration-300"
          >
            Home
          </Link>

          {isSignup && (
            <Link
              to="/login"
              className="bg-white text-black px-4 py-1 rounded shadow hover:shadow-lg transition duration-300"
            >
              Login
            </Link>
          )}

          {isLogin && (
            <Link
              to="/signup"
              className="bg-white text-black px-4 py-1 rounded shadow hover:shadow-lg transition duration-300"
            >
              Signup
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 bg-black/70 rounded px-4 py-3 backdrop-blur-sm">
          <Link
            to="/"
            className="block text-white text-lg"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {isSignup && (
            <Link
              to="/login"
              className="block text-white text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
          {isLogin && (
            <Link
              to="/signup"
              className="block text-white text-lg"
              onClick={() => setMenuOpen(false)}
            >
              Signup
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;
