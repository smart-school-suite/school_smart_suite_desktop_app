import { useFetchDepartmentDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import { convertToReadableDate } from "../../utils/functions";
function DepartmentDetails({ row_id, handleClose }) {
    const {
      data: department_details,
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
          <div className="w-100 mb-4 pe-2 d-flex flex-row justify-content-between align-items-center">
            <span className="fw-semibold fs-5">Update Department</span>
            <span>IC</span>
          </div>
          <div className="my-2">
            <p className="font-size-sm gainsboro-color">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              molestias repellendus facere voluptate?
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {department_details.department_details[0].department_name}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Department Name
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">500</span>
              <span className="my-0 font-size-sm gainsboro-color">
                Number of Students
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {department_details.department_details[0].HOD}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Head of Department (HOD)
              </span>
            </div>
          </div>
  
          <div className="d-flex align-items-center justify-content-between my-3">
            <button
              className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
              }}
            >
              <Icon icon="ph:phone" />
            </button>
  
            <div
              className="border-bottom py-2 d-flex flex-column"
              style={{ width: "87%" }}
            >
              <span className="my-0">
                {convertToReadableDate(
                  department_details.department_details[0].created_at
                )}
              </span>
              <span className="my-0 font-size-sm gainsboro-color">
                Date of Creation
              </span>
            </div>
          </div>
  
          <div className="my-2 position-relative">
            <div className="postion-absolute d-flex flex-row justify-content-end">
              <button
                className="px-3 w-25 py-2 font-size-sm text-white border-none rounded-3 primary-background"
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default DepartmentDetails;