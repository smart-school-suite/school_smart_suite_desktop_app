import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { useCreateSchoolSemester } from "../../hooks/schoolSemester/useCreateSchoolSemester";
import { useGetSemester } from "../../hooks/semester/useGetSemesters";
import { DateRangeInput } from "../../components/FormComponents/InputComponents";
import { dateRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useRef } from "react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetSchoolAcademicYears } from "../../hooks/academicYear/useGetSchoolAcademicYears";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function CreateSemester({ handleClose }) {
  const dateRangeRef = useRef();
  const semesterRef = useRef();
  const schoolYearRef = useRef();
  const { data: schoolAcademicYears, isLoading: isSchoolAcademicYearLoading } =
    useGetSchoolAcademicYears();
  const { data: semesters, isLoading: isFetchingSemesters } = useGetSemester();
  const { mutate: createSchoolSemester, isPending } =
    useCreateSchoolSemester(handleClose);
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
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateSchoolSemester = async () => {
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
    if (!allFieldsValid(isValid)) {
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
    createSchoolSemester({
      ...formData,
      semester_id: formData.semester_id.id,
      school_year_id: formData.school_year_id.id,
    });
  };
  return (
    <>
      <div className="drawer-content px-2">
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
            onError={(msg) => handleStateChange("semester_id", msg, setErrors)}
            ref={semesterRef}
            value={formData.semester_id}
          />
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
