import { Icon } from "@iconify/react";
function JobError({ handleClose, rowData }) {
  const { jobId } = rowData;
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between w-100">
        <span className="m-0">Job Error</span>
        <span
          className="m-0"
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
export default JobError;
