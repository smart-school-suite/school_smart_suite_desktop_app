import { Icon } from "@iconify/react";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateParent } from "../../hooks/parent/useCreateParent";
import {
  TextInput,
  PhoneNumberInput,
} from "../../components/FormComponents/InputComponents";
import {
  addressSchema,
  nameSchema,
  phoneValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { contactMethod, languages } from "../../data/data";
import { useRef } from "react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateParent({ handleClose }) {
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const preferredContactRef = useRef();
  const preferredLanguageRef = useRef();
  const { mutate: createParent, isPending } = useCreateParent(handleClose);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    preferred_contact_method: "",
    preferred_language: "",
  });
  const [isInvalid, setIsInvalid] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [errors, setError] = useState({
    preferred_contact_method: "",
    preferred_language: "",
  });
  const handlePrevalidation = async () => {
    const name = await nameRef.current.triggerValidation();
    const phone = await phoneRef.current.triggerValidation();
    const address = await addressRef.current.triggerValidation();
    const preferredContact =
      await preferredContactRef.current.triggerValidation();
    const preferredlanguage =
      await preferredLanguageRef.current.triggerValidation();
    return {
      name,
      phone,
      address,
      preferredContact,
      preferredlanguage,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateGuardian = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a Guardian."
          }
        />
      );
      return;
    }
    if (!allFieldsValid(isInvalid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a Guardian."
          }
        />
      );
      return;
    }
    createParent({
      ...formData,
      preferred_contact_method: formData.preferred_contact_method.name,
      preferred_language: formData.preferred_language.name,
    });
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <span className="m-0">Create Guardian</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div>
          <label htmlFor="guardianName" className="font-size-sm">
            Guardian Name
          </label>
          <TextInput
            onChange={(value) => handleStateChange("name", value, setFormData)}
            onValidationChange={(value) =>
              handleStateChange("name", value, setIsInvalid)
            }
            validationSchema={nameSchema({
              min: 3,
              max: 150,
              required: "Guardian Name Is Required",
              message: {
                required: "Guardian Name Required",
                min: "Guardian Name Should Be Atleast 3 Characters",
                max: "Guardian Name Should Not Exceed 150 Characters",
              },
            })}
            placeholder={"Enter Guardian Full Names"}
            value={formData.name}
            ref={nameRef}
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-size-sm">
            Phone Number
          </label>
          <PhoneNumberInput
            onChange={(value) => handleStateChange("phone", value, setFormData)}
            value={formData.phone}
            onValidationChange={(value) =>
              handleStateChange("phone", value, setIsInvalid)
            }
            validationSchema={phoneValidationSchema({
              optional: false,
              prefixes: ["6", "2"],
            })}
            ref={phoneRef}
          />
        </div>
        <div className="w-100">
          <label htmlFor="address" className="font-size-sm">
            Address
          </label>
          <TextInput
            type="address"
            onChange={(value) =>
              handleStateChange("address", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("address", value, setIsInvalid)
            }
            validationSchema={addressSchema({
              required: true,
            })}
            placeholder={"Enter Guardian Address"}
            value={formData.address}
            ref={addressRef}
          />
        </div>
        <div>
          <label htmlFor="preferredContactMethod" className="font-size-sm">
            Preferred Contact Method
          </label>
          <CustomDropdown
            data={contactMethod}
            displayKey={["name"]}
            valueKey={["name"]}
            direction="up"
            onSelect={(value) =>
              handleStateChange(
                "preferred_contact_method",
                value,
                setFormData
              )
            }
            error={errors.preferred_contact_method}
            onError={(msg) =>
              handleStateChange("preferred_contact_method", msg, setError)
            }
            errorMessage="Preferred Contact Method Required"
            placeholder="Select Preferred Contact Method"
            ref={preferredContactRef}
            value={formData.preferred_contact_method}
          />
        </div>
        <div>
          <label htmlFor="preferredLanguage" className="font-size-sm">
            Preferred Language of Communication
          </label>
          <CustomDropdown
            data={languages}
            displayKey={["name"]}
            valueKey={["name"]}
            direction="up"
            onSelect={(value) =>
              handleStateChange("preferred_language", value, setFormData)
            }
            error={errors.preferred_language}
            onError={(msg) =>
              handleStateChange("preferred_language", msg, setError)
            }
            errorMessage="Preferred Language Of Communication Required"
            placeholder="Select Preferred Language"
            ref={preferredLanguageRef}
            value={formData.preferred_language}
          />
        </div>
        <div className="mt-3">
          <button
            className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2"
            onClick={handleCreateGuardian}
          >
            {isPending ? <SingleSpinner /> : "Create Guardian"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateParent;
