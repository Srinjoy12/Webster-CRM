import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
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
    
    if (formContainerRef.current) {
      observer.observe(formContainerRef.current);
    }
    
    if (infoRef.current) {
      observer.observe(infoRef.current);
    }
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (formContainerRef.current) observer.unobserve(formContainerRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
    };
  }, []);

  return (
    <section id="contact" className="py-20 bg-roy-light" ref={sectionRef}>
      <div className="roy-container">
        <div className="text-center max-w-2xl mx-auto mb-16 opacity-0 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600">
            Ready to start your project? Reach out to us and let's create something amazing together.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div 
            className="lg:col-span-3 opacity-0 transform translate-y-4 transition-all duration-700"
            ref={formContainerRef}
          >
            <form className="bg-white p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    className="w-full border-gray-300 focus:border-roy-accent focus:ring focus:ring-roy-accent/20 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full border-gray-300 focus:border-roy-accent focus:ring focus:ring-roy-accent/20 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input 
                  id="subject" 
                  placeholder="How can we help you?" 
                  className="w-full border-gray-300 focus:border-roy-accent focus:ring focus:ring-roy-accent/20 rounded-md"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us about your project..." 
                  rows={5}
                  className="w-full border-gray-300 focus:border-roy-accent focus:ring focus:ring-roy-accent/20 rounded-md"
                />
              </div>
              
              <Button className="w-full bg-roy-DEFAULT text-white hover:bg-roy-accent py-6">
                Send Message
              </Button>
            </form>
          </div>
          
          <div 
            className="lg:col-span-2 opacity-0 transform translate-y-4 transition-all duration-700 delay-200"
            ref={infoRef}
          >
            <div className="bg-roy-DEFAULT text-white p-8 rounded-lg h-full">
              <h3 className="text-2xl font-semibold mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 text-roy-accent" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a href="mailto:hello@royagency.com" className="text-gray-300 hover:text-roy-accent">
                      hello@royagency.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 text-roy-accent" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <a href="tel:+1234567890" className="text-gray-300 hover:text-roy-accent">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 text-roy-accent" />
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <p className="text-gray-300">
                      123 Design Avenue<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <p className="font-medium mb-4">Follow Us</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-white hover:text-roy-accent">
                    Instagram
                  </a>
                  <a href="#" className="text-white hover:text-roy-accent">
                    Twitter
                  </a>
                  <a href="#" className="text-white hover:text-roy-accent">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
