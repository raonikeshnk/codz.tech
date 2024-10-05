import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [largeCursorPosition, setLargeCursorPosition] = useState({ x: 0, y: 0 });
//   const largeCursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLargeCursorPosition((prev) => {
        const dx = (cursorPosition.x - prev.x) * 0.1; // Lag factor
        const dy = (cursorPosition.y - prev.y) * 0.1;
        return {
          x: prev.x + dx,
          y: prev.y + dy
        };
      });
    }, 10); // Adjust interval for smoother trailing effect

    return () => clearInterval(interval);
  }, [cursorPosition]);

  return (
    <div className="custom-cursor">
      <div
        className="circle small"
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      ></div>
      <div
        className="circle large"
        style={{ left: `${largeCursorPosition.x}px`, top: `${largeCursorPosition.y}px` }}
      ></div>
    </div>
  );
};

export default CustomCursor;
