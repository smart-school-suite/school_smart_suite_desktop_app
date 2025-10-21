import { useRef, useState } from "react";
import {
  DateRangeInput,
  NumberInput,
} from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateExam } from "../../hooks/exam/useCreateExam";
import { Icon } from "@iconify/react";
import { useGetExamTypes } from "../ExamType/useGetExamType";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useGetBatches } from "../../hooks/studentBatch/useGetBatches";
import {
  dateRangeValidationSchema,
  numberSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateExam({ handleClose }) {
  const dateRangeRef = useRef();
  const examTypeRef = useRef();
  const specialtyRef = useRef();
  const weightedMarkRef = useRef();
  const studentBatchRef = useRef();
  const schoolYearRef = useRef();
  const { data: examType, isLoading: isExamTypeLoading } = useGetExamTypes();
  const { data: specialty, isLoading: isSpecailtyLoading } =
    useGetSpecialties();
  const { data: studentBatches, isLoading: isStudentBatchLoading } =
    useGetBatches();
  const { mutate: createExam, isPending } = useCreateExam(handleClose);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    exam_type_id: "",
    weighted_mark: "",
    specialty_id: "",
    school_year: "",
    student_batch_id: "",
  });
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
    weighted_mark: "",
  });
  const [errors, setErrors] = useState({
    school_year: "",
    student_batch_id: "",
    specialty_id: "",
    exam_type_id: "",
  });
  const handlePrevalidation = async () => {
    const startDate = await dateRangeRef.current.preValidateStart();
    const endDate = await dateRangeRef.current.preValidateEnd();
    const examType = await examTypeRef.current.triggerValidation();
    const weightedMark = await weightedMarkRef.current.triggerValidation();
    const specialty = await specialtyRef.current.triggerValidation();
    const studentBatch = await studentBatchRef.current.triggerValidation();
    const schoolYear = await schoolYearRef.current.triggerValidation();
    return {
      startDate,
      endDate,
      examType,
      weightedMark,
      specialty,
      studentBatch,
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
        />
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
        />
      );
      return;
    }
    createExam({
      ...formData,
      student_batch_id: formData.student_batch_id.id,
      specialty_id: formData.specialty_id.id,
      exam_type_id: formData.exam_type_id.id,
    });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Create Exam</span>
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
          <label htmlFor="weightedMark" className="font-size-sm">
            Exam Score
          </label>
          <NumberInput
            onChange={(value) =>
              handleStateChange("weighted_mark", value, setFormData)
            }
            step="0.01"
            onValidationChange={(value) => {
              handleStateChange("weighted_mark", value, setIsInvalid);
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
            ref={weightedMarkRef}
            value={formData.weighted_mark}
          />
        </div>
        <div>
          <label htmlFor="schoolYear" className="font-size-sm">
            School Year
          </label>
          <SchoolYearSelector
            onSelect={(value) =>
              handleStateChange("school_year", value, setFormData)
            }
            onError={(msg) => handleStateChange("school_year", msg, setErrors)}
            error={errors.school_year}
            ref={schoolYearRef}
            required={true}
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
            onError={(msg) => handleStateChange("exam_type_id", msg, setErrors)}
            ref={examTypeRef}
            value={formData.exam_type_id}
          />
        </div>
        <div>
          <label htmlFor="specialty" className="font-size-sm">
            Specialty
          </label>
          <CustomDropdown
            data={specialty?.data || []}
            displayKey={["specialty_name", "level"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isSpecailtyLoading}
            onSelect={(value) =>
              handleStateChange("specialty_id", value, setFormData)
            }
            placeholder="Select Specialty"
            error={errors.specialty_id}
            errorMessage="Specialty Required"
            onError={(msg) => handleStateChange("specialty_id", msg, setErrors)}
            ref={specialtyRef}
            value={formData.specialty_id}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentBatch" className="font-size-sm">
            Student Batch
          </label>
          <CustomDropdown
            data={studentBatches?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            direction="up"
            isLoading={isStudentBatchLoading}
            onSelect={(value) =>
              handleStateChange("student_batch_id", value, setFormData)
            }
            placeholder="Select Student Batch"
            error={errors.student_batch_id}
            errorMessage="Student Batches Required"
            onError={(msg) =>
              handleStateChange("student_batch_id", msg, setErrors)
            }
            ref={studentBatchRef}
            value={formData.student_batch_id}
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
            {isPending ? <SingleSpinner /> : "Create Exam"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateExam;
