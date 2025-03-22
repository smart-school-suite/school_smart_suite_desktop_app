import ContentLoader from "react-content-loader";

function RectangleSkeleton({ speed, width = "100%", height = "200px" }) {
  return (
    <ContentLoader
      speed={speed ? speed : 2}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#cccc"
      foregroundColor="#ecebeb"
      style={{ width: width, height: height }}
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="100%" />
    </ContentLoader>
  );
}

export default RectangleSkeleton;