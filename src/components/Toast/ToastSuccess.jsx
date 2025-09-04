import { Icon } from "@iconify/react";
function ToastSuccess({ title, description }) {
  return (
    <>
      <div className="p-2 rounded-3  toast-success border">
        <div className="d-flex flex-row align-items-center gap-2">
          <Icon
            icon="material-symbols-light:check-circle-rounded"
            color="#5CB85C"
            width="50"
            height="50"
          />
          <div className="d-block">
            <span className="fw-semibold">{title}</span>
            <p className="font-size-sm m-0 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ToastSuccess;
