const express = require('express');
const { getStock } = require('../controllers/stockController');
const router = express.Router();

router.get('/:symbol', getStock);

module.exports = router;
