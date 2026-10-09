import { useGetStudentBatchDetails } from "../../hooks/studentBatch/useGetBatchDetails";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { formatISODate } from "../../utils/functions";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function BatchDetails({ handleClose, drawerData }) {
  const { id: batchId } = drawerData;
  const {
    data: studentBatchDetails,
    isLoading,
    error,
  } = useGetStudentBatchDetails(batchId);
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        {isLoading ? (
          <div className="d-flex flex-column gap-2 modal-content-container">
            <div className="d-flex flex-column gap-4">
              {[...Array(8)].map((_, index) => (
                <div className="d-flex gap-1 flex-column" key={index}>
                  <RectangleSkeleton height="1dvh" width="15%" />
                  <RectangleSkeleton height="1dvh" width="100%" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="d-flex flex-column gap-2 font-size-sm">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex flex-column gap-1">
                <span className="text-iron-400">Title</span>
                <span className="fw-medium">
                  {studentBatchDetails?.data.name}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex flex-column gap-1">
                <span className="text-iron-400">Description</span>
                <span className="fw-medium">
                  {studentBatchDetails?.data.description}
                </span>
              </div>
            </div>
            <span className="font-size-sm text-iron-400">System info</span>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex flex-column gap-1">
                <span className="text-iron-400">Updated At</span>
                <span className="fw-medium">
                  {formatISODate(studentBatchDetails?.data.updated_at)}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="d-flex flex-column gap-1">
                <span className="text-iron-400">Created At</span>
                <span className="fw-medium">
                  {formatISODate(studentBatchDetails?.data.created_at)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BatchDetails;
