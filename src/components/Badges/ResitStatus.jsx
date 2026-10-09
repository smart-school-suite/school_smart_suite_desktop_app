import { Icon } from "@iconify/react";
function ResitStatusRenderer(props) {
  return (
    <>
      <span
        className={`${props.value ? "bg-old-lace-50 text-old-lace-600" : "primary-background-50 color-primary"}`}
        style={{
          maxWidth: "10rem",
          height: "1.2rem",
          fontSize: "0.65rem",
          paddingInline: "0.4rem",
          borderRadius: "0.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.4rem",
        }}
      >
        {props.value ? (
          <Icon icon="icon-park-solid:caution" className="pill-icon" />
        ) : (
          <Icon icon="icon-park-solid:check-one" className="pill-icon" />
        )}
        <span>{`${props.value ? "Carry Over" : "Resit Registered"}`}</span>
      </span>
    </>
  );
}
export default ResitStatusRenderer;
