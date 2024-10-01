import React from 'react';

const DataDisplay = ({ data }) => {
  return (
    <div className="data-display">
      <h3>Data Overview</h3>
      <ul>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>{`${key}: ${value}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
