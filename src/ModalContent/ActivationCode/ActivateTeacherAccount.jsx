import { Icon } from "@iconify/react";
import { TextInput } from "../../components/FormComponents/InputComponents";
import { useRef, useState } from "react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { activationCodeSchema } from "../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useActivateTeacherAccount } from "../../hooks/activationCode/useActivateTeacherAccount";
function ActivateTeacherAccount({ rowData, handleClose }) {
  const codeRef = useRef();
  const { mutate: activateAccount, isPending } =
    useActivateTeacherAccount(handleClose);
  const [formData, setFormData] = useState({
    activation_code: "",
    teacher_id: rowData?.id || "",
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
        />
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
        />
      );
      return;
    }
    activateAccount(formData);
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="m-0">Activate Teacher Account</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="d-flex flex-column gap-2">
        <div>
          <span className="font-size-sm">Activation Code</span>
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
        <div>
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
      </div>
    </>
  );
}
export default ActivateTeacherAccount;