import { Icon } from "@iconify/react";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { useActivateStudentAccount } from "../../hooks/activationCode/useActivateStudentAccount";
import { useRef, useState } from "react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { activationCodeSchema } from "../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { CircleX } from "lucide-react";
function ActivateStudentAccount({ rowData, handleClose }) {
  const codeRef = useRef();
  const { mutate: activateAccount, isPending } =
    useActivateStudentAccount(handleClose);
  const [formData, setFormData] = useState({
    activation_code: "",
    student_id: rowData?.id || "",
  });
  const [isValid, setIsValid] = useState({
    activation_code: null,
  });
  const handlePrevalidation = async () => {
    const activationCode = await codeRef.current.triggerValidation();
    return {
      activationCode,
    };
  };

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleActivateAccount = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Code"}
          description={
            "Your Code Seems to be Invalid, please check and try again"
          }
        />,
      );
      return;
    }

    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Code"}
          description={
            "Your Code Seems to be Invalid, please check and try again"
          }
        />,
      );
      return;
    }
    activateAccount(formData);
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
              Activate Student Account
            </span>
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
      <div className="d-flex flex-column gap-2 px-2 pt-4">
        <div>
          <span className="font-size-sm fw-medium">Activation Code</span>
          <TextInput
            placeholder={"XXX-XXXXXXXX"}
            onChange={(value) =>
              handleStateChange("activation_code", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("activation_code", value, setIsValid)
            }
            validationSchema={activationCodeSchema({
              required: true,
            })}
            ref={codeRef}
            value={formData.activation_code}
          />
        </div>
      </div>
        <div className="mt-4 border-top p-2">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
              onClick={() => {
                handleActivateAccount();
              }}
            >
              {isPending ? <SingleSpinner /> : "Activate Account"}
            </button>
          </div>
        </div>
    </>
  );
}
export default ActivateStudentAccount;
