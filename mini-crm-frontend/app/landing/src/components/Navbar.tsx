import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // Removed unused import
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/landing/components/ui/button';

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
      scrolled ? "bg-roy-light/95 backdrop-blur-sm border-b" : "bg-transparent"
    )}>
      <div className="roy-container flex items-center justify-between">
        <a href="#home" className="text-foreground font-grotesk text-2xl font-bold">Roy</a>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-roy-accent transition-all text-sm font-medium"
            >
              {item.name}
            </a>
          ))}
          <Button className="bg-foreground text-white hover:bg-roy-accent">
            Get in Touch
          </Button>
        </nav>
        
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
            <Button 
              className="bg-foreground text-white hover:bg-roy-accent w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
