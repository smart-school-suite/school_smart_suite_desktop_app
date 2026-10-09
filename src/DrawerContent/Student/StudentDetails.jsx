import { useGetStudentDetails } from "../../hooks/student/useGetStudentDetails";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import CircularSkeleton from "../../components/SkeletonPageLoader/CircularSkeleton";
import { Fragment } from "react";
function StudentDetails({ handleClose, drawerData }) {
  const { id: studentId } = drawerData;
  const {
    data: studentDetails,
    isLoading,
    error,
  } = useGetStudentDetails(studentId);
  return (
    <>
      <div className="drawer-content ">
        {isLoading ? (
          <div className="d-flex flex-column gap-5 px-2 pt-3">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <div className="d-flex flex-column gap-4 align-items-center">
                <CircularSkeleton size={100} />
                <div className="d-flex flex-column gap-3 align-items-center">
                  <div className="d-flex flex-column gap-2 align-items-center">
                    <RectangleSkeleton width={"12rem"} height={"1.4dvh"} />
                    <RectangleSkeleton width={"8rem"} height={"1.4dvh"} />
                  </div>
                  <div className="d-flex flex-row gap-2 align-items-center">
                    <RectangleSkeleton width={"6rem"} height={"2.2dvh"} />
                    <RectangleSkeleton width={"6rem"} height={"2.2dvh"} />
                  </div>
                  <div className="d-flex flex-row gap-2 align-items-center">
                    <RectangleSkeleton width={"8rem"} height={"2.2dvh"} />
                    <RectangleSkeleton width={"8rem"} height={"2.2dvh"} />
                    <RectangleSkeleton width={"8rem"} height={"2.2dvh"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <RectangleSkeleton width={"15%"} height={"1.2dvh"} />
              {[...Array(4)].map((_, index) => (
                <Fragment key={index}>
                  <div className="d-flex flex-column gap-2">
                    <RectangleSkeleton width={"20%"} height={"1.4dvh"} />
                    <RectangleSkeleton width={"100%"} height={"1.4dvh"} />
                  </div>
                </Fragment>
              ))}
            </div>
            <div className="d-flex flex-column gap-3">
              <RectangleSkeleton width={"15%"} height={"1.2dvh"} />
              {[...Array(4)].map((_, index) => (
                <Fragment key={index}>
                  <div className="d-flex flex-column gap-2">
                    <RectangleSkeleton width={"20%"} height={"1.4dvh"} />
                    <RectangleSkeleton width={"100%"} height={"1.4dvh"} />
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="pt-3">
            <div className="d-flex flex-column align-items-center justify-content-center gap-2 mb-3">
              <img
                src="./images/user.png"
                alt=""
                style={{ width: "5rem", height: "5rem" }}
                className="rounded-circle"
              />
              <div className="d-flex flex-column align-items-center">
                <span className="fw-semibold">
                  {studentDetails?.data?.name}
                </span>
                <span className="text-iron-400 fw-light font-size-sm">
                  @{studentDetails?.data?.username}
                </span>
              </div>
              <div className="d-flex flex-column align-items-center gap-2">
                <div className="d-flex flex-row align-items-center gap-2">
                  <span
                    className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor primary-background-100 color-primary"
                    style={{
                      fontSize: "0.75rem",
                      height: "1.4rem",
                    }}
                  >
                    <span>Subscribed</span>
                  </span>
                  <span
                    className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-fern-100 text-fern-400"
                    style={{
                      fontSize: "0.75rem",
                      height: "1.4rem",
                    }}
                  >
                    <span>Active</span>
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center gap-2">
                  <span
                    className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-iron-100 text-iron-500 color-primary"
                    style={{
                      fontSize: "0.75rem",
                      height: "1.4rem",
                    }}
                  >
                    <span>
                      {studentDetails?.data?.specialty?.specialty_name}
                    </span>
                  </span>
                  <span
                    className="rounded-pill d-inline-flex align-items-center gap-1 border-0 fw-normal px-2 pointer-cursor bg-iron-100 text-iron-500 color-primary"
                    style={{
                      fontSize: "0.75rem",
                      height: "1.4rem",
                    }}
                  >
                    <span>{studentDetails?.data?.specialty?.level?.name}</span>
                  </span>
                </div>
              </div>
            </div>
            <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />
            <div className="d-flex flex-column pt-2 font-size-sm gap-3">
              <div className="d-flex flex-column gap-3 px-2">
                <span className="font-size-sm text-iron-400">
                  Personal Info
                </span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">First Name</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.first_name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Last Name</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.last_name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">E-mail</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.email}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Phone</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.phone}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">DOB</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.DOB}
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-3 px-2">
                <span className="font-size-sm text-iron-400">
                  Guardian Info
                </span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Guardian Name</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.guardian?.name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Guardian Address</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.guardian?.address}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Guardian Phone</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.guardian?.phone}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Relationship</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.relationship?.name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Preferred Language</span>
                    <span className="fw-semibold">
                      {studentDetails?.data?.guardian?.preferred_language}
                    </span>
                  </div>
                </div>
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
export default StudentDetails;
