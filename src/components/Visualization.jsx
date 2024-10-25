import React from 'react';
import './Visualization.css';

function Visualization({ array, arraySize }) {
  // Dynamically set bar width based on array size
  const barWidth = Math.max(600 / arraySize, 5);  // Minimum width of 5px

  return (
    <div className="array-container">
      {array.map((value, idx) => (
        <div
          key={idx}
          className="array-bar"
          style={{
            height: `${value}px`,
            width: `${barWidth}px`,  // Apply calculated bar width
            backgroundColor: 'turquoise',
          }}
        ></div>
      ))}
    </div>
  );
}

export default Visualization;
