import { Icon } from "@iconify/react";
import Pageloaderspinner, {
  SingleSpinner,
} from "../../components/Spinners/Spinners";
import { useState } from "react";
import { useUpdateDepartment } from "../../hooks/department/useUpdateDepartment";
import { useGetDepartmentDetails } from "../../hooks/department/useGetDepartmentDetails";
function UpdateDepartment({ handleClose, rowData }) {
  const { mutate: updateDepartment, isPending } =
    useUpdateDepartment(handleClose);
  const departmentId = rowData.id;
  const { data: departmentDetails, isFetching } = useGetDepartmentDetails(
    departmentId
  );
  const [formData, setFormData] = useState({
    department_name: "",
    description: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleDepartmentUpdate = async () => {

    updateDepartment({departmentId, formData});
    console.table(formData);
  };
  if (isFetching) {
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
            {isPending ? <SingleSpinner /> : <> Update Department</>}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateDepartment;
