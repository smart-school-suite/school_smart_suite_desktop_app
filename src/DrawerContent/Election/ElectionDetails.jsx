import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionDetails } from "../../hooks/election/useGetElectionDetail";
import { formatISODate, isLastElement } from "../../utils/functions";
function ElectionDetails({ handleClose, drawerData }) {
  const { id: electionId } = drawerData;
  const {
    data: electionDetails,
    isLoading,
    error,
  } = useGetElectionDetails(electionId);
  return (
    <>
      <div
        className="drawer-content ps-2 pt-3 font-size-sm"
        style={{ paddingBottom: "10rem" }}
      >
        <div className="d-flex flex-column gap-3">
          {isLoading ? (
            <div className="d-flex flex-column gap-4">
              {[...Array(10)].map((index) => (
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
            <>
              <div className="d-flex flex-column gap-2">
                <span className="fw-light">Election Title</span>
                <span className="fw-medium">
                  {electionDetails?.data?.election_type?.election_title}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />

              <div className="d-flex flex-column gap-2">
                <span className="fw-light">Election Description</span>
                <span className="fw-medium">
                  {electionDetails?.data?.election_type?.description}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />

              <div className="d-flex flex-column gap-2">
                <span className="fw-light">School Year</span>
                <span className="fw-medium">
                  {electionDetails?.data?.academic_year?.name}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />

              <div className="d-flex flex-column gap-2">
                <span className="fw-light">
                  Application Start Date And Time
                </span>
                <span className="fw-medium">
                  {formatISODate(electionDetails?.data?.application_start)}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />

              <div className="d-flex flex-column gap-2">
                <span className="fw-light">Application End Date And Time</span>
                <span className="fw-medium">
                  {formatISODate(electionDetails?.data?.application_end)}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />

              <div className="d-flex flex-column gap-2">
                <span className="fw-light">Vote Start Date And Time</span>
                <span className="fw-medium">
                  {formatISODate(electionDetails?.data?.voting_start)}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />

              <div className="d-flex flex-column gap-2">
                <span className="fw-light">Vote End Date And Time</span>
                <span className="fw-medium">
                  {formatISODate(electionDetails?.data?.voting_end)}
                </span>
              </div>
              <span className="text-iron-400">System info</span>

              <div className="d-flex flex-column gap-2">
                <span className="fw-light">Created At</span>
                <span className="fw-medium">
                  {formatISODate(electionDetails?.data?.created_at)}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />

              <div className="d-flex flex-column gap-2">
                <span className="fw-light">Updated At</span>
                <span className="fw-medium">
                  {formatISODate(electionDetails?.data?.updated_at)}
                </span>
              </div>
            </>
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
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ElectionDetails;
