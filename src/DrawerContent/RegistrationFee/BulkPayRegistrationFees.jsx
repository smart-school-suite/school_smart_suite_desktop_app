import { useRef, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { InputGroup } from "../../components/FormComponents/InputComponents";
import { useSelector } from "react-redux";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { paymentMethods } from "../../data/data";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useBulkPayRegistrationFees } from "../../hooks/registrationFee/useBulkPayRegistrationFee";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function BulkPayRegistrationFees({ handleClose, resetAll, bulkData }) {
  const amountRef = useRef();
  const methodRef = useRef();
  const currencyState = useSelector((state) => state.auth.user);
  const { mutate: payRegistrationFee, isPending } = useBulkPayRegistrationFees(
    handleClose,
    resetAll,
  );
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const [formData, setFormData] = useState({
    amount: "",
    payment_method: "",
  });
  const [errors, setErrors] = useState({
    payment_method: "",
  });
  const [isValid, setValid] = useState({
    amount: "",
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
    const formattedData = bulkData.map((items) => ({
      registration_fee_id: items.id,
      amount: formData.amount,
      payment_method: formData.payment_method,
    }));
    payRegistrationFee({ registration_fee: formattedData });
  };
  return (
    <>
      <div className="drawer-content px-2 pt-3">
        <div className="d-flex flex-column gap-2">
          <div>
            <label htmlFor="amount" className="font-size-sm">
              Amount
            </label>
            <InputGroup
              onChange={(value) =>
                handleStateChange("amount", value, setFormData)
              }
              InputGroupText={userCurrencySymbol}
              onValidationChange={(value) =>
                handleStateChange("amount", value, setValid)
              }
              validationSchema={numberSchema({
                min: 1,
                max: 500000,
                required: true,
                integerOnly: false,
                messages: {
                  required: "Amount is required",
                  min: `Minimum amount is 1 ${userCurrencySymbol}`,
                  max: `Maximum amount is 500000 ${userCurrencySymbol}`,
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
              onError={(value) =>
                handleStateChange("payment_method", value, setErrors)
              }
              onSelect={(value) =>
                handleStateChange("payment_method", value.value, setFormData)
              }
              error={errors.payment_method}
              errorMessage="Payment Method Required"
              placeholder="Select Payment Method"
              ref={methodRef}
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
              {isPending ? <SingleSpinner /> : "Pay Registration Fee"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BulkPayRegistrationFees;
