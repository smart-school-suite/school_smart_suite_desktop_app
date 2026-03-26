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
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetStudentDetails } from "../../hooks/student/useGetStudentDetails";
import { useGetActiveGender } from "../../hooks/gender/useGetActiveGender";
import { useGetStudentParentRelationship } from "../../hooks/student/useGetStudentParentRelationship";
import { useGetStudentSource } from "../../hooks/student/useGetStudentSource";
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
  const { data: gender, isLoading: isGenderLoading } = useGetActiveGender();
  const { data: relationships, isLoading: isRelationshipLoading } =
    useGetStudentParentRelationship();
  const { data: studentSource, isLoading: isStudentSourceLoading } =
    useGetStudentSource();
  const [formData, setFormData] = useState({
    name: "",
    first_name: "",
    last_name: "",
    specialty_id: "",
    student_batch_id: "",
    guardian_id: "",
    gender: "",
    email: "",
    relationship: "",
    student_source: "",
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
    gender: "",
    relationship: "",
    student_source: "",
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
        gender: { id: studentDetails.data.gender_id },
        relationship: { id: studentDetails.data.relationship_id },
        student_source: { id: studentDetails.data.student_source_id },
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
        gender_id: formData.gender.id,
        relationship_id: formData.relationship.id,
        guardian_id: formData.guardian_id.id,
        student_source_id: formData.student_source.id,
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
          <div className="d-flex flex-row align-items-center gap-2 w-100">
            <div className="w-50">
              <label htmlFor="gender" className="font-size-sm">
                Gender
              </label>
              <CustomDropdown
                data={gender?.data || []}
                displayKey={["name"]}
                valueKey={["id"]}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("gender", value, setFormData)
                }
                onError={(value) =>
                  handleStateChange("gender", value, setErrors)
                }
                isLoading={isGenderLoading}
                errorMessage="Gender Required"
                error={errors.gender}
                placeholder="Select Gender"
                value={formData.gender}
                optional={true}
              />
            </div>
            <div className="w-50">
              <label htmlFor="studentSource" className="font-size-sm">
                Student Source
              </label>
              <CustomDropdown
                data={studentSource?.data || []}
                displayKey={["name", "description"]}
                valueKey={["id"]}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("student_source", value, setFormData)
                }
                onError={(value) =>
                  handleStateChange("student_source", value, setErrors)
                }
                isLoading={isStudentSourceLoading}
                errorMessage="Student Source Required"
                error={errors.student_source}
                placeholder="Select Student Source"
                optional={true}
                value={formData.student_source}
              />
            </div>
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
          <div className="d-flex flex-row align-items-center gap-2 w-100">
            <div className="my-1 w-50">
              <label htmlFor="guardian" className="font-size-sm">
                Select Guardian
              </label>
              <CustomDropdown
                data={parents?.data || []}
                displayKey={["guardian_name"]}
                valueKey={["id"]}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("guardian_id", value, setFormData)
                }
                isLoading={isParentsLoading}
                error={errors.guardian_id}
                onError={(value) =>
                  handleStateChange("guardian_id", value, setErrors)
                }
                placeholder="Select Guardian"
                value={formData.guardian_id}
                optional={true}
              />
            </div>
            <div className="my-1 w-50">
              <label htmlFor="guardian" className="font-size-sm">
                Select Relationship
              </label>
              <CustomDropdown
                data={relationships?.data || []}
                displayKey={["name"]}
                valueKey={["id"]}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("relationship", value, setFormData)
                }
                isLoading={isRelationshipLoading}
                error={errors.relationship}
                onError={(value) =>
                  handleStateChange("relationship", value, setErrors)
                }
                placeholder="Select Relationship"
                value={formData.relationship}
                optional={true}
              />
            </div>
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
