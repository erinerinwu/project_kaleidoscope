import React, { useState } from 'react';
import Canvas from './Components/Canvas';
import BrushControls from './Components/BrushControls';
import './App.css';

function App() {
  // State for brush size and color
  const [brushSize, setBrushSize] = useState(5); // Default brush size
  const [brushColor, setBrushColor] = useState('#000000'); // Default brush color

  // Handlers to update state
  const handleBrushSizeChange = (newSize) => {
    setBrushSize(newSize);
  };

  const handleBrushColorChange = (newColor) => {
    setBrushColor(newColor);
  };

  return (
    <div className="App">
      <h1>Kaleidoscope Painter</h1>
      <BrushControls
        onColorChange={handleBrushColorChange}
        onSizeChange={handleBrushSizeChange}
      />
      <Canvas
        width={window.innerWidth}
        height={window.innerHeight}
        brushSize={brushSize}
        brushColor={brushColor}
      />
    </div>
  );
}

export default App;
