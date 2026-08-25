import { Icon } from "@iconify/react";
import { useGetDepartmentDetails } from "../../hooks/department/useGetDepartmentDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function DepartmentDetails({ handleClose, drawerData }) {
  const {
    data: departmentDetails,
    isLoading,
    error,
  } = useGetDepartmentDetails(drawerData.id);
  return (
    <>
      <div
        className="font-size-sm d-flex flex-column gap-4 pt-2"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isLoading ? (
          <div className="d-flex flex-column gap-2">
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
          <>
            <div className="drawer-content px-2">
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
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="d-flex flex-row align-items-center justify-content-between py-3 px-2">
                  <button
                    className="border-none bg-none"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default DepartmentDetails;
