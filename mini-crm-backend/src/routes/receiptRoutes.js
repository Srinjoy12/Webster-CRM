const express = require('express');
const router = express.Router();
const receiptController = require('../controllers/receiptController');

/**
 * @swagger
 * /api/receipts:
 *   post:
 *     summary: Update delivery status in communication_log
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logId:
 *                 type: integer
 *               customerId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [SENT, FAILED]
 *     responses:
 *       200:
 *         description: Status updated
 */
router.post('/', receiptController.updateReceipt);

module.exports = router; 