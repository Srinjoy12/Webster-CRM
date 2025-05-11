// Placeholder for customer routes
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       202:
 *         description: Customer creation request accepted for processing.
 *       400:
 *         description: Bad request
 */
router.post('/', customerController.createCustomer);

// TODO: Add other routes (GET, PUT, DELETE) later

module.exports = router; 