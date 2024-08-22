const axios = require('axios');

exports.getStockData = async (symbol) => {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '5min',
        apikey:'H62XM2KRP7Q27R2R'
      },
    });
    return response.data;
  } catch (err) {
    throw new Error('Failed to fetch stock data');
  }
};
