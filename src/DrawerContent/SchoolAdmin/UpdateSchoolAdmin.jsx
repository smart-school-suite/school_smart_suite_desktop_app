import { useEffect, useState } from "react";
import {
    emailValidationSchema,
    nameSchema,
} from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { TextInput } from "../../components/FormComponents/InputComponents";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { NotFoundError } from "../../components/errors/Error";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
import { useGetSchoolAdminDetails } from "../../hooks/schoolAdmin/useGetSchoolAdminDetails";
import { useUpdateSchoolAdmin } from "../../hooks/schoolAdmin/useUpdateSchoolAdmin";
import {
    hasNonEmptyValue,
    optionalValidateObject,
} from "../../utils/functions";
function UpdateSchoolAdmin({ handleClose, drawerData }) {
  const { id: schoolAdminId } = drawerData;
  const {
    data: schoolAdminDetails,
    isLoading,
    error,
  } = useGetSchoolAdminDetails(schoolAdminId);
  const { mutate: update, isPending } = useUpdateSchoolAdmin(handleClose);
  const {
    formError,
    errorBannerRef,
    setClientError,
    handleServerError,
    clearFormError,
  } = useFormError("Failed To Update School Admin");
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isFieldValid, setFieldValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
  });

  useEffect(() => {
    if (schoolAdminDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        name: schoolAdminDetails?.data?.name || "",
        first_name: schoolAdminDetails?.data?.first_name || "",
        last_name: schoolAdminDetails?.data?.last_name || "",
        email: schoolAdminDetails?.data?.email || "",
      }));
    }
  }, [isLoading, setFormData]);

  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleAdminUpdate = () => {
    if (optionalValidateObject(isFieldValid) == false) {
      setClientError(
        "Invalid Fields",
        "Please ensure all fields are valid before updating.",
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      setClientError(
        "Nothing to Update",
        "Please ensure all fields are filled before updating.",
      );
      return;
    }
    clearFormError();
    update(
      { schoolAdminId, updateData: formData },
      { onError: handleServerError },
    );
  };
  return (
    <>
      <div className="drawer-content ps-2 font-size-sm pt-3">
        {isLoading ? (
          <div className="d-flex flex-column gap-3 w-100">
            {[...Array(4)].map((_, index) => (
              <div className="d-flex flex-column gap-2 w-100" key={index}>
                <RectangleSkeleton width="25%" height="1dvh" />
                <RectangleSkeleton width="100%" height="5dvh" />
              </div>
            ))}
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <>
            <FormErrorBanner
              ref={errorBannerRef}
              error={formError}
              onDismiss={clearFormError}
              className="mb-2"
            />
            <div className="d-flex flex-column gap-3">
              <div>
                <label htmlFor="firstname" className="font-size-sm">
                  First Name
                </label>
                <TextInput
                  onChange={(value) => {
                    handleStateChange("first_name", value, setFormData);
                  }}
                  validationSchema={nameSchema({
                    min: 3,
                    max: 50,
                    required: false,
                    messages: {
                      min: "First Name Must Be Atleast 3 characters Long",
                      max: "First Name Must Not Exceed 50 Characters",
                    },
                  })}
                  onValidationChange={(value) =>
                    handleStateChange("first_name", value, setFieldValid)
                  }
                  value={formData.first_name}
                />
              </div>
              <div>
                <label htmlFor="lastname" className="font-size-sm">
                  Last Name
                </label>
                <TextInput
                  onChange={(value) => {
                    handleStateChange("last_name", value, setFormData);
                  }}
                  validationSchema={nameSchema({
                    min: 3,
                    max: 50,
                    required: false,
                    messages: {
                      min: "Last Name Must Be Atleast 3 Characters Long",
                      max: "Last Name Must Not Exceed 50 Characters",
                    },
                  })}
                  onValidationChange={(value) =>
                    handleStateChange("last_name", value, setFieldValid)
                  }
                  value={formData.last_name}
                />
              </div>
              <div>
                <label htmlFor="fullnames" className="font-size-sm">
                  Full Names
                </label>
                <TextInput
                  onChange={(value) => {
                    handleStateChange("name", value, setFormData);
                  }}
                  validationSchema={nameSchema({
                    min: 3,
                    max: 150,
                    required: false,
                    messages: {
                      min: "Full Names Must Be Atleast 3 Characters Long",
                      max: "Full Names Must Not Exceed 150 Characters",
                    },
                  })}
                  onValidationChange={(value) =>
                    handleStateChange("name", value, setFieldValid)
                  }
                  value={formData.name}
                />
              </div>
              <div>
                <label htmlFor="email" className="font-size-sm">
                  Email
                </label>
                <TextInput
                  onChange={(value) => {
                    handleStateChange("email", value, setFormData);
                  }}
                  validationSchema={emailValidationSchema({
                    required: true,
                  })}
                  onValidationChange={(value) =>
                    handleStateChange("email", value, setFieldValid)
                  }
                  type="email"
                  value={formData.email}
                />
              </div>
            </div>
          </>
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
              Close
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => {
                handleAdminUpdate();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Update School Admin"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateSchoolAdmin;
