import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { useState, useEffect } from "react";
import { useFetchAccessedCoursesQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useAddStudentScoreMutation } from "../../Slices/Asynslices/postSlice";
import { MinimumScoreInput } from "../../components/formComponents";
import NumberFlow from "@number-flow/react";
import toast from "react-hot-toast";// Moved to the correct import
function Createstudentscores() {
    const { exam_id, student_id } = useParams();
    const [scoresData, setScoresData] = useState([]);
    const [gradesDeterminant, setGradesDeterminant] = useState([]);
    const [gpa, setGpa] = useState(0);
    
    const {
      data: accessed_courses,
      isLoading: isAccessedCoursesLoading,
      error: AccessedCoursesError,
    } = useFetchAccessedCoursesQuery({
      exam_id: exam_id,
      student_id: student_id,
    });
    
    const [addStudentScore] = useAddStudentScoreMutation();
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
      if (accessed_courses?.accessed_courses) {
        const accessedCourses = accessed_courses.accessed_courses.map((item) => ({
          student_id: item.student_id,
          courses_id: item.course_id,
          exam_id: item.exam_id,
          level_id: item.level_id,
          specialty_id: item.specailty_id,
          score: 0.0,
        }));
        setScoresData(accessedCourses);
        // Set grades determinant from the response
        setGradesDeterminant(accessed_courses.grades_determinant);
        console.table(accessed_courses.grades_determinant);
      }
    }, [accessed_courses]);

    const handleScoreChange = (index, field, value) => {
      const numericValue = parseFloat(value);
      setScoresData((prevScore) => {
        const newScore = [...prevScore];
        newScore[index] = {
          ...newScore[index],
          [field]: value,
        };
        return newScore; // Correctly return the new state
      });
      
      // Calculate GPA and Letter Grade
      calculateGPA(scoresData);
    };
  
    const calculateGrade = (score) => {
      const grade = gradesDeterminant.find(grade => score >= grade.minimum_score);
      return grade ? {
        letterGrade: grade.letter_grade,
        gradePoints: parseFloat(grade.grade_points),
      } : { letterGrade: "F", gradePoints: 0 };
    };
  
    const calculateGPA = (scores) => {
      let totalGradePoints = 0;
      let totalCourses = scores.length;
  
      scores.forEach(driver => {
        if (driver.score) {
          const { gradePoints } = calculateGrade(parseFloat(driver.score));
          totalGradePoints += gradePoints;
        } 
      });
  
      const calculatedGPA = totalCourses > 0 ? (totalGradePoints / totalCourses).toFixed(2) : 0;
      setGpa(calculatedGPA);
    };

    const handleSubmit = async () => {
      const payload = {
        student_scores: scoresData.map(item => ({
            student_id: item.student_id,
            courses_id: item.courses_id,
            exam_id: item.exam_id,
            level_id: item.level_id,
            specialty_id: item.specialty_id, // Corrected property name
            score: Number(item.score),
        })),
      };

      try {
        await addStudentScore(payload).unwrap();
        toast.success("Scores submitted successfully!");
        navigate("/accessed-students");
      } catch (error) {
        toast.error("Failed to submit score. Try again.");
      }
    };

    if (isAccessedCoursesLoading) {
      return <Pageloaderspinner />;
    }

    if (AccessedCoursesError) {
      return <div>Error loading courses.</div>; // Handle error state
    }

    return (
      <>
        <div className="container">
          <div className="d-flex flex-row justify-content-between my-4 align-items-center">
            <div>
              <h5 className="my-0">
                Fill Student Scores {exam_id} {student_id}
              </h5>
            </div>
            <div className="d-flex flex-row gap-2">
              <button className="border-none rounded-3 p-2 green-bg font-size-sm text-white"
                onClick={handleSubmit}
              >
                Submit Scores
              </button>
            </div>
          </div>
          <div
            className="card rounded-4 pb-2 px-2"
            style={{
              height: "85vh", // Fixed typo from "85dvh"
              overflowY: "scroll",
              scrollBehavior: "smooth",
              overflowX: "hidden",
            }}
          >
            <table>
              <thead className="border-bottom text-center font-size-sm rounded-3 gainsboro-color timetable-head">
                <tr>
                  <th className="text-start">Course Title</th>
                  <th className="text-start">Score</th>
                  <th>Weighted Mark</th>
                  <th>Letter Grade</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {accessed_courses.accessed_courses.map((items, index) => {
                  const { letterGrade } = calculateGrade(scoresData[index]?.score ? parseFloat(scoresData[index].score) : 0);
                  return (
                    <tr key={index} className="timetable-row"> {/* Added key */}
                      <td>{items.course_name}</td>
                      <td>
                        <MinimumScoreInput 
                          maxValue={Number(items.weighted_mark)}
                          value={scoresData[index]?.score || ""} // Corrected use of optional chaining
                          onChange={(value) => handleScoreChange(index, 'score', value)}
                        />
                      </td>
                      <td className="text-center">{items.weighted_mark}</td>
                      <td className="text-center">{letterGrade}</td>
                      <th className="text-center">
                        <button className="border-none rounded-pill font-size-sm px-2 green-bg text-white">
                          Passed
                        </button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="mt-auto d-flex flex-row justify-content-end me-4">
              <div className="d-flex flex-row gap-3 align-items-center">
                <div className="d-flex align-items-center gap-4">
                  <span>Resits</span>
                  <button className="border-none px-2 py-1 rounded-3 font-size-sm ">
                    23
                  </button>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span>Passed Courses</span>
                  <button className="border-none px-2 py-1 rounded-3 font-size-sm ">
                    23
                  </button>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span>Failed Courses</span>
                  <button className="border-none px-2 py-1 rounded-3 font-size-sm ">
                    23
                  </button>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <span>GPA</span>
                  <button className="border-none px-2 py-1 rounded-3 font-size-sm ">
                    <NumberFlow value={gpa} />/4.00
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Createstudentscores;