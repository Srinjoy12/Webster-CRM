import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/landing/components/ui/button';

const services = [
  {
    id: 1,
    title: "Brand Strategy",
    description: "We create strategic brand foundations that set you apart from competitors and resonate with your audience.",
    features: ["Brand Positioning", "Market Research", "Brand Messaging", "Visual Identity"],
  },
  {
    id: 2,
    title: "Digital Experience",
    description: "We design and develop digital experiences that connect with your audience and achieve your business goals.",
    features: ["Website Design", "UX/UI Design", "Web Development", "E-commerce Solutions"],
  },
  {
    id: 3,
    title: "Creative Production",
    description: "We produce engaging content that tells your story and captures the attention of your target audience.",
    features: ["Photography", "Videography", "Animation", "Art Direction"],
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    cardRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      cardRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="services" className="py-20 bg-roy-light" ref={sectionRef}>
      <div className="roy-container">
        <div className="text-center max-w-2xl mx-auto mb-16 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Services</h2>
          <p className="text-gray-600">
            We offer a comprehensive range of creative and strategic services to elevate your brand and digital presence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id}
              className="bg-white p-8 rounded-lg border border-gray-100 transition-all hover:shadow-md opacity-0"
              ref={el => cardRefs.current[index] = el}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="mb-8 space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-roy-accent mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full border-roy-DEFAULT text-roy-DEFAULT hover:bg-roy-DEFAULT hover:text-white">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
