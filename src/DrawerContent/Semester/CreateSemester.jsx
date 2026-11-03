import { useRef, useState } from "react";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetSchoolAcademicYears } from "../../hooks/academicYear/useGetSchoolAcademicYears";
import { useCreateSchoolSemester } from "../../hooks/schoolSemester/useCreateSchoolSemester";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { allFieldsValid } from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function CreateSemester({ handleClose }) {
  const dateRangeRef = useRef();
  const semesterRef = useRef();
  const schoolYearRef = useRef();
  const { data: schoolAcademicYears, isLoading: isSchoolAcademicYearLoading } =
    useGetSchoolAcademicYears();
  const { data: semesters, isLoading: isFetchingSemesters } = useGetSemester();
  const { mutate: createSchoolSemester, isPending } =
    useCreateSchoolSemester(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Create Semester");
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    school_year_id: "",
    semester_id: "",
  });
  const [errors, setErrors] = useState({
    semester_id: "",
    school_year_id: "",
  });
  const [isValid, setIsValid] = useState({
    start_date: "",
    end_date: "",
  });
  const handlePrevalidation = async () => {
    const startDate = await dateRangeRef.current.preValidateStart();
    const endDate = await dateRangeRef.current.preValidateEnd();
    const semester = await semesterRef.current.triggerValidation();
    const schoolYear = await schoolYearRef.current.triggerValidation();
    return {
      startDate,
      endDate,
      semester,
      schoolYear,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateSchoolSemester = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setClientError("Invalid Fields", "Some Fields Seem To Be Invalid Please Go Through the form and try again");
      return;
    }
    if (!allFieldsValid(isValid)) {
      setClientError("Invalid Fields", "Some Fields Seem To Be Invalid Please Go Through the form and try again");

      return;
    }
    clearFormError();
    createSchoolSemester({
      ...formData,
      semester_id: formData.semester_id.id,
      school_year_id: formData.school_year_id.id,
    }, { onError: handleServerError });
  };
  return (
    <>
      <div className="drawer-content ps-2">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="d-flex flex-column gap-3">
          <div>
            <DateRangeInput
              validationSchema={dateRangeValidationSchema({
                futureOnly: true,
              })}
              onEndDateChange={(value) =>
                handleStateChange("end_date", value, setFormData)
              }
              onStartDateChange={(value) =>
                handleStateChange("start_date", value, setFormData)
              }
              onStartDateValidationChange={(value) =>
                handleStateChange("start_date", value, setIsValid)
              }
              onEndDateValidationChange={(value) =>
                handleStateChange("end_date", value, setIsValid)
              }
              startValue={formData.start_date}
              endValue={formData.end_date}
              ref={dateRangeRef}
            />
          </div>
          <div>
            <label htmlFor="schoolYear" className="font-size-sm">
              School Year
            </label>
            <CustomDropdown
              data={schoolAcademicYears?.data || []}
              displayKey={["specialty_name", "school_year"]}
              valueKey={["id"]}
              direction="up"
              isLoading={isSchoolAcademicYearLoading}
              onSelect={(value) =>
                handleStateChange("school_year_id", value, setFormData)
              }
              error={errors.school_year_id}
              errorMessage="School Academic Year Required"
              onError={(msg) =>
                handleStateChange("school_year_id", msg, setErrors)
              }
              ref={schoolYearRef}
              value={formData.school_year_id}
            />
          </div>
          <div>
            <label htmlFor="semester" className="font-size-sm">
              Semester
            </label>
            <CustomDropdown
              data={semesters?.data || []}
              displayKey={["name"]}
              valueKey={["id"]}
              direction="up"
              isLoading={isFetchingSemesters}
              onSelect={(value) =>
                handleStateChange("semester_id", value, setFormData)
              }
              error={errors.semester_id}
              errorMessage="Semester Required"
              onError={(msg) =>
                handleStateChange("semester_id", msg, setErrors)
              }
              ref={semesterRef}
              value={formData.semester_id}
            />
          </div>
        </div>
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
              onClick={() => handleCreateSchoolSemester()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Semester"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateSemester;
