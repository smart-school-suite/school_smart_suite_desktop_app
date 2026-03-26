import { Icon } from "@iconify/react";
function UsedStatus(props) {
  return (
    <>
      <span
        className={`${props.value == true ? "pill-success" : "pill-warning"}`}
      >
        {props.value == true ? (
          <Icon icon="icon-park-solid:check-one" className="pill-icon" />
        ) : (
          <Icon icon="prime:hourglass" className="pill-icon" />
        )}
        <span>{`${props.value == true ? "Used" : "Unused"}`}</span>
      </span>
    </>
  );
}
export default UsedStatus;
