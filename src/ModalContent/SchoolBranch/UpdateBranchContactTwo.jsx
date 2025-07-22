import { useUpdateSchoolBranch } from "../../hooks/schoolBranch/useUpdateSchoolBranch";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
function UpdateSchoolBranchContactTwo({ handleClose }) {
  const [formData, setFormData] = useState({
    phone_two: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolBranch(
    handleClose,
    "Contact Two"
  );
  const handleUpdateSchool = () => {
    update({ updateData: formData });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update Contact</h5>
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
          <span>Contact Two</span>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Phone Number"
            name="phone_two"
            onChange={(e) => handleInputChange("phone_two", e.target.value)}
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdateSchool();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update Contact"}
        </button>
      </div>
    </>
  );
}
export default UpdateSchoolBranchContactTwo;
