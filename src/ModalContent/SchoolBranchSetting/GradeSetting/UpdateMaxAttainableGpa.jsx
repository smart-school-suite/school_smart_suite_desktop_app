import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUpdateGradeSettings } from "../../../hooks/schoolBranchSetting/useUpdateGradeSetting";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { TextInput } from "../../../components/FormComponents/InputComponents";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../../utils/functions";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";
function UpdateMaxAttainableGpa({ handleClose, rowData }){
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update Max Attainable Gpa");
      const { mutate: updateSetting, isPending } = useUpdateGradeSettings(
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
        <span className="m-0">Update Max Attainable Gpa</span>
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
        <label htmlFor="maxAttainableGpa" className="font-size-sm">
          Max Attainable GPA
        </label>
        <TextInput
          placeholder={rowData.value}
          onChange={(value) => handleStateChange("value", value, setFormData)}
          onValidationChange={(value) =>
            handleStateChange("value", value, setIsValid)
          }
          validationSchema={numberSchema({
            min: 0,
            max: 500000,
            required: false,
            integerOnly: false,
            messages: {
              max: "Max Attainable GPA Must Not Exceed 10.00",
              min: "Max Attainable GPA Must Be Atleast 0.01",
            },
          })}
          value={formData.value}
          step={"0.01"}
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
        {isPending ? <SingleSpinner /> : "Update Max Attainable GPA"}
      </button>
        </>
     )
}
export default UpdateMaxAttainableGpa;