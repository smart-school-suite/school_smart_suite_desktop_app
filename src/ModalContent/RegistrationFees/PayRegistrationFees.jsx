import { useRef, useState } from "react";
import { usePayRegistrationFee } from "../../hooks/feePayment/usePayRegistrationFee";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { useSelector } from "react-redux";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function PayRegistrationFees({ handleClose, rowData }) {
  const amountRef = useRef();
  const methodRef = useRef();
  const { id: registrationFeeId, amount } = rowData;
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
    registration_fee_id: registrationFeeId,
  });
  const [errors, setErrors] = useState({
    payment_method: "",
  });
  const [isValid, setValid] = useState({
    amount: "",
  });
  const { mutate: handlePayment, isPending } =
    usePayRegistrationFee(handleClose);
  const handlePrevalidation = async () => {
    const amount = await amountRef.current.triggerValidation();
    const paymentMethod = await methodRef.current.triggerValidation();
    return {
      amount,
      payment_method: paymentMethod,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    handlePayment({...formData, payment_method:formData.payment_method.value});
  };
  return (
    <>
      <span>
        <div>
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <span className="m-0">Make Registration Fee Payment</span>
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
            <label htmlFor="amount" className="font-size-sm">
              Amount
            </label>
            <InputGroup
              onChange={(value) => handleStateChange("amount", value, setFormData)}
              InputGroupText={userCurrencySymbol}
              onValidationChange={(value) => handleStateChange("amount", value, setValid)}
              validationSchema={numberSchema({
                min: amount,
                max: amount,
                required: true,
                integerOnly: false,
                messages: {
                  required: "Amount is required",
                  min: `Minimum amount is ${amount} ${userCurrencySymbol}`,
                  max: `Maximum amount is ${amount} ${userCurrencySymbol}`,
                },
              })}
              placeholder={"Enter Amount Paid"}
              ref={amountRef}
            />
          </div>
          <div>
            <label htmlFor="paymentMethod" className="font-size-sm">
              Payment Method
            </label>
            <CustomDropdown
              data={paymentMethods}
              valueKey={["value"]}
              displayKey={["label"]}
              direction="down"
              onError={(value) => handleStateChange("payment_method", value, setErrors)}
              onSelect={(value) =>
                handleStateChange("payment_method", value, setFormData)
              }
              error={errors.payment_method}
              errorMessage="Payment Method Required"
              placeholder="Select Payment Method"
              ref={methodRef}
              value={formData.payment_method}
            />
          </div>
          <div className="mt-3 d-flex gap-2">
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white w-100"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isPending ? <SingleSpinner /> : "Make Payment"}
            </button>
          </div>
        </div>
      </span>
    </>
  );
}
export default PayRegistrationFees;
