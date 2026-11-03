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
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function BulkUpdateAdditionalFee({ drawerData, handleClose }) {
  const { selectedAdditionalFee, resetAll } = drawerData;
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
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Bulk Update Additional Fee");
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
    const formattedData = selectedAdditionalFee?.map((items) => ({
      fee_id: items.id,
      amount: formData.amount,
      reason: formData.reason,
      additionalfee_category_id: formData.additionalfee_category_id,
    }));
    clearFormError();
    updateAdditionalFee({ additional_fee: formattedData }, { onError: handleServerError });
  };
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="d-flex flex-column gap-2">
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
                  setFormData,
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
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => handleUpdate()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Update Additional Fee"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BulkUpdateAdditionalFee;
