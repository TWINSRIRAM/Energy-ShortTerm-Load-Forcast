import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DataDisplayPage from './pages/DataDisplayPage';
import HistoricalDataPage from './pages/HistoricalDataPage';
import StatisticsPage from './pages/StatisticsPage';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);

  const handleFileSelect = (file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      parseFile(content);
    };

    reader.readAsText(file);
  };

  const parseFile = (content) => {
    const lines = content.trim().split('\n');
    const parsedData = lines.slice(1).map((line) => {
      const [timestamp, energy] = line.split(',');
      return {
        timestamp: timestamp.trim(),
        energy: parseFloat(energy.trim()) || 0,
      };
    });

    setData(parsedData);
    setHistoricalData(parsedData); // Update historical data with the same parsed data
  };

  return (
    <Router>
      <div className="app">
      <nav className="navbar">
  <div className="navbar-title">Load Forecast Model</div>
  <ul className="navbar-links">
    <li><Link to="/">Home</Link></li>
    <li><Link to="/data-display">Data Display</Link></li>
    <li><Link to="/historical-data">Historical Data</Link></li>
    <li><Link to="/statistics">Statistics</Link></li>
  </ul>
</nav>

        {/* Use `Routes` instead of `Switch` */}
        <Routes>
          <Route path="/" element={<HomePage onFileSelect={handleFileSelect} />} />
          <Route path="/data-display" element={<DataDisplayPage data={data} />} />
          <Route path="/historical-data" element={<HistoricalDataPage historicalData={historicalData} />} />
          <Route path="/statistics" element={<StatisticsPage energyData={data} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
