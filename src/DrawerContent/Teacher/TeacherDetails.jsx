import { Dot } from "lucide-react";
import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import CircularSkeleton from "../../components/SkeletonPageLoader/CircularSkeleton";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetTeacherDetails } from "../../hooks/teacher/useGetTeacherDetails";
import { formatDate } from "../../utils/functions";
function TeacherDetails({ drawerData, handleClose }) {
  const { id: teacherId } = drawerData;
  const { data: details, isLoading, error } = useGetTeacherDetails(teacherId);
  return (
    <>
      <div className="drawer-content pt-2 ps-2 font-size-sm">
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
          <div className="d-flex flex-column">
            <div className="d-flex flex-column align-items-center justify-content-center gap-2 mb-3">
              <img
                src="./images/user.png"
                alt=""
                style={{ width: "4rem", height: "4rem" }}
                className="rounded-circle"
              />
              <div className="d-flex flex-column align-items-center">
                <span className="fw-medium">{details?.data?.name}</span>
                <span className="text-iron-400 fw-light">
                  @{details?.data?.username}
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
              </div>
            </div>
            <div className="d-flex flex-column pt-2 font-size-sm gap-3">
              <div className="d-flex flex-column gap-3">
                <span className="font-size-sm text-iron-400">
                  Personal Info
                </span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">First Name</span>
                    <span className="fw-medium">
                      {details?.data?.first_name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Last Name</span>
                    <span className="fw-medium">
                      {details?.data?.last_name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">E-mail</span>
                    <span className="fw-medium">{details?.data?.email}</span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Phone</span>
                    <span className="fw-medium">{details?.data?.phone}</span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Address</span>
                    <span className="fw-medium">{details?.data?.address}</span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Gender</span>
                    <span className="fw-medium">
                      {details?.data?.gender?.name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">
                      Qualifications
                    </span>
                    <div className="d-flex flex-row align-items-center gap-2">
                      {details?.data?.qualifications?.map((q) => (
                        <Fragment>
                          <span
                            className="fw-medium bg-none px-2 font-size-sm border bg-primary-50 text-primary-500 d-flex flex-row align-items-center gap-1 rounded-pill"
                            style={{ width: "fit-content" }}
                          >
                            <span>{q.abbreviation}</span>
                            <Dot size={12} />
                            <span>{q.pivot.field_of_study}</span>
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">
                      Allowed Teaching Levels
                    </span>
                    <div className="d-flex flex-row align-items-center gap-2">
                      {details?.data?.levels?.map((l) => (
                        <Fragment>
                          <span
                            className="fw-medium bg-none px-2 font-size-sm border bg-iron-50 text-iron-500 d-flex flex-row align-items-center gap-1 rounded-pill"
                            style={{ width: "fit-content" }}
                          >
                            <span>
                              {l?.name} ({l?.level})
                            </span>
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-3 px-2">
                <span className="font-size-sm text-iron-400">System Info</span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Updated At</span>
                    <span className="fw-semibold">
                      {formatDate(details?.data?.updated_at)}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-normal text-iron-500">Created At</span>
                    <span className="fw-semibold">
                      {formatDate(details?.data?.created_at)}
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
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default TeacherDetails;
