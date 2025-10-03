import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
function AnnouncementDashboardLoader(){
    return(
        <>
        <div className="container w-100 h-100 d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center gap-2 w-100" style={{ height:"20%" }}>
          <div className="col-4 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
          <div className="col-4 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
          <div className="col-4 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 w-100" style={{ height:"70%" }}>
          <div className="col-6 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
          <div className="col-6 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 w-100" style={{ height:"10%" }}>
          <div className="col-3 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
          <div className="col-3 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
          <div className="col-3 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
          <div className="col-3 h-100">
            <RectangleSkeleton width="100%" height="100%" speed={0.5} />
          </div>
        </div>
        </div>
        </>
    )
}
export default AnnouncementDashboardLoader;