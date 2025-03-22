import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
function DashboardPageLoader() {
  return (
    <>
      <div className="mt-3">
        <div className="d-flex flex-row justify-content-between">
          <RectangleSkeleton width="31%" height="18dvh" speed={1} />
          <RectangleSkeleton width="31%" height="18dvh" speed={1} />
          <RectangleSkeleton width="31%" height="18dvh" speed={1} />
        </div>
        <div className="d-flex flex-row my-2 justify-content-between">
          <RectangleSkeleton width="65.5%" height="34dvh" speed={1} />
          <RectangleSkeleton width="31%" height="34dvh" speed={1} />
        </div>
        <div className="d-flex flex-row my-2 justify-content-between">
          <RectangleSkeleton width="31%" height="34dvh" speed={1} />
          <RectangleSkeleton width="31%" height="34dvh" speed={1} />
          <RectangleSkeleton width="31%" height="34dvh" speed={1} />
        </div>
      </div>
    </>
  );
}
export default DashboardPageLoader;
