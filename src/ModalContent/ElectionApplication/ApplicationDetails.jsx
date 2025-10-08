import { useGetApplicationDetails } from "../../hooks/electionApplication/useGetApplicationDetails";
import { Icon } from "@iconify/react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { formatISODate } from "../../utils/functions";
function ApplicationDetails({ handleClose, rowData }) {
  const { id: applicationId } = rowData;
  const {
    data: applicationDetails,
    isLoading,
    error,
  } = useGetApplicationDetails(applicationId);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span className="m-0">Application Details</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="modal-content-container">
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
            <RectangleSkeleton width="100%" height="10dvh" speed={0.5} />
            <RectangleSkeleton width="100%" height="10dvh" speed={0.5} />
            <RectangleSkeleton width="100%" height="10dvh" speed={0.5} />
            <RectangleSkeleton width="100%" height="10dvh" speed={0.5} />
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <>
          <span className="font-size-xs gainsboro-color">
              Application Details
            </span>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Manifesto</p>
                <p className="font-size-sm fw-semibold">
                  {applicationDetails.data.manifesto}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Personal Vision</p>
                <p className="font-size-sm fw-semibold">
                  {applicationDetails.data.personal_vision}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Commitment Statement</p>
                <p className="font-size-sm fw-semibold">
                  {applicationDetails.data.commitment_statement}
                </p>
              </div>
            </div>
            <span className="font-size-xs gainsboro-color">
              Student Details
            </span>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Student Name</p>
                <p className="font-size-sm fw-semibold">
                  {applicationDetails.data.student.name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Specialty</p>
                <p className="font-size-sm fw-semibold">
                  {applicationDetails.data.student.specialty.specialty_name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Level</p>
                <p className="font-size-sm fw-semibold">
                  {applicationDetails.data.student.specialty.level.level}
                </p>
              </div>
            </div>
            <span className="font-size-xs gainsboro-color">
              Election Role Details
            </span>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Election Role</p>
                <p className="font-size-sm fw-semibold">
                  {applicationDetails.data.election_role.name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Election Role Description</p>
                <p className="font-size-sm fw-semibold">
                  {applicationDetails.data.election_role.description}
                </p>
              </div>
            </div>
            <span className="font-size-xs gainsboro-color">System Details</span>
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Created At</p>
                <p className="font-size-sm fw-semibold">
                  {formatISODate(applicationDetails.data.created_at)}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Updated At</p>
                <p className="font-size-sm fw-semibold">
                  {formatISODate(applicationDetails.data.updated_at)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default ApplicationDetails;
