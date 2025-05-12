import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/landing/components/ui/button';
import { LineChart, Line, XAxis, ResponsiveContainer, CartesianGrid, ReferenceDot } from 'recharts';

const data = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1800 },
  { name: 'Mar', value: 3200 },
  { name: 'Apr', value: 2000 },
  { name: 'May', value: 3800 },
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="home" 
      className="pt-20 pb-20 min-h-screen flex items-center"
      ref={heroRef}
    >
      <div className="roy-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-full text-sm">
              <span className="bg-black text-white text-xs px-3 py-1 rounded-full mr-2">New!</span>
              Sales tracking Available
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-tight text-gray-900 opacity-0 animate-fade-in">
              Boost your CRM with
              <span className="block">real-time insights</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl opacity-0 animate-fade-in-delay-1">
              Track customer interactions, boost form stats, improve conversion rates & sales
            </p>
            
            <div className="flex flex-col sm:flex-row items-start gap-4 opacity-0 animate-fade-in-delay-2">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6">
                See in Action
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="lg" className="border-gray-300 hover:bg-gray-100 text-gray-800 px-8 py-6">
                View Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 opacity-0 animate-fade-in-delay-3">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white overflow-hidden">
                  <img src="/lovable-uploads/d5f1c501-999c-4b48-a8e0-e48bb98a60ea.png" className="w-full h-full object-cover" alt="User" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-white"></div>
                <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-white"></div>
              </div>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600">200+ businesses scale</p>
              </div>
            </div>
          </div>
          
          <div className="relative bg-gradient-to-br from-blue-100 to-white rounded-3xl p-6 opacity-0 animate-fade-in-delay-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-medium text-gray-900">Total Active User</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563EB" 
                      strokeWidth={3} 
                      dot={false}
                      activeDot={{ r: 6, fill: "#2563EB", stroke: "#fff", strokeWidth: 2 }}
                    />
                    <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <ReferenceDot x="May" y={3800} r={6} fill="#2563EB" stroke="#fff" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <h2 className="text-4xl font-bold text-gray-900">26,032</h2>
                <div className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  <ArrowRight className="h-3 w-3 mr-1 transform rotate-90" />
                  +3.4%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
