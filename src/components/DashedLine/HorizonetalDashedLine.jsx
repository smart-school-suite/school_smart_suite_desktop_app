import React from 'react';

const HorizontalDashedLine = ({ 
  color = '#000',   
  thickness = 2,       
  dashArray = '10, 5', 
  rounded = true,      
  className = ''       
}) => {
  return (
    <div className={className} style={{ width: '100%' }}>
      <svg 
        width="100%" 
        height={thickness} 
        style={{ display: 'block', overflow: 'visible' }}
      >
        <line 
          x1="0" 
          y1={thickness / 2} 
          x2="100%" 
          y2={thickness / 2} 
          stroke={color} 
          strokeWidth={thickness} 
          strokeDasharray={dashArray} 
          strokeLinecap={rounded ? 'round' : 'butt'} 
        />
      </svg>
    </div>
  );
};

export default HorizontalDashedLine;