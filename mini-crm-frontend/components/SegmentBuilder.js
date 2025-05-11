import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { generateRulesFromNaturalQuery } from '../utils/api';

const fields = [
  { value: 'spend', label: 'Total Spend (INR)' },
  { value: 'visits', label: 'Visits' },
  { value: 'inactiveDays', label: 'Inactive for (days)' },
];

const operators = [
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: '>=', label: '>=' },
  { value: '<=', label: '<=' },
  { value: '==', label: '=' },
];

const Spinner = ({ color = 'text-sky-700' }) => (
  <svg className={`animate-spin h-5 w-5 ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-5 h-5 mr-2 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
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

const DeleteIconSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);

const commonInputBaseClasses = "block w-full rounded-lg shadow-sm sm:text-sm py-2.5 px-3.5 focus:outline-none";
const lightInputClasses = `${commonInputBaseClasses} border-slate-300 placeholder-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-300 text-slate-900 bg-white`;
const baseButtonClasses = "inline-flex items-center justify-center rounded-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed";
const ruleRowInputClasses = "block rounded-md bg-white border border-gray-300 py-2 px-3 text-black placeholder-slate-400 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 sm:text-sm";
const outlineButtonClasses = `${baseButtonClasses} bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-600 py-2 px-4`;

export default function SegmentBuilder({ rules, setRules, logic, setLogic }) {
  const [naturalQuery, setNaturalQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiMessage, setAiMessage] = useState('');

  const handleRuleChange = (idx, key, value) => {
    const updated = [...rules];
    updated[idx][key] = value;
    setRules(updated);
  };

  const addRule = () => setRules([...rules, { field: 'spend', operator: '>', value: '' }]);
  const removeRule = (idx) => setRules(rules.filter((_, i) => i !== idx));

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(rules);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setRules(reordered);
  };

  const handleGenerateRulesAI = async () => {
    if (!naturalQuery.trim()) {
      setAiMessage({ text: 'Please enter a query to generate rules.', type: 'info' });
      return;
    }
    setIsGenerating(true);
    setAiMessage(null);
    try {
      const response = await generateRulesFromNaturalQuery(naturalQuery);
      if (response.data.rules && response.data.rules.length > 0) {
        setRules(response.data.rules);
        setNaturalQuery('');
        setAiMessage({text: 'Rules generated successfully!', type: 'success'});
      } else if (response.data.message) {
        setAiMessage({ text: response.data.message, type: 'info' });
      } else {
        setAiMessage({ text: 'Could not convert query to rules. Please try rephrasing.', type: 'warning' });
      }
    } catch (error) {
      console.error("Error generating rules with AI:", error);
      setAiMessage({ text: error.response?.data?.message || 'Failed to generate rules.', type: 'error' });
    }
    setIsGenerating(false);
  };

  const getAlertClasses = (type) => {
    switch (type) {
      case 'error': return 'bg-red-50 border-red-400 text-red-700';
      case 'success': return 'bg-green-50 border-green-400 text-green-700';
      case 'warning': return 'bg-yellow-50 border-yellow-400 text-yellow-700';
      default: return 'bg-sky-50 border-sky-400 text-sky-700';
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-6 font-inter">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 font-grotesk">Audience Segment Rules</h2>
      
      <div className="bg-gradient-to-br from-white via-sky-100 to-sky-200 p-6 rounded-xl shadow-lg space-y-5 mb-8">
        <div className="flex items-center">
          <SparkleIcon />
          <h3 className="text-xl font-semibold text-sky-700">Generate Rules with AI</h3>
        </div>
        <p className="text-sm text-slate-600 -mt-4 mb-3">Describe your target audience in plain language.</p>
        
        <input
          type="text"
          className={lightInputClasses}
          placeholder="E.g., Customers who spent more than 5000 and visited more than 10 times"
          value={naturalQuery}
          onChange={(e) => setNaturalQuery(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter' && !isGenerating) handleGenerateRulesAI(); }}
          disabled={isGenerating}
        />
        <button 
          type="button"
          onClick={handleGenerateRulesAI} 
          disabled={isGenerating || !naturalQuery.trim()}
          className={`${baseButtonClasses} bg-gradient-to-r from-slate-100 via-sky-200 to-sky-300 hover:from-sky-100 hover:via-sky-300 hover:to-sky-400 text-sky-700 py-2.5 px-5 focus:ring-sky-400 focus:ring-offset-white w-full sm:w-auto`}
        >
          {isGenerating ? (
            <><Spinner color="text-sky-700" /> <span className="ml-2">Generating Rules...</span></>
          ) : (
            <><WandIcon /> Generate Rules</>
          )}
        </button>
        {aiMessage && (
          <div className={`mt-3.5 p-3.5 rounded-md border text-sm ${getAlertClasses(aiMessage.type)}`}>
            {aiMessage.text}
          </div>
        )}
      </div>

      <div className="flex items-center mb-5">
        <p className="text-sm font-medium text-slate-700 mr-3">Combine rules with:</p>
        <select
          value={logic}
          onChange={e => setLogic(e.target.value)}
          className={`${ruleRowInputClasses} w-auto min-w-[100px] py-2 px-3`}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rules">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3 mb-5">
              {rules.map((rule, idx) => (
                <Draggable key={idx} draggableId={`rule-${idx}`} index={idx}>
                  {(providedDraggable, snapshot) => (
                    <div
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                      className={`flex items-center space-x-2.5 p-3.5 rounded-lg border ${snapshot.isDragging ? 'bg-sky-50 shadow-lg border-sky-200' : 'bg-white border-slate-200'}`}
                    >
                      <select
                        value={rule.field}
                        onChange={e => handleRuleChange(idx, 'field', e.target.value)}
                        className={`${ruleRowInputClasses} flex-1 min-w-[150px]`}
                      >
                        {fields.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                      </select>
                      <select
                        value={rule.operator}
                        onChange={e => handleRuleChange(idx, 'operator', e.target.value)}
                        className={`${ruleRowInputClasses} flex-shrink-0 min-w-[70px]`}
                      >
                        {operators.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                      <input
                        value={rule.value}
                        onChange={e => handleRuleChange(idx, 'value', e.target.value)}
                        type="number"
                        className={`${ruleRowInputClasses} flex-shrink-0 w-[100px]`}
                        placeholder="Value"
                      />
                      <button type="button" onClick={() => removeRule(idx)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors">
                        <DeleteIconSVG />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button type="button" onClick={addRule} className={`${outlineButtonClasses}`}>Add Rule</button>
    </div>
  );
}