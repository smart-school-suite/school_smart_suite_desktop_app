import { Icon } from "@iconify/react";
import { useUpdateParent } from "../../hooks/parent/useUpdateParent";
import { useEffect, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  PhoneNumberInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  nameSchema,
  addressSchema,
  phoneValidationSchema
} from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { contactMethod, languages } from "../../data/data";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetParentDetails } from "../../hooks/parent/useGetParentDetails";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function UpdateGuardian({ handleClose, drawerData }) {
  const { id: parentId } = drawerData;
  const {
    data: parentDetails,
    isLoading: isParentDetailsLoading,
    error: parentDetailsError,
  } = useGetParentDetails(parentId);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    preferred_contact_method: "",
    preferred_language: "",
  });

  const [isValid, setIsvalid] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (parentDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        name: parentDetails?.data[0].name || "",
        phone: parentDetails?.data[0].phone || "",
        address: parentDetails?.data[0].address || "",
        preferred_contact_method:
          { name: parentDetails?.data[0].preferred_contact_method } || "",
        preferred_language:
          { name: parentDetails?.data[0].preferred_language } || "",
      }));
    }
  }, [isParentDetailsLoading, setFormData]);

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const { mutate: updateParent, isPending } = useUpdateParent(handleClose);
  const handleUpdateParent = () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />,
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing To Update"}
          description={
            "Please Ensure Atleast One Field Is Updated Before Submitting"
          }
        />,
      );
      return;
    }
    updateParent({
      parentId: parentId,
      updateData: {
        ...formData,
        preferred_contact_method: formData.preferred_contact_method.name,
        preferred_language: formData.preferred_language.name,
      },
    });
  };
  return (
    <>
      <div className="drawer-content px-2 pt-4">
        {isParentDetailsLoading ? (
          <div className="d-flex flex-column w-100 gap-3">
            {[...Array(6)].map((_, index) => (
              <div className="d-flex flex-column gap-2 w-100" key={index}>
                <RectangleSkeleton width="25%" height="1dvh" />
                <RectangleSkeleton width="100%" height="5dvh" />
              </div>
            ))}
          </div>
        ) : parentDetailsError ? (
          <NotFoundError
            title={parentDetailsError?.response?.data?.errors?.title}
            description={
              parentDetailsError?.response?.data?.errors?.description
            }
          ></NotFoundError>
        ) : (
          <div className="d-flex flex-column gap-4">
            <div>
              <TextInput
                type="name"
                value={formData.name}
                onChange={(value) =>
                  handleStateChange("name", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("name", value, setIsvalid)
                }
                validationSchema={nameSchema({
                  min: 3,
                  max: 150,
                  required: false,
                  messages: {
                    min: "Guardian Name Should Be Atleast 3 Characters",
                    max: "Guardian Name Should Not Exceed 150 Characters",
                  },
                })}
              />
            </div>
            <div className="w-100">
              <label htmlFor="contactOne" className="font-size-sm">
                Contact
              </label>
              <PhoneNumberInput
                onChange={(value) =>
                  handleStateChange("phone", value, setFormData)
                }
                value={formData.phone}
                onValidationChange={(value) =>
                  handleStateChange("phone", value, setIsvalid)
                }
                validationSchema={phoneValidationSchema({
                  optional: true,
                  prefixes: ["6", "2"],
                })}
              />
            </div>
            <div className="d-flex flex-row align-items-center gap-2 w-100">
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
                    handleStateChange("address", value, setIsvalid)
                  }
                  validationSchema={addressSchema({
                    required: true,
                  })}
                  value={formData.address}
                />
              </div>
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
                    setFormData,
                  )
                }
                placeholder="Select Preferred Contact Method"
                value={formData.preferred_contact_method}
                optional={true}
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
                placeholder="Select Preferred Language"
                optional={true}
                value={formData.preferred_language}
              />
            </div>
          </div>
        )}
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
              {isPending ? <SingleSpinner /> : "Create Guardian"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateGuardian;
