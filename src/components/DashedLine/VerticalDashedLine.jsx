import React from 'react';

const VerticalDashedLine = ({ 
  color = '#000',   
  thickness = 2,       
  dashArray = '10, 5', 
  rounded = true,      
  className = ''       
}) => {
  return (
    <div className={className} style={{ height: '100%', display: 'inline-block' }}>
      <svg 
        width={thickness} 
        height="100%" 
        style={{ display: 'block', overflow: 'visible' }}
      >
        <line 
          x1={thickness / 2} 
          y1="0" 
          x2={thickness / 2} 
          y2="100%" 
          stroke={color} 
          strokeWidth={thickness} 
          strokeDasharray={dashArray} 
          strokeLinecap={rounded ? 'round' : 'butt'} 
        />
      </svg>
    </div>
  );
};

export default VerticalDashedLine;