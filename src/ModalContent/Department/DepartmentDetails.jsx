import { useFetchDepartmentDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import { convertToReadableDate } from "../../utils/functions";
import { Icon } from "@iconify/react";
function DepartmentDetails({ row_id, handleClose }) {
  const {
    data: data,
    isLoading,
    error,
  } = useFetchDepartmentDetailsQuery({
    department_id: row_id,
  });

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Department Details</h5>
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
        <div className="d-flex align-items-center justify-content-between my-3 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Department Name
            </span>
            <span className="my-0">{data.data.department_name}</span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Department Description
            </span>
            <span className="my-0">{data.data.description}</span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3 w-100 border-bottom">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Head Of Department (HOD)
            </span>
            <span className="my-0">{data.data.hods[0].hodable.name}</span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3 ">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm fw-light">
              Department Status
            </span>
            <span className="my-0">
              {
                 data.data.status === "active" ? <span
                 className=" rounded-1 font-size-sm "
                 style={{
                   background: "#e3f5e3",
                   color: "#2d6830",
                   width: "auto",
                   maxWidth: "10rem",
                   padding: "0.2rem",
                 }}
               >
                 <span>Department Active</span>
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
                     <span>Department Active</span>
                   </span> 
              }
            </span>
          </div>
        </div>

        <div className="postion-absolute d-flex flex-row justify-content-end w-100">
            <button
              className="px-3 w-25 py-2 font-size-sm text-white border-none rounded-3 w-100 primary-background"
              onClick={() => {
                handleClose();
              }}
            >
              Close
            </button>
          </div>
      </div>
    </>
  );
}
export default DepartmentDetails;
