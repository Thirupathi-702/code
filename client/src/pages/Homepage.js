import React, { useEffect, useState } from 'react';
import StockPlot from '../components/StockPlot/StockPlot';
import StockDetails from '../components/StockDetails/StockDetails';
import Summary from '../components/Summary/Summary';
import Chart from '../components/Chart/Chart';
import Statistics from '../components/Statistics/Statistics';
import Analysis from '../components/Analysis'
import './HomePage.css';
import '../App.css';


function HomePage() {
  const [stockPlotData, setStockPlotData] = useState(null);
  const [featureData, setFeatureData] = useState(null);
  const [selectedStock, setSelectedStock] = useState('AAPL');
  const [selectedFeature, setSelectedFeature] = useState('');
  const stockNames = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'FB', 'NFLX', 'NVDA', 'BABA', 'INTC'];

  // Fetching stock plot data using the backend API
  const fetchStockPlotData = async () => {
    try {
      const response = await fetch(`https://backend-hoac.onrender.com/api/stocks/${selectedStock}`);
      const data = await response.json();
      setStockPlotData(data);
      console.log('Stock Plot Data:', data);
    } catch (error) {
      console.error('Error fetching stock plot data:', error);
      setStockPlotData(null);
    }
  };

  // Fetching feature data using Polygon API
  const fetchFeatureData = async () => {
    try {
      const response = await fetch(
        `https://api.polygon.io/v1/open-close/${selectedStock}/2024-08-09?adjusted=true&apiKey=U4qwOtOtN38xVCLt23myOo7L09kjkODC`
      );
      const data = await response.json();
      setFeatureData(data);
      console.log('Feature Data:', data);
    } catch (error) {
      console.error('Error fetching feature data:', error);
      setFeatureData(null);
    }
  };

  useEffect(() => {
    fetchStockPlotData();
    fetchFeatureData();
  }, [selectedStock]);

  const addTodo = async () => {
    const response = await fetch("https://backend-hoac.onrender.com/todo/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ title: selectedStock })
    });
    const data = await response.json();
    console.log(data);
  };

  const renderFeatureComponent = () => {
    switch (selectedFeature) {
      case 'Summary':
        return <Summary data={featureData} />;
      case 'Chart':
        return <Chart name={selectedStock} />;
      case 'Statistics':
        return <Statistics name={selectedStock} />;
      case 'Analysis':
        return <Analysis name={selectedStock} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="scrolling-news">
        <p>*You can fetch data only 4 to 5 times per minute as it is free version. If you are unable to see data, refresh the page.</p>
      </div>
      <h1 className="homepage-title">Stock Market</h1>
      <div className="stock-select-container">
        <label htmlFor="stock-select" className="stock-select-label">Select a stock: </label>
        <select
          id="stock-select"
          className="stock-select"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          {stockNames.map((stock) => (
            <option key={stock} value={stock}>
              {stock}
            </option>
          ))}
        </select>
        <button onClick={addTodo} className="add-to-watchlist-button">
          Add {selectedStock} to Watchlist
        </button>
      </div>

      <StockDetails data={featureData} />
      {stockPlotData ? <StockPlot stockData={stockPlotData} /> : <div>Loading plot data...</div>}

      <div className="features">
        <p 
          className={`feature-item ${selectedFeature === 'Summary' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Summary')}
        >
          Summary
        </p>
        <p 
          className={`feature-item ${selectedFeature === 'Chart' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Chart')}
        >
          Chart
        </p>
        <p 
          className={`feature-item ${selectedFeature === 'Statistics' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Statistics')}
        >
          Statistics
        </p>
        <p 
          className={`feature-item ${selectedFeature === 'Analysis' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('Analysis')}
        >
          Analysis
        </p>
      </div>

      <div className="feature-component">
        {renderFeatureComponent()}
      </div>

     
    </div>
  );
}

export default HomePage;
