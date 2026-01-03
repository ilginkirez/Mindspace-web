import { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesSection } from './ServicesSection';
import { TeamSection } from './TeamSection';
import { ContactSection } from './ContactSection';

export function HomePage() {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear state to avoid scrolling on subsequent renders? No, state is immutable in location unless we navigate.
      // Ideally we should replace state.
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}