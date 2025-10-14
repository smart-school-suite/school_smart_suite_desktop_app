import { useGetElectionTypeDetails } from "../../hooks/electionType/useGetElectionTypeDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { formatISODate } from "../../utils/functions";
function ElectionTypeDetails({ rowData, handleClose }) {
  const { id: electionTypeId } = rowData;
  const {
    data: electionType,
    isLoading,
    error,
  } = useGetElectionTypeDetails(electionTypeId);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span className="m-0">Election Type Details</span>
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
          <div className="d-flex flex-column gap-1">
            {[...Array(3)].map((index) => (
              <RectangleSkeleton
                width="100%"
                height="10dvh"
                speed={0.5}
                key={index}
              />
            ))}
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div>
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Election Title</p>
                <p className="my-0 gainsboro-color font-size-sm">{electionType.data.election_title}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Description</p>
                <p className="my-0 gainsboro-color font-size-sm">{electionType.data.description}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Created At</p>
                <p className="my-0 gainsboro-color font-size-sm">{formatISODate(electionType.data.created_at)}</p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Updated At</p>
                <p className="my-0 gainsboro-color font-size-sm">{formatISODate(electionType.data.updated_at)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ElectionTypeDetails;
