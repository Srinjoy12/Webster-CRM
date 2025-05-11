import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Adjust if backend is deployed elsewhere
});

export const generateRulesFromNaturalQuery = async (query) => {
  return api.post('/api/ai/generate-segment-rules', { query });
};

export const generateMessageSuggestionsFromObjective = async (objective) => {
  return api.post('/api/ai/generate-messages', { objective });
};

export default api; 