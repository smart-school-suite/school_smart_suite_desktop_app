import { useBulkUpdateAdditionalFees } from "../../hooks/additionalFee/useBulkUpdateStudentAdditionalFee";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetAdditionalFeeCategory } from "../../hooks/additionalFee/useGetAdditionalFeeCategories";
import {
  InputGroup,
  TextAreaInput,
} from "../../components/FormComponents/InputComponents";
import {
  numberSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function BulkUpdateAdditionalFee({ handleClose, resetAll, bulkData }) {
  const currencyState = useSelector((state) => state.auth.user);
  const currency =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    additionalfee_category_id: "",
  });
  const [isValid, setIsValid] = useState({
    title: "",
    reason: "",
  });
  const [errors, setErrors] = useState({
    additionalfee_category_id: "",
  });
  const { data: category, isFetching } = useGetAdditionalFeeCategory();
  const { mutate: updateAdditionalFee, isPending } =
    useBulkUpdateAdditionalFees(handleClose, resetAll);
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
    const formattedData = bulkData.map((items) => ({
      fee_id: items.id,
      amount: formData.amount,
      reason: formData.reason,
      additionalfee_category_id: formData.additionalfee_category_id,
    }));
    updateAdditionalFee({ additional_fee: formattedData });
  };
  return (
    <>
      <div className="w-100 border-none">
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Update Additional Fee</span>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="amount" className="font-size-sm">
              Amount
            </label>
            <InputGroup
              placeholder="Enter Amount"
              validationSchema={numberSchema({
                min: 1,
                max: 1000000,
                integerOnly: false,
                required: false,
                messages: {
                  min: `Amount Must Be Atleast 1 ${currency}`,
                  max: `Amount Must Not Exceed 1000000 ${currency} `,
                },
              })}
              onChange={(value) =>
                handleStateChange("amount", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("amount", value, setIsValid)
              }
              InputGroupText={currency}
            />
          </div>
          <div className="my-1">
            <label htmlFor="category" className="font-size-sm">
              Additional Fee Category
            </label>
            <CustomDropdown
              data={category?.data ? category?.data : []}
              displayKey={["title"]}
              valueKey={["id"]}
              isLoading={isFetching}
              direction="up"
              onSelect={(value) =>
                handleStateChange(
                  "additionalfee_category_id",
                  value,
                  setFormData
                )
              }
              errorMessage="Category Required"
              error={errors.additionalfee_category_id}
              onError={(value) =>
                handleFieldError("additionalfee_category_id", value, setErrors)
              }
              optional={true}
              placeholder="Select Additional Fee Category"
            />
          </div>
          <div>
            <label htmlFor="reason" className="font-size-sm">
              Reason
            </label>
            <TextAreaInput
              onChange={(value) => handleStateChange("reason", value)}
              onValidationChange={(value) => handleStateChange("reason", value)}
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: false,
                messages: {
                  min: "Reason Must Be Atleast 10 Characters Long",
                  max: "Reason Must Not Exceed 1000 Characters",
                },
              })}
              value={formData.reason}
              placeholder={"Enter Reason For the bill"}
            />
          </div>
        </div>
        <div className="w-100 mt-2">
          <button
            className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleUpdate();
            }}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Update Additional Fee"}
          </button>
        </div>
      </div>
    </>
  );
}
export default BulkUpdateAdditionalFee;
