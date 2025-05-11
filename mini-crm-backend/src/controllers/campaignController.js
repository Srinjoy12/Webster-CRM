const { pool } = require('../config/database');
const axios = require('axios');

exports.createCampaign = async (req, res) => {
  try {
    const { name, message, rules, logic } = req.body;
    // Find matching customers
    const where = buildWhereClause(rules, logic);
    const [customers] = await pool.query(`SELECT id, firstName, email FROM Customers WHERE ${where}`);
    const audienceSize = customers.length;
    // Insert campaign log
    const [result] = await pool.query(
      'INSERT INTO communication_log (campaignName, message, rules, logic, audienceSize, sent, failed) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, message, JSON.stringify(rules), logic, audienceSize, 0, 0]
    );
    const logId = result.insertId;
    // Initiate delivery to each customer (async, fire-and-forget)
    customers.forEach(customer => {
      axios.post('http://localhost:3000/api/vendor/send', {
        logId,
        customerId: customer.id,
        message: `Hi ${customer.firstName}, ${message}`
      }).catch(err => {
        // Log but don't block
        console.error('Error calling vendor API:', err.message);
      });
    });
    const [rows] = await pool.query('SELECT * FROM communication_log WHERE id = ?', [logId]);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error in createCampaign:', error);
    res.status(500).json({ message: 'Failed to create campaign.' });
  }
};

function buildWhereClause(rules, logic) {
  if (!Array.isArray(rules) || rules.length === 0) return '1';
  const clauses = rules
    .filter(rule => rule.value !== '' && rule.value !== null && rule.value !== undefined)
    .map(rule => {
      const fieldMap = {
        spend: 'totalSpend',
        visits: 'visits',
        inactiveDays: 'DATEDIFF(NOW(), lastActiveDate)'
      };
      const dbField = fieldMap[rule.field] || rule.field;
      if (rule.field === 'inactiveDays') {
        const val = parseInt(rule.value, 10);
        if (isNaN(val)) return null;
        return `${dbField} ${rule.operator} ${val}`;
      }
      const val = parseFloat(rule.value);
      if (isNaN(val)) return null;
      return `${dbField} ${rule.operator} ${val}`;
    })
    .filter(Boolean);
  return clauses.length ? clauses.join(` ${logic === 'OR' ? 'OR' : 'AND'} `) : '1';
}

exports.getCampaigns = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM communication_log ORDER BY createdAt DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error in getCampaigns:', error);
    res.status(500).json({ message: 'Failed to fetch campaigns.' });
  }
}; 