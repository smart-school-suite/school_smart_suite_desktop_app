import { Icon } from "@iconify/react";
import { useGetExamResultDetails } from "../../hooks/examResults/useGetExamResultDetails";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { ExamIcon, StudentIcon } from "../../icons/Icons";
function ExamResultDetails({ handleClose, rowData }) {
  const { id: resultId } = rowData;
  const { data: resultDetails, isLoading } = useGetExamResultDetails(resultId);
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 px-2">
        <span className="m-0">Exam Result Details</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="font-size-sm d-flex flex-row align-items-center gap-2 px-2 primary-color-dark mb-1">
        <div 
         style={{
              width:"2.5rem",
              height:"2.5rem",
              borderRadius:"2.5rem"
         }}
         className="primary-background-50 primary-color-dark d-flex flex-row align-items-center justify-content-center"
        >
         <ExamIcon />
        </div>
        <div className="d-flex flex-column">
            <span className="fw-semibold">{resultDetails.data.exam.examtype.exam_name}</span>
            <span className="fw-medium">{resultDetails.data.exam.school_year}</span>
        </div>
      </div>
      <div className="font-size-sm d-flex flex-row align-items-center gap-2 px-2 primary-color-dark">
        <div 
         style={{
              width:"2.5rem",
              height:"2.5rem",
              borderRadius:"2.5rem"
         }}
         className="primary-background-50 primary-color-dark d-flex flex-row align-items-center justify-content-center"
        >
         <StudentIcon />
        </div>
        <div className="d-flex flex-column fw-medium">
            <span className="fw-semibold">{resultDetails.data.student.name}</span>
            <span className="fw-medium">{resultDetails.data.specialty.specialty_name}, {resultDetails.data.level.name}</span>
        </div>
      </div>
      <div className="modal-content-container-sm px-2">
        {JSON.parse(resultDetails.data.score_details).map((items) => (
          <div className="card border-none primary-background-50 p-2 my-2 d-flex flex-column gap-4 primary-color-dark rounded-3">
            <div className="d-flex flex-row w-100 align-items-center justify-content-between">
              <div className="d-flex align-items-center justify-content-between w-100">
                <span className=" font-size-sm fw-semibold">
                  {items.course_name}
                </span>
                <span className="fw-semibold">{items.grade}</span>
              </div>
            </div>
            <div className="d-flex flex-column font-size-sm">
              <span>{items.gratification}</span>
              <span>Grade Points Earned {items.grade_points}/4.00</span>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-between w-100  font-size-sm fw-semibold">
              <span className="text-capitalize">{items.grade_status}</span>
              <span>
                {items.score}/{resultDetails.data.exam.weighted_mark}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex flex-row align-items-center w-100 justify-content-between mt-3">
        <div className="d-flex flex-column align-items-center primary-color-dark border-end w-25">
            <span className="font-size-sm fw-light">Total Score</span>
            <span className="fw-bold">{resultDetails.data.total_score}</span>
        </div>
        <div className="d-flex flex-column align-items-center primary-color-dark border-end w-25">
            <span className="font-size-sm fw-light">GPA</span>
            <span className="fw-bold">{resultDetails.data.gpa}</span>
        </div>
        <div className="d-flex flex-column align-items-center primary-color-dark border-end w-25">
            <span className="font-size-sm fw-light">Exam Status</span>
            <span className="fw-bold text-capitalize">{resultDetails.data.exam_status}</span>
        </div>
        <div className="d-flex flex-column align-items-center primary-color-dark w-25">
            <span className="font-size-sm fw-light">Courses Sat</span>
            <span className="fw-bold">{JSON.parse(resultDetails.data.score_details).length}</span>
        </div>
      </div>
    </>
  );
}
export default ExamResultDetails;
