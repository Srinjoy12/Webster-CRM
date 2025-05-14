import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import { ArrowUp, Plus, Minus, ClipboardList } from 'lucide-react';
import { Button } from './ui/button'; // Assuming Button component is in ./ui/button relative to this new component

const managementItems = [
  {
    name: 'Muzamal Hussain',
    tag: 'Framer',
    icon: <ArrowUp className="w-4 h-4 text-blue-600" />,
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Smith White',
    tag: 'Figma',
    icon: <Plus className="w-4 h-4 text-green-600" />,
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    name: 'Truth Petit',
    tag: 'Youtube',
    icon: <Minus className="w-4 h-4 text-red-600" />,
    tagColor: 'bg-red-100 text-red-700',
  },
];

const ManagementSection = () => {
  // Variants for the text content (right side on lg, left on mobile)
  const textContentContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const textItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  // Variants for the management card (left side on lg, right on mobile)
  const managementCardBaseVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } }
  };
  
  const managementListContainerVariants = {
    // No explicit transition here, parent (managementCardBaseVariants) handles entry
    // Stagger will apply once parent is visible
    hidden: { }, // Can be empty, opacity handled by parent for the whole card
    visible: {
        transition: { staggerChildren: 0.1, delayChildren: 0.2 } // Delay for items after card appears
    }
  };

  const managementListItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { 
      scale: 1.02,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="management" className="py-16 sm:py-24 bg-white">
      <div className="roy-container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Management Card - ensure motion.div is the direct child for grid styling */}
          <motion.div 
            className="bg-slate-50 p-6 sm:p-8 rounded-xl shadow-xl order-last lg:order-first"
            variants={managementCardBaseVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center mb-6">
              <ClipboardList className="w-6 h-6 text-gray-700 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Management</h3>
            </div>
            <motion.div 
                className="space-y-4"
                variants={managementListContainerVariants} // This will control stagger for items
                // initial="hidden" // Already handled by parent
                // whileInView="visible" // Already handled by parent
                // viewport={{ once: true }} // Already handled by parent
            >
              {managementItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  variants={managementListItemVariants}
                  whileHover="hover"
                >
                  <div className="flex items-center">
                    {item.icon}
                    <p className="ml-3 text-sm font-medium text-gray-700">{item.name}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side: Text Content */}
          <motion.div 
            className="text-left"
            variants={textContentContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.span variants={textItemVariants} className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
              Management
            </motion.span>
            <motion.h2 variants={textItemVariants} className="text-4xl sm:text-5xl font-regular text-gray-900 leading-tight mb-6">
              Effortlessly manage <br /> customer relationships
            </motion.h2>
            <motion.p variants={textItemVariants} className="text-gray-600 text-lg mb-8 max-w-xl">
              Webster seamlessly integrates with popular CRM platforms, allowing you to manage leads, track customer interactions, and improve your startup&apos;s growth—all in one place.
            </motion.p>
            <motion.div variants={textItemVariants}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Get started
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManagementSection; 