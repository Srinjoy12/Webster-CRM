const { pool } = require('../config/database');

// In-memory queue for receipts
const receiptQueue = [];

exports.updateReceipt = async (req, res) => {
  const { logId, status } = req.body;
  // Queue the receipt for batch processing
  receiptQueue.push({ logId, status });
  res.json({ success: true });
};

// Batch processor: every 5 seconds, process all queued receipts
setInterval(async () => {
  if (receiptQueue.length === 0) return;
  const batch = receiptQueue.splice(0, receiptQueue.length); // Remove all
  // Group by logId and status
  const updates = {};
  batch.forEach(({ logId, status }) => {
    if (!updates[logId]) updates[logId] = { SENT: 0, FAILED: 0 };
    if (status === 'SENT') updates[logId].SENT += 1;
    if (status === 'FAILED') updates[logId].FAILED += 1;
  });
  // Update DB in batch
  for (const logId in updates) {
    const { SENT, FAILED } = updates[logId];
    if (SENT)
      await pool.query('UPDATE communication_log SET sent = sent + ? WHERE id = ?', [SENT, logId]);
    if (FAILED)
      await pool.query('UPDATE communication_log SET failed = failed + ? WHERE id = ?', [FAILED, logId]);
  }
}, 5000); // Every 5 seconds 