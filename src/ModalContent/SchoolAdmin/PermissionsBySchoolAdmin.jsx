import Pageloaderspinner from "../../components/Spinners";
import { useFetchPermissionsBySchoolAdminQuery } from "../../Slices/Asynslices/fetchSlice";
const PermissionsBySchoolAdmin = ({ row_id: schoolAdminId, handleClose }) => {
    const {
      data: data,
      isLoading,
      error,
    } = useFetchPermissionsBySchoolAdminQuery({ schoolAdminId: schoolAdminId });
    if (isLoading) {
      return <Pageloaderspinner />;
    }
    return (
      <>
        <div className="my-1">
          <h5>My Permissions</h5>
        </div>
        <div
          style={{
            maxHeight: "50dvh",
            height: "auto",
            overflowY: "scroll",
            scrollBehavior: "smooth",
          }}
        >
          {data.data.map((permission, index) => (
            <div className="d-flex flex-row align-items-center gap-4" key={index}>
              <div className="w-100 border-bottom">
                <div className="d-block">
                  <p className="my-0">{permission}</p>
                  <span className="font-size-sm gainsboro-color">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Aperiam, iure facilis. Officiis placea
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 d-flex justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 text-primary w-100 rounded-3 font-size-sm"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </>
    );
  };
  export default PermissionsBySchoolAdmin;