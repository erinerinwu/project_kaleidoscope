import React, { useState, useRef } from 'react';
import Canvas from './Components/Canvas';
import BrushControls from './Components/BrushControls';
import './App.css';

function App() {
  const [brushSize, setBrushSize] = useState(5);
  const [brushColor, setBrushColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('lavender');
  const canvasRef = useRef();

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = image;
    link.download = 'kaleidoscope-painting.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const colorOptions = [
    { name: "Pink", color: "#ffc0cb" },
    { name: "Lavender", color: "#e6e6fa" },
    { name: "Honeydew", color: "#f0fff0" },
    { name: "Powder Blue", color: "#b0e0e6" },
    { name: "Peach", color: "#ffe5b4" },
    { name: "Misty Rose", color: "#ffe4e1" },
    { name: "Mint Cream", color: "#f5fffa" },
    { name: "Azure", color: "#f0ffff" },
    { name: "Alice Blue", color: "#f0f8ff" },
    { name: "Beige", color: "#f5f5dc" },
    { name: "Lavender Blush", color: "#fff0f5" },
    { name: "Seashell", color: "#fff5ee" },
  ];

  const handleBrushSizeChange = (newSize) => {
    setBrushSize(newSize);
  };

  const handleBrushColorChange = (newColor) => {
    setBrushColor(newColor);
  };

  const resetCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  return (
    <div className="App">
      <h1 style={{ fontFamily: 'monospace' }}>Kaleidoscope Painter</h1>


      {/* App container for side-by-side layout */}
      <div className="app-container" style={{ display: 'flex' }}>
        {/* Color options container */}
        <div className="grfed-container">Change the Canvas here!</div>
        <div className="intro-container">How to play:<br /><br /><br /> 1. Simply move your mouse  to dynamically change the brush color <br /><br />2. Adjust the brush size using the slider  <br /><br /> 3. You can also pick your own canvas!<br /><br />4. Download your design<br /><br />5.Restart anytime<br /><br /><br /><br />Create unique logos or artworks without worrying about copyright — it's all yours! Enjoy the process and let your creativity flow! </div>
        
         <div className="color-options-container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginRight: '20px',
          padding: '10px',
          border: '1px solid #ccc',
        }}>
          
          {colorOptions.map(option => (
            <div key={option.name} onClick={() => setBackgroundColor(option.color)} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'monospace' }}>
              <div style={{ width: '20px', height: '20px', backgroundColor: option.color }}></div>
              <span>{option.name}</span>
              
            </div>
            
          ))}


        </div>

        {/* Right side container for BrushControls and Canvas */}
        <div>
          <BrushControls
            onColorChange={handleBrushColorChange}
            onSizeChange={handleBrushSizeChange}
          />
          <Canvas
            ref={canvasRef}
            width={600} // Adjust based on your needs
            height={400} // Adjust based on your needs
            brushSize={brushSize}
            brushColor={brushColor}
            backgroundColor={backgroundColor}
          />
        </div>
      </div>
      
      

      <div className="download" style={{
        position: 'fixed',
        left: '120px',
        right: '0',
        bottom: '60px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <button onClick={handleDownload} style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: '#FFF',
          backgroundColor: 'lavender ',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'background-color 0.9s ease'
        }}>
          Download
        </button>
      </div>
      <div style={{
  position: 'fixed',
  textAlign:'right',
  right: '20px',
  bottom: '20px',
  fontFamily: 'monospace',
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Optional: adds a light background for better readability
  padding: '10px',
  borderRadius: '5px', // Optional: adds rounded corners
}}>
  Created by Erin Wu <br /> Reach out to me at erinwu0825@ucla.edu
</div>


      <div className="restart" style={{
        position: 'fixed',
        left: '0',
        right: '120px',
        bottom: '60px',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <button onClick={resetCanvas} style={{
          padding: '10px 20px',
          fontSize: '16px',
          color: '#FFF',
          backgroundColor: 'pink',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          transition: 'background-color 0.9s ease'
        }}>
          Restart
        </button>
      </div>
    </div>
  );
}

export default App;
