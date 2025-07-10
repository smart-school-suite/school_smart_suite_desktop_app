import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useFetchExamDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
import { formatDate } from "../../utils/functions";
function ExamDetails({ row_id: examId, handleClose }) {
  const { data: examDetails, isLoading } = useFetchExamDetailsQuery({
    exam_id: examId,
  });
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100 mt-2">
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Exam Details {examId}</h5>
              <span
                className="m-0"
                onClick={() => {
                  handleClose();
                }}
              >
                <Icon icon="charm:cross" width="22" height="22" />
              </span>
            </div>
            <span className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              harum nesciunt sunt
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">Exam Title</p>
            <p className="my-0">{examDetails.data.examtype.exam_name}</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">Semester</p>
            <p className="my-0">
              {examDetails.data.semester.name}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">Student Batch</p>
            <p className="my-0">
              {examDetails.data.student_batch.name}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">Specailty</p>
            <p className="my-0">{examDetails.data.specialty.specialty_name}</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">Level</p>
            <p className="my-0">{examDetails.data.level.level}, {examDetails.data.level.name}</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">School Year</p>
            <p className="my-0">{examDetails.data.school_year}</p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">Start Date</p>
            <p className="my-0">
              {formatDate(examDetails.data.start_date)}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100 border-bottom">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">End Date</p>
            <p className="my-0">
              {formatDate(examDetails.data.end_date)}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm gainsboro-color">Weighted Mark</p>
            <p className="my-0">{examDetails.data.weighted_mark}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ExamDetails;
