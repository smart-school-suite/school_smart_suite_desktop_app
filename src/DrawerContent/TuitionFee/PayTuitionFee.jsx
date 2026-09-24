import { useRef, useState } from "react";
import { usePayTuitionFee } from "../../hooks/FeePayment/usePayTuitionFee";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useSelector } from "react-redux";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid, formatNumber } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function PayTuitionFee({ handleClose, drawerData }) {
  const { id: feeId, amount_left: amountLeft } = drawerData;
  const amountRef = useRef();
  const methodRef = useRef();
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const { mutate: payTuitionFee, isPending } = usePayTuitionFee(handleClose);
  const [formData, setFormData] = useState({
    tuition_id: feeId,
    payment_method: "",
    amount: "",
  });
  const [isValid, setIsValid] = useState({
    amount: "",
  });
  const [errors, setErrors] = useState({
    payment_method: "",
  });
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
        />,
      );
      return;
    }
    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />,
      );
      return;
    }
    payTuitionFee({
      ...formData,
      payment_method: formData.payment_method.value,
    });
  };
  return (
    <>
      <div className="drawer-content pt-3 px-2">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-column gap-2">
            <label htmlFor="amount" className="font-size-sm">
              Amount{" "}
              <span className="text-iron-400">
                {" "}
                Hint(amount left: {formatNumber(amountLeft)}{" "}
                {userCurrencySymbol})
              </span>
            </label>
            <InputGroup
              onChange={(value) =>
                handleStateChange("amount", value, setFormData)
              }
              value={formData.amount}
              step="0.01"
              validationSchema={numberSchema({
                min: 1,
                max: amountLeft,
                required: true,
                integerOnly: false,
                messages: {
                  required: "Amount is required",
                  min: `Amount must be atleast 1 ${userCurrencySymbol}`,
                  max: `Amount must not exceed ${amountLeft} ${userCurrencySymbol}`,
                },
              })}
              onValidationChange={(value) =>
                handleStateChange("amount", value, setIsValid)
              }
              InputGroupText={userCurrencySymbol}
              placeholder={"Enter Amount Paid"}
              ref={amountRef}
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="paymentMethod" className="font-size-sm">
              Payment Method
            </label>
            <CustomDropdown
              data={paymentMethods}
              valueKey={["value"]}
              displayKey={["label"]}
              direction="down"
              onError={(value) =>
                handleStateChange("payment_method", value, setErrors)
              }
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
              {isPending ? <SingleSpinner /> : "Pay Tuition Fee"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PayTuitionFee;
