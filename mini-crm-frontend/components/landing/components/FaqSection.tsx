import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { Plus, X } from 'lucide-react';

const faqData = [
  {
    question: 'What is Webster?',
    answer: 'Webster is a powerful CRM SaaS tool designed to help startups efficiently manage customer relationships, track leads, and streamline business processes.',
  },
  {
    question: 'How can I customize the template?',
    answer: 'Customization options are available in the dashboard. You can change colors, fonts, layouts, and add your own branding elements easily.',
  },
  {
    question: 'Is Webster mobile-friendly?',
    answer: 'Yes, Webster is designed to be fully responsive and works seamlessly across desktops, tablets, and mobile devices.',
  },
  {
    question: 'Can I integrate third-party tools with Webster?',
    answer: 'Webster offers various integrations with popular third-party tools. Check our integrations page for a full list.',
  },
  {
    question: 'Do I need coding knowledge to use Webster?',
    answer: 'No, Webster is designed to be user-friendly. No coding knowledge is required to set up or manage your CRM.',
  },
  {
    question: 'What support is available with Webster?',
    answer: 'We offer comprehensive support through email, live chat, and an extensive knowledge base with tutorials and guides.',
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const faqListContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const faqItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto', 
      marginTop: '-0.25rem', // -mt-1
      paddingTop: '1.25rem', // p-5
      paddingBottom: '1.25rem', // p-5
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0, 
      height: 0, 
      marginTop: 0, 
      paddingTop: 0, 
      paddingBottom: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50">
      <div className="roy-container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            FAQ&apos;s
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-regular text-gray-900 leading-tight">
            Everything you need to know <br /> about webster
          </h2>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          variants={faqListContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {faqData.map((faq, index) => (
            <motion.div key={index} className="mb-4 last:mb-0" variants={faqItemVariants}>
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full flex items-center justify-between text-left p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none ${openIndex === index ? 'bg-white' : 'bg-white'}`}
              >
                <span className="text-base sm:text-lg font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? <X className="w-5 h-5 text-gray-600" /> : <Plus className="w-5 h-5 text-gray-600" />}
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div 
                    className="bg-white rounded-b-lg shadow-md overflow-hidden" // Added overflow-hidden for smoother height animation
                    key="answer" // Important for AnimatePresence
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {/* Inner div for padding, as motion.div directly controls padding for animation */}
                    <div className="p-5 sm:p-6">
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default FaqSection; 