import RectangleSkeleton from "../SkeletonPageLoader/RectangularSkeleton";
function DataTablePageLoader({ button=true }){
    return(
        <>
        <div className="mt-3">
            <div className="mb-1">
              <RectangleSkeleton width="20%" height="6dvh" speed={0.5} />
            </div>
            <div className="d-flex  flex-row justify-content-between align-items-center w-100">
              <div className="d-flex flex-column gap-1 mb-2">
              <RectangleSkeleton width="70%" height="3dvh" speed={0.5} />
              <RectangleSkeleton width="35%" height="7dvh" speed={0.5} />
              </div>
              {
                button && (
                  <div className="w-50 d-flex flex-row justify-content-end">
                  <RectangleSkeleton width="25%" height="5dvh" speed={0.5} />
                  </div>
                )
              }
            </div>
            <RectangleSkeleton width="100%" height="75dvh" speed={0.5} />
        </div>
        </>
    )
}
export default DataTablePageLoader;
