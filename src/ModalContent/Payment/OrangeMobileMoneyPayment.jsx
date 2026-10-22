import { CircleX } from "lucide-react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  phoneValidationSchema,
  promoCodeSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  PhoneNumberInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useAuth } from "../../context/authContext";
import { allFieldsValid, formatNumber } from "../../utils/functions";

function OrangeMobileMoneyPayment({ handleClose, rowData }) {
  const { method, handleCloseDrawer, plan } = rowData;
  const dispatch = useDispatch();
  const schoolCredentials = useSelector((state) => state?.auth?.signUpForm || {});
  const navigate = useNavigate();
  const { handleSubscription, loading = {}, authError = {} } = useAuth() || {};
  const phoneNumberRef = useRef();

  const [clientError, setClientError] = useState(null);

  const [formData, setFormData] = useState({
    plan_id: plan?.id,
    payment_method_id: method?.id,
    phone_number: "",
    promo_code: "",
    country_id: schoolCredentials?.countryId?.id || schoolCredentials?.countryId,
    type: schoolCredentials?.type?.name
      ? schoolCredentials.type.name.toLowerCase()
      : schoolCredentials?.type,
    school_branch_name: schoolCredentials?.school_branch_name || schoolCredentials?.schoolBranchName,
    school_name: schoolCredentials?.school_name || schoolCredentials?.schoolName,
    abbreviation: schoolCredentials?.abbreviation,
    admin_full_name: schoolCredentials?.adminFullName || schoolCredentials?.name,
    admin_last_name: schoolCredentials?.adminLastName || schoolCredentials?.last_name,
    admin_first_name: schoolCredentials?.adminFirstName || schoolCredentials?.first_name,
    admin_email: schoolCredentials?.adminEmail || schoolCredentials?.email,
    admin_password: schoolCredentials?.adminPassword || schoolCredentials?.password,
  });

  const [isValid, setIsValid] = useState({
    phone_number: "",
    promo_code: "",
  });

  const handlePrevalidation = async () => {
    const phoneNumber = await phoneNumberRef.current?.triggerValidation();
    return {
      phoneNumber,
    };
  };

  const handleSubscriptionPayment = async () => {
    setClientError(null);
    const prevalidation = await handlePrevalidation();

    if (!allFieldsValid(prevalidation)) {
      setClientError(
        "Some fields seem to be invalid. Please check the form and try again."
      );
      return;
    }

    if (
      formData.promo_code === ""
        ? !allFieldsValid({
            ...isValid.phone_number,
          })
        : !allFieldsValid(isValid)
    ) {
      setClientError(
        "Some fields seem to be invalid. Please check the form and try again."
      );
      return;
    }

    if (typeof handleSubscription === "function") {
      try {
        await handleSubscription(
          navigate,
          formData,
          handleCloseDrawer,
          handleClose,
          dispatch
        );
      } catch (err) {
        setClientError("An unexpected error occurred during subscription processing.");
      }
    }
  };

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
    if (clientError !== null) {
      setClientError(null);
    }
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
            Complete Your {plan?.country?.currency}{" "}
            {formatNumber(parseFloat(plan?.price || 0))} Payment
          </span>
        </div>

        {(clientError || authError?.subscription) && (
          <div className="bg-red-100 p-2 rounded-3 text-red-700 my-1">
            <p className="m-0">{clientError || authError?.subscription}</p>
          </div>
        )}

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
            <span className="fw-light text-iron-400">
              Enter Promocode to Benefit from our 10% discount
            </span>
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
                min: "Promo Code Must Be At least 1 Character Long",
                max: "Promo Code Must Not Exceed 10 Characters",
              },
            })}
            value={formData.promo_code}
          />
        </div>

        <p className="text-iron-400 fw-light m-0">
          We'll send a payment request to this number
        </p>

        <button
          className="border-none w-100 font-size-sm p-2 rounded-3 primary-background text-white mt-2"
          onClick={handleSubscriptionPayment}
          disabled={Boolean(loading?.subscribe)}
        >
          {loading?.subscribe ? (
            <SingleSpinner />
          ) : (
            <>
              Pay {formatNumber(parseFloat(plan?.price || 0).toFixed(2))}{" "}
              {plan?.country?.currency}
            </>
          )}
        </button>
      </div>
    </>
  );
}

export default OrangeMobileMoneyPayment;