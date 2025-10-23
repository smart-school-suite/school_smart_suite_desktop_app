import { useEffect, useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useGetExamTypes } from "../ExamType/useGetExamType";
import { useGetSpecialties } from "../../hooks/specialty/useGetSpecialties";
import { useUpdateExam } from "../../hooks/exam/useUpdateExam";
import {
  DateRangeInput,
  NumberInput,
} from "../../components/FormComponents/InputComponents";
import {
  dateRangeValidationSchema,
  numberSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetExamDetails } from "../../hooks/exam/useGetExamDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function UpdateExam({ handleClose, rowData }) {
  const { id: examId } = rowData;
  const { data: examDetails, isLoading, error } = useGetExamDetails(examId);
  const { mutate: updateExam, isPending } = useUpdateExam(handleClose);
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    exam_type_id: "",
    weighted_mark: "",
    specialty_id: "",
    school_year: "",
  });
  const [errors, setErrors] = useState({
    school_year: "",
    student_batch_id: "",
    specialty_id: "",
    exam_type_id: "",
  });
  const [isInvalid, setIsInvalid] = useState({
    start_date: "",
    end_date: "",
    weighted_mark: "",
  });

  useEffect(() => {
    if (examDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        start_date: examDetails.data.start_date,
        end_date: examDetails.data.end_date,
        exam_type_id: examDetails.data.exam_type_id
          ? { id: examDetails.data.exam_type_id }
          : "",
        weighted_mark: examDetails.data.weighted_mark,
        specialty_id: examDetails.data.specialty_id
          ? { id: examDetails.data.specialty_id }
          : "",
        school_year: examDetails.data.school_year,
        student_batch_id: examDetails.data.student_batch_id ? {id:examDetails.data.student_batch_id} : ""
      }));
    }
  }, [setFormData, isLoading]);

  const { data: examType, isLoading: isExamTypeLoading } = useGetExamTypes();
  const { data: specialty, isLoading: isSpecailtyLoading } =
    useGetSpecialties();
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    if (optionalValidateObject(isInvalid) == false) {
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
    updateExam({
      examId: examId,
      updateData: {
        ...formData,
        student_batch_id: formData.student_batch_id.id,
        specialty_id: formData.specialty_id.id,
        exam_type_id: formData.exam_type_id.id,
      },
    });
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="w-100">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Update Exam</span>
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
      </div>
      {isLoading || isExamTypeLoading || isSpecailtyLoading ? (
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
          title={
            specialtyError?.response?.data?.errors?.title ||
            semesterError?.response?.data?.errors?.title ||
            courseDetailError?.response?.data?.errors?.title
          }
          description={
            specialtyError?.response?.data?.errors?.description ||
            semesterError?.response?.data?.errors?.description ||
            courseDetailError?.response?.data?.errors?.description
          }
        ></NotFoundError>
      ) : (
        <>
          <div>
            <div>
              <DateRangeInput
                validationSchema={dateRangeValidationSchema({
                  futureOnly: true,
                  optional: true,
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
                onValidationChange={(value) =>
                  handleStateChange("weighted_mark", value, setIsInvalid)
                }
                validationSchema={numberSchema({
                  min: 1,
                  max: 500,
                  optional: true,
                  integerOnly: false,
                  messages: {
                    min: "Exam Score Must Be Atleast 1",
                    max: "Exam Score Must Not Exceed 100",
                  },
                })}
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
                onError={(value) =>
                  handleStateChange("school_year", value, setErrors)
                }
                error={errors.school_year}
                placeholder={formData.school_year}
                required={false}
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
                isLoading={isExamTypeLoading}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("exam_type_id", value, setFormData)
                }
                errorMessage="Exam Type Required"
                onError={(value) =>
                  handleStateChange("exam_type_id", value, setErrors)
                }
                error={errors.exam_type_id}
                optional={true}
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
                isLoading={isSpecailtyLoading}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("specialty_id", value, setFormData)
                }
                value={formData.specialty_id}
                onError={(value) =>
                  handleStateChange("specialty_id", value, setErrors)
                }
                errorMessage="Specialty Required"
                error={errors.specialty_id}
                optional={true}
              />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100 mt-3">
            <button
              disabled={isPending}
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isPending ? <SingleSpinner /> : "Update Exam"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
export default UpdateExam;
