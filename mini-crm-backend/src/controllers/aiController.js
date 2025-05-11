const aiService = require('../services/aiService.js');

async function generateRules(req, res) {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    const rules = await aiService.generateSegmentRulesFromQuery(query);
    if (rules.length === 0 && query.trim() !== '') {
        // If OpenAI returned empty but query was not empty, it might mean it couldn't parse or the query was too vague.
        return res.status(200).json({ rules: [], message: 'Could not convert query to rules. Please try rephrasing or be more specific.' });
    }
    res.status(200).json({ rules });
  } catch (error) {
    console.error('[AIController] Error generating rules:', error);
    res.status(500).json({ message: error.message || 'Failed to generate segment rules' });
  }
}

async function handleGenerateMessages(req, res) {
  const { objective } = req.body;

  if (!objective) {
    return res.status(400).json({ message: 'Campaign objective is required' });
  }

  try {
    const suggestions = await aiService.generateMessageSuggestions(objective);
    if (suggestions.length === 0 && objective.trim() !== '') {
      return res.status(200).json({ suggestions: [], message: 'Could not generate message suggestions. Please try rephrasing the objective or be more specific.' });
    }
    res.status(200).json({ suggestions });
  } catch (error) {
    console.error('[AIController] Error generating message suggestions:', error);
    res.status(500).json({ message: error.message || 'Failed to generate message suggestions' });
  }
}

module.exports = {
  generateRules,
  handleGenerateMessages,
}; 