import { useEffect, useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateStudent } from "../../hooks/student/useUpdateStudent";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetAllParents } from "../../hooks/parent/useGetParents";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import { TextInput } from "../../components/FormComponents/InputComponents";
import {
  emailValidationSchema,
  nameSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { gender } from "../../data/data";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetStudentDetails } from "../../hooks/student/useGetStudentDetails";
function UpdateStudent({ handleClose, rowData }) {
  const { id: studentId } = rowData;
  const {
    data: specialties,
    isFetching: isSpecialtiesLoading,
    error: specialtyError,
  } = useGetSpecialties();
  const {
    data: studentBatch,
    isFetching: isStudentBatchLoading,
    error: studentBatchError,
  } = useGetBatches();
  const {
    data: parents,
    isFetching: isParentsLoading,
    error: parentError,
  } = useGetAllParents();
  const {
    data: studentDetails,
    isLoading: isStudentDetailsLoading,
    error: studentDetailError,
  } = useGetStudentDetails(studentId);
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    specialty_id: "",
    student_batch_id: "",
    guardian_id: "",
    gender: "",
    email: "",
  });
  const [isValid, setIsValid] = useState({
    name: "",
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    specialty_id: "",
    student_batch_id: "",
    guardian_id: "",
  });
  const { mutate: updateStudent, isPending } = useUpdateStudent(
    handleClose,
    studentId
  );
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    if (studentDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        name: studentDetails.data.name,
        first_name: studentDetails.data.first_name,
        last_name: studentDetails.data.last_name,
        specialty_id: { id: studentDetails.data.specialty_id },
        student_batch_id: { id: studentDetails.data.student_batch_id },
        guardian_id: { id: studentDetails.data.guardian_id },
        gender: { name: studentDetails.data.gender.toLowerCase() },
        email: studentDetails.data.email,
      }));
    }
  }, [isStudentDetailsLoading, setFormData]);

  const handleUpdateStudent = () => {
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
    updateStudent({
      studentId,
      updateData: {
        ...formData,
        specialty_id: formData.specialty_id.id,
        student_batch_id: formData.student_batch_id.id,
        guardian_id: formData.guardian_id.id,
        gender: formData.gender.name,
      },
    });
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <span className="m-0">Update Student</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
      </div>
      {isParentsLoading ||
      isSpecialtiesLoading ||
      isStudentBatchLoading ||
      isStudentDetailsLoading ? (
        <div className="d-flex flex-column w-100 gap-3">
          {[...Array(6)].map((_, index) => (
            <div className="d-flex flex-column gap-2 w-100" key={index}>
              <RectangleSkeleton width="25%" height="1dvh" />
              <RectangleSkeleton width="100%" height="5dvh" />
            </div>
          ))}
        </div>
      ) : parentError ||
        specialtyError ||
        studentBatchError ||
        studentDetailError ? (
        <NotFoundError
          title={
            specialtyError?.response?.data?.errors?.title ||
            studentBatchError?.response?.data?.errors?.title ||
            parentError?.response?.data?.errors?.title ||
            studentDetailError?.response?.data?.errors?.title
          }
          description={
            specialtyError?.response?.data?.errors?.description ||
            studentDetailError?.response?.data?.errors?.description ||
            parentError?.response?.data?.errors?.description ||
            studentBatchError?.response?.data?.errors?.description
          }
        ></NotFoundError>
      ) : (
        <div>
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="w-50">
              <label htmlFor="firstName" className="font-size-sm">
                First Name
              </label>
              <TextInput
                onChange={(value) =>
                  handleStateChange("first_name", value, setFormData)
                }
                value={formData.name}
                validationSchema={nameSchema({
                  min: 3,
                  max: 50,
                  required: false,
                  message: {
                    min: "First Name Must Be Atleast 3 Characters Long",
                    max: "First Name Must Not Exceed 50 Characters",
                  },
                })}
                onValidationChange={(value) =>
                  handleStateChange("first_name", value, setIsValid)
                }
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
                 validationSchema={nameSchema({
                  min: 3,
                  max: 50,
                  required: false,
                  message: {
                    min: "Last Name Must Be Atleast 3 Characters Long",
                    max: "Last Name Must Not Exceed 50 Characters",
                  },
                })}
                value={formData.last_name}
              />
            </div>
          </div>
          <div>
            <label htmlFor="firstName" className="font-size-sm">
              Full Names
            </label>
            <TextInput
              onChange={(value) =>
                handleStateChange("name", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("name", value, setIsValid)
              }
              validationSchema={nameSchema({
                min: 3,
                max: 150,
                required: false,
                messages: {
                  min: "Full Names Must Be Atleast 3 Characters Long",
                  max: "Full Name Must Not Exceed 150 Characters",
                },
              })}
              value={formData.name}
            />
          </div>
          <div>
            <label htmlFor="email" className="font-size-sm">
              Email
            </label>
            <TextInput
              onChange={(value) =>
                handleStateChange("email", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("email", value, setIsValid)
              }
              validationSchema={emailValidationSchema({
                required: false,
              })}
              value={formData.email}
              type="email"
            />
          </div>
          <div>
            <label htmlFor="gender" className="font-size-sm">
              Gender
            </label>
            <CustomDropdown
              data={gender}
              displayKey={["name"]}
              valueKey={["name"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("gender", value, setFormData)
              }
              onError={(value) => handleStateChange("gender", value, setErrors)}
              errorMessage="Gender Required"
              error={errors.gender}
              placeholder="Select Gender"
              optional={true}
              value={formData.gender}
            />
          </div>
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="w-50">
              <label htmlFor="studentBatch" className="font-size-sm">
                Student Batch
              </label>
              <CustomDropdown
                data={studentBatch?.data || []}
                displayKey={["name"]}
                valueKey={["id"]}
                isLoading={isStudentBatchLoading}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("student_batch_id", value, setFormData)
                }
                placeholder="Select Student Batch"
                error={errors.student_batch_id}
                onError={(value) =>
                  handleStateChange("student_batch_id", value, setErrors)
                }
                errorMessage="Student Batch Required"
                optional={true}
                value={formData.student_batch_id}
              />
            </div>
            <div className="w-50">
              <label htmlFor="specialty" className="font-size-sm">
                Specialty
              </label>
              <CustomDropdown
                data={specialties?.data || []}
                displayKey={["specialty_name", "level_name"]}
                valueKey={["id"]}
                isLoading={isSpecialtiesLoading}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("specialty_id", value, setFormData)
                }
                onError={(value) =>
                  handleStateChange("specialty_id", value, setErrors)
                }
                error={errors.specialty_id}
                errorMessage="Specialty Required"
                placeholder="Select Specialty"
                optional={true}
                value={formData.specialty_id}
              />
            </div>
          </div>
          <div>
            <label htmlFor="guardian" className="font-size-sm">
              Guardian
            </label>
            <CustomDropdown
              data={parents?.data || []}
              displayKey={["guardian_name"]}
              valueKey={["id"]}
              isLoading={isParentsLoading}
              direction="up"
              onSelect={(value) =>
                handleStateChange("guardian_id", value, setFormData)
              }
              onError={(value) =>
                handleStateChange("guardian_id", value, setErrors)
              }
              error={errors.guardian_id}
              errorMessage="Guardian Required"
              placeholder="Select Specialty"
              optional={true}
              value={formData.guardian_id}
            />
          </div>
          <div className="mt-3">
            <button
              onClick={() => {
                handleUpdateStudent();
              }}
              className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2"
            >
              {isPending ? <SingleSpinner /> : "Update Student"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default UpdateStudent;
