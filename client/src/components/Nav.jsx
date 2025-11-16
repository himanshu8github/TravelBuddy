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
    <div
      className="fixed w-full z-50 px-6 py-4 bg-black/50 backdrop-blur border-b shadow-[0_4px_24px_rgba(0,0,0,0.25)]"
      style={{ borderColor: "rgba(255,175,189,0.18)" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <h1 className="text-3xl md:text-4xl cursor-pointer font-extrabold tracking-wide bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
            TravelBuddy
          </h1>
        </Link>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="text-white/90 hover:text-white focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/"
            className="px-3 py-1.5 text-sm font-medium text-[#ffdfe5] rounded-md border border-transparent hover:bg-[rgba(255,207,210,0.08)] hover:border-[#ff8fab33] transition-colors"
          >
            Home
          </Link>

          {isSignup && (
            <Link
              to="/login"
              className="text-sm px-4 py-1.5 text-white rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
            >
              Login
            </Link>
          )}

          {isLogin && (
            <Link
              to="/signup"
              className="text-sm px-4 py-1.5 text-white rounded-md transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
            >
              Signup
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden mt-4 rounded-lg border bg-[#111217]/85 px-4 py-3 backdrop-blur"
          style={{ borderColor: "rgba(255,175,189,0.22)" }}
        >
          <div
            className="pointer-events-none w-full h-0.5 rounded-t-lg mb-3"
            style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }}
          />
          <div className="space-y-3">
            <Link
              to="/"
              className="block w-full text-left text-sm font-medium text-[#ffdfe5] px-2 py-2 rounded hover:bg-[rgba(255,207,210,0.08)] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>

            {isSignup && (
              <Link
                to="/login"
                className="block text-center text-sm px-4 py-2 text-white rounded-md transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                  boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
            {isLogin && (
              <Link
                to="/signup"
                className="block text-center text-sm px-4 py-2 text-white rounded-md transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg,#ff8fab,#fb6f92)",
                  boxShadow: "0 4px 18px rgba(251,111,146,0.25)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ffcfd2,#fb6f92)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(90deg,#ff8fab,#fb6f92)")}
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nav;