import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { useFetchAccessedCoursesQuery } from "../../Slices/Asynslices/fetchSlice";
import { useAddStudentScoreMutation } from "../../Slices/Asynslices/postSlice";
import Pageloaderspinner, { SingleSpinner } from "../../components/Spinners";
import {
  setGrades,
  setScores,
  updateScore,
  resetGpa
} from "../../Slices/Asynslices/StudentScoreSlice";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
function SummitScores({
  handleClose,
  row_id: accessementId,
  studentId,
  examId,
}) {
  const userData = useSelector((state) => state.auth.user);
  const studentGpa = useSelector((state) => state.studentScore.gpa);
  const [addStudentScore] = useAddStudentScoreMutation();
  const [isSubmiting, setIsSubmitting] = useState(false);
  const formData = useSelector((state) => state.studentScore.formData);
  const letterGrades = useSelector((state) => state.studentScore.letterGrades);
  const dispatch = useDispatch();
  const { data: accessedCourses, isLoading: accessedCoursesLoading } =
    useFetchAccessedCoursesQuery({
      examId: examId,
    });
  useEffect(() => {
    if (
      accessedCourses?.accessed_courses &&
      accessedCourses?.grades_determinant
    ) {
      const scoresInitialData = accessedCourses.accessed_courses.map(
        (items) => ({
          course_id: items.course_id,
          exam_id: items.exam_id,
          score: "",
          course_credit: items.course_credit,
          grade_points: "",
          letter_grade: "",
          determinant: "",
          status: "",
        })
      );
      const letterGradesInitialData = accessedCourses.grades_determinant.map(
        (items) => ({
          letter_grade: items.letter_grade,
          grade_points: items.grade_points,
          minimum_score: items.minimum_score,
          maximum_score: items.maximum_score,
          grade_status: items.grade_status,
          determinant: items.determinant,
        })
      );
      dispatch(resetGpa());
      dispatch(setScores(scoresInitialData));
      dispatch(setGrades(letterGradesInitialData));
    }
  }, [dispatch, accessedCourses]);
  const handleScoreChange = (index) => (event) => {
    const score = parseFloat(event.target.value);
    dispatch(updateScore({ index, score }));
  };
  const handleSubmitStudentScores = async() => {
        const studentScoresData = formData.filter((items) => items.score !== "" || null).map((item) => ({
            student_id:studentId,
            exam_id:item.exam_id,
            score:parseFloat(item.score),
            course_id:item.course_id,
            accessment_id:accessementId
          }));
    
        const formattedData = {
          scores_entries: studentScoresData,
        };
      setIsSubmitting(true);
      try{
         await addStudentScore(formattedData).unwrap();
         setIsSubmitting(false);
         handleClose();
         toast.custom(
           <ToastSuccess 
             title={"Successfully Submited"}
             description={"Student Scores Successfully Submitted"}
           />
         );
      }
      catch(e){
          setIsSubmitting(false);
          toast.custom(
            <ToastDanger 
              title={"Faild to Submit"}
              description={"Failed to submmit student Scores"}
            />
          );
      }
  }

  if (accessedCoursesLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center">
        <div className="block w-100">
          <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
            <h5 className="m-0">Summit Student Scores {examId}</h5>
            <span className="m-0" onClick={handleClose}>
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <div className="d-flex flex-row justify-content-end mb-2">
            <button 
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => {
                 handleSubmitStudentScores();
              }}
              >
              {
                 isSubmiting ? <SingleSpinner /> : "Submit Scores"
              }
            </button>
          </div>
        </div>
      </div>
      <div className="border rounded-3 grades-form-box ">
        <div className="grades-form-table-box">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th>Course Title</th>
                <th>Max Score</th>
                <th>Student Score</th>
                <th>Course Credit</th>
                <th>Grade</th>
                <th>Grade Points</th>
                <th>Status</th>
                <th>Determinant</th>
              </tr>
            </thead>
            <tbody className="grades-form">
              {accessedCourses.accessed_courses.map((items, index) => (
                <tr>
                  <td className="border-end font-size-sm">
                    {items.course_name}
                  </td>
                  <td>{items.weighted_mark}</td>
                  <td>
                    <input
                      type="number"
                      onChange={handleScoreChange(index)}
                      className="form-control"
                      step="0.01"
                    />
                  </td>
                  <td className="text-center">{items.course_credit}</td>
                  <td>{formData[index]?.letter_grade || "Not Set"}</td>
                  <td>
                    {formData[index]?.grade_points === null || ""
                      ? "Not set"
                      : formData[index]?.grade_points}
                  </td>
                  <td>{formData[index]?.status || "Not Set"}</td>
                  <td>{formData[index]?.determinant || "Not Set"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex flex-row align-items-center justify-content-end gap-3 pe-3 mt-auto py-2 border-top">
          <span>Courses Passed: {formData.filter((items) => items.status === "pass").length}</span>
          <span>Courses Failed: {formData.filter((items) => items.status === "fail").length}</span>
          <span>Resit: 0</span>
          <span>
            GPA:{" "}
            {studentGpa > userData.schoolDetails.max_gpa / 2 ? (
              <span className="text-success">{studentGpa}</span>
            ) : (
              <span className="text-danger">{studentGpa}</span>
            )}
            /{userData.schoolDetails.max_gpa}
          </span>
        </div>
      </div>
    </>
  );
}
export default SummitScores;
