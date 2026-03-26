import { useGetElectionRoleDetails } from "../../hooks/electionRole/useGetElectionRoleDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { formatISODate } from "../../utils/functions";
import { NotFoundError } from "../../components/errors/Error";
function ElectionRoleDetails({ handleClose, rowData }) {
  const { id: electionRoleId } = rowData;
  const {
    data: electionRoleDetails,
    isLoading,
    error,
  } = useGetElectionRoleDetails(electionRoleId);
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span className="m-0">Election Role Details</span>
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
                <p className="my-0 font-size-sm">Election Role Name</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {electionRoleDetails.data.name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Description</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {electionRoleDetails.data.description}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Created At</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {formatISODate(electionRoleDetails.data.created_at)}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Updated At</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {formatISODate(electionRoleDetails.data.updated_at)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ElectionRoleDetails;
