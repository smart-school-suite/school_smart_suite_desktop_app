import { Icon } from "@iconify/react";
import { NumberInput } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import { GenerateIcon } from "../../icons/ActionIcons";
import { useEffect, useRef, useState } from "react";
import { useAutoGenExamGrades } from "../../hooks/examGrade/useAutoGenExamGrades";
import ToastWarning from "../../components/Toast/ToastWarning";
import toast from "react-hot-toast";
import { useCreateExamGrades } from "../../hooks/examGrade/useCreateExamGrades";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function AutoConfigureGrades({ handleClose, rowData }) {
  const [isActive, setIsActive] = useState('genGradesConfig');
  const [examScore, setExamScore] = useState({
     isValid:null,
     error:null,
     maxScore:null
  })
  const handleStateChange = (value) => {
     setIsActive(value);
  }
  const handleExamScoreChange = (field, value) => {
     setExamScore((prev) => ({...prev, [field]:value }))
  }
  return (
     <>
       {
         isActive == 'examGradingPreview' ? <ExamGradingPreview 
         handleClose={handleClose}
         handleStateChange={handleStateChange}
         maxScore={examScore.maxScore}
         rowData={rowData}
       /> : 
       <GenGradesConfig 
          handleClose={handleClose}
          examScoreState={examScore}
          handleExamScoreChange={handleExamScoreChange}
          handleStateChange={handleStateChange}
          rowData={rowData}
       />
       }
     </>
  );
}
export default AutoConfigureGrades;

function GenGradesConfig({ handleClose, handleExamScoreChange, handleStateChange, examScoreState }) {
    const scoreRef = useRef();
    const handlePrevalidation = async () => {
       const examScoreValid = await scoreRef.current.triggerValidation();  
       return examScoreValid;
    }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Auto Generate Grades</span>
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
        <label htmlFor="maxScore" className="font-size-sm">Max Score</label>
        <NumberInput 
           placeholder="Enter Max Exam Score"
           value={examScoreState.maxScore}
           onValidationChange={(value) => handleExamScoreChange('isValid', value)}
           onChange={(value) => handleExamScoreChange('maxScore', value)}
           validationSchema={numberSchema({
              min:1,
              max:1000,
              integerOnly:false,
              required:true,
              messages:{
                 min:"Max Exam Score Must Be Alteast 1",
                 max:"Max Exam Score Must Not Exceed 1000",
                 required:"Max Exam Score Required"
              }
           })}
           ref={scoreRef}
        />
      </div>
      <button className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white w-100"
        onClick={() => {
          const examScoreValid =  handlePrevalidation();
             if(!examScoreValid){
              toast.custom(
                 <ToastWarning 
               title={"Invalid Max Score"}
               description={"Please Check Max Score Value And Correct For Any Error"}
             />
              )
             return
        } 
        if(examScoreState.maxScore <= 0 || !examScoreState.maxScore || examScoreState.maxScore == null){
            toast.custom(
                <ToastWarning 
               title={"Max Score Required"}
               description={"Max Exam Score Required Please Make Sure Max Exam Score is Added"}
             />
            )
             return
        }
            
            handleStateChange('examGradingPreview')
        }}
      >
       <div className="d-flex gap-2 justify-content-center">
        <span>Generate</span>
        <span><GenerateIcon /></span>
       </div>
     </button>
    </>
  );
}

function ExamGradingPreview({ handleClose, handleStateChange, maxScore, rowData }){
   const [genGrades, setGenGrades] = useState([]);
   const { mutateAsync:generateGrades, isPending } = useAutoGenExamGrades();
   const { mutate:createGrades, isPending:isCreating } = useCreateExamGrades(handleClose);
   const handleGradesGen = async () => {
      const grades = await generateGrades({ max_score:maxScore, exam_type:rowData.exam_type })
      setGenGrades(grades.data);
   }
   const handleCreateGrades = async () => {
      const gradesData = genGrades.map((grade) => ({
          letter_grade_id: grade.letter_grade_id,
          minimum_score: parseFloat(grade.minimum_score),
          maximum_score: parseFloat(grade.maximum_score),
          grade_points: parseFloat(grade.grade_points),
          determinant: grade.determinant,
          resit_status: grade.resit_status,
          grade_status: grade.grade_status,
          grades_category_id:rowData.grades_category_id,
          max_score:maxScore
      }))
      createGrades({ grades:gradesData })
   }
   useEffect(() => {
      if(maxScore > 0){
         handleGradesGen();
      }
   }, [])
    return(
        <>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Grades Preview</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
     <div className="modal-content-container pe-2">
       {
         isPending ? <span className="text-center">Generating.......</span> : genGrades.map((items) => (
             <div className="w-100 d-flex flex-column gap-2">
         <div className="w-100 d-flex flex-row align-items-center my-1 justify-content-between">
        <div className="d-flex flex-column font-size-sm gap-1">
           <span className="fw-light">Score Range</span>
          <div className="d-flex flex-row align-items-center gap-2 fw-semibold">
            <span>{items.minimum_score}</span>
            <span><Icon icon="bi:dash" /></span>
            <span>{items.maximum_score}</span>
          </div>
        </div>
        <div>
            <span className="fw-semibold font-size-sm">{items.letter_grade}</span>
        </div>
       </div>
       <hr />
       </div>
         ))
       }
     </div>
      <div className="d-flex flex-row align-items-center gap-2 w-100">
        <button className="border-none rounded-3 font-size-sm p-2 w-50"
          onClick={() => {
             handleStateChange("autoGenGradesConfig")
          }}
          disabled={isPending}
        >
            <span>Back</span>
        </button>
        <button 
          className="border-none rounded-3 font-size-sm p-2 w-50 primary-background text-white"
          onClick={() => {
             handleCreateGrades();
          }}
          disabled={isCreating}
         >
            {
                 isCreating ? <SingleSpinner /> : <span>Create Grades</span>
            }
        </button>
      </div>
        </>
    )
}
