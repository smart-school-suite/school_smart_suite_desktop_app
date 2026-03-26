import { Icon } from "@iconify/react";
import { useGetParentDetails } from "../../hooks/parent/useGetParentDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { format, parseISO } from "date-fns";
function ParentDetails({ handleClose, rowData }) {
  const { id: parentId } = rowData;
  const {
    data: parentDetails,
    isLoading,
    error,
  } = useGetParentDetails(parentId);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Guardian Details</span>
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
            {[...Array(10)].map((_, index) => (
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
        <div className="modal-content-container">
          <div className="d-flex flex-column gap-2">
            <span className="font-size-sm">Guardian Details</span>
            <div>
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Guardian Name</span>
                <span className="fw-light gainsboro-color">
                  {parentDetails?.data[0]?.name || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Address</span>
                <span className="fw-light gainsboro-color">
                  {parentDetails?.data[0]?.address || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Contact</span>
                <span className="fw-light gainsboro-color">
                  {parentDetails?.data[0]?.phone || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Preferred Language</span>
                <span className="fw-light gainsboro-color">
                  {parentDetails?.data[0]?.preferred_language || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Preferred Contact Method</span>
                <span className="fw-light gainsboro-color">
                  {parentDetails?.data[0]?.preferred_contact_method || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Total Students</span>
                <span className="fw-light gainsboro-color">
                  {parentDetails?.data[0]?.student?.length || "N/A"}
                </span>
              </div>
            </div>
            <span className="font-size-sm">Student Details</span>
            <div className="d-flex flex-column gap-1">
              {parentDetails?.data[0]?.student?.map((items) => (
                <>
                  <div className="d-flex flex-column font-size-sm">
                    <span className="fw-medium">Student Name</span>
                    <span className="fw-light gainsboro-color">
                      {items?.name || "N/A"}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex flex-column font-size-sm">
                    <span className="fw-medium">Specialty</span>
                    <span className="fw-light gainsboro-color">
                      {`${items?.specialty?.specialty_name}, ${items?.level?.name}` ||
                        "N/A"}
                    </span>
                  </div>
                  <hr />
                </>
              ))}
            </div>
          </div>
          <span className="font-size-sm">System Info</span>
          <div>
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Created At</span>
              <span className="fw-light gainsboro-color">
                {parentDetails?.data[0]?.created_at
                  ? format(
                      parseISO(parentDetails.data[0]?.created_at),
                      "d MMM yyyy, h:mm a"
                    )
                  : "N/A"}
              </span>
            </div>
            <hr />
            <div className="d-flex flex-column font-size-sm">
              <span className="fw-medium">Updated At</span>
              <span className="fw-light gainsboro-color">
                {parentDetails?.data[0]?.created_at
                  ? format(
                      parseISO(parentDetails.data[0]?.updated_at),
                      "d MMM yyyy, h:mm a"
                    )
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default ParentDetails;
