// BrushControls.js
import React, { useState } from 'react';

const BrushControls = ({ onColorChange, onSizeChange }) => {
  const [brushSize, setBrushSize] = useState(5); // Default brush size

  // Function to handle mouse movement over the designated area for color changing
  const handleMouseMove = (e) => {
    const { clientX, target } = e;
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left; // x position within the element.
    // Calculate hue based on the x position. Adjust the 360 value if needed to change the spectrum width
    const hue = (x / rect.width) * 360;
    const newColor = `hsl(${hue}, 100%, 50%)`; // Full saturation and 50% lightness for vibrant colors
    onColorChange(newColor);
  };

  // Function to handle brush size change from the slider
  const handleSizeChange = (e) => {
    const newSize = e.target.value;
    setBrushSize(newSize);
    onSizeChange(newSize); // Propagate the size change to the parent component
  };

  return (
    <div onMouseMove={handleMouseMove} style={{ padding: '20px', border: '1px solid #ccc', marginBottom: '10px', cursor: 'crosshair' }}>
      <div>Move your mouse over this box to change the brush color to a rainbow gradient!</div>
      <div>
        <label htmlFor="brushSize">Brush Size: </label>
        <input
          id="brushSize"
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={handleSizeChange}
        />
      </div>
    </div>
  );
};

export default BrushControls;
