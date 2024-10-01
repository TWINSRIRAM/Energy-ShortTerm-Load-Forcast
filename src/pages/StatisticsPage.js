import React from 'react';
import './StatisticsPage.css'; // Make sure to import your CSS for styling

const StatisticsPage = ({ energyData }) => {
  // Calculate statistics
  const totalEnergy = energyData.reduce((acc, curr) => acc + curr.energy, 0);
  const averageEnergy = energyData.length > 0 ? (totalEnergy / energyData.length).toFixed(2) : 0;
  const maxEnergy = energyData.length > 0 ? Math.max(...energyData.map(item => item.energy)) : 0;
  const minEnergy = energyData.length > 0 ? Math.min(...energyData.map(item => item.energy)) : 0;

  // Estimate load for the next 30 days
  const estimatedForecast = (averageEnergy * 30).toFixed(2);

  return (
    <div className="statistics-page">
      <h2>Energy Statistics & Analysis</h2>
      {energyData.length > 0 ? (
        <table className="statistics-table">
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Energy Consumed</td>
              <td>{totalEnergy} kWh</td>
            </tr>
            <tr>
              <td>Average Energy Consumption</td>
              <td>{averageEnergy} kWh</td>
            </tr>
            <tr>
              <td>Maximum Energy Consumption</td>
              <td>{maxEnergy} kWh</td>
            </tr>
            <tr>
              <td>Minimum Energy Consumption</td>
              <td>{minEnergy} kWh</td>
            </tr>
            <tr>
              <td>Estimated Load Forecast (Next 30 Days)</td>
              <td>{estimatedForecast} kWh</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No energy data available for analysis.</p>
      )}
    </div>
  );
};

export default StatisticsPage;
