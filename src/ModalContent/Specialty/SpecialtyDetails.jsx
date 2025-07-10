import { useFetchSpecialtyDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { formatNumber } from "../../utils/functions";
import { useSelector } from "react-redux";
function SpecialtyDetails({ row_id: specialtyId, handleClose }) {
  const currency = useSelector((state) => state.auth.user);
  const {
    data: specialtyDetails,
    isLoading,
    error,
  } = useFetchSpecialtyDetailsQuery({
    specialty_id: specialtyId,
  });

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Specialty  Details</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="my-2">
          <p className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
            molestias repellendus facere voluptate?
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Specialty Name
            </span>
            <span className="my-0">{specialtyDetails.data.specialty_name}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Registration Fee
            </span>
            <span className="my-0">{formatNumber(parseFloat(specialtyDetails.data.registration_fee))} {currency.schoolDetails.school.country.currency}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Tuition Fee
            </span>
            <span className="my-0">{formatNumber(parseFloat(specialtyDetails.data.school_fee))} {currency.schoolDetails.school.country.currency}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Status
            </span>
            {
                 specialtyDetails.data.status === "active" ? <span
                 className=" rounded-1 font-size-sm "
                 style={{
                   background: "#e3f5e3",
                   color: "#2d6830",
                   width: "auto",
                   maxWidth: "10rem",
                   padding: "0.2rem",
                 }}
               >
                 <span>Specailty Active</span>
               </span> : <span
                     className=" rounded-1 font-size-sm "
                     style={{
                       background: "#fffec1",
                       color: "#a66a02",
                       width: "auto",
                       maxWidth: "12rem",
                       padding: "0.2rem",
                     }}
                   >
                     <span>Specailty Active</span>
                   </span> 
              }           
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Department Name
            </span>
            <span className="my-0">{specialtyDetails.data.department.department_name}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Level Name
            </span>
            <span className="my-0">{specialtyDetails.data.level.name}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Level Number
            </span>
            <span className="my-0">{specialtyDetails.data.level.level}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Description
            </span>
            <span className="my-0">{specialtyDetails.data.description}</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default SpecialtyDetails;
