import { Icon } from "@iconify/react";
import { useGetStudentDetails } from "../../hooks/student/useGetStudentDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function StudentDetails({ handleClose, rowData }) {
  const { id: studentId } = rowData;
  const {
    data: studentDetails,
    isLoading,
    error,
  } = useGetStudentDetails(studentId);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span>Student Details</span>
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
        <>
          <div className="modal-content-container">
            <div className="d-flex flex-row align-items-center justify-content-center my-4">
            <div>
              <img
                src="./images/user.png"
                alt=""
                style={{ width: "5rem", height: "5rem" }}
                className="rounded-circle"
              />
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <span className="fw-semibold">Student Personal Details</span>
            <div>
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Full Names</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.name || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">First Name</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.first_name || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Last Name</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.last_name || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Gender</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.gender || "N/A"}
                </span>
              </div>
            </div>
            <span className="fw-semibold">Level Details</span>
            <div>
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Specialty Name</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.specialty.specialty_name || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Level</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.level.name || "N/A"}
                </span>
              </div>
            </div>
            <span className="fw-semibold">Guardian Details</span>
            <div>
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Guardian Name</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.guardian.name || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Relationship To Student</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.guardian.relationship_to_student ||
                    "N/A"}
                </span>
              </div>
            </div>
            <span className="fw-semibold">Student Contact Details</span>
            <div>
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Email</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.email || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Contact One</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.phone_one || "N/A"}
                </span>
              </div>
              <hr />
              <div className="d-flex flex-column font-size-sm">
                <span className="fw-medium">Contact Two</span>
                <span className="fw-light gainsboro-color">
                  {studentDetails?.data?.phone_two || "N/A"}
                </span>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </>
  );
}
export default StudentDetails;
