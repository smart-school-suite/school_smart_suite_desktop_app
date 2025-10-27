import { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import ToastWarning from "../../../components/Toast/ToastWarning";
import { useUpdateGradeSettings } from "../../../hooks/schoolBranchSetting/useUpdateGradeSetting";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { TextInput } from "../../../components/FormComponents/InputComponents";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../../utils/functions";
function UpdateMaxAttainableGpa({ handleClose, rowData }){
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
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdate = () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing To Update"}
          description={
            "Please Ensure Atleast One Field Is Updated Before Submitting"
          }
        />
      );
      return;
    }
    updateSetting(formData);
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