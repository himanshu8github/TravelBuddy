import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0b] text-white px-6 pt-20 pb-10 overflow-hidden">
      {/* gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-70"
           style={{ background: "radial-gradient(circle at 20% 30%, #ff8fab22, transparent 60%)" }} />
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "linear-gradient(180deg,rgba(255,229,236,0.04),rgba(0,0,0,0.3) 60%)" }} />

      {/* top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px]"
           style={{ background: "linear-gradient(90deg,#ffe5ec,#ffcfd2,#ff8fab,#fb6f92)" }} />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* About */}
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#ffe5ec] via-[#ffcfd2] to-[#ff8fab] bg-clip-text text-transparent">
            TravelBuddy
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Your gateway to exploring India’s beauty, culture, and diversity.
            Curated experiences and trusted travel utilities — all in one place.
          </p>
          <div className="flex gap-3 pt-2">
            <span className="text-xs rounded-full px-3 py-1 bg-[#1a1a1f] border border-[#ff8fab33] text-[#ffcfd2]">
              Plan
            </span>
            <span className="text-xs rounded-full px-3 py-1 bg-[#1a1a1f] border border-[#ff8fab33] text-[#ffcfd2]">
              Explore
            </span>
            <span className="text-xs rounded-full px-3 py-1 bg-[#1a1a1f] border border-[#ff8fab33] text-[#ffcfd2]">
              Adventure
            </span>
          </div>
        </div>

        {/* Useful Links */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold" style={{ color: "#ffdfe5" }}>Useful Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { to: "/about", label: "About Us" },
              { to: "/tours", label: "Tour Packages" },
              { to: "/destinations", label: "Destinations" },
              { to: "/contact", label: "Contact" },
            ].map((l, i) => (
              <li key={i}>
                <Link
                  to={l.to}
                  className="inline-block relative group text-gray-300 hover:text-[#ff8fab] transition"
                >
                  {l.label}
                  <span
                    className="absolute left-0 -bottom-0.5 h-[2px] w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: "linear-gradient(90deg,#ffe5ec,#ff8fab)" }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold" style={{ color: "#ffdfe5" }}>Contact</h3>
            <p className="text-sm text-gray-300">New Delhi, India</p>
            <p className="text-sm text-gray-300">
              Email: <a href="mailto:info@travelbuddy.com" className="hover:text-[#ff8fab] transition">info@travelbuddy.com</a>
            </p>
            <p className="text-sm text-gray-300">WhatsApp: +91 85650 00001</p>
            <div className="flex gap-4 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noreferrer"
                 className="text-xs px-3 py-1 rounded-md bg-[#141417] border border-[#ff8fab33] hover:border-[#ff8fab77] hover:text-[#ff8fab] transition">
                Twitter
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                 className="text-xs px-3 py-1 rounded-md bg-[#141417] border border-[#ff8fab33] hover:border-[#ff8fab77] hover:text-[#ff8fab] transition">
                LinkedIn
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer"
                 className="text-xs px-3 py-1 rounded-md bg-[#141417] border border-[#ff8fab33] hover:border-[#ff8fab77] hover:text-[#ff8fab] transition">
                GitHub
              </a>
            </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative max-w-7xl mx-auto mt-12 pt-5 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        <div className="flex gap-5">
          <Link to="/disclaimer" className="hover:text-[#ff8fab] transition">Disclaimer</Link>
          <Link to="/tips" className="hover:text-[#ff8fab] transition">Travel Tips</Link>
        </div>
        <div className="text-gray-500">
          © 2025 TravelBuddy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;