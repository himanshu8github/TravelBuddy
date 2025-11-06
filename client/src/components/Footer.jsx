import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* About */}
        <div>
          <h2 className="text-2xl font-bold">TravelBuddy</h2>
          <p className="text-sm mt-2 text-gray-400">
            TravelBuddy is your gateway to exploring the beauty, culture, and diversity of India. Discover curated experiences and trusted travel services — all in one place.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Useful Links</h3>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/tours" className="hover:underline">Tour Packages</Link></li>
            <li><Link to="/destinations" className="hover:underline">Destinations</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-300">New Delhi, India</p>
          <p className="text-sm text-gray-300">Email: info@travelbuddy.com</p>
          <p className="text-sm text-gray-300">WhatsApp: +91 85650 00001</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 mt-8 pt-4 flex flex-col md:flex-row justify-between text-xs text-gray-500">
        <div className="flex space-x-4 mb-2 md:mb-0">
          <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
          <Link to="/tips" className="hover:underline">Travel Tips</Link>
        </div>
        <div>© 2025 TravelBuddy. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
