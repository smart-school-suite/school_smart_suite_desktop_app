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
  phoneValidationSchema,
  emailValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { guardianTypes, languages } from "../../data/data";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetParentDetails } from "../../hooks/parent/useGetParentDetails";
function UpdateParent({ handleClose, rowData }) {
  const { id: parentId } = rowData;

  const {
    data: parentDetails,
    isLoading: isParentDetailsLoading,
    error: parentDetailsError,
  } = useGetParentDetails(parentId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_one: "",
    phone_two: "",
    address: "",
    relationship_to_student: "",
    preferred_language: "",
  });

  const [isValid, setIsvalid] = useState({
    name: "",
    email: "",
    phone_one: "",
    phone_two: "",
    address: "",
  });

  useEffect(() => {
    if (parentDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        name: parentDetails?.data[0].name || "",
        email: parentDetails?.data[0].email || "",
        phone_one: parentDetails?.data[0].phone_one || "",
        phone_two: parentDetails?.data[0].phone_two || "",
        address: parentDetails?.data[0].address || "",
        relationship_to_student:
          { name: parentDetails?.data[0].relationship_to_student } || "",
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
        />
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
        />
      );
      return;
    }
    updateParent({
      parentId: parentId,
      updateData: {
        ...formData,
        relationship_to_student: formData.relationship_to_student.name,
        preferred_language: formData.preferred_language.name,
      },
    });
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <span className="m-0">Update Guardian</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
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
          <div>
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
            <div>
              <label htmlFor="email" className="font-size-sm">
                E-mail
              </label>
              <TextInput
                onChange={(value) =>
                  handleStateChange("email", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("email", value, setIsvalid)
                }
                validationSchema={emailValidationSchema({
                  required: false,
                })}
                type="email"
                value={formData.email}
              />
            </div>
            <div className="d-flex flex-row align-items-center gap-2 w-100">
              <div className="w-50">
                <label htmlFor="contactOne" className="font-size-sm">
                  Contact One
                </label>
                <PhoneNumberInput
                  onChange={(value) =>
                    handleStateChange("phone_one", value, setFormData)
                  }
                  value={formData.phone_one}
                  onValidationChange={(value) =>
                    handleStateChange("phone_one", value, setIsvalid)
                  }
                  validationSchema={phoneValidationSchema({
                    optional: true,
                    prefixes: ["6", "2"],
                  })}
                />
              </div>
              <div className="w-50">
                <label htmlFor="contactTwo" className="font-size-sm">
                  Contact Two
                </label>
                <PhoneNumberInput
                  onChange={(value) =>
                    handleStateChange("phone_two", value, setFormData)
                  }
                  value={formData.phone_one}
                  onValidationChange={(value) =>
                    handleStateChange("phone_two", value, setIsvalid)
                  }
                  validationSchema={phoneValidationSchema({
                    optional: true,
                    prefixes: ["6", "2"],
                  })}
                />
              </div>
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
              <label htmlFor="relationshipToStudent" className="font-size-sm">
                RelationShip To Student
              </label>
              <CustomDropdown
                data={guardianTypes}
                displayKey={["name"]}
                valueKey={["name"]}
                direction="up"
                onSelect={(value) =>
                  handleStateChange(
                    "relationship_to_student",
                    value,
                    setFormData
                  )
                }
                placeholder="Select Relationship To Student"
                option={true}
                value={formData.relationship_to_student}
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
            <div className="mt-3">
              <button
                className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2"
                onClick={handleUpdateParent}
                disabled={isPending}
              >
                {isPending ? <SingleSpinner /> : "Update Guardian"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default UpdateParent;
