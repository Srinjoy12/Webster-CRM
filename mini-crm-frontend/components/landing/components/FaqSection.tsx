import React, { useState } from 'react';
import { Plus, X, Framer } from 'lucide-react'; // Assuming Framer icon is for the link

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
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-slate-50">
      <div className="roy-container px-4 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            FAQ's
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-regular text-gray-900 leading-tight">
            Everything you need to know <br /> about webster
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="mb-4 last:mb-0">
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full flex items-center justify-between text-left p-5 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow focus:outline-none ${openIndex === index ? 'bg-white' : 'bg-white'}`}
              >
                <span className="text-base sm:text-lg font-medium text-gray-800">{faq.question}</span>
                {openIndex === index ? <X className="w-5 h-5 text-gray-600" /> : <Plus className="w-5 h-5 text-gray-600" />}
              </button>
              {openIndex === index && (
                <div className="bg-white p-5 sm:p-6 rounded-b-lg shadow-md -mt-1">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default FaqSection; 