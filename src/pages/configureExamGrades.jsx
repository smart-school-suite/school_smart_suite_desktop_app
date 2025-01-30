import Pageloaderspinner from "../components/Spinners";
import Greenbutton from "../components/Buttons";
import Navbar from "../components/Navbar";
import { GradesConfigurationNavbarOptions } from "../componentConfigurations/navBarConfig";
import { useParams } from "react-router-dom";
import { useFetchAssociateExamGradesQuery } from "../Slices/Asynslices/fetchSlice";
import { MinimumScoreInput } from "../components/formComponents";
import { useEffect, useState } from "react";
import { useAddGradeMutation } from "../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
function ConfigureExamGrades() {
    const { exam_id } = useParams();
    const { data: exam_letter_grades, isLoading } = useFetchAssociateExamGradesQuery({ exam_id });
    const [grades, setGrades] = useState([]);
  
    useEffect(() => {
      if (exam_letter_grades && exam_letter_grades.exam_letter_grades) {
        const initialGrades = exam_letter_grades.exam_letter_grades.map((item) => ({
          exam_id: item.exam_id,
          letter_grade_id: item.letter_grade_id,
          grade_points: "",
          minimum_score: "",
        }));
        setGrades(initialGrades);
      }
    }, [exam_letter_grades]);
  
    const handleGradeChange = (index, field, value) => {
      setGrades((prevGrades) => {
        const newGrades = [...prevGrades];
        newGrades[index] = {
          ...newGrades[index],
          [field]: value,
        };
        return newGrades;
      });
    };
  
    const [addGrade] = useAddGradeMutation();
    const handleSubmit = async () => {
        const payload = {
            grades: grades.map(grade => ({
                letter_grade_id: grade.letter_grade_id,
                minimum_score: parseFloat(grade.minimum_score),
                grade_points: parseFloat(grade.grade_points),
                exam_id: grade.exam_id, 
                grade_status: 'active'
            })),
        };
      try {
        await addGrade(payload).unwrap();
        toast.success("Grades submitted successfully!");
      } catch (error) {
        toast.error("Failed to Create grades. Try again.");
      }
    };
  
    if (isLoading) {
      return <Pageloaderspinner />;
    }
  
  return (
    <>
      <Navbar options={GradesConfigurationNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100 ">
          <div className="d-block">
            <h5 className="fw-bold my-0">Configure Exam Grades</h5>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <button className="border-none px-3 py-2 font-size-sm green-bg rounded-2 text-white"
               onClick={() => {
                 handleSubmit();
               }}
            >
             Create Grades
            </button>
          </div>
        </div>
      </div>
      <div className="card rounded-4 mt-2 w-100 py-2 d-flex flex-row justify-content-center px-2 timetable-container">
        <table className="w-100">
          <thead className="text-center rounded-3 gainsboro-color  border-bottom" style={{ height:"3.5rem" }}>
            <tr>
              <th className="text-start fw-medium">Exam Name</th>
              <th className="fw-medium">Grade Points</th>
              <th className="fw-medium">Minimum Score</th>
              <th className="fw-medium">Letter Grade</th>
              <th className="fw-medium">Weighted Mark</th>
            </tr>
          </thead>
          <tbody className="font-size-md gainsboro-color">
            {
                 exam_letter_grades.exam_letter_grades.map((items, index) => {
                      return(
                        <>
                         <tr className="timetable-row">
                        <td>
                           {items.exam_name}
                        </td>
                          <td>
                          <input
                              type="number"
                              className="form-control form-control-sm"
                              placeholder="0"
                              name="grade_points"
                              onChange={(e) => handleGradeChange(index, 'grade_points', e.target.value)}
                              value={grades[index] ? grades[index].grade_points : ""}
                              step="0.01"
                            /> 
                          </td>
                          <td>
                          <MinimumScoreInput 
                            maxValue={Number(items.maximum_score)}
                            value={grades[index] ? grades[index].minimum_score : ""}
                            onChange={(value) => handleGradeChange(index, 'minimum_score', value)}
                          />
                          </td>
                          <td className="text-center">
                            {items.letter_grade}
                          </td>
                          <td className="text-center">
                            {items.maximum_score}
                          </td>
                        </tr>
                        </>
                      )
                 })
            }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ConfigureExamGrades;
