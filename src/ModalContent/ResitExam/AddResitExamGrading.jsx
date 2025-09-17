import { useRef, useState } from "react";
import Pageloaderspinner, {
  SingleSpinner,
} from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useAddResitExamGrading } from "../../hooks/resitExam/useAddResitExamGrading";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetSchoolGradeCategories } from "../../hooks/schoolGradeCategory/useGetSchoolGradeCategory";
import ToastWarning from "../../components/Toast/ToastWarning";
import toast from "react-hot-toast";
import { allFieldsValid } from "../../utils/functions";
function ResitExamGrading({ handleClose, rowData }){
 const { id: examId } = rowData;
  const gradeConfigRef = useRef();
  const [errors, setErrors] = useState({
    grade_config: "",
  });
  const { data: schoolGradesConfig, isLoading } = useGetSchoolGradeCategories();
  const [gradeConfig, setGradeConfig] = useState(null);
  const { mutate: addExamGrading, isPending } = useAddResitExamGrading(handleClose);
  const handlePrevalidation = async () => {
    const gradeConfig = await gradeConfigRef.current.triggerValidation();
    return {
      gradeConfig,
    };
  };
  const handleSaveChanges = () => {
    const prevalidationError = handlePrevalidation();
    if (!allFieldsValid(prevalidationError)) {
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
    addExamGrading({ resitExamId:examId, gradesConfigId: gradeConfig });
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }

    return(
        <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Add Exam Grading</span>
        <span className="m-0" onClick={handleClose}>
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="modalContainer">
        <div className="w-100 my-2">
          <CustomDropdown
            data={
              schoolGradesConfig?.data
                ? schoolGradesConfig?.data.filter(
                    (items) => items.max_score !== null
                  )
                : []
            }
            isLoading={isLoading}
            placeholder={"Select Grade Config"}
            displayKey={["grade_title", "max_score"]}
            valueKey={["id"]}
            errorMessage={"Grade Config Required"}
            onSelect={(value) => setGradeConfig(value.id)}
            ref={gradeConfigRef}
            onError={(value) =>
              setErrors((prev) => ({ ...prev, grade_config: value }))
            }
            error={errors.grade_config}
          />
        </div>
      </div>
      <button
        className=" w-100 p-2 font-size-sm px-3 primary-background border-none rounded-3 text-white"
        onClick={handleSaveChanges}
        disabled={isPending}
      >
        {isPending ? <SingleSpinner /> : "Save Changes"}
      </button>
        </>
    )
}

export default ResitExamGrading;