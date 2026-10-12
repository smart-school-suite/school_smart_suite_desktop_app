import { Fragment } from "react";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionRoleDetails } from "../../hooks/electionRole/useGetElectionRoleDetails";
import { formatISODate, isLastElement } from "../../utils/functions";
function ElectionRoleDetails({ drawerData, handleClose }) {
  const { id: electionRoleId } = drawerData;
  const {
    data: electionRoleDetails,
    isLoading,
    error,
  } = useGetElectionRoleDetails(electionRoleId);
  return (
    <>
      <div className="drawer-content ps-2 pt-3 font-size-sm">
        <div>
          {isLoading ? (
            <div className="d-flex flex-column gap-3">
              {[...Array(4)].map((index) => (
                <Fragment key={index}>
                  <div className="d-flex flex-column gap-2">
                    <RectangleSkeleton
                      width="25%"
                      height="1dvh"
                      speed={0.5}
                    />
                    <RectangleSkeleton
                      width="75%"
                      height="1dvh"
                      speed={0.5}
                    />
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
              <div className="d-flex flex-column gap-1">
                <span className="fw-light">Election Role Name</span>
                <span className="fw-medium">
                  {electionRoleDetails.data.name}
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
                  {electionRoleDetails.data.description}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />
              <div className="d-flex flex-column gap-1">
                <span className="fw-light">Created At</span>
                <span className="fw-medium">
                  {formatISODate(electionRoleDetails.data.created_at)}
                </span>
              </div>
              <HorizontalDashedLine
                dashed={false}
                color="#ccc"
                thickness={0.2}
              />
              <div className="d-flex flex-column gap-1">
                <span className="fw-light">Updated At</span>
                <span className="fw-medium">
                  {formatISODate(electionRoleDetails.data.updated_at)}
                </span>
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
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ElectionRoleDetails;
