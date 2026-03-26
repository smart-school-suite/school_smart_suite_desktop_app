import { Icon } from "@iconify/react";
function RequestedFreePeriod({handleClose}) {
  return (
    <>
      <div className="d-flex flex-column">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Requested Free Period</span>
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
    </>
  );
}
export default RequestedFreePeriod;
