import { Icon } from "@iconify/react";
function GradesConfigTableBadge(props) {
  return (
    <span className={`${props.value === true ? "pill-success" : "pill-warning"}`}>
      {props.value === true ? (
        <Icon icon="icon-park-solid:check-one" className="pill-icon" />
      ) : (
        <Icon icon="icon-park-solid:caution" className="pill-icon" />
      )}
      <span>{`${props.value === true ? "Configured" : "Not Configured"}`}</span>
    </span>
  );
}
export default GradesConfigTableBadge;
