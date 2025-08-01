import { useGetAdditionalFeeDetails } from "../../hooks/additionalFee/useGetAdditionalFeeDetails";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { formatNumber } from "../../utils/functions";
function AdditionalFeeDetail({ rowData, handleClose }) {
  const { id: additionalFeeId } = rowData;
  const { data: additionalFees, isFetching } =
    useGetAdditionalFeeDetails(additionalFeeId);
  if (isFetching) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Additional Fee Details</span>
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
        <div className="d-flex flex-column gap-1">
          <div className="d-flex align-items-center justify-content-between">
            <div className="py-2 d-flex flex-column">
              <span className="my-0 font-size-sm gainsboro-color">Title</span>
              <span className="my-0 font-size-sm">
                {additionalFees?.data[0]?.fee_category?.title}
              </span>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="py-2 d-flex flex-column">
              <span className="my-0 font-size-sm gainsboro-color">Reason</span>
              <span className="my-0 font-size-sm">
                {additionalFees?.data[0]?.reason}
              </span>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="py-2 d-flex flex-column">
              <span className="my-0 font-size-sm gainsboro-color">Amount</span>
              <span className="my-0 font-size-sm">
               {formatNumber(additionalFees?.data[0]?.amount)}
              </span>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="py-2 d-flex flex-column">
              <span className="my-0 font-size-sm gainsboro-color">Payment Status</span>
              <span className="my-0 font-size-sm">
               {additionalFees?.data[0]?.status}
              </span>
            </div>
          </div>
           <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="py-2 d-flex flex-column">
              <span className="my-0 font-size-sm gainsboro-color">Student Name</span>
              <span className="my-0 font-size-sm">
               {additionalFees?.data[0]?.student.name}
              </span>
            </div>
          </div>
           <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="py-2 d-flex flex-column">
              <span className="my-0 font-size-sm gainsboro-color">Specialty Name</span>
              <span className="my-0 font-size-sm">
               {additionalFees?.data[0]?.specialty.specialty_name}
              </span>
            </div>
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div className="py-2 d-flex flex-column">
              <span className="my-0 font-size-sm gainsboro-color">Level</span>
              <span className="my-0 font-size-sm">
               {additionalFees?.data[0]?.level.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdditionalFeeDetail;
