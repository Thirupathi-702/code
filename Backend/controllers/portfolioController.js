
const Portfolio = require('../db/Portfolio');

exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve portfolio' });
  }
};

exports.addStockToPortfolio = async (req, res) => {
  const { symbol, quantity, purchasePrice } = req.body;
  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      portfolio = new Portfolio({ user: req.user.id, stocks: [] });
    }

    portfolio.stocks.push({ symbol, quantity, purchasePrice });
    await portfolio.save();

    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add stock to portfolio' });
  }
};

