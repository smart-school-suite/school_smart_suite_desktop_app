import ContentLoader from "react-content-loader";

function CircularSkeleton({ speed = 2, size = 100 }) {
  // Handle both number and string inputs
  const getDimension = (value) => {
    if (typeof value === 'number') return value;
    // Remove 'px' and parse
    return parseFloat(value.toString().replace('px', ''));
  };

  const dimension = getDimension(size);
  const radius = dimension * 0.5; // Full radius to fill the container
  
  return (
    <ContentLoader
      speed={speed}
      width={dimension}
      height={dimension}
      viewBox={`0 0 ${dimension} ${dimension}`}
      backgroundColor="#cccccc" // Fixed: added missing 'cc'
      foregroundColor="#ecebeb"
      style={{ width: dimension, height: dimension }}
    >
      <circle 
        cx={dimension / 2} 
        cy={dimension / 2} 
        r={radius} 
      />
    </ContentLoader>
  );
}

export default CircularSkeleton;
export { CircularSkeleton };