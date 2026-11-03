import { useSelector } from "react-redux";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { useUpdateResitSetting } from "../../../hooks/schoolBranchSetting/useUpdateResitSetting";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { InputGroup } from "../../../components/FormComponents/InputComponents";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../../utils/functions";
import FormErrorBanner from "../../../components/errors/FormErrorBanner";
import { useFormError } from "../../../hooks/form/useFormError";
function UpdateGeneralResitFee({ handleClose, rowData }) {
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update General Resit Fee");
  const { mutate: updateSetting, isPending } = useUpdateResitSetting(
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
  const currency = useSelector(
    (state) => state.auth.user?.schoolDetails?.school?.country?.currency ?? ""
  );
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
        <span className="m-0">Update General Resit Fee</span>
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
        <label htmlFor="resitFeeRef" className="font-size-sm">
          Resit Fees
        </label>
        <InputGroup
          placeholder={rowData.value}
          onChange={(value) => handleStateChange("value", value, setFormData)}
          onValidationChange={(value) =>
            handleStateChange("value", value, setIsValid)
          }
          step="0.01"
          validationSchema={numberSchema({
            min: 1,
            max: 500000,
            required: false,
            messages: {
              max: `Resit Fees Must Not Exceed 100000 ${currency}`,
              min: `Resit Fees Must Be Atleast 1 ${currency}`,
            },
          })}
          InputGroupText={currency}
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
        {isPending ? <SingleSpinner /> : "Update Resit Fee"}
      </button>
    </>
  );
}
export default UpdateGeneralResitFee;
