import { useState, useRef } from "react";
import { CircleX } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { phoneValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import ToastWarning from "../../components/Toast/ToastWarning";
import { allFieldsValid, formatNumber } from "../../utils/functions";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { PhoneNumberInput } from "../../components/FormComponents/InputComponents";
import { usePurchaseActivationCode } from "../../hooks/activationCode/usePurchaseActivationCode";
function OrangeMobileMoneyPayment({ handleClose, rowData }) {
  const { method = {}, handleCloseDrawer } = rowData || {};
  const moduleState = useSelector(
    (state) => state?.activationCode?.purchaseCode,
  );

  const { mutate: purchaseCode, isPending } = usePurchaseActivationCode(
    handleClose,
    handleCloseDrawer,
  );

  const phoneNumberRef = useRef(null);

  const [formData, setFormData] = useState({
    payment_method_id: method?.id || "",
    phone_number: "",
  });

  const [isValid, setIsValid] = useState({
    phone_number: "",
  });

  const safeGrandTotal = (() => {
    const rawVal = moduleState?.summary?.grandTotal;
    const parsed = parseFloat(rawVal);
    return isNaN(parsed) ? 0 : parsed;
  })();

  const handlePrevalidation = async () => {
    try {
      if (phoneNumberRef.current?.triggerValidation) {
        const phoneNumber = await phoneNumberRef.current.triggerValidation();
        return { phoneNumber };
      }
      return { phoneNumber: false };
    } catch (err) {
      return { phoneNumber: false };
    }
  };

  const handlePayment = async () => {
    const prevalidation = await handlePrevalidation();

    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title="Invalid Fields"
          description="Some fields seem to be invalid. Please go through the form and try again."
        />,
      );
      return;
    }

    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title="Invalid Fields"
          description="Please ensure all fields are valid before submitting."
        />,
      );
      return;
    }

    const items = Array.isArray(moduleState?.items) ? moduleState.items : [];
    const teacherTypeId = items.find((i) => i?.type === "teacher")?.id;
    const studentTypeId = items.find((i) => i?.type === "student")?.id;

    const teacherCount = teacherTypeId
      ? (moduleState?.quantities?.[teacherTypeId] ?? 0)
      : 0;
    const studentCount = studentTypeId
      ? (moduleState?.quantities?.[studentTypeId] ?? 0)
      : 0;

    purchaseCode({
      payment_method_id: method?.id,
      teacher_code_count: teacherCount,
      student_code_count: studentCount,
      phone_number: formData.phone_number,
    });
  };

  const handleStateChange = (field, value, stateFn) => {
    if (typeof stateFn === "function") {
      stateFn((prev) => ({ ...prev, [field]: value }));
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
            <span className="font-size-sm fw-semibold">
              {method?.name || "Payment Method"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleClose?.()}
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
            Complete Your {moduleState?.summary?.currencySymbol || ""}{" "}
            {formatNumber(safeGrandTotal)} Payment
          </span>
        </div>

        <div className="d-flex flex-column gap-1">
          <span className="fw-semibold">
            {method?.name ? `${method.name} Number` : "Phone Number"}
          </span>
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

        <p className="text-iron-400 fw-light">
          We'll send a payment request to this number
        </p>

        <button
          type="button"
          disabled={isPending}
          className="border-none w-100 font-size-sm p-2 rounded-3 primary-background text-white"
          onClick={handlePayment}
          style={{ opacity: isPending ? 0.7 : 1 }}
        >
          {isPending ? (
            <SingleSpinner />
          ) : (
            <>
              Pay {formatNumber(safeGrandTotal.toFixed(2))}{" "}
              {moduleState?.summary?.currencySymbol || ""}
            </>
          )}
        </button>
      </div>
    </>
  );
}
export default OrangeMobileMoneyPayment;
