import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
function FullScreenLoader() {
  return (
    <>
      <div style={{ width: "100%", height: "100dvh" }}>
        <div className="w-25">
          <RectangleSkeleton width="100%" height="100%" />
        </div>
        <div className="w-75">
            <RectangleSkeleton width="100%" height="100%" />
        </div>
      </div>
    </>
  );
}
export default FullScreenLoader;
