import { Icon } from "@iconify/react";
import {
  DateRangeInput,
  NumberInput,
} from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetCurrentSystemAcademicYear } from "../../hooks/academicYear/useGetCurrentSystemAcademicYear";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useCreateSchoolAcademicYear } from "../../hooks/academicYear/useCreateSchoolAcademicYear";
import { allFieldsValid } from "../../utils/functions";
function CreateAcademicYear({ handleClose }) {
  const dateRangeRef = useRef();
  const specialtyRef = useRef();
  const academicYearRef = useRef();
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    specialty_id: "",
    system_academic_year_id: "",
  });
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
  });
  const [errors, setErrors] = useState({
    specialty_id: "",
    system_academic_year_id: "",
  });
  const { mutate: createYear, isPending } =
    useCreateSchoolAcademicYear(handleClose);
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handlePrevalidation = async () => {
    const startDate = await dateRangeRef.current.preValidateStart();
    const endDate = await dateRangeRef.current.preValidateEnd();
    const specialty = await specialtyRef.current.triggerValidation();
    const academicYear = await academicYearRef.current.triggerValidation();
    return {
      startDate,
      endDate,
      specialty,
      academicYear,
    };
  };
  const {
    data: academicYears,
    isLoading: isAcademicYearLoading,
    error: academicYearError,
  } = useGetCurrentSystemAcademicYear();
  const {
    data: specialties,
    isLoading: isSpecialtyLoading,
    error: specialtyError,
  } = useGetSpecialties();

  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    if (!allFieldsValid(isInvalid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    createYear({
      ...formData,
      system_academic_year_id: formData.system_academic_year_id.id,
      specialty_id: formData.specialty_id.id,
    });
  };
  return (
    <>
      <div className="w-100 d-flex flex-column gap-4">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Create Academic Year</span>
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
          <div>
            <DateRangeInput
              validationSchema={dateRangeValidationSchema({
                futureOnly: true,
                optional: false,
              })}
              onStartDateChange={(value) =>
                handleStateChange("start_date", value, setFormData)
              }
              onEndDateChange={(value) =>
                handleStateChange("end_date", value, setFormData)
              }
              onStartDateValidationChange={(value) =>
                handleStateChange("start_date", value, setIsInvalid)
              }
              onEndDateValidationChange={(value) =>
                handleStateChange("end_date", value, setIsInvalid)
              }
              ref={dateRangeRef}
              startValue={formData.start_date}
              endValue={formData.end_date}
            />
          </div>
          <div>
            <label htmlFor="specialty" className="font-size-sm">
              Specialty
            </label>
            <CustomDropdown
              data={specialties?.data || []}
              displayKey={["specialty_name", "level_name"]}
              valueKey={["id"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("specialty_id", value, setFormData)
              }
              placeholder="Select Specialty"
              error={errors.specialty_id}
              isLoading={isSpecialtyLoading}
              errorMessage="Specialty Required"
              onError={(msg) =>
                handleStateChange("specialty_id", msg, setErrors)
              }
              ref={specialtyRef}
              value={formData.specialty_id}
            />
          </div>
          <div>
            <label htmlFor="academicYear" className="font-size-sm">
              Academic Year
            </label>
            <CustomDropdown
              data={academicYears?.data || []}
              displayKey={["name"]}
              valueKey={["id"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("system_academic_year_id", value, setFormData)
              }
              placeholder="Select Academic Year"
              error={errors.system_academic_year_id}
              isLoading={isAcademicYearLoading}
              errorMessage="System Academic Year Required"
              onError={(msg) =>
                handleStateChange("system_academic_year_id", msg, setErrors)
              }
              ref={academicYearRef}
              value={formData.system_academic_year_id}
            />
          </div>
        </div>
        <div>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isPending ? <SingleSpinner /> : "Create Academic Year"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateAcademicYear;
