const express = require('express');
const router = express.Router();
const audienceController = require('../controllers/audienceController');

/**
 * @swagger
 * /api/audience/preview:
 *   post:
 *     summary: Preview audience size based on rules
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rules:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     field:
 *                       type: string
 *                     operator:
 *                       type: string
 *                     value:
 *                       type: string
 *               logic:
 *                 type: string
 *                 enum: [AND, OR]
 *     responses:
 *       200:
 *         description: Audience size
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 size:
 *                   type: integer
 */
router.post('/preview', audienceController.previewAudience);

module.exports = router; 