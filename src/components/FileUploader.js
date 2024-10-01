import React from 'react';

const FileUploader = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    alert("DataSet Uploaded");
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div className="file-uploader">
      <input type="file" accept=".csv, .xml" onChange={handleFileChange} />
      alert("DataSet Uploaded");
      
    </div>
  );
};

export default FileUploader;
