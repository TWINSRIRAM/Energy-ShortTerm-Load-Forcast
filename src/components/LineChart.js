import React, { useEffect } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const LineChart = ({ chartData }) => {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chartInstance = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false, // Allow for flexible sizing
      },
    });

    return () => {
      chartInstance.destroy(); // Cleanup on unmount
    };
  }, [chartData]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}> {/* Adjust height as needed */}
      <canvas id="myChart" />
    </div>
  );
};

export default LineChart;
