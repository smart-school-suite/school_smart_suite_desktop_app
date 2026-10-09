import { useState, useRef } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { usePayAdditionalFee } from "../../hooks/additionalFee/usePayAdditionalFee";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function PayAdditionalFee({ handleClose, drawerData }) {
  const amountRef = useRef();
  const methodRef = useRef();
  const { id: additionalFeeId, amount } = drawerData;
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
    fee_id: additionalFeeId,
  });
  const [errors, setErrors] = useState({
    payment_method: "",
  });
  const [isValid, setIsValid] = useState({
    amount: "",
  });
  const { mutate: payAdditionalFee, isPending } = usePayAdditionalFee(
    handleClose,
    additionalFeeId,
  );
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
    payAdditionalFee({
      ...formData,
      payment_method: formData.payment_method.value,
    });
  };
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        <div className="d-flex flex-column gap-3">
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
              InputGroupText={userCurrencySymbol}
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
              {isPending ? <SingleSpinner /> : "Pay Additional Fee"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default PayAdditionalFee;
