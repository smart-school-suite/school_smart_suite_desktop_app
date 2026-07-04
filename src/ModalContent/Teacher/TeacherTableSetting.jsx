import { Icon } from "@iconify/react";
function TeacherTableSetting({ handleClose, rowData }) {
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="font-size-sm fw-bold">Teacher Table Settings</span>
        <span
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
    </>
  );
}
export default TeacherTableSetting;
