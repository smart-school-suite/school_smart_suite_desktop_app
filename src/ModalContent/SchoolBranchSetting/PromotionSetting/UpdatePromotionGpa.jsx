import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdatePromotionSetting } from "../../../hooks/schoolBranchSetting/useUpdatePromotionSetting";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { TextInput } from "../../../components/FormComponents/InputComponents";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../../utils/functions";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";
function UpdatePromotionGpa({handleClose, rowData }){
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Promotion Gpa");
     const { mutate: updateSetting, isPending } = useUpdatePromotionSetting(
    handleClose,
    rowData.id
  );
  const [formData, setFormData] = useState({
    school_branch_setting_id: rowData.id,
    value: "",
  });
  const [isValid, setIsValid] = useState({
    value: null,
  });
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdate = () => {
    if (optionalValidateObject(isValid) == false) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      setClientError("Nothing To Update", "Please Ensure Atleast One Field Is Updated Before Submitting");
      return;
    }
    clearFormError();
    updateSetting(formData, { onError: handleServerError });
  };
     return (
        <>
              <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
        <span className="m-0">Update Max Carry Over</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="w-100">
        <label htmlFor="maxCarryOvers" className="font-size-sm">
          Max Carry Over
        </label>
        <TextInput
          placeholder={rowData.value}
          onChange={(value) => handleStateChange("value", value, setFormData)}
          onValidationChange={(value) =>
            handleStateChange("value", value, setIsValid)
          }
          validationSchema={numberSchema({
            min: 0.01,
            max: 10.00,
            required: false,
            integerOnly: false,
            messages: {
              max: "Promotion GPA Must Not Exceed 10.00",
              min: "Promotion GPA Must Not Be Less Than 0.00",
            },
          })}
          step="0.01"
          value={formData.value}
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
        {isPending ? <SingleSpinner /> : "Update Promotion GPA"}
      </button>
        </>
     )
}
export default UpdatePromotionGpa;