import { useBulkPayStudentResit } from "../../hooks/studentResit/useBulkPayResit";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
import { allFieldsValid } from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function BulkPayResitFee({ handleClose, bulkData, resetAll }) {
  const amountRef = useRef();
  const methodRef = useRef();
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
  });
  const [isValid, setIsValid] = useState({
    amount: null,
  });
  const [errors, setErrors] = useState({
    payment_method: null,
  });
  const formattedData = bulkData.map((items) => ({
    resit_id: items.id,
    payment_method: formData.payment_method,
    amount: formData.amount,
  }));
  const { mutate: bulkPayResitFee, isPending } = useBulkPayStudentResit(
    handleClose,
    resetAll
  );
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Bulk Pay Resit Fee");
  const handleBulkPayResitFee = () => {
    clearFormError();
    bulkPayResitFee({ paymentData: formattedData }, { onError: handleServerError });
  };

  const handlePrevalidation = async () => {
    const amount = await amountRef.current.triggerValidation();
    const paymentMethod = await methodRef.current.triggerValidation();
    return {
      amount,
      payment_method: paymentMethod,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
      return;
    }
    if (!allFieldsValid(isValid)) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
      return;
    }
    handleBulkPayResitFee();
  };
  return (
    <>
          <span>
        <div>
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <span>Make Resit Fee Payment</span>
              <span
                className="m-0"
                onClick={() => {
                  handleClose();
                }}
              >
                <Icon icon="charm:cross"  />
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="amount" className="font-size-sm">Amount</label>
            <InputGroup 
               onChange={(value) => handleStateChange("amount", value, setFormData)}
               onValidationChange={(value) => handleStateChange("amount", value, setIsValid)}
              InputGroupText={userCurrencySymbol}
              validationSchema={numberSchema({
                min: 1,
                max: 50000,
                required: true,
                integerOnly: false,
                messages: {
                  required: "Amount is required",
                  min: `Minimum amount is 1 ${userCurrencySymbol}`,
                  max: `Maximum amount is 50000 ${userCurrencySymbol}`,
                },
              })}
              placeholder={'Enter Amount Paid'}
              ref={amountRef}
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="font-size-sm">Payment Method</label>
            <CustomDropdown
              data={paymentMethods}
              valueKey={["value"]}
              displayKey={["label"]}
              direction="down"
              onError={(value) => handleStateChange("payment_method", value, setErrors)}
              onSelect={(value) =>
                handleStateChange("payment_method", value.value, setFormData)
              }
              error={errors.payment_method}
              errorMessage="Payment Method Required"
              placeholder="Select Payment Method"
              ref={methodRef}
            />
          </div>
          <FormErrorBanner
            ref={errorBannerRef}
            error={formError}
            onDismiss={clearFormError}
            className="mt-3 mb-0"
          />
          <div className="mt-3 d-flex gap-2">
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm w-100 primary-background text-white"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Make Payment"}
            </button>
          </div>
        </div>
      </span>
    </>
  );
}
export default BulkPayResitFee;
