import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useUpdateSchoolAdminProfile } from "../../hooks/schoolAdmin/useUpdateSchoolAdminProfile";
import { useState } from "react";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateAddress({ handleClose }){
      const [formData, setFormData] = useState({
        address: "",
      });
      const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      };
      const { mutate: update, isPending } = useUpdateSchoolAdminProfile(
        handleClose,
        "address"
      );
      const { formError, errorBannerRef, handleServerError, clearFormError } =
        useFormError("Failed To Update Address");
      const handleUpdate = () => {
        clearFormError();
        update({ updateData: formData }, { onError: handleServerError });
      };
    return(
        <>
              <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update Address</h5>
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
          <span>Address</span>
          <input
            type="address"
            className="form-control"
            placeholder="Enter New Address"
            name="address"
            onChange={(e) => handleInputChange("address", e.target.value)}
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
          {isPending ? <SingleSpinner /> : "Update Address"}
        </button>
      </div>
        </>
    )
}
export default UpdateAddress;