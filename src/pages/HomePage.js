import React from 'react';
import './Home.css'; // Import the CSS file

const HomePage = ({ onFileSelect }) => {
  return (
    <div className="home" ><center>
      <h2>Welcome to Our Load Forecast Model</h2>
      <input 
        type="file" 
        className="file-input" 
        onChange={(e) => onFileSelect(e.target.files[0])} 
      />
      <p>Upload your data file here.</p>
      </center>
    </div>
  );
};

export default HomePage;
