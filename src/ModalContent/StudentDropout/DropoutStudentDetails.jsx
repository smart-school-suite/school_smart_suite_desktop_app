import Pageloaderspinner from "../../components/Spinners";
import { useFetchStudentDropoutDetailsQuery } from "../../Slices/Asynslices/fetchSlice";
import { Icon } from "@iconify/react";
function DropoutStudentDetails({ handleClose, row_id: studentDropoutId }) {
  const { data: details, isLoading: isDetialsLoading } =
    useFetchStudentDropoutDetailsQuery(studentDropoutId);
  if (isDetialsLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <h5 className="m-0">Drop out student details</h5>
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
      <div className="d-flex align-items-center justify-content-between my-3">
        <button
          className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "2.5rem",
          }}
        >
          <Icon icon="ph:phone" />
        </button>

        <div
          className="border-bottom py-2 d-flex flex-column"
          style={{ width: "87%" }}
        >
          <span className="my-0 font-size-sm gainsboro-color">
            Student Full Names
          </span>
          <span className="my-0">{details.data.student.name}</span>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-3">
        <button
          className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "2.5rem",
          }}
        >
          <Icon icon="ph:phone" />
        </button>

        <div
          className="border-bottom py-2 d-flex flex-column"
          style={{ width: "87%" }}
        >
          <span className="my-0 font-size-sm gainsboro-color">Specialty</span>
          <span className="my-0">{details.data.specialty.specialty_name} </span>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-3">
        <button
          className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "2.5rem",
          }}
        >
          <Icon icon="ph:phone" />
        </button>

        <div
          className="border-bottom py-2 d-flex flex-column"
          style={{ width: "87%" }}
        >
          <span className="my-0 font-size-sm gainsboro-color">Level</span>
          <span className="my-0">
            {details.data.level.name}, {details.data.level.level}{" "}
          </span>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between my-3">
        <button
          className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "2.5rem",
          }}
        >
          <Icon icon="ph:phone" />
        </button>

        <div
          className="border-bottom py-2 d-flex flex-column"
          style={{ width: "87%" }}
        >
          <span className="my-0 font-size-sm gainsboro-color">
            Reason for Dropout
          </span>
          <span className="my-0">{details.data.reason} </span>
        </div>
      </div>
    </>
  );
}
export default DropoutStudentDetails;
