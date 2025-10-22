import { useGetStudentBatchDetails } from "../../hooks/studentBatch/useGetBatchDetails";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { formatISODate } from "../../utils/functions";
function StudentBatchDetails({ handleClose, rowData }) {
  const { id: batchId } = rowData;
  const {
    data: studentBatchDetails,
    isLoading,
    error,
  } = useGetStudentBatchDetails(batchId);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Student Batch Details</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      {isLoading ? (
        <div className="d-flex flex-column gap-2 modal-content-container">
          <div className="d-flex flex-column gap-4">
            {[...Array(8)].map((_, index) => (
              <div className="d-flex gap-1 flex-column" key={index}>
                <RectangleSkeleton height="1dvh" width="40%" />
                <RectangleSkeleton height="1dvh" width="15%" />
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
        <div>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className=" py-2 d-flex flex-column">
              <span className="my-0 font-size-sm">Title</span>
              <span className="my-0 font-size-sm gainsboro-color">
                {studentBatchDetails?.data.name}
              </span>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className=" py-2 d-flex flex-column">
              <span className="my-0 font-size-sm">Description</span>
              <span className="my-0 font-size-sm gainsboro-color">
                {studentBatchDetails?.data.description}
              </span>
            </div>
          </div>
          <span className="font-size-xs gainsboro-color">system info</span>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className=" py-2 d-flex flex-column">
              <span className="my-0 font-size-sm">Updated At</span>
              <span className="my-0 font-size-sm gainsboro-color">
                {formatISODate(studentBatchDetails?.data.updated_at)}
              </span>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className=" py-2 d-flex flex-column">
              <span className="my-0 font-size-sm">Created At</span>
              <span className="my-0 font-size-sm gainsboro-color">
                {formatISODate(studentBatchDetails?.data.created_at)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default StudentBatchDetails;
