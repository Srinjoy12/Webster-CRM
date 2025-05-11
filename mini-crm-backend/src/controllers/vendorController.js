const axios = require('axios');

exports.sendMessage = async (req, res) => {
  const { logId, customerId, message } = req.body;
  // Simulate delivery: 90% success, 10% fail
  const isSuccess = Math.random() < 0.9;
  const status = isSuccess ? 'SENT' : 'FAILED';
  // Simulate network delay
  setTimeout(async () => {
    // Call the delivery receipt API
    try {
      await axios.post('http://localhost:3000/api/receipts', {
        logId,
        customerId,
        status
      });
    } catch (err) {
      // Log but don't fail
      console.error('Error calling delivery receipt API:', err.message);
    }
  }, 500);
  res.json({ status });
}; 