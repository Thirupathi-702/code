import React, { useState } from 'react';
import axios from 'axios';

const StockPage = () => {
    const [symbol, setSymbol] = useState('');
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState('');
    const [watchlist, setWatchlist] = useState([]);

    const handleFetchStockData = async () => {
        try {
            const response = await axios.get(`https://backend-hoac.onrender.com/api/stocks/real-time/${symbol}`);
            setStockData(response.data);
            setError('');
        } catch (err) {
            setError('Error fetching stock data');
            setStockData(null);
        }
    };

    const handleAddToWatchlist = async () => {
        try {
            const response = await axios.post('https://backend-hoac.onrender.com/api/watchlist', { symbol });
            setWatchlist(response.data);
            setError('');
        } catch (err) {
            setError('Error adding to watchlist');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Stock Market</h1>
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value)}
                    placeholder="Enter stock symbol"
                    style={{ padding: '10px', marginRight: '10px', width: '200px' }}
                />
                <button onClick={handleFetchStockData} style={{ padding: '10px 20px' }}>Get Stock Data</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {stockData && (
                <div style={{ marginBottom: '20px' }}>
                    <h2>{stockData['01. symbol']}</h2>
                    <p>Price: {stockData['05. price']}</p>
                    <p>Volume: {stockData['06. volume']}</p>
                    <p>Change: {stockData['09. change']}</p>
                    <p>Change Percent: {stockData['10. change percent']}</p>
                    <button onClick={handleAddToWatchlist} style={{ padding: '10px 20px', marginTop: '10px' }}>
                        Add to Watchlist
                    </button>
                </div>
            )}

            <div>
                <h3>Your Watchlist</h3>
                <ul>
                    {watchlist.map((stock, index) => (
                        <li key={index}>{stock.symbol}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StockPage;
