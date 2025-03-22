import Pageloaderspinner from "../../components/Spinners";
import { useFetchExamDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
function ExamDetails({ row_id, handleClose }) {
    const {
      data: examDetails,
      isLoading,
      error,
    } = useFetchExamDetailsQuery({
      exam_id: row_id,
    });
    if (isLoading) {
      return <Pageloaderspinner />;
    }
    return (
      <>
        <div className="w-100">
          <span className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates,
            neque soluta? Ea culpa reiciendis mi
          </span>
          <div className="w-100 mt-2">
            <p className="fs-6 my-2">Exam Details</p>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">
                  {examDetails.data.examtype.exam_name}
                </p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Exam Title
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">
                  {examDetails.data.semester.name}
                </p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Semester
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">
                  {examDetails.data.specialty.specialty_name}
                </p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Specailty
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">{examDetails.data.level.level}</p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Level
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">{examDetails.data.school_year}</p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  School Year
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">
                  {convertToReadableDate(examDetails.data.start_date)}
                </p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Start Date
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">
                  {convertToReadableDate(examDetails.data.end_date)}
                </p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  End Date
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">
                  {convertToReadableDate(examDetails.data.end_date)}
                </p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  End Date
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between my-1">
              <button
                className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="clarity:email-line" />
              </button>
              <div className="border-bottom py-2" style={{ width: "87%" }}>
                <p className="my-0">
                  {examDetails.data.weighted_mark}
                </p>
                <p
                  className="my-0 font-size-sm gainsboro-color"
                  onClick={() => {
                    handleShow();
                  }}
                >
                  Weighted Mark
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  export default ExamDetails;