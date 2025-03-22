import { useState } from "react";
import { useFetchDepartmentsQuery } from "../../Slices/Asynslices/fetchSlice";
import { useAssignHodMutation } from "../../Slices/Asynslices/postSlice";
import Pageloaderspinner from "../../components/Spinners";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";

function AppointHod({ handleClose, row_id: teacherId }) {
  const { data: department, isLoading, error } = useFetchDepartmentsQuery();
  const [formData, setFormData] = useState({
    department_id: "",
    hodable_id: teacherId
  });
  const [assignHod] = useAssignHodMutation();

  const handleAppointHod = async () => {
    try {
      await assignHod(formData).unwrap();
      toast.success("HOD Assigned Successfully");
      handleClose();
    } catch (e) {
      toast.error("Something went wrong trying to appoint HOD");
    }
  };

  const handleDepartmentSelect = (departmentId) => {
    setFormData({
      ...formData,
      department_id: departmentId,
    });
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Appoint Head of Department (HOD)</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <span className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum
          sint reprehenderit tempora. Aliquid
        </span>
        <div
          style={{
            maxHeight: "55dvh",
            height: "auto",
            overflowY: "scroll",
            scrollBehavior: "smooth",
            paddingTop: "0.75rem",
          }}
        >
          {department.data.map((item) => {
            return (
              <div key={item.id} className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 mb-2 px-1">
                <div className="block">
                    <p className="m-0 fw-semibold">{item.department_name} </p>
                  <div className="d-block">
                  {
                     item.hod_name ? <span
                     className=" rounded-1 font-size-sm "
                     style={{
                       background: "#e3f5e3",
                       color: "#2d6830",
                       width: "auto",
                       maxWidth: "10rem",
                       padding: "0.2rem",
                     }}
                   >
                     <span>Department Assigned</span>
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
                     <span>Department UnAssigned</span>
                   </span> 
                   }
                    {
                      item.hod_name ? <p className="m-0 fw-light">Department Assigned to: <span className="fw-semibold">{item.hod_name}</span> </p> : null
                    }
                  </div>
                  <span className="font-size-sm fw-light gainsboro-color">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sint
                    reprehenderit tempora. Aliquid
                  </span>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox" 
                    name="department" 
                    id={`department-${item.id}`} 
                    value={item.id}
                    checked={formData.department_id === item.id}
                    onChange={() => handleDepartmentSelect(item.id)} 
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <button
            className="border-none rounded-3 p-2 font-size-sm w-100 primary-background text-white"
            onClick={handleAppointHod}
            disabled={!formData.department_id} 
          >
            Appoint HOD
          </button>
        </div>
      </div>
    </>
  );
}

export default AppointHod;