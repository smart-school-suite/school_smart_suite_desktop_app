import { Icon } from "@iconify/react";
export function ExamGradingBadge(props){
  return(
     <>
      <span className={`${props.value === 1 ? "pill-success" : "pill-warning"}`}>
            {
                props.value === 1 ?
                <Icon icon="icon-park-solid:check-one" className="pill-icon" />
                : <Icon icon="icon-park-solid:caution"  className="pill-icon"  />
            }
           <span>{`${props.value === 1 ? "Added" : "Not Added"}`}</span>
         </span>
     </>
  )
}