import { Icon } from "@iconify/react";
function GradesConfigTableBadge(props) {
  return (
    <span className={`${props.value === 1 ? "pill-success" : "pill-warning"}`}>
      {props.value === 1 ? (
        <Icon icon="icon-park-solid:check-one" className="pill-icon" />
      ) : (
        <Icon icon="icon-park-solid:caution" className="pill-icon" />
      )}
      <span>{`${props.value === 1 ? "Configured" : "Not Configured"}`}</span>
    </span>
  );
}
export default GradesConfigTableBadge;
