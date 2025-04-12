import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
function DataTableNavLoader({ button=true }){
    return(
        <>
        <div className="mt-2">
            <div className="d-flex flex-row align-items-center justify-content-between w-100 gap-2">
            <RectangleSkeleton width="20%" height="6dvh" speed={1} />
            <RectangleSkeleton width="60%" height="6dvh" speed={1} />
            <RectangleSkeleton width="20%" height="6dvh" speed={1} />
            </div>
            <div className="d-flex  flex-row justify-content-between align-items-center w-100 mt-2">
              <div className="d-flex flex-column gap-2 mb-2">
              <RectangleSkeleton width="70%" height="3dvh" speed={1} />
              <RectangleSkeleton width="35%" height="7dvh" speed={1} />
              </div>
              {
                button && (
                  <div className="w-50 d-flex flex-row justify-content-end">
                  <RectangleSkeleton width="25%" height="5dvh" speed={1} />
                  </div>
                )
              }
            </div>
            <RectangleSkeleton width="100%" height="77dvh" speed={1} />
        </div>
        </>
    )
}
export default DataTableNavLoader;