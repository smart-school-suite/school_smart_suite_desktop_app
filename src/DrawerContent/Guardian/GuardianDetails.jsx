import { Icon } from "@iconify/react";
import { useGetParentDetails } from "../../hooks/parent/useGetParentDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { format, parseISO } from "date-fns";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { Dot } from "lucide-react";
import { isLastElement } from "../../utils/functions";
function GuardianDetails({ handleClose, drawerData }) {
  const { id: parentId } = drawerData;
  const {
    data: parentDetails,
    isLoading,
    error,
  } = useGetParentDetails(parentId);
  return (
    <>
      <div className="drawer-content px-2 pt-3 pb-5">
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
          <div className="font-size-sm d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-3">
              <span className="text-iron-400">Guardian Details</span>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-column">
                  <span className="text-iron-400">Guardian Name</span>
                  <span className="fw-medium">
                    {parentDetails?.data[0]?.name || "N/A"}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <span className="text-iron-400">Address</span>
                  <span className="fw-medium">
                    {parentDetails?.data[0]?.address || "N/A"}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <span className="text-iron-400">Contact</span>
                  <span className="fw-medium">
                    {parentDetails?.data[0]?.phone || "N/A"}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <span className="text-iron-400">Preferred Language</span>
                  <span className="fw-medium">
                    {parentDetails?.data[0]?.preferred_language || "N/A"}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <span className="text-iron-400">
                    Preferred Contact Method
                  </span>
                  <span className="fw-medium">
                    {parentDetails?.data[0]?.preferred_contact_method || "N/A"}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column">
                  <span className="text-iron-400">Total Students</span>
                  <span className="fw-medium">
                    {parentDetails?.data[0]?.student?.length || "N/A"}
                  </span>
                </div>
              </div>
              <span className="font-size-sm text-iron-400">Student Details</span>
              <div className="d-flex flex-column gap-2">
                {parentDetails?.data[0]?.student?.map((items, index) => (
                  <>
                    <div className="d-flex flex-column gap-2">
                      <span className="fw-medium">{items?.name || "N/A"}</span>
                      <div className="d-flex flex-row align-items-center gap-2">
                        <span
                          className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-iron-100 text-iron-500 color-primary"
                          style={{
                            fontSize: "0.75rem",
                            height: "1.4rem",
                          }}
                        >
                          <span className="fw-medium">
                            {items?.specialty?.specialty_name || "N/A"}
                          </span>
                        </span>
                        <Dot />
                        <span
                          className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-iron-100 text-iron-500 color-primary"
                          style={{
                            fontSize: "0.75rem",
                            height: "1.4rem",
                          }}
                        >
                          <span className="fw-medium">
                            {items?.specialty?.level?.name || "N/A"}
                          </span>
                        </span>
                      </div>
                    </div>
                    {
                       !isLastElement(index, parentDetails?.data[0]?.student?.length) && <hr />
                    }
                  </>
                ))}
              </div>
            </div>
            <span className="font-size-sm text-iron-400">System Info</span>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex flex-column">
                <span className="text-iron-400">Created At</span>
                <span className="fw-medium">
                  {parentDetails?.data[0]?.created_at
                    ? format(
                        parseISO(parentDetails.data[0]?.created_at),
                        "d MMM yyyy, h:mm a",
                      )
                    : "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column">
                <span className="text-iron-400">Updated At</span>
                <span className="fw-medium">
                  {parentDetails?.data[0]?.created_at
                    ? format(
                        parseISO(parentDetails.data[0]?.updated_at),
                        "d MMM yyyy, h:mm a",
                      )
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row p-2">
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
export default GuardianDetails;
