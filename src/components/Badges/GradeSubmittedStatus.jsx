import { Icon } from "@iconify/react";
function GradeSubmittedStatus(props) {
  return (
    <>
      <span className={`${props.value ? "pill-success" : "pill-warning"}`}>
        {props.value ? (
          <Icon icon="icon-park-solid:check-one" className="pill-icon" />
        ) : (
          <Icon icon="icon-park-solid:caution" className="pill-icon" />
        )}
        <span>{`${props.value ? "Evaluated" : "Not Evaluated"}`}</span>
      </span>
    </>
  );
}
export default GradeSubmittedStatus;
