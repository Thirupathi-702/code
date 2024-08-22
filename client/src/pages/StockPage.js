import React, { useEffect, useState } from 'react';
import Portfolio from '../components/Portfolio';
import axios from 'axios';

function PortfolioPage() {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const response = await axios.get('https://backend-hoac.onrender.com/api/portfolio');
      setPortfolio(response.data);
    };
    fetchPortfolio();
  }, []);

  return (
    <div>
      <h1>Your Portfolio</h1>
      <Portfolio portfolio={portfolio} />
    </div>
  );
}

export default PortfolioPage;
