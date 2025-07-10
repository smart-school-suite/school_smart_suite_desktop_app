import { useFetchDepartmentDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { useUpdateDepartmentMutation } from "../../Slices/Asynslices/updateSlice";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
function UpdateDepartment({ handleClose, row_id: departmentId }) {
  const {
    data: departmentDetails,
    isLoading,
    error,
  } = useFetchDepartmentDetailsQuery({
    department_id: departmentId,
  });
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    department_name: "",
    description: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleDepartmentUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateDepartment({
        department_id: departmentId,
        updatedData: formData,
      }).unwrap();
      setIsUpdating(false);
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Update Successfull ✅"}
          description={"The department has been updated successfully "}
        />
      );
    } catch (e) {
      toast.custom(
        <ToastDanger
          title={"Something went wrong ❌"}
          description={
            "Something went wrong! The department update failed due to an error. Please try again later"
          }
        />
      );
      setIsUpdating(false);
    }
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Update Department</h5>
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
        <div className="my-2">
          <p className="my-0">Department Name</p>
          <input
            type="text"
            className="form-control"
            placeholder={departmentDetails.data.department_name}
            name="department_name"
            value={formData.department_name}
            onChange={(e) =>
              handleInputChange("department_name", e.target.value)
            }
          />
        </div>
        <div class="my-2">
          <label for="exampleFormControlTextarea1" className="form-label">
            Department Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            name="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            placeholder={departmentDetails.data.description}
          ></textarea>
        </div>
      </div>
      <div className="w-100  position-relative mt-2 py-2">
        <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
          <button
            className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm"
            onClick={handleDepartmentUpdate}
          >
            {isUpdating ? <SingleSpinner /> : <> Update Department</>}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateDepartment;
