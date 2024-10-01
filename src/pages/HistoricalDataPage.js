import React, { useState } from 'react';
import LineChart from '../components/LineChart';
import './HistoricalDataPage.css';

const HistoricalDataPage = ({ historicalData }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter historical data based on date range
  const filterDataByDateRange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return historicalData.filter(item => {
      const date = new Date(item.timestamp);
      return date >= start && date <= end;
    });
  };

  const filteredData = filterDataByDateRange();

  // Data analysis
  const totalEnergy = filteredData.reduce((acc, item) => acc + item.energy, 0);
  const averageEnergy = (filteredData.length > 0) ? (totalEnergy / filteredData.length).toFixed(2) : 0;
  const maxEnergy = filteredData.length > 0 ? Math.max(...filteredData.map(item => item.energy)) : 0;
  const minEnergy = filteredData.length > 0 ? Math.min(...filteredData.map(item => item.energy)) : 0;

  // Estimate load for the next days (assume 30 days)
  const estimatedFutureLoad = (averageEnergy * 30).toFixed(2);

  return (
    <div className="historical-data-page">
      <h2>Historical Energy Data</h2>
      
      <div className="date-range-filter">
        <input 
          type="date" 
          value={startDate} 
          onChange={(e) => setStartDate(e.target.value)} 
          placeholder="Start Date" 
        />
        <input 
          type="date" 
          value={endDate} 
          onChange={(e) => setEndDate(e.target.value)} 
          placeholder="End Date" 
        />
      </div>

      {filteredData.length > 0 ? (
        <>
          <h3>Data Summary</h3>
          <table className="data-summary-table">
            <thead>
              <tr>
                <th>Total Energy (kWh)</th>
                <th>Average Energy (kWh)</th>
                <th>Max Energy (kWh)</th>
                <th>Min Energy (kWh)</th>
                <th>Estimated Load for Next 30 Days (kWh)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{totalEnergy.toFixed(2)}</td>
                <td>{averageEnergy}</td>
                <td>{maxEnergy}</td>
                <td>{minEnergy}</td>
                <td>{estimatedFutureLoad}</td>
              </tr>
            </tbody>
          </table>
          <break></break>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          

          <LineChart
            chartData={{
              labels: filteredData.map(item => item.timestamp),
              datasets: [{
                label: 'Energy Consumption (kWh)',
                data: filteredData.map(item => item.energy),
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
              }]
            }}
          />
        </>
      ) : (
        <p>No historical data available for the selected date range.</p>
      )}
    </div>
  );
};

export default HistoricalDataPage;
