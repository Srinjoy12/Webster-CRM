import React from 'react';
import { ArrowUp, Plus, Minus, ClipboardList, ArrowRight } from 'lucide-react';
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
  return (
    <section id="management" className="py-16 sm:py-24 bg-white">
      <div className="roy-container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Management Card */}
          <div className="bg-slate-50 p-6 sm:p-8 rounded-xl shadow-xl order-last lg:order-first">
            <div className="flex items-center mb-6">
              <ClipboardList className="w-6 h-6 text-gray-700 mr-3" />
              <h3 className="text-xl font-semibold text-gray-800">Management</h3>
            </div>
            <div className="space-y-4">
              {managementItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    {item.icon}
                    <p className="ml-3 text-sm font-medium text-gray-700">{item.name}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="text-left">
            <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full mb-4">
              Management
            </span>
            <h2 className="text-4xl sm:text-5xl font-regular text-gray-900 leading-tight mb-6">
              Effortlessly manage <br /> customer relationships
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              Webster seamlessly integrates with popular CRM platforms, allowing you to manage leads, track customer interactions, and improve your startup's growth—all in one place.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Get started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagementSection; 