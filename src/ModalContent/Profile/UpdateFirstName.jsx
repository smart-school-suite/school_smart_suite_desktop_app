import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useUpdateSchoolAdminProfile } from "../../hooks/schoolAdmin/useUpdateSchoolAdminProfile";
import { useState } from "react";
function UpdateFirstName({ handleClose }){
  const [formData, setFormData] = useState({
    first_name: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolAdminProfile(
    handleClose,
    "first_name"
  );
  const handleUpdate = () => {
    update({ updateData: formData });
  };
    return(
        <>
              <div>
                <div className="block">
                  <div className="d-flex flex-row align-items-center justify-content-between mb-3">
                    <h5 className="m-0">Update First Name</h5>
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
                  <span>first_name</span>
                  <input
                    type="first_name"
                    className="form-control"
                    placeholder="Enter New First Name"
                    name="first_name"
                    onChange={(e) => handleInputChange("first_name", e.target.value)}
                  />
                </div>
                <button
                  className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
                  onClick={() => {
                    handleUpdate();
                  }}
                  disabled={isPending}
                >
                  {isPending ? <SingleSpinner /> : "Update First Name"}
                </button>
              </div>
        </>
    )
}
export default UpdateFirstName;