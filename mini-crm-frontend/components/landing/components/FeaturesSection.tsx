import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, BarChart3, Users, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

const analyticsData = [
  { name: 'Jun', sales: 2000 },
  { name: 'Jul', sales: 2500 },
  { name: 'Aug', sales: 2300 },
  { name: 'Sep', sales: 3000 },
  { name: 'Oct', sales: 3500 },
  { name: 'Nov', sales: 3200 },
];

const projectTasks = [
  { title: 'Manage tasks Free', price: '$200 per month, unlimited', color: 'bg-green-500', icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
  { title: 'Monthly Audit', price: '$200 per month, unlimited 18+', color: 'bg-orange-500', icon: <BarChart3 className="w-5 h-5 text-orange-500" /> },
  { title: 'Trial', price: '$25 One Time', color: 'bg-yellow-400', icon: <Users className="w-5 h-5 text-yellow-400" /> },
];

const automationUsers = [
  { name: 'Michael Brown', amount: '$8500', avatar: '/placeholder-avatar-1.jpg' },
  { name: 'Daniel Carter', amount: '$8500', avatar: '/placeholder-avatar-2.jpg' },
  { name: 'Sarah Thompson', amount: '$8500', avatar: '/placeholder-avatar-3.jpg' },
  { name: 'David Lee', amount: '$8500', avatar: '/placeholder-avatar-4.jpg' }, // Added another placeholder
];

const FeaturesSection = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4 }
    },
    hover: {
      scale: 1.03, // Scale up by 3%
      boxShadow: "0px 15px 30px -5px rgba(0, 0, 0, 0.1)", // A slightly more pronounced shadow
      transition: { duration: 0.2 }
    }
  };

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-50">
      <div className="roy-container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={titleVariants}
        >
          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            About us
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-regular text-gray-900">
            Empowering startups with <br /> smart CRM solutions
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardContainerVariants}
        >
          {/* Card 1: Track projects */}
          <motion.div 
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-shadow hover:shadow-2xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Track projects</h3>
            <p className="text-sm text-gray-600 mb-6">
              Monitor the number of active deals and sales pipelines in real-time.
            </p>
            <div className="space-y-4">
              {projectTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center">
                    <span className={`w-1.5 h-10 ${task.color} rounded-full mr-4`}></span>
                    <div>
                      <h4 className="font-medium text-gray-800 text-sm">{task.title}</h4>
                      <p className="text-xs text-gray-500">{task.price}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Advanced analytics */}
          <motion.div 
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-shadow hover:shadow-2xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced analytics</h3>
            <p className="text-sm text-gray-600 mb-6">
              Track customer behavior, sales trends, & optimize your conversion rates
            </p>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-xs text-gray-500 uppercase">TOTAL ONLINE SALES</p>
                  <p className="text-3xl font-bold text-gray-900">$53,120</p>
                </div>
                <span className="flex items-center text-xs bg-blue-100 text-blue-600 font-semibold px-2 py-1 rounded-full">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  15.52%
                </span>
              </div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
                    <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} dot={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={5} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', borderColor: '#e5e7eb', fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      itemStyle={{ color: '#3B82F6'}}
                      labelStyle={{ color: '#374151', fontWeight: '500' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, null]}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Task automation */}
          <motion.div 
            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg transition-shadow hover:shadow-2xl"
            variants={cardVariants}
            whileHover="hover"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Task automation</h3>
            <p className="text-sm text-gray-600 mb-6">
              Automate follow-ups, reminders, and workflow to reduce manual work
            </p>
            <div className="space-y-3">
              {automationUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                  <div className="flex items-center">
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full mr-3 object-cover" />
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                  </div>
                  <p className="text-sm text-gray-500">{user.amount}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection; 