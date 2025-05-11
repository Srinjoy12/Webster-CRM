
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="roy-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className="opacity-0 transform translate-y-4 transition-all duration-700"
            ref={imageRef}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-roy-accent"></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
                alt="Roy team collaborating" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-roy-accent"></div>
            </div>
          </div>
          
          <div 
            className="opacity-0 transform translate-y-4 transition-all duration-700 delay-200"
            ref={contentRef}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">About Roy</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2011, Roy is a creative agency that brings together strategists, designers, and developers under one roof. We believe in the power of collaboration and the impact of thoughtful design.
            </p>
            <p className="text-gray-600 mb-6">
              Our approach is simple: we listen, we think, and we create. We work closely with our clients to understand their challenges and opportunities, then craft solutions that are both beautiful and effective.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-3xl font-grotesk font-semibold text-roy-accent">24</p>
                <p className="text-sm text-gray-600">Talented Team Members</p>
              </div>
              <div>
                <p className="text-3xl font-grotesk font-semibold text-roy-accent">12+</p>
                <p className="text-sm text-gray-600">Years of Experience</p>
              </div>
              <div>
                <p className="text-3xl font-grotesk font-semibold text-roy-accent">85+</p>
                <p className="text-sm text-gray-600">Completed Projects</p>
              </div>
              <div>
                <p className="text-3xl font-grotesk font-semibold text-roy-accent">14</p>
                <p className="text-sm text-gray-600">Design Awards</p>
              </div>
            </div>
            <Button className="bg-roy-DEFAULT text-white hover:bg-roy-accent px-8 py-6">
              Meet Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
