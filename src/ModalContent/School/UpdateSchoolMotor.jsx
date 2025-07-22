import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateSchool } from "../../hooks/school/useUpdateSchool";
import { useState } from "react";
function UpdateSchoolMotor({ handleClose }) {
  const [formData, setFormData] = useState({
    motor: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateMotor, isPending } = useUpdateSchool(
    handleClose,
    "motor"
  );
  const handleUpdateMotor = () => {
    updateMotor({ updateData:formData });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update School Motor</h5>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <span className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
            nesciunt sunt
          </span>
        </div>
        <div className="my-1">
          <span>School Motor</span>
          <textarea
            placeholder="Enter School Motor"
            name="motor"
            className="form-control"
            onChange={(e) => handleInputChange("motor", e.target.value)}
          ></textarea>
          </div>
          <button
            className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleUpdateMotor();
            }}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Update School Motor"}
          </button>    
      </div>
    </>
  );
}
export default UpdateSchoolMotor;
