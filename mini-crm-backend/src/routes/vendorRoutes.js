const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

/**
 * @swagger
 * /api/vendor/send:
 *   post:
 *     summary: Dummy vendor API to simulate message delivery
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
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Delivery simulated
 */
router.post('/send', vendorController.sendMessage);

module.exports = router; 