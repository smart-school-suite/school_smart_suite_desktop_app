import { useState } from "react";
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
function UpdateStudent({ handleClose, rowData }) {
  const {
    id: studentId,
    student_first_name: first_name,
    student_last_name: last_name,
    student_name: name,
    student_email: email,
  } = rowData;
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
  const { data: specialties, isFetching: isSpecialtiesLoading } =
    useGetSpecialties();

  const { data: studentBatch, isFetching: isStudentBatchLoading } =
    useGetBatches();
  const { data: parents, isFetching: isParentsLoading } = useGetAllParents();
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
    updateStudent({ studentId, updateData: formData });
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
            placeholder={first_name}
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
              handleValid("last_name", value, setIsValid)
            }
            validationSchema={nameSchema({
              min: 3,
              max: 50,
              required: false,
              messages: {
                min: "Last Name Must Be Atleast 3 Characters Long",
                max: "Last Name Must Not Exceed 50 Characters",
              },
            })}
            placeholder={last_name}
          />
        </div>
      </div>
      <div>
        <label htmlFor="firstName" className="font-size-sm">
          Full Names
        </label>
        <TextInput
          onChange={(value) => handleStateChange("name", value, setFormData)}
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
          placeholder={name}
          type="first_name"
        />
      </div>
      <div>
        <label htmlFor="email" className="font-size-sm">
          Email
        </label>
        <TextInput
          onChange={(value) => handleStateChange("email", value, setFormData)}
          onValidationChange={(value) =>
            handleStateChange("email", value, setIsValid)
          }
          validationSchema={emailValidationSchema({
            required: false,
          })}
          placeholder={email}
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
            handleStateChange("gender", value.name, setFormData)
          }
          onError={(value) => handleStateChange("gender", value, setErrors)}
          errorMessage="Gender Required"
          error={errors.gender}
          placeholder="Select Gender"
          optional={true}
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
    </>
  );
}
export default UpdateStudent;
