const { pool } = require('../config/database');

// Helper to build SQL WHERE clause from rules and logic
function buildWhereClause(rules, logic) {
  if (!Array.isArray(rules) || rules.length === 0) return '1';
  const clauses = rules.map(rule => {
    const fieldMap = {
      spend: 'totalSpend',
      visits: 'visits',
      inactiveDays: 'DATEDIFF(NOW(), lastActiveDate)'
    };
    const dbField = fieldMap[rule.field] || rule.field;
    // For inactiveDays, use DATEDIFF
    if (rule.field === 'inactiveDays') {
      return `${dbField} ${rule.operator} ${parseInt(rule.value, 10)}`;
    }
    return `${dbField} ${rule.operator} ${parseFloat(rule.value)}`;
  });
  return clauses.join(` ${logic === 'OR' ? 'OR' : 'AND'} `);
}

exports.previewAudience = async (req, res) => {
  try {
    const { rules, logic } = req.body;
    // Assume Customers table has totalSpend, visits, lastActiveDate columns
    const where = buildWhereClause(rules, logic);
    const [rows] = await pool.query(`SELECT COUNT(*) as size FROM Customers WHERE ${where}`);
    res.json({ size: rows[0].size });
  } catch (error) {
    console.error('Error in previewAudience:', error);
    res.status(500).json({ message: 'Failed to preview audience size.' });
  }
}; 