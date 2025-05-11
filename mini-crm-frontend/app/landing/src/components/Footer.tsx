
import React from 'react';
import { ArrowUp } from 'lucide-react';

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" }
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-roy-DEFAULT text-white py-16">
      <div className="roy-container">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-10 md:mb-0">
            <a href="#home" className="text-white font-grotesk text-3xl font-bold">Roy</a>
            <p className="text-gray-400 mt-4 max-w-sm">
              A creative agency specializing in brand strategy, digital experiences, and visual identity.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                {navItems.map(item => (
                  <li key={item.name}>
                    <a href={item.href} className="text-gray-400 hover:text-roy-accent transition-colors">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-roy-accent transition-colors">
                    Brand Strategy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-roy-accent transition-colors">
                    Digital Experience
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-roy-accent transition-colors">
                    Creative Production
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-roy-accent transition-colors">
                    Web Development
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-roy-accent transition-colors">
                    UX/UI Design
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">hello@royagency.com</li>
                <li className="text-gray-400">+1 (234) 567-890</li>
                <li className="text-gray-400">
                  123 Design Avenue<br />
                  New York, NY 10001
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Roy. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-roy-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-roy-accent transition-colors">
              Terms of Service
            </a>
            <button 
              onClick={scrollToTop} 
              className="ml-4 bg-roy-accent text-white p-2 rounded-full hover:bg-white hover:text-roy-DEFAULT transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
