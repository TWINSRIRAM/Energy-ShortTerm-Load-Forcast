import React, { useState, useEffect } from 'react';
import LineChart from '../components/LineChart';
import './DataDisplayPage.css';

const ITEMS_PER_PAGE = 20; // Increased to 20 for better performance on large datasets

const DataDisplayPage = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedData, setDisplayedData] = useState([]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  useEffect(() => {
    // Update displayed data based on current page
    const start = currentPage * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setDisplayedData(data.slice(start, end));
  }, [currentPage, data]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Prepare chart data for the LineChart component
  const chartData = {
    labels: data.map(entry => entry.timestamp),
    datasets: [
      {
        label: 'Energy (kWh)',
        data: data.map(entry => entry.energy),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="data-display">
      <h2>Data Display</h2>
      <LineChart chartData={chartData} />
      <div className="data-values">
        {displayedData.length > 0 ? (
          displayedData.map((entry, index) => (
            <div key={index} className="data-item">
              <span>{entry.timestamp}</span>
              <span className="data-value">Energy: {entry.energy.toFixed(2)} kWh</span>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index} onClick={() => handlePageChange(index)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataDisplayPage;
