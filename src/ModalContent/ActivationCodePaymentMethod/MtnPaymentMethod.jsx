import { PhoneNumberInput } from "../../components/FormComponents/InputComponents";
import { useRef, useState } from "react";
import { phoneValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { allFieldsValid, formatNumber } from "../../utils/functions";
import { usePurchaseActivationCode } from "../../hooks/activationCode/usePurchaseActivationCode";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function MtnPaymentMethod({
  selectedMethod,
  paymentMethod,
  purchaseCredentials,
  handleValidation,
  currency,
  totalPrice,
}) {
  const phoneNumberRef = useRef();
  const { mutate: purchaseActivationCode, isPending } =
    usePurchaseActivationCode();
  const [formData, setFormData] = useState({
    phone_number: "",
  });
  const [isValid, setIsValid] = useState({
    phone_number: "",
  });

  const handlePrevalidation = async () => {
    const phoneNumber = await phoneNumberRef.current.triggerValidation();
    return {
      phoneNumber,
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
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />
      );
      return;
    }
    handleValidation();
    purchaseActivationCode({
      payment_method_id: findMethodByKey(paymentMethod, selectedMethod).id,
      phone_number: formData.phone_number,
      ...purchaseCredentials,
    });
  };
  return (
    <>
      <span className="font-size-sm gainsboro-color">MTN Mobile Money</span>
      <div className="d-flex flex-column gap-2">
        <span className="font-size-sm">MTN Mobile Money Number</span>
        <PhoneNumberInput
          onChange={(value) =>
            handleStateChange("phone_number", value, setFormData)
          }
          onValidationChange={(value) =>
            handleStateChange("phone_number", value, setIsValid)
          }
          validationSchema={phoneValidationSchema({
            optional: false,
            prefixes: ["6", "2"],
          })}
          value={formData.phone_number}
          ref={phoneNumberRef}
        />
      </div>
      <div>
        <button
          className="border-none w-100 font-size-sm p-2 rounded-3 primary-background text-white"
          onClick={() => handleSubmit()}
        >
          {isPending ? (
            <SingleSpinner />
          ) : (
            <span>
              Pay {formatNumber(totalPrice)} {currency}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
export default MtnPaymentMethod;


const findMethodByKey = (data, targetKey) => {
  for (const item of data) {
    const foundMethod = item.methods.find((method) => method.key === targetKey);
    if (foundMethod) {
      return foundMethod;
    }
  }
  return null;
};