import { useCreateStudentAdditionalFee } from "../../hooks/additionalFee/useCreateStudentAdditionalFee";
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
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
import { useDefaultDueDate } from "../../hooks/additionalFee/useDefaultDueDate";
import { formatScheduleDate } from "../../utils/feeSchedule/scheduleRules";
function BillStudentAdditionalFees({ handleClose, drawerData }) {
  const { id: studentId } = drawerData;
  const amountRef = useRef();
  const dateRef = useRef();
  const reasonRef = useRef();
  const categoryRef = useRef();
  const currencyState = useSelector((state) => state.auth.user);
  const currency =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const { mutate: createAdditionalFee, isPending } =
    useCreateStudentAdditionalFee(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Bill Student Additional Fees");
  const { data: category, isFetching } = useGetAdditionalFeeCategory();
  const defaultDue = useDefaultDueDate();
  const [formData, setFormData] = useState({
    amount: "",
    reason: "",
    date: "",
    additionalfee_category_id: "",
    student_id: studentId,
  });
  const [isValid, setIsValid] = useState({
    amount: null,
    reason: null,
    // Optional: an empty due date is valid.
    date: true,
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
    console.log(isValid);
    if (!allFieldsValid(isValid)) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");

      return;
    }
    clearFormError();
    createAdditionalFee({
      ...formData,
      additionalfee_category_id: formData.additionalfee_category_id.id,
      // Left blank: the API uses today plus the default due period setting.
      due_date: formData.date || undefined,
    }, { onError: handleServerError });
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
              Due Date <span className="text-iron-400">(optional)</span>
            </label>
            <DateInput
              validationSchema={dateValidationSchema({
                required: false,
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
            {!formData.date && defaultDue.date && (
              <span className="font-size-xs text-iron-500">
                Leave blank to make it due on {formatScheduleDate(defaultDue.date)}, {defaultDue.days} {defaultDue.days === 1 ? "day" : "days"} from today (the default due period in Settings).
              </span>
            )}
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
export default BillStudentAdditionalFees;
