import Pageloaderspinner from "../../components/Spinners/Spinners";
import { useGetResitDetails } from "../../hooks/studentResit/useGetResitDetails";
import { Icon } from "@iconify/react";
import { formatNumber } from "../../utils/functions";
function ResitFeeDetails({ rowData, handleClose }) {
  const { id: resitId } = rowData;
  const { data: resitDetails, isLoading } = useGetResitDetails(resitId);
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Resit Fee Details</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="modal-content-container">
          <div className="d-flex flex-column gap-1">
            <span className="font-size-md fw-semibold">Course Details</span>
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                  Course Title
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.courses.course_name}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                  Course Code
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.courses.course_code}
                </span>
              </div>
            </div>
            <hr />
             <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                  Course Credit
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.courses.credit}
                </span>
              </div>
            </div>
            <span className="font-size-md fw-semibold">Exam Details</span>
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                 Exam Name
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.exam.examtype.exam_name}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                 Weighted Mark
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.exam.weighted_mark}
                </span>
              </div>
            </div>
            <span className="font-size-md fw-semibold">Student Details</span>
             <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                Student Name
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.student.name}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                 Gender
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.student.gender}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                 Specialty Name
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.specialty.specialty_name}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                 Level Name
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.level.name}
                </span>
              </div>
            </div>
            <span className="font-size-md fw-semibold">Resit Details</span>
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                Resit Fee
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {formatNumber(resitDetails?.data?.resit_fee)}
                </span>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center justify-content-between">
              <div className="py-2 d-flex flex-column">
                <span className="my-0 font-size-sm">
                Payment Status
                </span>
                <span className="my-0 font-size-sm gainsboro-color">
                  {resitDetails?.data?.paid_status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ResitFeeDetails;
