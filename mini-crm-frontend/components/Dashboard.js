import React from 'react';

// Placeholder icons (consider using a library like lucide-react for a more extensive set)
const UsersIcon = () => <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 016-6h6a6 6 0 016 6v1h-3"></path></svg>;
const CampaignIconSvg = () => <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>;
const TrendingUpIcon = () => <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>;
const CheckCircleIcon = () => <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;

const MetricCard = ({ title, value, icon, gradientClasses, unit = '' }) => (
  <div className={`${gradientClasses || 'bg-gradient-to-br from-white via-sky-100 to-sky-200'} p-5 rounded-xl shadow-xl text-sky-800 flex items-center justify-between min-h-[120px]`}>
    {/* Left side: Title and Value */}
    <div className="flex flex-col">
      <p className="text-sm font-semibold uppercase tracking-wider opacity-90">{title}</p>
      <p className="text-4xl font-bold mt-1.5">{value}{unit && <span className="text-3xl font-bold align-baseline ml-1">{unit}</span>}</p>
    </div>
    {/* Right side: Icon */}
    <div className="p-3 bg-sky-600 rounded-full shadow-md">
      {icon}
    </div>
  </div>
);

const ActivityItem = ({ text, time }) => (
  <li className="py-3.5 border-b border-slate-200 last:border-b-0">
    <p className="text-sm text-slate-800">{text}</p>
    <p className="text-xs text-slate-500 mt-0.5">{time}</p>
  </li>
);

const TaskItem = ({ text, dueDate }) => (
  <li className="py-3.5 border-b border-slate-200 last:border-b-0 flex justify-between items-center">
    <div>
      <p className="text-sm text-slate-800">{text}</p>
      {dueDate && <p className="text-xs text-slate-500 mt-0.5">Due: {dueDate}</p>}
    </div>
    <button className="text-xs text-sky-600 hover:text-sky-700 font-semibold hover:underline">Mark as done</button>
  </li>
);

export default function Dashboard({ campaigns = [] }) {
  const activeCampaignsCount = campaigns.length;

  const metrics = [
    { title: 'Total Contacts', value: 'N/A', icon: <UsersIcon />, gradientClasses: 'bg-gradient-to-br from-white via-sky-100 to-sky-200', unit: '' },
    { title: 'Active Campaigns', value: activeCampaignsCount, icon: <CampaignIconSvg />, gradientClasses: 'bg-gradient-to-br from-white via-sky-100 to-sky-200', unit: '' },
    { title: 'New Leads (Month)', value: 'N/A', icon: <TrendingUpIcon />, gradientClasses: 'bg-gradient-to-br from-white via-sky-100 to-sky-200', unit: '' },
    { title: 'Conversion Rate', value: 'N/A', icon: <CheckCircleIcon />, gradientClasses: 'bg-gradient-to-br from-white via-sky-100 to-sky-200', unit: '%' },
  ];

  const recentCampaignActivities = campaigns.slice(0, 4).map(campaign => ({
    text: `Campaign "${campaign.name || 'Untitled Campaign'}" was created.`,
    time: 'Recently added' 
  }));

  const placeholderActivities = [
    { text: 'User John Doe signed up.', time: '1 hour ago' },
    { text: 'Sent 500 emails for "Newsletter Q4".', time: '3 hours ago' },
  ];
  const displayActivities = [...recentCampaignActivities, ...placeholderActivities].slice(0,4);

  const upcomingTasks = [
    { text: 'Review Q4 marketing budget', dueDate: 'Nov 10, 2023' },
    { text: 'Plan holiday promotion strategy', dueDate: 'Nov 15, 2023' },
    { text: 'Follow up with Enterprise client X', dueDate: 'Nov 18, 2023' },
    { text: 'Analyze October campaign performance', dueDate: null }, 
  ];

  return (
    <div className="space-y-8 font-inter">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 font-grotesk">Recent Activity</h2>
          {displayActivities.length > 0 ? (
            <ul className="space-y-1">
              {displayActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No recent activity to display.</p>
          )}
          <button className="mt-5 text-sm text-sky-600 hover:text-sky-700 font-semibold hover:underline">View all activity</button>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 font-grotesk">Upcoming Tasks</h2>
          {upcomingTasks.length > 0 ? (
            <ul className="space-y-1">
              {upcomingTasks.map((task, index) => (
                <TaskItem key={index} {...task} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No upcoming tasks.</p>

          )}
          <button className="mt-5 text-sm text-sky-600 hover:text-sky-700 font-semibold hover:underline">View all tasks</button>
        </div>
      </div>
    </div>
  );
} 