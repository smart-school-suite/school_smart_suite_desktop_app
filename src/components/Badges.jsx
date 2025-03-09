import { Icon } from "@iconify/react";
function BadgeWarning({ icon, lable }) {
  return (
    <>
      <span
        className=" rounded-1 font-size-sm fw-semibold"
        style={{
          background: "#fffec1",
          color: "#a66a02",
          width: "auto",
          maxWidth: "5rem",
          padding: "0.4rem",
        }}
      >
        <span className={icon ? "mx-1" : null}>
          <Icon icon="fluent:warning-24-filled" width="18" height="18" />
        </span>
        <span className={icon ? "mx-1" : null}>{lable}</span>
      </span>
    </>
  );
}

function BadgeDanger({ icon, lable }) {
  return (
    <>
      <span className=" rounded-1 font-size-sm fw-semibold" 
        style={{ 
           background:"#ffe3e1",
           color:"#e22d20",
           width:"auto",
           maxWidth:"5rem",
           padding:"0.4rem"
        }}
       >
        <span className={icon ? "mx-1" : null}>
        <Icon icon={icon} width="18" height="18" />
        </span>
        <span className={icon ? "mx-1" : null}>{lable}</span>
       </span>
    </>
  );
}

function BadgeSuccess({ icon, lable }) {
  return (
    <>
      <span
        className=" rounded-1 font-size-sm fw-semibold"
        style={{
          background: "#e3f5e3",
          color: "#2d6830",
          width: "auto",
          maxWidth: "5rem",
          padding: "0.4rem",
        }}
      >
        <span className={ icon ? "mx-1" : null}>
          <Icon icon={icon} width="18" height="18" />
        </span>
        <span className={icon ? "mx-1" : null}>{lable}</span>
      </span>
    </>
  );
}

function DataTableBadgeSuccess(props) {
  return (
     <>
        <span
        className=" rounded-1 font-size-sm fw-semibold"
        style={{
          background: "#e3f5e3",
          color: "#2d6830",
          width: "auto",
          maxWidth: "5rem",
          padding: "0.4rem",
        }}
      >
        <span>{props.value}</span>
      </span>
     </>
  );
}

function DataTableBadgeDanger(props) {
  return (
     <>
       <span className=" rounded-1 font-size-sm fw-semibold" 
        style={{ 
           background:"#ffe3e1",
           color:"#e22d20",
           width:"auto",
           maxWidth:"5rem",
           padding:"0.4rem"
        }}
       >
        <span>{props.value}</span>
       </span>
     </>
  );
}

function DataTableBadgeWarning(props) {
  return (
     <>
        <span
        className=" rounded-1 font-size-sm fw-semibold"
        style={{
          background: "#fffec1",
          color: "#a66a02",
          width: "auto",
          maxWidth: "5rem",
          padding: "0.4rem",
        }}
      >
        <span>{props.value}</span>
      </span>
     </>
  );
}

export { BadgeDanger, BadgeSuccess, BadgeWarning, DataTableBadgeDanger, DataTableBadgeSuccess, DataTableBadgeWarning };
