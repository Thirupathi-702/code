const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    symbol: String,
    price: Number,
    volume: Number,
    marketCap: Number,
    historicalData: Array,
});

module.exports = mongoose.model('Stock', stockSchema);

// Portfolio.js
