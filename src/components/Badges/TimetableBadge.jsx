import { Icon } from "@iconify/react";
function TimetableBadge(props){
    return(
        <>
        <span className={`${props.value === "created" ? "pill-success" : "pill-warning"}`}>
                            {
                                props.value === "created" ?
                                <Icon icon="icon-park-solid:check-one" className="pill-icon" />
                                : <Icon icon="icon-park-solid:caution"  className="pill-icon"  />
                            }
                           <span>{`${props.value === "created" ? "Created" : "Not Created"}`}</span>
                </span>
        </>
    )
}

export default TimetableBadge;