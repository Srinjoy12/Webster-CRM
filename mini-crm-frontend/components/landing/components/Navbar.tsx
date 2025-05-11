import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed w-full z-50 transition-all py-4 px-4 md:px-6 lg:px-8",
      scrolled ? "bg-gray-100/95 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <a href="#home" className="text-black font-grotesk text-2xl font-regular">Webster</a>
          
          <nav className="hidden md:flex items-center space-x-4 ml-140">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-black hover:text-roy-accent transition-all text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
            <Link href="/signup">
              <Button className="bg-foreground text-black hover:bg-gray-100">
                Get in Touch
              </Button>
            </Link>
          </nav>
        </div>
        
        <button 
          className="block md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] bg-roy-light z-40">
          <div className="roy-container py-8 flex flex-col space-y-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-roy-accent transition-all text-lg font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Link href="/signup">
              <Button 
                className="bg-foreground text-white hover:bg-roy-accent w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
