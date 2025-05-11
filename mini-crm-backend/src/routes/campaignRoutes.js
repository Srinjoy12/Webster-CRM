const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

/**
 * @swagger
 * /api/campaigns:
 *   post:
 *     summary: Create a new campaign
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               message:
 *                 type: string
 *               rules:
 *                 type: array
 *                 items:
 *                   type: object
 *               logic:
 *                 type: string
 *     responses:
 *       201:
 *         description: Campaign created
 *   get:
 *     summary: Get campaign history
 *     responses:
 *       200:
 *         description: List of campaigns
 */
router.post('/', campaignController.createCampaign);
router.get('/', campaignController.getCampaigns);

module.exports = router; 