import { useUpdateElection } from "../../hooks/election/useUpdateElection";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { useGetElectionDetails } from "../../hooks/election/useGetElectionDetail";
import { useState } from "react";
function UpdateElection({ handleClose, rowData }) {
  const { id:electionId } = rowData;
  const { data:electionDetails, isLoading, error } = useGetElectionDetails(electionId);
  const { mutate:updateElection, isPending } = useUpdateElection(handleClose);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span className="m-0">Update Election</span>
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
           </>
         ) 
        }
      </div>
    </>
  );
}
export default UpdateElection;
