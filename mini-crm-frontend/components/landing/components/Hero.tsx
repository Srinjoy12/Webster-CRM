import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, ResponsiveContainer, CartesianGrid, ReferenceDot } from 'recharts';
import Link from 'next/link';

const data = [
  { name: 'Feb', value: 150 },
  { name: 'Mar', value: 120 },
  { name: 'Apr', value: 220 }, 
  { name: 'May', value: 200 }, 
];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [animatedNumber, setAnimatedNumber] = useState(0);
  const targetNumber = 26032;
  const animationDuration = 1000; // 1 second
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');

          // Start number animation when hero section is visible
          let startTime: number | null = null;
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = currentTime - startTime;
            const currentNum = Math.min(Math.floor((progress / animationDuration) * targetNumber), targetNumber);
            setAnimatedNumber(currentNum);
            if (progress < animationDuration) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );
    
    const currentHeroRef = heroRef.current;
    if (currentHeroRef) {
      observer.observe(currentHeroRef);
    }
    
    return () => {
      if (currentHeroRef) {
        observer.unobserve(currentHeroRef);
      }
    };
  }, []);

  const avatar1 = "/placeholder-avatar-1.jpg";
  const avatar2 = "/placeholder-avatar-2.jpg";
  const avatar3 = "/placeholder-avatar-3.jpg";

  return (
    <section 
      id="home" 
      className="pt-24 pb-20 min-h-screen flex items-center bg-white"
      ref={heroRef}
    >
      <div className="roy-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 md:space-y-8 text-left">
            <div className="inline-flex items-center bg-gray-100 text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
              <span className="bg-black text-white text-xs font-semibold px-2 py-0.5 rounded-full mr-2">New!</span>
              Sales tracking Available
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-regular leading-tight text-gray-900">
              Boost your CRM with
              <span className="block">real-time insights</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-lg">
              Track customer interactions, boost form stats, improve conversion rates & sales
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-2">
              <Link href="/signup">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 w-full sm:w-auto text-base rounded-lg shadow-md hover:shadow-lg transition-shadow">
                See in Action
              </Button>
              </Link>
              
              <Link href="/signup">
                <Button variant="outline" size="lg" className="bg-white hover:bg-gray-100 text-gray-800 border-gray-300 px-8 py-3 w-full sm:w-auto text-base rounded-lg shadow-sm hover:shadow-md transition-shadow">
                View Demo
              </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-start space-x-3 pt-4">
              <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src={avatar1} alt="User 1" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src={avatar2} alt="User 2" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src={avatar3} alt="User 3" />
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-500">200+ businesses scale</p>
              </div>
            </div>
          </div>
          
          <div className="relative bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-100 rounded-3xl p-6 shadow-2xl">
            <div className="bg-white rounded-[1.375rem] p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-semibold text-gray-800">Total Active User</h3>
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-orange-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                </div>
              </div>
              
              <div className="h-52 md:h-60 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 5, right: 10, bottom: 5, left: -25 }}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6"
                      strokeWidth={2.5} 
                      dot={{ r: 0 }}
                      activeDot={{ r: 6, stroke: '#3B82F6', fill: '#DBEAFE', strokeWidth: 2}}
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6b7280', fontSize: 11 }}
                      dy={10}
                    />
                    <ReferenceDot x="Apr" y={220} r={6} fill="#3B82F6" stroke="#FFFFFF" strokeWidth={2} isFront={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {animatedNumber.toLocaleString()}
                </h2>
                <div className="flex items-center bg-blue-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
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
