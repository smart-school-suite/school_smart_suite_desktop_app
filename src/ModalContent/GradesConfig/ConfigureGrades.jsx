import { Icon } from "@iconify/react";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners/Spinners";
import { useEffect, useRef, useState } from "react";
import { useCreateExamGrades } from "../../hooks/examGrade/useCreateExamGrades";
import { useGetLetterGrades } from "../../hooks/letterGrade/useGetLetterGrades";
import { NumberInput } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { examRemarks, passFailOptions, resitOptions } from "../../data/data";
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
        isValid:{
           maximum_score:null,
           minimum_score:null,
           grade_points:null
        }
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
  const handleIsValidChange = (index, field, value) => {
  setFormData(prevItems => {
    const newItems = [...prevItems];
    newItems[index] = {
      ...newItems[index],
      isValid: {
        ...newItems[index].isValid,
        [field]: value,
      },
    };
    return newItems;
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
                <th className="text-center">Remark</th>
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
                      <div className="d-flex flex-column w-100 justify-content-center text-center gap-2">
                        <span>{item.letter_grade}</span>
                        <span className="font-size-xs visually-hidden">Clash Detected</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ width: "20%" }}>
                    <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                    <div className="d-flex flex-column w-100">
                       <CustomDropdown 
                         data={passFailOptions}
                         displayKey={['name']}
                         valueKey={['value']}
                         optional={true}
                         direction={"down"}
                         placeholder={"Select Grade Status"}
                         onChange={(value) => handleInputChange(index, 'grade_status', value)}
                       />
                    </div>
                    </div>
                  </td>
                  <td style={{ width: "20%" }}>
                    <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                    <div className="d-flex flex-column w-100">
                      <CustomDropdown 
                        data={resitOptions}
                        displayKey={['name']}
                        valueKey={['value']}
                        optional={true}
                        direction={"down"}
                        placeholder={"Select Resit Status"}
                        onChange={(value) => handleInputChange(index, "resit_status", value)}
                      />
                    </div>
                    </div>
                  </td>
                  <td style={{ width: "20%" }}>
                    <div className="w-100 h-100 d-flex flex-row align-items-center justify-content-center">
                      <div className="d-flex flex-column w-100">
                        <CustomDropdown 
                          data={examRemarks}
                          displayKey={['name']}
                          valueKey={['value']}
                          optional={true}
                          direction="down"
                          placeholder={'Select Remark'}
                          onSelect={(value) => handleInputChange(index, "determinant", value)}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ width: "10%" }}>
                   <div className="h-100 w-100 d-flex flex-row align-item-center align-items-center justify-content-center">
                     <div className="d-flex flex-column">
                      <NumberInput 
                        placeholder={0.0}
                        onChange={(value) => handleInputChange(index,  'grade_points',  value)}
                        step={"0.01"}
                        onValidationChange={(value) => handleIsValidChange(index, 'grade_points', value)}
                        validationSchema={numberSchema({
                            min:0.01,
                            max:4.00,
                            required:false,
                            integerOnly:false,
                            messages:{
                               min:"Score Must Be Atleast 0.01",
                               max:"Score Must Not Exceed 100"
                            }
                        })}
                      />
                     </div>
                   </div>
                  </td>
                  <td style={{ width: "10%" }}>
                    <div className="d-flex flex-row align-items-center justify-content-center h-100 w-100">
                      <div className="d-flex flex-column">
                        <NumberInput 
                          placeholder={0.0}
                          onChange={(value) => handleInputChange(index, 'minimum_score', value)}
                          onValidationChange={(value) => handleIsValidChange(index, 'minimum_score', value)}
                          step={"0.01"}
                          validationSchema={numberSchema({
                            min:0.01,
                            max:100,
                            required:false,
                            integerOnly:false,
                            messages:{
                               min:"Score Must Be Atleast 0.01",
                               max:"Score Must Not Exceed 100"
                            }
                        })}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ width: "10%" }}>
                   <div className="h-100 w-100 d-flex flex-row align-items-center justify-content-center">
                     <div className="d-flex flex-column">
                      <NumberInput 
                        onChange={(value) => handleInputChange(index, 'maximum_score', value)}
                        onValidationChange={(value) => handleIsValidChange(index, 'maximum_score', value)}
                        placeholder={0.0}
                        step={"0.01"}
                        validationSchema={
                          numberSchema({
                            min:0.01,
                            max:100,
                            required:false,
                            integerOnly:false,
                            messages:{
                               min:"Score Must Be Atleast 0.01",
                               max:"Score Must Not Exceed 100"
                            }
                        })
                        }
                      />
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
