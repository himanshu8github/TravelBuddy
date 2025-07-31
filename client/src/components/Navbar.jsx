import { Link } from 'react-router-dom';

const Navbar = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm px-6 py-4 flex justify-between items-center fixed w-full z-50 shadow-sm">
      <h1
        className="text-4xl text-white cursor-pointer drop-shadow-[0_2px_6px_rgba(255,255,255,0.5)]"
        onClick={() => scrollToSection('hero')}
      >
        TravelBuddy
      </h1>

      <div className="space-x-6 flex items-center">
        {['places', 'how-it-works', 'pricing', 'reviews', 'contact'].map((id) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="text-white text-lg font-medium px-2 py-1 rounded
              border border-transparent hover:border-white
              transition duration-300 ease-in-out
              drop-shadow-[0_0_2px_rgba(255,255,255,0.2)] 
              hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          >
            {id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
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
  );
};

export default Navbar;
