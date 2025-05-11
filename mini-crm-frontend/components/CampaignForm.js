import React, { useState } from 'react';
import { generateMessageSuggestionsFromObjective } from '../utils/api';

// --- SVG Icons ---
const Spinner = ({ color = 'text-white' }) => (
  <svg className={`animate-spin h-5 w-5 ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-5 h-5 mr-2 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 3.5L11.34 6.66L14.5 7.29L12.25 9.6L12.68 12.91L10 11.25L7.32 12.91L7.75 9.6L5.5 7.29L8.66 6.66L10 3.5Z" />
    <path d="M10 3.5L8.66 6.66L5.5 7.29L7.75 9.6L7.32 12.91L10 11.25L12.68 12.91L12.25 9.6L14.5 7.29L11.34 6.66L10 3.5Z" opacity="0.5" transform="rotate(45 10 10)" />
     <path d="M10 3.5L11.34 6.66L14.5 7.29L12.25 9.6L12.68 12.91L10 11.25L7.32 12.91L7.75 9.6L5.5 7.29L8.66 6.66L10 3.5Z" opacity="0.7" transform="scale(0.6) translate(6.5, 6.5)" />
  </svg>
);

const WandIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" opacity="0.5"></path>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 21l-3.5-3.5M18 5l1-1M5 18l-1 1" opacity="0.7"></path>
  </svg>
);
// --- End SVG Icons ---

// --- Base Tailwind Classes (Updated for new design) ---
const commonInputBaseClasses = "block w-full rounded-lg shadow-sm sm:text-sm py-2.5 px-3.5 focus:outline-none";
const lightInputClasses = `${commonInputBaseClasses} border-slate-300 placeholder-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-300 text-slate-900`;

const labelBaseClasses = "block text-sm font-semibold mb-1.5";
const lightLabelClasses = `${labelBaseClasses} text-slate-800`;

const baseButtonClasses = "inline-flex items-center justify-center rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";
// --- End Base Tailwind Classes ---

export default function CampaignForm({ rules, logic, onSubmit }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [campaignObjective, setCampaignObjective] = useState('');
  const [messageSuggestions, setMessageSuggestions] = useState([]);
  const [isGeneratingMessages, setIsGeneratingMessages] = useState(false);
  const [aiMessageError, setAiMessageError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit({ name, message, rules, logic }); // Assuming onSubmit handles the actual API call
    setLoading(false);
    // Optionally reset form fields here if needed, e.g., setName(''), setMessage(''), etc.
  };

  const handleGetMessageSuggestions = async () => {
    if (!campaignObjective.trim()) {
      setAiMessageError('Please enter a campaign objective to generate suggestions.');
      return;
    }
    setIsGeneratingMessages(true);
    setAiMessageError('');
    setMessageSuggestions([]);
    try {
      const response = await generateMessageSuggestionsFromObjective(campaignObjective);
      if (response.data.suggestions && response.data.suggestions.length > 0) {
        setMessageSuggestions(response.data.suggestions);
      } else if (response.data.message) {
        setAiMessageError(response.data.message);
      } else {
        setAiMessageError('No suggestions were generated. Try rephrasing your objective.');
      }
    } catch (error) {
      console.error("Error generating AI message suggestions:", error);
      setAiMessageError(error.response?.data?.message || 'An unexpected error occurred while fetching suggestions.');
    }
    setIsGeneratingMessages(false);
  };

  const handleUseSuggestion = (suggestedMessage) => {
    setMessage(suggestedMessage);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg mb-8 font-inter space-y-8">
      <h2 className="text-2xl font-bold font-grotesk text-slate-900">Campaign Details</h2>

      {/* AI Message Assistant Section */}
      <div className="bg-gradient-to-br from-white via-sky-100 to-sky-300 p-6 rounded-xl shadow-xl space-y-6">
        <div className="flex items-center">
          <SparkleIcon />
          <h3 className="text-xl font-semibold text-sky-700">AI Message Assistant</h3>
        </div>
        <p className="text-sm text-slate-500 -mt-4 mb-2">Craft the perfect message with AI-powered suggestions.</p>
        
        <div>
          <label htmlFor="campaignObjective" className={`${labelBaseClasses} text-slate-700`}>
            Campaign Objective
          </label>
          <input
            type="text"
            id="campaignObjective"
            className="block w-full rounded-lg shadow-sm sm:text-sm py-2.5 px-3.5 focus:outline-none bg-white border border-gray-200 placeholder-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-300 text-gray-700"
            value={campaignObjective}
            onChange={(e) => setCampaignObjective(e.target.value)}
            placeholder="E.g., Re-engage inactive customers, Announce new product"
            disabled={isGeneratingMessages}
          />
        </div>
        <button
          type="button"
          onClick={handleGetMessageSuggestions}
          disabled={isGeneratingMessages || !campaignObjective.trim()}
          className={`${baseButtonClasses} bg-gradient-to-r from-slate-100 via-sky-200 to-sky-300 hover:from-sky-100 hover:via-sky-300 hover:to-sky-400 text-sky-700 py-2.5 px-5 focus:ring-sky-400 focus:ring-offset-white w-full sm:w-auto`}
        >
          {isGeneratingMessages ? (
            <><Spinner color="text-sky-700" /> <span className="ml-2">Generating...</span></>
          ) : (
            <><WandIcon /> Get AI Message Suggestions</>
          )}
        </button>

        {aiMessageError && (
          <div className="p-3.5 rounded-md border text-sm bg-red-50 border-red-400 text-red-700">
            {aiMessageError}
          </div>
        )}

        {messageSuggestions.length > 0 && (
          <div className="space-y-4 pt-3">
            <p className="text-base font-medium text-slate-700">Suggested Messages:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {messageSuggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="bg-white/70 backdrop-blur-sm border border-sky-200 rounded-lg shadow-md overflow-hidden transition-all hover:border-sky-300 hover:shadow-lg"
                >
                  <div className="p-4">
                    <p className="text-slate-700 mb-2 text-sm leading-relaxed">{suggestion.message}</p>
                    <p className="text-xs text-sky-600 opacity-90">Image Theme: {suggestion.imageTheme || 'Not specified'}</p>
                  </div>
                  <div className="px-4 py-3 bg-sky-50/50 border-t border-sky-200">
                    <button 
                      type="button" 
                      onClick={() => handleUseSuggestion(suggestion.message)}
                      className={`${baseButtonClasses} bg-sky-500 hover:bg-sky-600 text-white py-1.5 px-3 text-xs focus:ring-sky-500 focus:ring-offset-white`}
                    >
                      Use This Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Campaign Name and Message Fields */}
      <div className="space-y-6">
        <div>
          <label htmlFor="campaignName" className={lightLabelClasses}>
            Campaign Name
          </label>
          <input
            type="text"
            id="campaignName"
            className={lightInputClasses}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="E.g., Q4 Holiday Promo"
            required
          />
        </div>
        <div>
          <label htmlFor="campaignMessage" className={lightLabelClasses}>
            Message
          </label>
          <textarea
            id="campaignMessage"
            className={`${lightInputClasses} min-h-[120px]`}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Enter your campaign message here..."
            required
            rows={4}
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className={`${baseButtonClasses} bg-slate-800 hover:bg-slate-700 text-white py-3 px-6 text-base focus:ring-slate-500 focus:ring-offset-white w-full sm:w-auto`}
        disabled={loading}
      >
        {loading ? (
          <><Spinner color="text-white" /> <span className="ml-2">Saving Campaign...</span></>
        ) : (
          'Save Campaign'
        )}
      </button>
    </form>
  );
} 