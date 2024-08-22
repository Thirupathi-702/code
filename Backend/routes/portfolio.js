// const express = require('express');
// const portfolioController = require('../controllers/portfolioController');
// const router = express.Router();

// router.get('/', portfolioController.getPortfolio);
// router.post('/add', portfolioController.addStockToPortfolio);

// module.exports = router;
const express = require('express');
const { getPortfolio, addStockToPortfolio } = require('../controllers/portfolioController');
const {authenticateJwt,SECRET}=require('../middleware')
const router = express.Router();

router.get('/', authenticateJwt, getPortfolio);
router.post('/add', authenticateJwt, addStockToPortfolio);

module.exports = router;
