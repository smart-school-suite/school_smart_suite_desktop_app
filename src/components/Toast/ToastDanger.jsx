import { Icon } from "@iconify/react";
function ToastDanger({ title, description }) {
  return (
    <>
      <div
        className="p-2 rounded-4 toast-danger"
      >
        <div className="d-flex flex-row align-items-center gap-2">
          <Icon
            icon="solar:danger-triangle-bold"
            color="#ff0000"
            width="45"
            height="45"
          />
          <div className="d-block">
            <span className="fw-semibold">{title}</span>
            <p className="font-size-sm m-0 mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default ToastDanger;
