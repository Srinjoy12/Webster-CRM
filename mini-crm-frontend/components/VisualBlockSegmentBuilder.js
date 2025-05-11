import React, { useState, useMemo } from 'react';
import ReactFlow, {
  Background,
  // useNodesState, // Not used
  // useEdgesState, // Not used
} from 'reactflow';
// MUI Components (Box, Button, Typography, Paper, MenuItem, Select, Chip, Dialog, DialogTitle, DialogContent, DialogActions) are replaced.
import 'reactflow/dist/style.css';

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

const rulePresets = [
  { field: 'spend', operator: '>', value: 1000 },
  { field: 'visits', operator: '>', value: 5 },
  { field: 'inactiveDays', operator: '>', value: 30 },
];

const ruleTemplates = [
  { label: 'High Value', rules: [{ field: 'spend', operator: '>', value: 1000 }] },
  { label: 'Frequent Visitor', rules: [{ field: 'visits', operator: '>', value: 5 }] },
  { label: 'Churn Risk', rules: [{ field: 'inactiveDays', operator: '>', value: 30 }] },
];

function ruleToText(rule) {
  const fieldLabel = fields.find(f => f.value === rule.field)?.label || rule.field;
  const opLabel = operators.find(o => o.value === rule.operator)?.label || rule.operator;
  return `${fieldLabel} ${opLabel} ${rule.value}`;
}

// Tailwind styled constants (assuming these might be from a shared file or defined similarly in SegmentBuilder)
const commonInputClasses = "block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm";
const buttonBaseClasses = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50";
const primaryButtonClasses = `${buttonBaseClasses} bg-gray-800 text-white hover:bg-gray-700 focus-visible:outline-gray-800`;
// const secondaryButtonClasses = `${buttonBaseClasses} bg-sky-600 text-white hover:bg-sky-500 focus-visible:outline-sky-600`; // Defined but not used here, if needed for Dialog
const outlineButtonClasses = `${buttonBaseClasses} bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-600`;
const chipButtonClasses = (isActive) => 
  `text-xs font-medium mr-2 mb-2 px-3 py-1.5 rounded-full shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
  ${isActive 
    ? 'bg-gray-800 text-white focus-visible:outline-gray-800' 
    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:outline-slate-400'}`;


// Custom node component for rules with Tailwind
function RuleNode({ data }) {
  return (
    <div className="bg-sky-100 border-2 border-sky-500 text-sky-800 p-3 rounded-lg shadow-lg min-w-[180px] min-h-[70px] flex items-center justify-center">
      <p className="text-sm font-semibold text-center break-words">{data.label}</p>
    </div>
  );
}

const nodeTypes = { ruleNode: RuleNode };

export default function VisualBlockSegmentBuilder({ rules = [], setRules, logic, setLogic }) {
  const nodes = useMemo(() =>
    rules.map((rule, idx) => ({
      id: `rule-${idx}`,
      type: 'ruleNode',
      data: { label: ruleToText(rule) },
      position: { x: 80 + idx * 230, y: 50 }, // Adjusted y and spacing a bit
      draggable: false,
    })),
    [rules]
  );

  const logicChips = useMemo(() => {
    if (rules.length < 2) return null;
    return rules.slice(1).map((_, idx) => (
      <div 
        key={`logic-chip-${idx}`}
        className="absolute z-10 bg-slate-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md"
        style={{
          left: `${80 + idx * 230 + 180 / 2 + 25 - 12}px`, // Approx center between nodes (node width 180, gap 50)
          top: '68px', // Vertically center with nodes
        }}
      >
        {logic}
      </div>
    ));
  }, [rules, logic]);

  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [validationError, setValidationError] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('');

  const handleAddRule = () => {
    setAddDialogOpen(true);
    setSelectedPreset('');
  };

  const handleConfirmAddRule = () => {
    if (!selectedPreset) return;
    const preset = rulePresets.find(p => `${p.field}-${p.operator}-${p.value}` === selectedPreset);
    if (!preset) return;
    if (rules.some(r => r.field === preset.field && r.operator === preset.operator && r.value === preset.value)) {
      setAddDialogOpen(false);
      return;
    }
    setRules([...rules, { ...preset }]);
    setAddDialogOpen(false);
  };

  const applyTemplate = (template) => {
    setRules(template.rules);
    setSelectedTemplate(template.label);
  };

  React.useEffect(() => {
    const hasEmpty = rules.some(r => r.value === '' || isNaN(Number(r.value)));
    setValidationError(hasEmpty ? 'All rules must have a valid value.' : '');
  }, [rules]);

  const rulePreview = rules.length
    ? rules.map(ruleToText).join(` ${logic} `)
    : 'No rules defined.';

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md mb-6 font-inter">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 font-grotesk">Audience Segment (Visual Builder)</h2>
      <div className="flex flex-wrap items-center mb-4 gap-4">
        <div className="flex items-center">
          <p className="text-sm font-medium text-slate-700 mr-2">Combine rules with:</p>
          <select
            value={logic}
            onChange={e => setLogic(e.target.value)}
            className={`${commonInputClasses} w-auto min-w-[100px]`}
          >
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>
        <button type="button" onClick={handleAddRule} className={`${outlineButtonClasses} ml-auto sm:ml-2`}>Add Rule Block</button>
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-slate-700 mb-1">Templates:</p>
        <div className="flex flex-wrap">
          {ruleTemplates.map(tpl => (
            <button
              type="button"
              key={tpl.label}
              onClick={() => applyTemplate(tpl)}
              className={chipButtonClasses(selectedTemplate === tpl.label)}
            >
              {tpl.label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative h-48 bg-slate-50 border border-slate-200 rounded-lg mb-4 overflow-x-auto p-2 flex items-center">
        {logicChips}
        <ReactFlow
          nodes={nodes}
          edges={[]}
          nodeTypes={nodeTypes}
          fitView={nodes.length > 0}
          fitViewOptions={{ padding: 0.2 }}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
          nodesDraggable={false} // Keep true if you want users to rearrange visually, but state is from `rules` array
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
          style={{ minWidth: `${Math.max(nodes.length * 230, 300)}px`, height: '100%' }}
        >
          <Background gap={16} color="#e2e8f0" />
        </ReactFlow>
      </div>
      <div className="p-3 bg-slate-100 rounded-md mb-4">
        <p className="text-sm font-medium text-slate-700">Rule Preview:</p>
        <p className="text-sm text-slate-600">{rulePreview}</p>
      </div>
      {validationError && (
        <p className="text-sm text-red-600 mb-4">{validationError}</p>
      )}

      {addDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Select a Rule Preset</h3>
              <select
                value={selectedPreset}
                onChange={e => setSelectedPreset(e.target.value)}
                className={`${commonInputClasses} w-full`}
              >
                <option value="" disabled>Select a preset</option>
                {rulePresets.map((preset, idx) => (
                  <option key={idx} value={`${preset.field}-${preset.operator}-${preset.value}`}>{ruleToText(preset)}</option>
                ))}
              </select>
            </div>
            <div className="px-6 py-4 bg-slate-50 flex justify-end space-x-3 rounded-b-lg">
              <button type="button" onClick={() => setAddDialogOpen(false)} className={`${outlineButtonClasses}`}>Cancel</button>
              <button type="button" onClick={handleConfirmAddRule} disabled={!selectedPreset} className={`${primaryButtonClasses}`}>Add Rule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 