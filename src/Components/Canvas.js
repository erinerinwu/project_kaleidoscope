import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

const Canvas = forwardRef((props, ref) => {
  const { size = 500, brushColor = '#000000', brushSize = 5 , backgroundColor = 'pink' } = props;
  const canvasRef = useRef(null);

  // Use useImperativeHandle to expose the clearCanvas function to the parent component
  useImperativeHandle(ref, () => ({
    toDataURL: () => canvasRef.current.toDataURL(),
    clearCanvas() {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      }
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.backgroundColor = backgroundColor; 
    const context = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    const startDrawing = (e) => {
      const rect = canvas.getBoundingClientRect();
      lastX = e.clientX - rect.left;
      lastY = e.clientY - rect.top;
      drawing = true;
    };

    const draw = (e) => {
      if (!drawing) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const hue = (x / canvas.width) * 360;
      const strokeColor = `hsl(${hue}, 100%, 90%)`;

      context.lineWidth = brushSize;
      context.strokeStyle = strokeColor;
      context.lineCap = 'round';


      // Calculate initial and final points for the drawing
      const initialPoints = calculateSymmetricalPoints(lastX, lastY, centerX, centerY, brushSize, brushColor, context);
      const finalPoints = calculateSymmetricalPoints(x, y, centerX, centerY, brushSize, brushColor, context);

      initialPoints.forEach((start, index) => {
        const end = finalPoints[index];
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
      });

      lastX = x;
      lastY = y;
    };

    const stopDrawing = () => {
      drawing = false;
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, [brushColor, brushSize, backgroundColor]); // Add brushColor and brushSize as dependencies

  return <canvas ref={canvasRef} width={size} height={size} />;
});

export default Canvas;

// Adjusted calculateSymmetricalPoints to take additional arguments
function calculateSymmetricalPoints(x, y, centerX, centerY, brushSize, brushColor, context) {
  const points = [];
  const angle = Math.atan2(y - centerY, x - centerX);
  const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);

  for (let i = 0; i < 8; i++) {
    const sectionAngle = (Math.PI / 4) * i;
    const reflectedAngle = 2 * sectionAngle - angle;
    points.push({
      x: centerX + dist * Math.cos(angle + sectionAngle),
      y: centerY + dist * Math.sin(angle + sectionAngle)
    });
    points.push({
      x: centerX + dist * Math.cos(reflectedAngle + sectionAngle),
      y: centerY + dist * Math.sin(reflectedAngle + sectionAngle)
    });
  }

  return points;
}