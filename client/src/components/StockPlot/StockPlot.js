import React from 'react';
import Plot from 'react-plotly.js';

function StockPlot({ stockData }) {
  if (!stockData || !stockData["Time Series (5min)"]) {
    return <div>Loading or no data available...</div>;
  }

  const timeSeries = stockData["Time Series (5min)"];
  const dates = Object.keys(timeSeries);
  const closePrices = dates.map(date => parseFloat(timeSeries[date]["4. close"]));

  return (
    <Plot
      data={[
        {
          x: dates.reverse(),
          y: closePrices.reverse(),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'blue' },
        },
      ]}
      layout={{ 
        title: `Stock Prices for ${stockData["Meta Data"]["2. Symbol"]}`,
        xaxis: {
          title: 'Date/Time',
          type: 'date',
        },
        yaxis: {
          title: 'Close Price (USD)',
        },
      }}
    />
  );
}

export default StockPlot;
