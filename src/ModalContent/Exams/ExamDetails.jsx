import { Icon } from "@iconify/react";
import { formatDate } from "../../utils/functions";
import { useGetExamDetails } from "../../hooks/exam/useGetExamDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function ExamDetails({ rowData, handleClose }) {
  const { id: examId } = rowData;
  const { data: examDetails, isLoading, error } = useGetExamDetails(examId);
  return (
    <>
      <div className="w-100 ">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Exam Details</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        {isLoading ? (
          <div className="d-flex flex-column gap-2 modal-content-container">
            <div className="d-flex flex-column gap-4">
              {[...Array(10)].map((_, index) => (
                <div className="d-flex gap-1 flex-column" key={index}>
                  <RectangleSkeleton height="1dvh" width="40%" />
                  <RectangleSkeleton height="1dvh" width="15%" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="modal-content-container">
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Exam Title</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {examDetails.data.examtype.exam_name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Semester</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {examDetails.data.semester.name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Student Batch</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {examDetails.data.student_batch.name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Specailty</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {examDetails.data.specialty.specialty_name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Level</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {examDetails.data.level.level}, {examDetails.data.level.name}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">School Year</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {examDetails.data.school_year}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Start Date</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {formatDate(examDetails.data.start_date)}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">End Date</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {formatDate(examDetails.data.end_date)}
                </p>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between my-1 w-100">
              <div className="py-2">
                <p className="my-0 font-size-sm">Weighted Mark</p>
                <p className="my-0 gainsboro-color font-size-sm">
                  {examDetails.data.weighted_mark}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default ExamDetails;
