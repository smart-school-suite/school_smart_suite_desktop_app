import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { formatDate } from "../../utils/functions";
import { useGetSchoolSemesterDetails } from "../../hooks/schoolSemester/useGetSchoolSemesterDetails"
function SemeseterDetails({ handleClose, rowData }) {
  const { id:semesterId } = rowData;
  const { data: schoolSemesterDetails, isLoading } = useGetSchoolSemesterDetails(semesterId);
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Semester Details</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm">Start Date</span>
            <span className="my-0 font-size-sm gainsboro-color">{formatDate(schoolSemesterDetails.data.start_date)}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm">End Date</span>
            <span className="my-0 font-size-sm gainsboro-color">
              {formatDate(schoolSemesterDetails.data.end_date)}
            </span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm">Semester</span>
            <span className="my-0 font-size-sm gainsboro-color">
              {schoolSemesterDetails.data.semester.name}
            </span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm">Semester</span>
            <span className="my-0 font-size-sm gainsboro-color">
              {schoolSemesterDetails.data.student_batch.name}
            </span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm">Specialty Name</span>
            <span className="my-0 font-size-sm gainsboro-color">
              {schoolSemesterDetails?.data?.specialty?.specialty_name}
            </span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm">Level Name</span>
            <span className="my-0 font-size-sm gainsboro-color">{schoolSemesterDetails?.data?.specialty?.level?.name}</span>
          </div>
        </div>
        <hr />
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm">Level Number</span>
            <span className="my-0 font-size-sm gainsboro-color">{schoolSemesterDetails?.data?.specialty?.level?.level}</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default SemeseterDetails;
