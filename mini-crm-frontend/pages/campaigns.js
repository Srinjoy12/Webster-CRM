import React, { useState, useEffect } from 'react';
import SegmentBuilder from '../components/SegmentBuilder';
import VisualBlockSegmentBuilder from '../components/VisualBlockSegmentBuilder';
import CampaignForm from '../components/CampaignForm';
import CampaignHistory from '../components/CampaignHistory';
import Dashboard from '../components/Dashboard';
import api from '../utils/api';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Zap } from 'lucide-react';

// Placeholder icons - replace with actual SVGs or an icon library like lucide-react later
const HomeIcon = () => <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>;
const GridIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zm8-8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zm0 8a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" /></svg>;
const FolderIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>;
const ClockIcon = () => <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5H10V5z" clipRule="evenodd" /></svg>;

export default function Campaigns() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [rules, setRules] = useState([{ field: 'spend', operator: '>', value: '' }]);
  const [logic, setLogic] = useState('AND');
  const [audienceSize, setAudienceSize] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [builderType, setBuilderType] = useState('classic');
  const [currentView, setCurrentView] = useState('dashboard');

  useEffect(() => {
    if (status === 'authenticated' && session) {
      api.get('/api/campaigns').then(res => setCampaigns(res.data)).catch(() => setCampaigns([]));
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen bg-slate-50"><p className="text-lg font-semibold text-slate-700">Loading session...</p></div>;
  }

  if (!session) {
    // This state is usually brief as useEffect redirects.
    // Consider a more styled global loading/redirect state if needed.
    return <div className="flex justify-center items-center min-h-screen bg-slate-50"><p className="text-lg font-semibold text-slate-700">Redirecting to login...</p></div>;
  }

  const handlePreview = async () => {
    setPreviewLoading(true);
    try {
      const response = await api.post('/api/audience/preview', { rules, logic });
      setAudienceSize(response.data.size);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_err) {
      setAudienceSize('Error');
    }
    setPreviewLoading(false);
  };

  const handleSaveCampaign = async (campaignData) => {
    try {
      const response = await api.post('/api/campaigns', { ...campaignData });
      setCampaigns([response.data, ...campaigns]);
      setAudienceSize(null);
    } catch (err) {
      console.error("Error saving campaign:", err);
    }
  };
  
  const sidebarNavItems = [
    { name: 'Home', href: '#', icon: HomeIcon, view: 'dashboard', current: currentView === 'dashboard' },
    { name: 'Campaigns', href: '#', icon: GridIcon, view: 'builder', current: currentView === 'builder' },
    { name: 'Campaign History', href: '#', icon: ClockIcon, view: 'history', current: currentView === 'history' },
    { name: 'Templates', href: '#', icon: FolderIcon, view: 'templates', current: currentView === 'templates' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 font-inter">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-br from-white via-sky-100 to-sky-200 text-slate-800 flex flex-col fixed inset-y-0 left-0 shadow-lg">
        <div className="p-4 mb-2 border-b border-sky-200">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-sky-500 rounded-lg flex items-center justify-center text-white shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-regular font-grotesk text-slate-900">Webster</h1>
          </div>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-1">
          {sidebarNavItems.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => item.view && setCurrentView(item.view)}
              className={`
                ${item.current 
                  ? 'bg-sky-500 text-white shadow-sm' 
                  : 'text-slate-700 hover:bg-sky-50 hover:text-sky-700'}
                group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 w-full text-left
              `}
            >
              <item.icon className={`mr-3 flex-shrink-0 h-5 w-5 
                ${item.current 
                  ? 'text-white' 
                  : 'text-sky-600 group-hover:text-sky-700'}`} 
              />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="p-4 mt-auto border-t border-sky-200">
          <div className="flex items-center space-x-3">
            <img className="h-9 w-9 rounded-full ring-1 ring-sky-300" src={session.user?.image || "https://avatar.vercel.sh/"+session.user?.email} alt="User" />
            <div>
              <p className="text-sm font-medium text-slate-900">{session.user?.name || 'User'}</p>
              <a href="#" className="text-xs text-sky-600 hover:text-sky-700 hover:underline">View profile</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold font-grotesk text-slate-900">
              {currentView === 'dashboard' && 'Dashboard'}
              {currentView === 'builder' && 'Campaign Creation'}
              {currentView === 'history' && 'Campaign History'}
              {currentView === 'templates' && 'Templates'}
            </h1>
            {currentView === 'builder' && (
              <button type="button" className="inline-flex items-center rounded-md bg-gray-800 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800">
                New Action
              </button>
            )}
          </div>
          
          {currentView === 'dashboard' && <Dashboard campaigns={campaigns} />}

          {currentView === 'builder' && (
            <>
              <CampaignForm rules={rules} logic={logic} onSubmit={handleSaveCampaign} />

              <div className="mt-8 mb-6">
                <span className="isolate inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={() => setBuilderType('classic')}
                    className={`relative inline-flex items-center rounded-l-md px-4 py-2 text-sm font-semibold focus:z-10 
                      ${builderType === 'classic' 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}`}
                  >
                    Classic Builder
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuilderType('visual')}
                    className={`relative -ml-px inline-flex items-center rounded-r-md px-4 py-2 text-sm font-semibold focus:z-10 
                      ${builderType === 'visual' 
                        ? 'bg-gray-800 text-white' 
                        : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'}`}
                  >
                    Visual Block Builder
                  </button>
                </span>
              </div>

              {builderType === 'classic' ? (
                <SegmentBuilder rules={rules} setRules={setRules} logic={logic} setLogic={setLogic} />
              ) : (
                <VisualBlockSegmentBuilder rules={rules} setRules={setRules} logic={logic} setLogic={setLogic} />
              )}

              <div className="mt-6 mb-6">
                <button
                  type="button"
                  onClick={handlePreview}
                  disabled={previewLoading}
                  className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:opacity-50"
                >
                  {previewLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading...
                    </>
                  ) : (
                    'Preview Audience Size'
                  )}
                </button>
              </div>

              {audienceSize !== null && (
                <div className="my-4 p-4 bg-white border border-slate-200 rounded-md shadow">
                  <p className="text-sm font-medium text-slate-700">Estimated Audience Size: 
                    <span className="font-bold text-slate-900"> {audienceSize}</span>
                  </p>
                </div>
              )}
            </>
          )}

          {currentView === 'history' && (
            <CampaignHistory campaigns={campaigns} />
          )}

          {currentView === 'templates' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 font-grotesk">Manage Templates</h2>
              <p className="text-slate-600">Template management interface will go here.</p>
              {/* Placeholder for template list, creation, editing tools */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 