const router = require('express').Router();
const ctrl = require('../controllers/trafficController');

/**
 * @swagger
 * /traffic:
 *   get:
 *     summary: Ambil semua data lalu lintas beserta jalur peta (path koordinat)
 *     tags: [Traffic]
 *     security: []
 *     responses:
 *       200:
 *         description: Daftar data lalu lintas berhasil diambil
 */
router.get('/', ctrl.getAll);

/**
 * @swagger
 * /traffic/summary:
 *   get:
 *     summary: Ambil ringkasan jumlah status lalu lintas (lancar, padat, macet)
 *     tags: [Traffic]
 *     security: []
 *     responses:
 *       200:
 *         description: Ringkasan status lalu lintas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     lancar: { type: integer, example: 12 }
 *                     padat: { type: integer, example: 5 }
 *                     macet: { type: integer, example: 2 }
 *                     total: { type: integer, example: 19 }
 */
router.get('/summary', ctrl.getSummary);

module.exports = router;
