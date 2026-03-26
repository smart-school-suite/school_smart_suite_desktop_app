import { useGetRegistrationFeeDetails } from "../../hooks/registrationFee/useGetRegistrationFeeDetails";
import { Icon } from "@iconify/react";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { formatNumber } from "../../utils/functions";
import { format, parseISO } from 'date-fns';
function RegistrationFeeDetail({ handleClose, rowData }) {
  const {
    data: registrationFeeDetails,
    isLoading,
    error,
  } = useGetRegistrationFeeDetails(rowData.id);

  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span className="m-0">Registration Fee Details</span>
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
          <>
            <div className="d-flex flex-column gap-3">
              <span className="font-size-sm gainsboro-color">Fee Details</span>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Fee Name</span>
                  <span className="font-size-sm fw-medium">
                    {registrationFeeDetails?.data?.title || "N/A"}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Amount</span>
                  <span className="font-size-sm fw-medium">
                    {formatNumber(
                      parseFloat(registrationFeeDetails?.data?.amount)
                    ) || "N/A"}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">status</span>
                  <span className="font-size-sm fw-medium">
                    {registrationFeeDetails?.data?.status || "N/A"}
                  </span>
                </div>
              </div>
              <span className="font-size-sm gainsboro-color">
                student Details
              </span>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Student Name</span>
                  <span className="font-size-sm fw-medium">
                    {registrationFeeDetails?.data?.student?.name}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Specialty</span>
                  <span className="font-size-sm fw-medium">
                    {registrationFeeDetails?.data?.specialty?.specialty_name}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Level</span>
                  <span className="font-size-sm fw-medium">
                    {registrationFeeDetails?.data?.level?.name}
                  </span>
                </div>
              </div>
              <span className="font-size-sm gainsboro-color">System Info</span>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">created At</span>
                  <span className="font-size-sm fw-medium">
                    {registrationFeeDetails?.data?.created_at
                      ? format(
                          parseISO(registrationFeeDetails.data.created_at),
                          "d MMM yyyy, h:mm a"
                        )
                      : "N/A"}
                  </span>
                </div>
                <hr />
                <div className="d-flex flex-column gap-1">
                  <span className="font-size-sm">Updated</span>
                  <span className="font-size-sm fw-medium">
                    {registrationFeeDetails?.data?.updated_at
                      ? format(
                          parseISO(registrationFeeDetails.data.updated_at),
                          "d MMM yyyy, h:mm a"
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default RegistrationFeeDetail;
