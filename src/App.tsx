import AboutSection from '@/components/landing/AboutSection';
import CtaSection from '@/components/landing/CtaSection';
import FaqSection from '@/components/landing/FaqSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import Footer from '@/components/landing/Footer';
import GallerySection from '@/components/landing/GallerySection';
import Hero from '@/components/landing/Hero';
import Navbar from '@/components/landing/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <FeaturesSection />
        <GallerySection />
        <CtaSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
