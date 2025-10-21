import { useEffect, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useUpdateTeacher } from "../../hooks/teacher/useUpdateTeacher";
import {
  PhoneNumberInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import {
  emailValidationSchema,
  nameSchema,
  phoneValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetTeacherDetails } from "../../hooks/teacher/useGetTeacherDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { gender } from "../../data/data";
function UpdateTeacher({ handleClose, rowData }) {
  const { id: teacherId } = rowData;
  const {
    data: teacherDetails,
    isLoading,
    error,
  } = useGetTeacherDetails(teacherId);
  const { mutate: updateTeacher, isPending } = useUpdateTeacher(handleClose);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender: "",
    phone_one: "",
  });
  const [isValid, setIsValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    phone_one: "",
  });

  useEffect(() => {
    if (teacherDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        email: teacherDetails.data.email,
        name: teacherDetails.data.name,
        last_name: teacherDetails.data.last_name,
        first_name: teacherDetails.data.first_name,
        gender: { name: teacherDetails.data.gender.toLowerCase() },
      }));
    }
  }, [isLoading, setFormData]);
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleTeacherUpdate = async () => {
    updateTeacher({ teacherId, updateData: formData });
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Update Teacher</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        {isLoading ? (
          <div className="d-flex flex-column w-100 gap-3">
            {[...Array(6)].map((_, index) => (
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
            <div className="d-flex flex-row align-items-center gap-2 w-100">
              <div className="w-50">
                <label htmlFor="firstName" className="font-size-sm">
                  First Name
                </label>
                <TextInput
                  onChange={(value) =>
                    handleStateChange("first_name", value, setFormData)
                  }
                  onValidationChange={(value) =>
                    handleStateChange("first_name", value, setIsValid)
                  }
                  value={formData.first_name}
                  validationSchema={nameSchema({
                    min: 3,
                    max: 50,
                    required: false,
                    messages: {
                      min: "First Name Must Be Atleast 3 Characters Long",
                      max: "First Name Must Not Exceed 50 Characters",
                    },
                  })}
                />
              </div>
              <div className="w-50">
                <label htmlFor="lastName" className="font-size-sm">
                  Last Name
                </label>
                <TextInput
                  onChange={(value) =>
                    handleStateChange("last_name", value, setFormData)
                  }
                  onValidationChange={(value) =>
                    handleStateChange("last_name", value, setIsValid)
                  }
                  value={formData.last_name}
                  validationSchema={nameSchema({
                    min: 3,
                    max: 50,
                    required: false,
                    messages: {
                      min: "Last Name Must Be Atleast 3 Characters Long",
                      max: "Last Name Must Not Exceed 50 Characters",
                    },
                  })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="fullname" className="font-size-sm">
                Full Names
              </label>
              <TextInput
                onChange={(value) =>
                  handleStateChange("name", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("name", value, setIsValid)
                }
                value={formData.name}
                validationSchema={nameSchema({
                  min: 3,
                  max: 150,
                  required: false,
                  message: {
                    min: "Name Must Be Atleast 3 Characters Long",
                    max: "Name Must Not Exceed 150 Characters",
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
                validationSchema={emailValidationSchema({
                  required: false,
                })}
                value={formData.email}
                onValidationChange={(value) =>
                  handleStateChange("email", value, setIsValid)
                }
              />
            </div>
            <div>
              <label htmlFor="phone" className="font-size-sm">
                Contact One
              </label>
              <PhoneNumberInput
                onChange={(value) =>
                  handleStateChange("phone_one", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("phone_one", value, setIsValid)
                }
                value={formData.phone_one}
                validationSchema={phoneValidationSchema({
                  optional: true,
                  prefixes: ["6", "2"],
                })}
              />
            </div>
            <div>
              <label htmlFor="gender" className="font-size-sm">
                Gender
              </label>
              <CustomDropdown
                data={gender || []}
                displayKey={["name"]}
                valueKey={["name"]}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("gender", value, setFormData)
                }
                placeholder="Select Gender"
                optional={true}
                value={formData.gender}
              />
            </div>
            <div className="mt-2">
              <button
                className="border-none p-2 font-size-sm primary-background rounded-3 w-100 text-white"
                onClick={() => {
                  handleTeacherUpdate();
                }}
              >
                {isPending ? <SingleSpinner /> : <>Update Teacher</>}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default UpdateTeacher;
