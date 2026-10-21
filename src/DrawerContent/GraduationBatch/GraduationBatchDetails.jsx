import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetGraduationBatchDetails } from "../../hooks/graduationBatch/useGetGraduationBatchDetails";
import { formatDate } from "../../utils/functions";
function GraduationBatchDetails({ drawerData, handleClose }) {
  const { id: batchId } = drawerData;
  const {
    data: details,
    isLoading,
    error,
  } = useGetGraduationBatchDetails(batchId);
  return (
    <>
      <div className="drawer-content ps-2 pt-3 font-size-sm">
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            {[...Array(5)].map((_, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-column gap-2">
                  <RectangleSkeleton width="25%" height="1dvh" />
                  <RectangleSkeleton width="100%" height="1dvh" />
                </div>
              </Fragment>
            ))}
          </div>
        ) : error ? (
          <NotFoundError
            title={
              error?.response?.data?.errors?.title ||
              "Graduation Batch Not Found"
            }
            description={
              error?.response?.data?.errors?.description ||
              "Unable to load graduation batch details. Please try again."
            }
          />
        ) : (
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Title</span>
              <span className="fw-medium">{details?.data?.name}</span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Description</span>
              <span className="fw-medium">{details?.data?.description}</span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">
                Graduation Start Date
              </span>
              <span className="fw-medium">
                {formatDate(details?.data?.graduation_start_date)}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">
                Graduation End Date
              </span>
              <span className="fw-medium">
                {formatDate(details?.data?.graduation_end_date)}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Location</span>
              <span className="fw-medium">{details?.data?.location}</span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Academic Year</span>
              <span className="fw-medium">
                {details?.data?.academic_year?.name}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />

            <span className="fw-normal text-iron-500">System Info</span>
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Created At</span>
              <span className="fw-medium">
                {formatDate(details?.data?.created_at)}
              </span>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column">
              <span className="fw-normal text-iron-500">Updated At</span>
              <span className="fw-medium">
                {formatDate(details?.data?.updated_at)}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between px-2 py-3">
            <button
              type="button"
              className="border-none bg-none cursor-pointer"
              onClick={() => handleClose?.()}
              disabled={isLoading}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default GraduationBatchDetails;
