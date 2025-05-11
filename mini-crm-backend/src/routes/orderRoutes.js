const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               orderAmount:
 *                 type: number
 *                 format: float
 *               orderDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *     responses:
 *       202:
 *         description: Order creation request accepted for processing.
 *       400:
 *         description: Bad request
 */
router.post('/', orderController.createOrder);

// TODO: Add other order routes (GET, PUT, DELETE) as needed

module.exports = router; 