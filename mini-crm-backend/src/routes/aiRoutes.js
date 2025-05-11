const express = require('express');
const aiController = require('../controllers/aiController.js');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AI
 *   description: AI powered utilities
 */

/**
 * @swagger
 * /api/ai/generate-segment-rules:
 *   post:
 *     summary: Converts a natural language query to segment rules.
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - query
 *             properties:
 *               query:
 *                 type: string
 *                 description: The natural language query for customer segmentation.
 *                 example: "Customers who spent more than 1000 and visited at least 5 times"
 *     responses:
 *       200:
 *         description: Successfully generated segment rules or a message if conversion failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 rules:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: "totalSpend"
 *                       operator:
 *                         type: string
 *                         example: ">"
 *                       value:
 *                         type: [string, number]
 *                         example: 1000
 *                 message:
 *                   type: string
 *                   example: "Could not convert query to rules. Please try rephrasing or be more specific."
 *       400:
 *         description: Bad request (e.g., query not provided).
 *       500:
 *         description: Internal server error.
 */
router.post('/generate-segment-rules', aiController.generateRules);

/**
 * @swagger
 * /api/ai/generate-messages:
 *   post:
 *     summary: Generates campaign message suggestions based on an objective.
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - objective
 *             properties:
 *               objective:
 *                 type: string
 *                 description: The objective of the campaign (e.g., "bring back inactive users", "promote new product line X").
 *                 example: "Re-engage customers who haven\'t purchased in 6 months."
 *     responses:
 *       200:
 *         description: Successfully generated message suggestions or a message if conversion failed.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suggestions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "We\'ve missed you! Here\'s a special 15% off coupon for your next purchase."
 *                       imageTheme:
 *                         type: string
 *                         example: "Friendly reminder, welcoming back imagery."
 *                 message:
 *                   type: string
 *                   example: "Could not generate message suggestions. Please try rephrasing the objective or be more specific."
 *       400:
 *         description: Bad request (e.g., objective not provided).
 *       500:
 *         description: Internal server error.
 */
router.post('/generate-messages', aiController.handleGenerateMessages);

module.exports = router; 