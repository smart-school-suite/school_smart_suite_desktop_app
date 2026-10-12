import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetElectionDetails } from "../../hooks/election/useGetElectionDetail";
import { formatISODate } from "../../utils/functions";
function ElectionDetails({ handleClose, drawerData }) {
  const { id: electionId } = drawerData;
  const {
    data: electionDetails,
    isLoading,
    error,
  } = useGetElectionDetails(electionId);
  return (
    <>
      <div className="drawer-content ps-2 pt-3">
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
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">Election Title</p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {electionDetails.data.election_type.election_title}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">Election Description</p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {electionDetails.data.election_type.description}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">School Year</p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {electionDetails.data.school_year}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">
                    Application Start Date And Time
                  </p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {formatISODate(electionDetails.data.application_start)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">
                    Application End Date And Time
                  </p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {formatISODate(electionDetails.data.application_end)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">Vote Start Date And Time</p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {formatISODate(electionDetails.data.voting_start)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">Vote End Date And Time</p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {formatISODate(electionDetails.data.voting_end)}
                  </p>
                </div>
              </div>
              <span className="font-size-xs gainsboro-color">system info</span>
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">Created At</p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {formatISODate(electionDetails.data.created_at)}
                  </p>
                </div>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-between my-1 w-100">
                <div className="py-2">
                  <p className="my-0 font-size-sm">Updated At</p>
                  <p className="my-0 gainsboro-color font-size-sm">
                    {formatISODate(electionDetails.data.updated_at)}
                  </p>
                </div>
              </div>
              <hr />
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
