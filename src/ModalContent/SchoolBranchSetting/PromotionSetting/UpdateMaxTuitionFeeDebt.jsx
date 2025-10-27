import { useSelector } from "react-redux";
import { useState } from "react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import ToastWarning from "../../../components/Toast/ToastWarning";
import { useUpdatePromotionSetting } from "../../../hooks/schoolBranchSetting/useUpdatePromotionSetting";
import { numberSchema } from "../../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../../components/Spinners/Spinners";
import { InputGroup } from "../../../components/FormComponents/InputComponents";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../../utils/functions";
function UpdateMaxTuitionFeeDebt({ handleClose, rowData }){
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
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const currency = useSelector(
    (state) => state.auth.user?.schoolDetails?.school?.country?.currency ?? ""
  );
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
        <span className="m-0">Update Max Promotion Tuition Fee Debt</span>
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
        <label htmlFor="tuitionFeeDebt" className="font-size-sm">
          Tuition Fee Debt
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
              max: `Tuition Fees Debt Must Not Exceed 1000 ${currency}`,
              min: `Tuition Fees Debt must be  Atleast 1 ${currency}`,
            },
          })}
          InputGroupText={currency}
          value={formData.value}
        />
      </div>
      <button
        className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
        onClick={() => {
          handleUpdate();
        }}
        disabled={isPending}
      >
        {isPending ? <SingleSpinner /> : "Update Tuition Fee Debt"}
      </button>
        </>
     )
}

export default UpdateMaxTuitionFeeDebt;