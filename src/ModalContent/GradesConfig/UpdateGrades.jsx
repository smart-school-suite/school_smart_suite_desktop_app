import { Icon } from "@iconify/react";
import Pageloaderspinner, {
  SingleSpinner,
} from "../../components/Spinners/Spinners";
import { useEffect, useRef, useState } from "react";
import { NumberInput } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { examRemarks, passFailOptions, resitOptions } from "../../data/data";
import { useSelector } from "react-redux";
import { useGetGradeConfigDetails } from "../../hooks/schoolGradeCategory/useGetGradeConfigDetails";
import { useBulkUpdateExamGrades } from "../../hooks/examGrade/useBulkUpdateGrades";
function UpdateGradeConfig({ handleClose, rowData }) {
  const { id: configId, max_score } = rowData;
  const darkMode = useSelector((state) => state.theme.darkMode);
  const scoreRef = useRef();
  const [formData, setFormData] = useState([]);
  const [maxScore, setMaxScore] = useState(null);
  const [isValid, setIsValid] = useState(null);
  const { data: letterGrades, isFetching } = useGetGradeConfigDetails(configId);
  const { mutate:updateGrades, isPending } = useBulkUpdateExamGrades(handleClose, configId);
  useEffect(() => {
    if (letterGrades?.data) {
      const preSetFormData = letterGrades.data.map((item) => ({
        letter_grade: item.lettergrade.letter_grade,
        grade_id: item.id,
        letter_grade_id: item.letter_grade_id,
        minimum_score: item.minimum_score,
        maximum_score: item.maximum_score,
        determinant: item.determinant,
        grade_status: item.grade_status,
        resit_status: item.resit_status,
        grades_category_id: item.grades_category_id,
        grade_points: item.grade_points,
        isValid: {
          maximum_score: null,
          minimum_score: null,
          grade_points: null,
        },
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
  const handleUpdateGrades = () => {
    const payload = {
       grades:formData.map((grade) => ({
          grade_id: grade.grade_id,
          letter_grade_id: grade.letter_grade_id,
          minimum_score: parseFloat(grade.minimum_score),
          maximum_score: parseFloat(grade.maximum_score),
          grade_points: parseFloat(grade.grade_points),
          determinant: grade.determinant,
          exam_id: grade.exam_id,
          resit_status: grade.resit_status,
          grade_status: grade.grade_status,
          grades_category_id:grade.grades_category_id,
        }))
    }
    updateGrades(payload);
  };
  const filterSelectData = (value, data, key) => {
      if(key){
        return data.find((items) => items.key === value);
      }
      return data.find((items) => items.value === value);
  }
   if (isFetching) {
     return <Pageloaderspinner />;
   }
 
  return (
    <>
            <div className="w-100">
        {console.table(formData)}
        <div className="d-flex flex-row align-items-center">
          <div className="block w-100">
            <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
              <span className="m-0">Update Exam Grade Config</span>
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
           placeholder={max_score}
           validationSchema={numberSchema({
               required:false,
               min:1,
               max:500,
               integerOnly:false,
               message:{
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
             handleUpdateGrades();
           }}
           disabled={isPending}
         >
          {
            isPending ? <SingleSpinner /> : "Submit"
          }
         </button>
          </div>
        </div>
        <div className=" grades-box rounded-3">
          <table className={`${darkMode ? 'table-dark' : null} table-responsive table`}>
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
              {formData.map((item, index) => (
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
                         placeholder={item.grade_status ? filterSelectData(item.grade_status, passFailOptions).name : "Select Grade Status"}
                         onSelect={(value) => handleInputChange(index, 'grade_status', value.value)}
                         
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
                        placeholder={item.resit_status ? filterSelectData(item.resit_status, resitOptions).name : "Select Resit Status"}
                        onSelect={(value) => handleInputChange(index, "resit_status", value.value)}
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
                          placeholder={item.determinant ? filterSelectData(item.determinant, examRemarks).name : 'Select Remark'}
                          onSelect={(value) => handleInputChange(index, "determinant", value.value)}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ width: "10%" }}>
                   <div className="h-100 w-100 d-flex flex-row align-item-center align-items-center justify-content-center">
                     <div className="d-flex flex-column">
                      <NumberInput 
                        placeholder={item.grade_points}
                        onChange={(value) => handleInputChange(index,  'grade_points',  value)}
                        step={"0.01"}
                        onValidationChange={(value) => handleIsValidChange(index, 'grade_points', value)}
                        validationSchema={numberSchema({
                            min:0.01,
                            max:4.00,
                            required:false,
                            integerOnly:false,
                            messages:{
                               min:"Grade Points Must Be Atleast 0.01",
                               max:"Grade Points Must Not Exceed 100"
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
                          placeholder={item.minimum_score}
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
                        placeholder={item.maximum_score}
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
export default UpdateGradeConfig;
