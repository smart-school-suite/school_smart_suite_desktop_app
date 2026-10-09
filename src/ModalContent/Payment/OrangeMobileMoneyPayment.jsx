import { CircleX } from "lucide-react";
import { useSelector } from "react-redux";
import {
  phoneValidationSchema,
  promoCodeSchema,
} from "../../ComponentConfig/YupValidationSchema";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { allFieldsValid, formatNumber } from "../../utils/functions";
import { useState, useRef } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { PhoneNumberInput } from "../../components/FormComponents/InputComponents";
import { TextInput } from "../../components/FormComponents/InputComponents";
function OrangeMobileMoneyPayment({ handleClose, rowData }) {
  const { method, handleCloseDrawer, plan } = rowData;
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const navigate = useNavigate();
  const { handleSubscription, loading } = useAuth();
  const phoneNumberRef = useRef();
  const [formData, setFormData] = useState({
    plan_id: plan?.id,
    payment_method_id: method?.id,
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
        />,
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
        />,
      );
      return;
    }
    await handleSubscription(navigate, formData, handleCloseDrawer, handleClose);
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  return (
    <>
      <div
        className="border-bottom rounded-top-4 p-2 d-flex flex-column justify-content-center"
        style={{ height: "6dvh", background: "#f9f9f9" }}
      >
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div>
            <span className="font-size-sm fw-semibold">{method?.name}</span>
          </div>
          <button
            onClick={() => handleClose()}
            className="border-none border rounded-circle bg-transparent p-0"
            style={{
              width: "2rem",
              height: "2rem",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <CircleX size={16} />
          </button>
        </div>
      </div>
      <div className="px-2 font-size-sm d-flex flex-column gap-2 p-2">
        <div className="d-flex flex-column">
          <span className="fw-light">
            Complete Your {plan?.country?.currency} {formatNumber(parseFloat(plan?.price))}{" "}
            Payment
          </span>
        </div>
        <div className="d-flex flex-column gap-1">
          <span className="fw-semibold">{method?.name} Number</span>
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
        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-row align-items-center gap-2">
            <span className="fw-semibold">Promo Code</span>
            <span className="fw-light text-iron-400">Enter Promocode to Benefit from out 10% discount</span>
          </div>
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
        <p className="text-iron-400 fw-light">
          We'll send a payment request to this number
        </p>
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
              Pay {formatNumber(parseFloat(plan?.price).toFixed(2))} {plan?.country?.currency}
            </>
          )}
        </button>
      </div>
    </>
  );
}
export default OrangeMobileMoneyPayment;
