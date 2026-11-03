import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useUpdateSchoolAdminProfile } from "../../hooks/schoolAdmin/useUpdateSchoolAdminProfile";
import { useState } from "react";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateCulturalBackground({ handleClose }) {
  const [formData, setFormData] = useState({
    cultural_background: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: update, isPending } = useUpdateSchoolAdminProfile(
    handleClose,
    "Cultural Background"
  );
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Update Cultural Background");
  const handleUpdate = () => {
    clearFormError();
    update({ updateData: formData }, { onError: handleServerError });
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update Cultural Background</h5>
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
          <span>Cultural Background</span>
          <input
            type="phone"
            className="form-control"
            placeholder="Enter New Cultural Background"
            name="cultural_background"
            onChange={(e) => handleInputChange("cultural_background", e.target.value)}
          />
        </div>
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update Cultural Background"}
        </button>
      </div>
    </>
  );
}
export default UpdateCulturalBackground;
