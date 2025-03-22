import { Icon } from "@iconify/react";
function ToastWarning({ title, description }) {
  return (
    <>
      <div className="p-2 rounded-4 toast-warning">
        <div className="d-flex flex-row align-items-center gap-2">
          <Icon
            icon="mingcute:warning-fill"
            width="50"
            height="50"
            color="#ffa500"
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
export default ToastWarning;
