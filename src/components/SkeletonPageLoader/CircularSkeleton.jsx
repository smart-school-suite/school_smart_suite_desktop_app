import ContentLoader from "react-content-loader";
function CircularSkeleton({ speed = 2, size = "100px" }) {
    const dimension = size; // Expecting a single size argument for both width and height
    const radius = parseFloat(dimension) * 0.2; // Setting radius to 20% of the size
  
    return (
      <ContentLoader
        speed={speed}
        width={dimension}
        height={dimension}
        viewBox={`0 0 ${dimension} ${dimension}`}
        backgroundColor="#cccc"
        foregroundColor="#ecebeb"
        style={{ width: dimension, height: dimension }}
      >
        <circle cx={dimension/2} cy={dimension/2} r={radius} />
      </ContentLoader>
    );
  }
  export default CircularSkeleton

  
  export { CircularSkeleton };