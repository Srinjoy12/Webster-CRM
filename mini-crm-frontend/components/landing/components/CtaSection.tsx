import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import { Zap } from 'lucide-react'; // Lightning bolt icon
import { Button } from './ui/button'; // Assuming Button component is in ./ui/button
import Link from 'next/link'; // Added Link import

const CtaSection = () => {
  const sectionVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.5, when: "beforeChildren", staggerChildren: 0.15, delayChildren:0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const buttonHoverVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.15 }
    }
  }

  return (
    <section id="cta" className="py-12 sm:py-16 bg-slate-50"> {/* Outer container for spacing */}
      <div className="roy-container px-4 mx-auto">
        <motion.div 
          className="relative bg-gradient-to-r from-white to-blue-100 p-8 sm:p-12 md:p-16 rounded-xl shadow-2xl text-center overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Optional: Subtle background pattern or elements if desired */}
          {/* <div className="absolute inset-0 opacity-10 bg-pattern-dots"></div> */}
          
          <div className="relative z-10"> {/* No motion here, parent staggers children */}
            <motion.div variants={itemVariants} className="inline-block bg-white p-3 rounded-lg shadow-md mb-6">
              <Zap className="w-8 h-8 text-blue-600" />
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-regular text-gray-800 leading-tight mb-8">
              Start using Webster today <br /> & grow your business
            </motion.h2>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <motion.div variants={buttonHoverVariants} whileHover="hover">
                  <Button 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 w-full sm:w-auto text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform" // Removed hover:scale-105
                  >
                    Get started
                  </Button>
                </motion.div>
              </Link>
              <Link href="/signup">
                <motion.div variants={buttonHoverVariants} whileHover="hover">
                  <Button 
                    variant="outline"
                    size="lg" 
                    className="bg-transparent hover:bg-blue-50 border-blue-700 text-blue-700 px-8 py-3 w-full sm:w-auto text-base rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform" // Removed hover:scale-105
                  >
                    View Demo
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection; 