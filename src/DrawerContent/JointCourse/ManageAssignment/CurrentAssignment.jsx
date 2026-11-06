import { Icon } from "@iconify/react";
import "../../../styles/jointCourseAssignment.css";
import TeacherAvatar from "./TeacherAvatar";
function CurrentAssignment({ teacher, onChange, onAssign, justUpdatedId }) {
  if (!teacher) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center gap-2 p-3 rounded-4"
        style={{ border: "1px dashed #cbd5e1" }}
      >
        <div
          style={{ width: "2.25rem", height: "2.25rem" }}
          className="bg-white rounded-circle shadow-sm d-flex align-items-center justify-content-center text-primary-500 border border-iron-200"
        >
          <Icon icon="lucide:user-round-plus" width={18} height={18} />
        </div>

        <div className="d-flex flex-column gap-1">
          <span className="fw-semibold text-iron-800 font-size-sm">
            No teacher assigned yet
          </span>
          <p
            className="text-iron-500 font-size-xs mb-0 px-2"
            style={{ lineHeight: "1.4" }}
          >
            Assign the teacher responsible for this joint course. Its weekly
            times can only be set once it has one.
          </p>
        </div>

        <button
          type="button"
          className="d-flex align-items-center 
          justify-content-center gap-2 rounded-3
           bg-primary-500 text-white border-none
            px-3 py-2 font-size-sm  fw-medium shadow-sm mt-1"
          onClick={onAssign}
        >
          <span>Assign Teacher</span>
        </button>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-2">
        <div className="card border-none border rounded-4 p-2">
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-row align-items-center">
              <TeacherAvatar teacher={teacher} size="lg" />
              <div className="d-flex flex-column font-size-sm">
                <span className="text-truncate fw-medium">{teacher.name}</span>
                <span className="text-truncate text-iron-500 fw-light">
                  @{teacher.username}
                </span>
              </div>
            </div>
            <button
              type="button"
              className="w-100 border-none border 
              rounded-pill p-2  bg-none 
              d-flex flex-row align-items-center gap-2
                justify-content-center"
              onClick={onChange}
            >
              <Icon icon="lucide:repeat-2" width={16} height={16} />
              <span>Change Teacher</span>
            </button>
          </div>
        </div>
    </div>
  );
}

export default CurrentAssignment;
