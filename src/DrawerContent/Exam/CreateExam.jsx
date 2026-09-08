import { SingleSpinner } from "../../components/Spinners/Spinners";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { useCreateExam } from "../../hooks/exam/useCreateExam";
import { useGetExamTypes } from "../../ModalContent/ExamType/useGetExamType";
import { useGetSchoolAcademicYears } from "../../hooks/academicYear/useGetSchoolAcademicYears";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import {
  DateRangeInput,
  NumberInput,
} from "../../components/FormComponents/InputComponents";
import {
  dateRangeValidationSchema,
  numberSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
function CreateExam({ handleClose }) {
  const dateRangeRef = useRef();
  const examTypeRef = useRef();
  const maxScoreRef = useRef();
  const schoolYearRef = useRef();
  const { data: examType, isLoading: isExamTypeLoading } = useGetExamTypes();
  const {  data: academicYears, isLoading:isAcademicYearLoading } = useGetSchoolAcademicYears();
  const { mutate: createExam, isPending } = useCreateExam(handleClose);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    exam_type_id: "",
    max_score: "",
    school_year_id: "",
  });
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
    max_score: "",
  });
  const [errors, setErrors] = useState({
    school_year_id: "",
    exam_type_id: "",
  });
  const handlePrevalidation = async () => {
    const startDate = await dateRangeRef.current.preValidateStart();
    const endDate = await dateRangeRef.current.preValidateEnd();
    const examType = await examTypeRef.current.triggerValidation();
    const maxScore = await maxScoreRef.current.triggerValidation();
    const schoolYear = await schoolYearRef.current.triggerValidation();
    return {
      startDate,
      endDate,
      examType,
      maxScore,
      schoolYear,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
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
    createExam({
      ...formData,
      school_year_id: formData.school_year_id.id,
      exam_type_id: formData.exam_type_id.id,
    });
  };
  return (
    <>
      <div className="drawer-content px-2 pt-2">
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
            <label htmlFor="maxScore" className="font-size-sm">
              Exam Score
            </label>
            <NumberInput
              onChange={(value) =>
                handleStateChange("max_score", value, setFormData)
              }
              step="0.01"
              onValidationChange={(value) => {
                handleStateChange("max_score", value, setIsInvalid);
              }}
              validationSchema={numberSchema({
                min: 1,
                max: 500,
                required: true,
                integerOnly: false,
                messages: {
                  required: "Exam Score Required",
                  min: "Exam Mark Must Be Atleast 1",
                  max: "Exam Mark Must Not Exceed 500",
                },
              })}
              placeholder={"e.g 100"}
              ref={maxScoreRef}
              value={formData.max_score}
            />
          </div>
          <div>
            <label htmlFor="schoolYear" className="font-size-sm">
              Academic Year
            </label>
             <CustomDropdown
              data={academicYears?.data || []}
              displayKey={["school_year", "specialty_name"]}
              valueKey={["id"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("school_year_id", value, setFormData)
              }
              placeholder="Select Academic Year"
              error={errors.school_year_id}
              isLoading={isAcademicYearLoading}
              errorMessage="Academic Year Required"
              onError={(msg) =>
                handleStateChange("school_year_id", msg, setErrors)
              }
              ref={schoolYearRef}
              value={formData.school_year_id}
            />
          </div>
          <div>
            <label htmlFor="examType" className="font-size-sm">
              Exam Type
            </label>
            <CustomDropdown
              data={examType?.data || []}
              displayKey={["exam_name"]}
              valueKey={["id"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("exam_type_id", value, setFormData)
              }
              placeholder="Select Exam Type"
              error={errors.exam_type_id}
              isLoading={isExamTypeLoading}
              errorMessage="Exam Type Required"
              onError={(msg) =>
                handleStateChange("exam_type_id", msg, setErrors)
              }
              ref={examTypeRef}
              value={formData.exam_type_id}
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
              onClick={() => handleSubmit()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Exam"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateExam;
