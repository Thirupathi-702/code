
const { getStockData } = require('../services/stockservices');

exports.getStock = async (req, res) => {
  const { symbol } = req.params;
  try {
    const data = await getStockData(symbol);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve stock data' });
  }
};

