import { Dot } from "lucide-react";
import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import CircularSkeleton from "../../components/SkeletonPageLoader/CircularSkeleton";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionCandidateDetails } from "../../hooks/electionCandidate/useGetElectionCandidateDetails";
import { isLastElement } from "../../utils/functions";
function ElectionCandidateDetails({ handleClose, drawerData }) {
  const { id: candidateId } = drawerData;
  const {
    data: candidateDetails,
    isLoading,
    error,
  } = useGetElectionCandidateDetails(candidateId);
  return (
    <>
      <div className="drawer-content ps-2 pt-3 font-size-sm" style={{ paddingBottom: "10rem"}}>
        <div className="d-flex flex-column">
          {isLoading ? (
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-row align-items-center justify-content-center">
                <div className="d-flex flex-column gap-2 align-items-center">
                  <CircularSkeleton size={100} />
                  <div className="d-flex flex-row align-items-center gap-2">
                    <RectangleSkeleton width="4rem" height="1dvh" speed={0.5} />
                    <RectangleSkeleton width="4rem" height="1dvh" speed={0.5} />
                  </div>
                </div>
              </div>
              {[...Array(6)].map((index) => (
                <Fragment key={index}>
                  <div className="d-flex flex-column gap-2">
                    <RectangleSkeleton width="25%" height="1dvh" speed={0.5} />
                    <RectangleSkeleton width="75%" height="1dvh" speed={0.5} />
                  </div>
                  {!isLastElement(index, [...Array(3)]) && (
                    <HorizontalDashedLine
                      dashed={false}
                      color="#ccc"
                      thickness={0.2}
                    />
                  )}
                </Fragment>
              ))}
            </div>
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column align-items-center">
                {candidateDetails?.data?.student?.profile_picture ? (
                  <div
                    style={{ width: "6rem", height: "6rem" }}
                    className="rounded-circle"
                  >
                    <img
                      src={`http://127.0.0.1:8000/storage/TeacherAvatars/${candidateDetails?.data?.student?.profile_picture}`}
                      alt=""
                      className="object-fit-cover w-100 h-100"
                      style={{ borderRadius: "2.8rem" }}
                    />
                  </div>
                ) : (
                  <div className="d-flex flex-column align-items-center gap-3 font-size-sm">
                    <div
                      style={{
                        width: "5rem",
                        height: "5rem",
                        display: "grid",
                        placeItems: "center",
                        flexShrink: 0,
                      }}
                      className="rounded-circle primary-background-100 color-primary 
                         d-flex align-items-center justify-content-center fw-semibold
                          overflow-hidden"
                    >
                      <span className="font-size-xl">
                        {getInitials(
                          candidateDetails?.data?.student?.first_name,
                          candidateDetails?.data?.student?.last_name,
                        )}
                      </span>
                    </div>
                    <div className="d-flex flex-column align-items-center gap-1">
                      <span
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {candidateDetails?.data?.student?.name}
                      </span>
                      <div className="d-flex flex-row align-items-center gap-2">
                        <span
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {
                            candidateDetails?.data?.student?.specialty
                              ?.specialty_name
                          }
                        </span>
                        <Dot />
                        <span
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {
                            candidateDetails?.data?.student?.specialty?.level
                              ?.name
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex flex-column gap-3">
                <span className="fw-light text-iron-400">Student Details</span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Full Names</span>
                    <span className="fw-medium">
                      {candidateDetails?.data?.student?.name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">First Name</span>
                    <span className="fw-medium">
                      {candidateDetails?.data?.student?.first_name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Last Name</span>
                    <span className="fw-medium">
                      {candidateDetails?.data?.student?.last_name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Specialty</span>
                    <span className="fw-medium">
                      {
                        candidateDetails?.data?.student?.specialty
                          ?.specialty_name
                      }
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Level</span>
                    <span className="fw-medium">
                      {
                        candidateDetails?.data?.student?.specialty
                          ?.level?.name
                      }
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column gap-3">
                <span className="fw-light text-iron-400">Role Detail</span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Role Title</span>
                    <span className="fw-medium">
                      {candidateDetails?.data?.election_role?.name}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Description</span>
                    <span className="fw-medium">
                      {candidateDetails?.data?.election_role?.description}
                    </span>
                  </div>
                </div>
              </div>
                 <div className="d-flex flex-column gap-3">
                <span className="fw-light text-iron-400">Application Detail</span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Manifesto</span>
                    <span className="fw-medium">
                      {candidateDetails?.data?.election_application?.manifesto}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Personal Vision</span>
                    <span className="fw-medium">
                      {candidateDetails?.data?.election_application?.personal_vision}
                    </span>
                  </div>
                  <HorizontalDashedLine
                    dashed={false}
                    color="#ccc"
                    thickness={0.2}
                  />
                  <div className="d-flex flex-column gap-1">
                    <span className="fw-light">Commitment Statement</span>
                    <span className="fw-medium">
                      {candidateDetails?.data?.election_application?.commitment_statement}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
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
export default ElectionCandidateDetails;

function getInitials(firstName, lastName) {
  if (!firstName || !lastName) {
    return "";
  }

  const firstInitial = firstName.charAt(0).toUpperCase();
  const lastInitial = lastName.charAt(0).toUpperCase();

  return firstInitial + lastInitial;
}
