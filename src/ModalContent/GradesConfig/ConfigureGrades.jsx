import { Icon } from "@iconify/react";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners/Spinners";
import { useEffect, useRef, useState } from "react";
import { useCreateExamGrades } from "../../hooks/examGrade/useCreateExamGrades";
import { useGetLetterGrades } from "../../hooks/letterGrade/useGetLetterGrades";
import { NumberInput } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function ConfigureGrades({ handleClose, rowData }) {
  const scoreRef = useRef();
  const {grades_category_id:gradesCategoryId} = rowData;
  const [formData, setFormData] = useState([]);
  const [maxScore, setMaxScore] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const { data: letterGrades, isFetching: isLetterGradeLoading } =
    useGetLetterGrades();
  const { mutate:createGrades, isPending } = useCreateExamGrades();
   useEffect(() => {
    if (letterGrades?.data) {
      const preSetFormData = letterGrades.data.map((item) => ({
        letter_grade_id: item.id,
        minimum_score: 0.0,
        maximum_score: 0.0,
        determinant: "",
        grade_status: "",
        resit_status:"",
        grades_category_id:gradesCategoryId,
        grade_points: 0.0,
      }));
      setFormData(preSetFormData);
    }
  }, [letterGrades]);

  const handleInputChange = (index, field, value) => {
    setFormData((prevState) => {
      const updatedFormData = [...prevState];
      updatedFormData[index] = {
        ...prevState[index],
        [field]: value,
      };
      return updatedFormData;
    });
  };
  const handleCreateGrades = () => {
    if(!isValid || isValid == null || maxScore == null){
       scoreRef.current.triggerValidation();
       toast.custom(
         <ToastWarning 
           title={"Incomplete Or Invalid Exam Score"}
           description={"Please Check The Exam Max Score To Ensure that the Exam Score is Valid"}
         />
       )
       return;
    }
    const payload = {
      grades: formData
        .filter(
          (items) => items.determinant !== "" || items.grade_status !== ""
        )
        .map((grade) => ({
          letter_grade_id: grade.letter_grade_id,
          minimum_score: parseFloat(grade.minimum_score),
          maximum_score: parseFloat(grade.maximum_score),
          grade_points: parseFloat(grade.grade_points),
          determinant: grade.determinant,
          exam_id: grade.exam_id,
          resit_status: grade.resit_status,
          grade_status: grade.grade_status,
          grades_category_id:gradesCategoryId,
          max_score:maxScore
        })),
    };
     createGrades(payload);
  };

  if (isLetterGradeLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block w-100">
            <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
              <span className="m-0">Configure Exam Grades</span>
              <span
                onClick={() => {
                   handleClose();
                }}
              >
                <Icon icon="charm:cross" width="22" height="22" />
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-end gap-2 mb-2">
          <div className="d-flex flex-row gap-2">
          <NumberInput 
           placeholder="Enter Max Score"
           validationSchema={numberSchema({
               required:true,
               min:1,
               max:500,
               integerOnly:false,
               message:{
                  required:"Max Score Required",
                  min:"Exam Score Must Be Atleast 1",
                  max:"Exam Score Must Not Exceed 500"
               }
           })}
           step={"0.01"}
           onChange={(value) => setMaxScore(value)}
           onValidationChange={(value) => setIsValid(value)}
           value={maxScore}
           ref={scoreRef}
         />
         <button className="border-none rounded-2 py-2 px-3 font-size-sm primary-background text-white"
           style={{height:"68%"}}
           onClick={() => {
             handleCreateGrades();
           }}
           disabled={isPending}
         >
          {
            isPending ? <SingleSpinner /> : "Submit"
          }
         </button>
          </div>
        </div>
        <div className="card border grades-box rounded-3">
          <table className="table table-responsive">
            <thead className="grades-thead">
              <tr>
                <th className="text-center">Letter Grade</th>
                <th className="text-center">Status</th>
                <th className="text-center">Resit Status</th>
                <th className="text-center">Determinant</th>
                <th className="text-center">Grade Points</th>
                <th className="text-center">Min Score</th>
                <th className="text-center">Max Score</th>
              </tr>
            </thead>
            <tbody>
              {letterGrades.data.map((item, index) => (
                <tr key={item.id} className="grades-tr">
                  <td style={{ width: "10%" }}>
                    <div 
                      className="w-100 h-100 d-flex flex-row align-items-center justify-content-center"
                      style={{ fontSize:"0.85rem" }}
                      >
                      {item.letter_grade}
                    </div>
                  </td>
                  <td style={{ width: "15%" }}>
                    <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                    <div className="d-flex flex-column w-100">
                        <select
                      className="form-select form-select-sm w-100"
                      name="grade_status"
                      value={
                        formData[index] ? formData[index].grade_status : ""
                      }
                      onChange={(e) =>
                        handleInputChange(index, "grade_status", e.target.value)
                      }
                    >
                      <option selected>Passed</option>
                      <option value="passed">Pass</option>
                      <option value="failed">Failed</option>
                    </select>
                    <span className="font-size-sm m-0" style={{ fontSize:"0.65rem", opacity:0 }}>Danger Text</span>
                    </div>
                    </div>
                  </td>
                  <td style={{ width: "15%" }}>
                    <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                    <div className="d-flex flex-column w-100">
                        <select
                      className="form-select form-select-sm w-100"
                      name="resit_status"
                      value={
                        formData[index] ? formData[index].resit_status : ""
                      }
                      onChange={(e) =>
                        handleInputChange(index, "resit_status", e.target.value)
                      }
                    >
                      <option selected>Select Resit Status</option>
                      <option value="high_resit_potential">High Resit Potential</option>
                      <option value="low_resit_potential">Low Resit Potential</option>
                      <option value="resit">Resit</option>
                      <option value="no_resit">No Resit</option>
                    </select>
                    <span className="font-size-sm m-0" style={{ fontSize:"0.65rem", opacity:0 }}>Danger Text</span>
                    </div>
                    </div>
                  </td>
                  <td style={{ width: "15%" }}>
                    <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                      <div className="d-flex flex-column w-100">
                        <select
                      className="form-select form-select-sm w-100"
                      name="determinant"
                      value={formData[index] ? formData[index].determinant : ""}
                      onChange={(e) =>
                        handleInputChange(index, "determinant", e.target.value)
                      }
                    >
                      <option selected>Very Good</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Outstanding">Outstanding</option>
                      <option value="Very Good">Very Good</option>
                      <option value="Good">Good</option>
                      <option value="Satisfactory">Satisfactory</option>
                      <option value="Fair">Fair</option>
                      <option value="Unsatisfactory">Unsatisfactory</option>
                      <option value="Poor">Poor</option>
                      <option value="Inadequate">Inadequate</option>
                      <option value="Below Average">Below Average</option>
                      <option value="Marginal">Marginal</option>
                      <option value="Commendable">Commendable</option>
                      <option value="Promising">Promising</option>
                    </select>
                    <span className="font-size-sm" style={{ fontSize:"0.65rem", opacity:0 }}>Danger Text</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ width: "15%" }}>
                   <div className="h-100 w-100 d-flex flex-row align-item-center align-items-center justify-content-center">
                     <div className="d-flex flex-column">
                       <input
                      type="number"
                      className="form-control form-control-sm"
                      step="0.01"
                      name="grade_points"
                      value={
                        formData[index] ? formData[index].grade_points : ""
                      }
                      placeholder="4.00 - 3.00"
                      onChange={(e) =>
                        handleInputChange(index, "grade_points", e.target.value)
                      }
                    />
                    <span className="font-size-sm" style={{ fontSize:"0.65rem", opacity:0 }}>Danger Text</span>
                     </div>
                   </div>
                  </td>
                  <td style={{ width: "15%" }}>
                    <div className="d-flex flex-row align-items-center justify-content-center h-100 w-100">
                      <div className="d-flex flex-column">
                         <input
                      type="number"
                      className="form-control form-control-sm"
                      value={
                        formData[index] ? formData[index].minimum_score : ""
                      }
                      name="minimum_score"
                      step="0.01"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "minimum_score",
                          e.target.value
                        )
                      }
                      
                    />
                    <span className="font-size-sm" style={{ fontSize:"0.65rem", opacity:0 }}>Danger Text</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ width: "15%" }}>
                   <div className="h-100 w-100 d-flex flex-row align-items-center justify-content-center">
                     <div className="d-flex flex-column">
                      <input
                      type="number"
                      className="form-control form-control-sm"
                      value={
                        formData[index] ? formData[index].maximum_score : ""
                      }
                      name="maximum_score"
                      step="0.01"
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          "maximum_score",
                          e.target.value
                        )
                      }
                    />
                      <span className="font-size-sm" style={{ fontSize:"0.65rem", opacity:0 }}>Danger Text</span>
                     </div>
                   </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ConfigureGrades;
