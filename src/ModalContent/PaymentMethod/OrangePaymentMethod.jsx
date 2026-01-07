import { PhoneNumberInput } from "../../components/FormComponents/InputComponents";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  phoneValidationSchema,
  promoCodeSchema,
} from "../../ComponentConfig/YupValidationSchema";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { allFieldsValid } from "../../utils/functions";
function OrangePaymentMethod({ selectedMethod, selectedPlan, paymentMethod }) {
    const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const navigate = useNavigate();
  const { handleSubscription, loading } = useAuth();
  const phoneNumberRef = useRef();
  const [formData, setFormData] = useState({
    plan_id: selectedPlan.id,
    payment_method_id: findMethodByKey(paymentMethod, selectedMethod).id,
    phone_number: "",
    promo_code: "",
    country_id: schoolCredentials.country_id.id,
    type: schoolCredentials.type.name.toLowerCase(),
    school_branch_name: schoolCredentials.school_branch_name,
    school_name: schoolCredentials.school_name,
    abbreviation: schoolCredentials.abbreviation,
  });
  const [isValid, setIsValid] = useState({
    phone_number: "",
    promo_code: "",
  });

  const handlePrevalidation = async () => {
    const phoneNumber = await phoneNumberRef.current.triggerValidation();
    return {
      phoneNumber,
    };
  };

  const handleSubscriptionPayment = async () => {
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
    if (
      formData.promo_code == ""
        ? !allFieldsValid({
            ...isValid.phone_number,
          })
        : !allFieldsValid(isValid)
    ) {
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
    await handleSubscription(navigate, formData);
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <span className="font-size-sm text-white">Orange Mobile Money</span>
      <div className="d-flex flex-column gap-2">
        <span className="font-size-sm">Orange Mobile Money Number</span>
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
      <div className="d-flex flex-column gap-2">
        <span className="font-size-sm">
          Promo Code (Enter Promocode to Benefit from out 10% discount)
        </span>
        <TextInput
          placeholder={"Enter Promocode"}
          onChange={(value) =>
            handleStateChange("promo_code", value, setFormData)
          }
          onValidationChange={(value) =>
            handleStateChange("promo_code", value, setIsValid)
          }
          validationSchema={promoCodeSchema({
            min: 1,
            max: 10,
            required: false,
            messages: {
              min: "Promo Code Must Be Atleast 1 Character Long",
              max: "Promo Code Must Not Exceed 10 Characters",
            },
          })}
          value={formData.promo_code}
        />
      </div>
      <div>
        <button
          className="border-none w-100 font-size-sm p-2 rounded-3 primary-background text-white"
          onClick={() => handleSubscriptionPayment()}
        >
          {loading.subscribe ? (
            <>
              <SingleSpinner />
            </>
          ) : (
            <>
              Pay {parseFloat(selectedPlan?.price).toFixed(2)}{" "}
              {selectedPlan?.country?.currency}
            </>
          )}
        </button>
      </div>
    </>
  );
}
export default OrangePaymentMethod;

const findMethodByKey = (data, targetKey) => {
  for (const item of data) {
    const foundMethod = item.methods.find((method) => method.key === targetKey);
    if (foundMethod) {
      return foundMethod;
    }
  }
  return null;
};
