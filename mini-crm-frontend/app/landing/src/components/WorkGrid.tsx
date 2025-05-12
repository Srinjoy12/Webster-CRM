import React, { useEffect, useRef } from 'react';
// import Link from 'next/link'; // Removed unused import
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/landing/components/ui/button';
// import { motion } from 'framer-motion'; // Removed unused import

const projects = [
  {
    id: 1,
    title: "Gradient Exploration",
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Digital Experience",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Modern Interface",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Tech Solutions",
    category: "Development",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Creative Direction",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Web Platform",
    category: "Development",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
  },
];

const WorkGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    itemRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      itemRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section id="work" className="py-20 bg-white" ref={sectionRef}>
      <div className="roy-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 opacity-0 animate-fade-in">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Work</h2>
            <p className="text-gray-600 max-w-xl">
              We collaborate with forward-thinking brands to create memorable experiences.
            </p>
          </div>
          <Button variant="link" className="text-roy-DEFAULT flex items-center mt-4 md:mt-0 hover:text-roy-accent">
            View All Projects <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-card group bg-white rounded-md overflow-hidden opacity-0"
              ref={el => itemRefs.current[index] = el}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-80 object-cover transition-all duration-500"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-roy-accent mb-2">{project.category}</p>
                <h3 className="text-xl font-medium mb-4 group-hover:text-roy-accent transition-all">
                  {project.title}
                </h3>
                <Button variant="link" className="p-0 text-roy-DEFAULT flex items-center hover:text-roy-accent">
                  View Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;
