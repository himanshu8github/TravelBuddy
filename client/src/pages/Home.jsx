import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import PlacesComponent from '../components/Places';

const HowItWorks = () => (
  <section id="how-it-works" className="h-screen flex items-center justify-center bg-white">
    <h2 className="text-3xl font-semibold">How It Works</h2>
  </section>
);

const Pricing = () => (
  <section id="pricing" className="h-screen flex items-center justify-center bg-gray-100">
    <h2 className="text-3xl font-semibold">Pricing Plans</h2>
  </section>
);

const Reviews = () => (
  <section id="reviews" className="h-screen flex items-center justify-center bg-white">
    <h2 className="text-3xl font-semibold">Customer Reviews</h2>
  </section>
);

const Contact = () => (
  <section id="contact" className="h-screen flex items-center justify-center bg-gray-100">
    <h2 className="text-3xl font-semibold">Contact Us</h2>
  </section>
);

function Home() {
  return (
    <>
      <Navbar />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="places">
        <PlacesComponent />
      </section>

      <HowItWorks />
      <Pricing />
      <Reviews />
      <Contact />
    </>
  );
}

export default Home;
