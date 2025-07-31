import Pageloaderspinner  from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetDepartmentDetails } from "../../hooks/department/useGetDepartmentDetails";
function DepartmentDetails({ handleClose, rowData }) {
  const { data:departmentDetails, isFetching } = useGetDepartmentDetails(rowData.id);
  if (isFetching) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Department Details</span>
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
        <div className="d-flex align-items-center justify-content-between my-2 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm">
              Department Name
            </span>
            <span className="my-0 gainsboro-color font-size-sm">{departmentDetails.data.department_name}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-2 w-100">
          <div
            className=" py-2 d-flex flex-column"
          >
            <span className="my-0 font-size-sm">
              Department Description
            </span>
            <span className="my-0  gainsboro-color font-size-sm">{departmentDetails.data.description}</span>
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
