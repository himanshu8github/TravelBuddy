import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import HomeExplore from '../components/HomeExplore';
import HowItWork from "../components/HowItWork";
import Pricing from '../components/Pricing'
import Reviews from '../components/Review'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar />

      <section id="hero">
        <HeroSection />
      </section>
<section id="places">
  <HomeExplore />
</section>

        <section id="how-it-works">
        <HowItWork />
      </section>
        <section id="pricing">
        <Pricing />
      </section>
         <section id="reviews">
        <Reviews />
      </section>
           <section id="contact">
        <Footer />
      </section>


   
    </>
  );
}

export default Home;
