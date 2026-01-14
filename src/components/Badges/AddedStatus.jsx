import { Icon } from "@iconify/react";
function AddedStatus(props) {
  return (
    <>
      <span
        className={`${
          props.value === "added" ? "pill-success" : "pill-warning"
        }`}
      >
        {props.value === "added" ? (
          <Icon icon="icon-park-solid:check-one" className="pill-icon" />
        ) : (
          <Icon icon="icon-park-solid:caution" className="pill-icon" />
        )}
        <span>{`${props.value === "added" ? "Added" : "Not Added"}`}</span>
      </span>
    </>
  );
}
export default AddedStatus;
