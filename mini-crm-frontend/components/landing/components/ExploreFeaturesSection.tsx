import React from 'react';
import { motion } from 'framer-motion'; // Import motion
import { Layers, Edit3, BarChart2, Share2, Settings2, Users } from 'lucide-react'; // Example icons

const featureItems = [
  {
    icon: <Layers className="w-7 h-7 text-blue-600" />,
    title: 'Contact analysis',
    description: 'Get deeper insights into your contacts at a single glance & easily track.',
  },
  {
    icon: <Edit3 className="w-7 h-7 text-blue-600" />,
    title: 'Content Management',
    description: 'Easily create, edit, and organize your content with Webster CMS.',
  },
  {
    icon: <BarChart2 className="w-7 h-7 text-blue-600" />,
    title: 'Real-time Analytics',
    description: 'Access real-time data on website performance and user engagement.',
  },
  {
    icon: <Share2 className="w-7 h-7 text-blue-600" />,
    title: 'Customizable Layouts',
    description: "Webster's CMS lets you customize layouts with ease. Adjust anything.",
  },
  {
    icon: <Settings2 className="w-7 h-7 text-blue-600" />,
    title: 'SEO Optimization',
    description: 'Built-in SEO features within the CMS ensure your website is optimized.',
  },
  {
    icon: <Users className="w-7 h-7 text-blue-600" />,
    title: 'User Permissions',
    description: 'Manage access levels with user permissions, team collaboration.',
  },
];

const ExploreFeaturesSection = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
      scale: 1.03,
      boxShadow: "0px 10px 25px -8px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="explore-features" className="py-16 sm:py-24 bg-slate-50">
      <div className="roy-container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-regular text-gray-900 leading-tight">
            Explore the powerful features <br /> of Webster easily
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {featureItems.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-start text-left"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-blue-100 p-3 rounded-lg mb-5 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExploreFeaturesSection; 