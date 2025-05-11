const OpenAI = require('openai');
const dotenv = require('dotenv');

dotenv.config();

// Configure the OpenAI client to point to Groq's API
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // Use Groq API key
  baseURL: 'https://api.groq.com/openai/v1', // Set Groq API endpoint
});

/**
 * Converts a natural language query into segment rules using Groq API.
 * @param {string} query - The natural language query.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of segment rules.
 */
async function generateSegmentRulesFromQuery(query) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('Groq API key is not configured. Please set GROQ_API_KEY in your .env file.');
  }

  const prompt = `
    Convert the following natural language query into a JSON array of segment rules.
    Each rule object in the array should have three properties: "field", "operator", and "value".

    Available fields and their types:
    - name (string)
    - email (string)
    - totalSpend (number)
    - visits (number)
    - lastActiveDate (date, format YYYY-MM-DD)

    Available operators for string fields (name, email):
    - contains
    - notContains
    - equals
    - notEquals

    Available operators for number fields (totalSpend, visits):
    - equals (=)
    - notEquals (!=)
    - greaterThan (>)
    - lessThan (<)
    - greaterThanOrEqual (>=)
    - lessThanOrEqual (<=)

    Available operators for date fields (lastActiveDate):
    - before
    - after
    - on

    Query: "${query}"

    Examples:
    Query: "Customers who spent more than 5000 and visited more than 10 times"
    Output: [
      { "field": "totalSpend", "operator": ">", "value": 5000 },
      { "field": "visits", "operator": ">", "value": 10 }
    ]

    Query: "Customers whose name contains 'John' and last active was before 2023-01-01"
    Output: [
      { "field": "name", "operator": "contains", "value": "John" },
      { "field": "lastActiveDate", "operator": "before", "value": "2023-01-01" }
    ]

    Query: "Users with email not ending in @example.com"
    Output: [
        {"field": "email", "operator": "notContains", "value": "@example.com"}
    ]

    Respond ONLY with the JSON array of rules. Do not include any other text or explanations.
    If the query cannot be reasonably converted or is too vague, return an empty array [].
  `;

  try {
    // Use the configured groq client instance
    const completion = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct', // Groq model
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2, 
    });

    const content = completion.choices[0]?.message?.content;
    if (content) {
      try {
        const jsonResponse = content.trim().replace(/^```json\n|```$/g, '');
        const rules = JSON.parse(jsonResponse);
        if (Array.isArray(rules) && rules.every(rule => typeof rule === 'object' && 'field' in rule && 'operator' in rule && 'value' in rule)) {
          return rules;
        }
        console.error("Parsed Groq response is not in the expected format:", rules);
        return []; 
      } catch (e) {
        console.error('Error parsing Groq response:', e);
        console.error('Raw Groq response:', content);
        return []; 
      }
    } else {
      console.error('No content in Groq response');
      return [];
    }
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw new Error('Failed to generate segment rules from Groq.');
  }
}

/**
 * Generates message suggestions for a campaign objective using Groq API.
 * @param {string} objective - The campaign objective.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of message suggestions (object with message and imageTheme).
 */
async function generateMessageSuggestions(objective) {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('Groq API key is not configured. Please set GROQ_API_KEY in your .env file.');
  }

  const prompt = `
    You are an expert marketing assistant. Given a campaign objective, generate 2-3 distinct and compelling message variants.
    For each message, also suggest a relevant image theme or description in a few words.

    Campaign Objective: "${objective}"

    Respond ONLY with a JSON array of objects. Each object should have two properties: "message" (string) and "imageTheme" (string).
    Do not include any other text or explanations.

    Example:
    Campaign Objective: "Promote a new line of summer shoes for young adults."
    Output: [
      {
        "message": "Step into summer! ☀️ Explore our vibrant new shoe collection designed for your sunny adventures. Shop now and get 10% off!",
        "imageTheme": "Young adults happily wearing colorful summer shoes at the beach or a park."
      },
      {
        "message": "Fresh kicks just dropped! 🔥 Be the first to rock the latest summer shoe styles. Limited stock available. Find your perfect pair today!",
        "imageTheme": "Close-up, stylish shots of the new summer shoes, perhaps with dynamic backgrounds."
      },
      {
        "message": "Comfort meets style this summer. Our new shoe line offers all-day comfort without compromising on trend. Discover the collection!",
        "imageTheme": "Lifestyle image showing someone comfortably walking or engaging in an activity wearing the shoes, emphasizing comfort and style."
      }
    ]

    If the objective is unclear or too vague to generate meaningful messages, return an empty array [].
  `;

  try {
    const completion = await groq.chat.completions.create({
      model: 'meta-llama/llama-4-scout-17b-16e-instruct', // Or your preferred Groq model
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7, // Slightly higher temperature for more creative message variants
    });

    const content = completion.choices[0]?.message?.content;
    if (content) {
      try {
        const jsonResponse = content.trim().replace(/^```json\n|```$/g, '');
        const suggestions = JSON.parse(jsonResponse);
        // Basic validation for array of objects with expected keys
        if (Array.isArray(suggestions) && suggestions.every(s => typeof s === 'object' && 'message' in s && 'imageTheme' in s)) {
          return suggestions;
        }
        console.error("Parsed Groq response for messages is not in the expected format:", suggestions);
        return []; 
      } catch (e) {
        console.error('Error parsing Groq response for messages:', e);
        console.error('Raw Groq response for messages:', content);
        return []; 
      }
    } else {
      console.error('No content in Groq response for messages');
      return [];
    }
  } catch (error) {
    console.error('Error calling Groq API for messages:', error);
    throw new Error('Failed to generate message suggestions from Groq.');
  }
}

module.exports = {
  generateSegmentRulesFromQuery,
  generateMessageSuggestions,
}; 