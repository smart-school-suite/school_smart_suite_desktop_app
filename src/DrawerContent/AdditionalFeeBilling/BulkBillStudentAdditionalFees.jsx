import { useRef, useState } from "react";
import { useGetAdditionalFeeCategory } from "../../hooks/additionalFee/useGetAdditionalFeeCategories";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  InputGroup,
  TextAreaInput,
  DateInput,
} from "../../components/FormComponents/InputComponents";
import {
  numberSchema,
  textareaSchema,
  dateValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import { useSelector } from "react-redux";
import { useBulkBillStudentAdditionalFee } from "../../hooks/additionalFee/useBulkBillStudentAdditionalFee";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function BulkBillStudentAdditionalFee({ handleClose, drawerData }) {
  const { selectedStudents, resetAll } = drawerData;
  const amountRef = useRef();
  const reasonRef = useRef();
  const dateRef = useRef();
  const categoryRef = useRef();
  const currencyState = useSelector((state) => state.auth.user);
  const currency =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const { mutate: createAdditionalFee, isPending } =
    useBulkBillStudentAdditionalFee(handleClose, resetAll);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Bulk Bill Student Additional Fee");
  const { data: category, isFetching } = useGetAdditionalFeeCategory();
  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
    date: "",
    additionalfee_category_id: "",
  });
  const [isValid, setIsValid] = useState({
    amount: null,
    reason: null,
    date: null,
  });
  const [errors, setErrors] = useState({
    additionalfee_category_id: "",
  });
  const handlePrevalidation = async () => {
    const amount = await amountRef.current.triggerValidation();
    const reason = await reasonRef.current.triggerValidation();
    const category = await categoryRef.current.triggerValidation();
    const date = await dateRef.current.triggerValidation();
    return {
      amount,
      reason,
      category,
      date,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    const prevalidation = handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");

      return;
    }
    if (!allFieldsValid(isValid)) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");

      return;
    }
    const formattedData = selectedStudents?.map((items) => ({
      student_id: items.id,
      reason: formData.reason,
      due: formData.date,
      additionalfee_category_id: formData.additionalfee_category_id?.id,
      amount: formData.amount,
    }));
    clearFormError();
    createAdditionalFee({ fee_details: formattedData }, { onError: handleServerError });
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
        <div className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="date" className="font-size-sm">
              Due Date
            </label>
            <DateInput
              validationSchema={dateValidationSchema({
                required: true,
                futureOrToday: true,
              })}
              onChange={(value) =>
                handleStateChange("date", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("date", value, setIsValid)
              }
              ref={dateRef}
              value={formData.date}
            />
          </div>
          <div>
            <label htmlFor="amount" className="font-size-sm">
              Amount
            </label>
            <InputGroup
              onChange={(value) =>
                handleStateChange("amount", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("amount", value, setIsValid)
              }
              value={formData.amount}
              step="0.01"
              type="number"
              validationSchema={numberSchema({
                min: 1,
                max: 1000000,
                required: true,
                messages: {
                  min: "Amount Must Be Greater Than 1",
                  max: "Amount Must Not Exceed 1000000",
                },
              })}
              InputGroupText={currency}
              placeholder="Enter Amount"
              ref={amountRef}
            />
          </div>
          <div>
            <label htmlFor="category" className="font-size-sm">
              Category
            </label>
            <CustomDropdown
              data={category?.data ? category.data : []}
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
              onError={(value) =>
                handleStateChange("additionalfee_category_id", value, setErrors)
              }
              error={errors.additionalfee_category_id}
              errorMessage="Additional Fee Category Required"
              placeholder="Select Additional Fee Category"
              ref={categoryRef}
              value={formData.additionalfee_category_id}
            />
          </div>
          <div>
            <label htmlFor="reason" className="font-size-sm">
              Reason
            </label>
            <TextAreaInput
              placeholder={
                formData.amount
                  ? `Enter Reason For Billing Student Additional Fee of ${formData.amount}`
                  : "Write a short reason for the billing"
              }
              onChange={(value) =>
                handleStateChange("reason", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("reason", value, setIsValid)
              }
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: true,
                messages: {
                  required: "Reason Required",
                  min: "Reason Length Must Be Atleast 10 Characters Long",
                  max: "Reason Must Not Exceed 1000 Characters",
                },
              })}
              ref={reasonRef}
              value={formData.reason}
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
              onClick={() => handleSubmit()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Bill Student"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BulkBillStudentAdditionalFee;
