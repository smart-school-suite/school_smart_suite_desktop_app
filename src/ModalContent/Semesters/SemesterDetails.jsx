import Pageloaderspinner from "../../components/Spinners";
import { useFetchSchoolSemesterDetaislQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
import { formatDate } from "../../utils/functions";
function SemeseterDetails({ handleClose, row_id: schoolSemesterId }) {
  const { data: schoolSemesterDetails, isLoading } =
    useFetchSchoolSemesterDetaislQuery({
      schoolSemesterId: schoolSemesterId,
    });
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Specialty Details</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="my-2">
          <p className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
            molestias repellendus facere voluptate?
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm fw-light">Start Date</span>
            <span className="my-0">{formatDate(schoolSemesterDetails.data.start_date)}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm fw-light">End Date</span>
            <span className="my-0">
              {formatDate(schoolSemesterDetails.data.end_date)}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm fw-light">Semester</span>
            <span className="my-0">
              {schoolSemesterDetails.data.semester.name}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm fw-light">Semester</span>
            <span className="my-0">
              {schoolSemesterDetails.data.student_batch.name}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm fw-light">Status</span>
            {schoolSemesterDetails.data.status === "active" ? (
              <span
                className=" rounded-1 font-size-sm "
                style={{
                  background: "#e3f5e3",
                  color: "#2d6830",
                  width: "auto",
                  maxWidth: "10rem",
                  padding: "0.2rem",
                }}
              >
                <span>Semester Active</span>
              </span>
            ) : (
              <span
                className=" rounded-1 font-size-sm "
                style={{
                  background: "#fffec1",
                  color: "#a66a02",
                  width: "auto",
                  maxWidth: "12rem",
                  padding: "0.2rem",
                }}
              >
                <span>Semester inActive</span>
              </span>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm fw-light">Specialty Name</span>
            <span className="my-0">
              {schoolSemesterDetails.data.specailty.specialty_name}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100 border-bottom">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm fw-light">Level Name</span>
            <span className="my-0">{schoolSemesterDetails.data.specailty.level.name}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-2 w-100">
          <div className=" py-2 d-flex flex-column">
            <span className="my-0 font-size-sm fw-light">Level Number</span>
            <span className="my-0">{schoolSemesterDetails.data.specailty.level.level}</span>
          </div>
        </div>
      </div>
    </>
  );
}
export default SemeseterDetails;
