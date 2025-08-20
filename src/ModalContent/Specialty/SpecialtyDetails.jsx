import { useGetSpecialtyDetails } from "../../hooks/specialty/useGetSpecialtyDetail";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { formatNumber } from "../../utils/functions";
import { useSelector } from "react-redux";
function SpecialtyDetails({  handleClose, rowData }) {
  const currency = useSelector((state) => state.auth.user);
  const specialtyId = rowData.id;
  const {
    data: specialtyDetails,
    isFetching
  } = useGetSpecialtyDetails(specialtyId);

  if (isFetching) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Specialty  Details</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-semibold">
              Specialty Name
            </span>
            <span className="my-0 gainsboro-color font-size-sm">{specialtyDetails?.data?.specialty_name}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-semibold">
              Registration Fee
            </span>
            <span className="my-0 gainsboro-color font-size-sm">{formatNumber(parseFloat(specialtyDetails?.data?.registration_fee))} {currency.schoolDetails.school.country.currency}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-semibold">
              Tuition Fee
            </span>
            <span className="my-0 gainsboro-color font-size-sm">{formatNumber(parseFloat(specialtyDetails?.data?.school_fee))} {currency.schoolDetails.school.country.currency}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-semibold">
              Department Name
            </span>
            <span className="my-0 gainsboro-color font-size-sm">{specialtyDetails?.data?.department.department_name}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-semibold">
              Level Name
            </span>
            <span className="my-0 gainsboro-color font-size-sm">{specialtyDetails?.data?.level.name}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-semibold">
              Level Number
            </span>
            <span className="my-0 gainsboro-color font-size-sm">{specialtyDetails?.data?.level.level}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-semibold">
              Description
            </span>
            <span className="my-0 gainsboro-color font-size-sm">{specialtyDetails?.data?.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default SpecialtyDetails;
