import React from 'react';
// MUI components (Box, Typography, Paper, List, ListItem, ListItemText) are replaced.

// Placeholder icons (replace with actual SVGs or an icon library like lucide-react)
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);
const MoreHorizontalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M3 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM8.5 10a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM15.5 8.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
  </svg>
);

const getStatusClasses = (campaign) => {
  // Simple status determination: "Sent" if sent > 0, otherwise "Draft". Can be expanded.
  if (campaign.sent && campaign.sent > 0) {
    return 'bg-green-100 text-green-700'; // Similar to "Done" in ClientEase
  }
  return 'bg-yellow-100 text-yellow-700'; // Similar to "In progress"
};

const getStatusText = (campaign) => {
  if (campaign.sent && campaign.sent > 0) {
    return 'Sent';
  }
  return 'Draft';
};

export default function CampaignHistory({ campaigns }) {
  if (!campaigns) {
    return null; // Or a loading/error state if campaigns can be undefined during loading
  }

  return (
    <div className="mt-8 font-inter">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 font-grotesk">Campaign History</h2>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-slate-200">
        {campaigns.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-slate-500">No campaigns have been created yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Campaign Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Audience</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {campaigns.map((campaign, idx) => (
                  <tr key={campaign.id || idx} className="hover:bg-slate-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900 truncate" title={campaign.campaignName}>{campaign.campaignName || 'Untitled Campaign'}</div>
                      <div className="text-xs text-slate-500 truncate" title={campaign.message}>{campaign.message || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(campaign)}`}>
                        {getStatusText(campaign)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {typeof campaign.audienceSize === 'number' ? campaign.audienceSize : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {campaign.createdAt ? new Date(campaign.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button className="text-slate-400 hover:text-red-600 p-1 rounded-md hover:bg-red-100">
                        <TrashIcon />
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100">
                        <MoreHorizontalIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {campaigns.length > 0 && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{campaigns.length}</span> of <span className="font-medium">{campaigns.length}</span> results
            </p>
            <div className="space-x-1">
              <button className="text-xs px-3 py-1.5 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <button className="text-xs px-3 py-1.5 rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 