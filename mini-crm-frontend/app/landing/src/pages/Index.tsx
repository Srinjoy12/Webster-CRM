import React, { useEffect } from 'react';
import Navbar from '@/app/landing/src/components/Navbar';
import Hero from '@/app/landing/src/components/Hero';
import Footer from '@/app/landing/src/components/Footer';

const Index = () => {
  // Initialize animations and any interactivity
  useEffect(() => {
    // Add smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        const href = target.getAttribute('href');
        if (!href) return;
        
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Index;
