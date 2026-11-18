import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
function FullScreenLoader() {
  return (
    <>
      <div style={{ width: "100%", height: "100dvh" }} className="d-flex flex-row align-items-center gap-3 p-2">
        <div className="w-25 h-100">
          <RectangleSkeleton width="100%" height="100%" />
        </div>
        <div className="w-75 h-100">
            <RectangleSkeleton width="100%" height="100%" />
        </div>
      </div>
    </>
  );
}
export default FullScreenLoader;
