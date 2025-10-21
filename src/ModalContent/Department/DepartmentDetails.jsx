import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetDepartmentDetails } from "../../hooks/department/useGetDepartmentDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function DepartmentDetails({ handleClose, rowData }) {
  const {
    data: departmentDetails,
    isLoading,
    error,
  } = useGetDepartmentDetails(rowData.id);
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
        {isLoading ? (
          <div className="d-flex flex-column gap-2 modal-content-container">
            <div className="d-flex flex-column gap-4">
              {[...Array(4)].map((_, index) => (
                <div className="d-flex gap-1 flex-column" key={index}>
                  <RectangleSkeleton height="1dvh" width="40%" />
                  <RectangleSkeleton height="1dvh" width="15%" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="modal-content-container">
            <div className="d-flex align-items-center justify-content-between my-2 w-100">
              <div className=" py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">Department Name</span>
                <span className="my-0 gainsboro-color font-size-sm">
                  {departmentDetails.data.department_name}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-2 w-100">
              <div className=" py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                  Department Description
                </span>
                <span className="my-0  gainsboro-color font-size-sm">
                  {departmentDetails.data.description}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default DepartmentDetails;
