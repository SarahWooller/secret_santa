import React from 'react';
import ReactDOM from 'react-dom/client';
import SecretSantaSelector from '../SecretSantaSelector.jsx'; // Import the new component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SecretSantaSelector /> {/* Render the new component */}
  </React.StrictMode>
);