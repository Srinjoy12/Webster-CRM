import React from 'react';
import { Database, Sparkles, Heart, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: <Database className="w-7 h-7 text-blue-600" />,
    title: 'Choose your plan',
    description: 'Select the pricing plan that best suits your startup\'s needs and goals.',
  },
  {
    icon: <Sparkles className="w-7 h-7 text-blue-600" />,
    title: 'Customize your template',
    description: "Easily personalize the design and content to reflect your brand's unique style.",
  },
  {
    icon: <Heart className="w-7 h-7 text-blue-600" />,
    title: 'Launch your website',
    description: 'Publish your site with just a few clicks and start reaching your audience instantly.',
  },
];

const HowItWorksSection = () => {
  // Placeholder image URL - replace with your actual image path
  const placeholderImageUrl = '/placeholder-person-working.jpg'; 

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white">
      <div className="roy-container px-4 mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            How it works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-regular text-gray-900 leading-tight">
            Guide on how webster works <br /> for your startup
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Image with Overlay Card */}
          <div className="relative order-last lg:order-first">
            <img 
              src={placeholderImageUrl} 
              alt="Person working on a startup" 
              className="rounded-xl shadow-2xl object-cover w-full h-auto max-h-[500px]"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 sm:translate-x-0 sm:left-4 sm:bottom-4 bg-white p-4 rounded-lg shadow-xl w-max min-w-[200px]">
              <p className="text-sm font-medium text-gray-700 mb-1">Total clients</p>
              <div className="flex items-center justify-between">
                <p className="text-xl font-bold text-gray-900">5,239</p>
                <div className="relative w-10 h-10 ml-3">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path 
                      className="text-gray-200" 
                      strokeWidth="3" 
                      fill="none" 
                      strokeLinecap="round" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path 
                      className="text-blue-600" 
                      strokeWidth="3" 
                      strokeDasharray="76, 100" // 76% fill
                      strokeLinecap="round" 
                      fill="none" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">76%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Steps */}
          <div className="space-y-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start pl-12 relative">
                {/* Dashed line connector - not for the last item */}
                {index < steps.length - 1 && (
                  <div className="absolute left-[21px] top-10 bottom-0 w-px border-l-2 border-dashed border-gray-300 h-[calc(100%-2.5rem)]"></div>
                )}
                <div className="absolute left-0 top-0 flex-shrink-0 bg-blue-100 p-3 rounded-full">
                  {step.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 