import React from 'react';
import { Zap } from 'lucide-react'; // Lightning bolt icon
import { Button } from './ui/button'; // Assuming Button component is in ./ui/button
import Link from 'next/link'; // Added Link import

const CtaSection = () => {
  return (
    <section id="cta" className="py-12 sm:py-16 bg-slate-50"> {/* Outer container for spacing */}
      <div className="roy-container px-4 mx-auto">
        <div className="relative bg-gradient-to-r from-white to-blue-100 p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl text-center overflow-hidden">
          {/* Optional: Subtle background pattern or elements if desired */}
          {/* <div className="absolute inset-0 opacity-10 bg-pattern-dots"></div> */}
          
          <div className="relative z-10">
            <div className="inline-block bg-white p-3 rounded-lg shadow-md mb-6">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-regular text-gray-800 leading-tight mb-8">
              Start using Webster today <br /> & grow your business
            </h2>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup"> {/* Changed to /signup */}
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 w-full sm:w-auto text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get started
                </Button>
              </Link>
              <Link href="/signup"> {/* Changed to /signup */}
                <Button 
                  variant="outline"
                  size="lg" 
                  className="bg-transparent hover:bg-blue-50 border-blue-700 text-blue-700 px-8 py-3 w-full sm:w-auto text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection; 