import { Icon } from "@iconify/react";
function ConfigStatusBadge(props){
    return(
         <span className={`${props.value == "configured" ? "pill-success" : "pill-warning"}`}>
              {props.value == "configured" ? (
                <Icon icon="icon-park-solid:check-one" className="pill-icon" />
              ) : (
                <Icon icon="icon-park-solid:caution" className="pill-icon" />
              )}
              <span>{`${props.value == "configured" ? "Configured" : "Not Configured"}`}</span>
            </span>
    )
}
export default ConfigStatusBadge;