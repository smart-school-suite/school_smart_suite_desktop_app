import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useGetResitDetails } from "../../hooks/studentResit/useGetResitDetails";
import { Icon } from "@iconify/react";
function ResitDetails({ handleClose, rowData }) {
  const { id: resitId } = rowData;
  const { data: resitDetails, isLoading } = useGetResitDetails(resitId);
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="w-100">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
              <span className="m-0">Resit Details</span>
              <span
                className="m-0"
                onClick={() => {
                  handleClose();
                }}
              >
                <Icon icon="charm:cross" width="22" height="22" />
              </span>
            </div>
          </div>
          <span className="fw-semibold">Student Details</span>
          <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Student Names</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.student.name}</p>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Level Name</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.level.name}</p>
          </div>
        </div>
        <hr />
         <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Level</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.level.level}</p>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Specialty Name</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.specialty.specialty_name}</p>
          </div>
        </div>
        <hr />
        <span className="fw-semibold">Course Details</span>
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Course Name</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.courses.course_name}</p>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Course Code</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.courses.course_code}</p>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Course Credit</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.courses.credit}</p>
          </div>
        </div>
        <span className="fw-semibold">Exam Details</span>
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Exam Name</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.exam.examtype.exam_name}</p>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between my-1 w-100">
          <div className="py-2">
            <p className="my-0 font-size-sm">Exam Score</p>
            <p className="my-0 gainsboro-color font-size-sm">{resitDetails.data.exam.weighted_mark}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResitDetails;
