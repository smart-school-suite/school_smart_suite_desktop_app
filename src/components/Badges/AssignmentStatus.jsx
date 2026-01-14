import { Icon } from "@iconify/react"
function AssignmentPill(props){
    return(
        <>
        <span className={`${props.value === 'assigned' ? "pill-success" : "pill-warning"}`}>
                    {
                        props.value === 'assigned' ?
                        <Icon icon="icon-park-solid:check-one" className="pill-icon" />
                        : <Icon icon="icon-park-solid:caution"  className="pill-icon"  />
                    }
                   <span>{`${props.value === 'assigned' ? "Assigned" : "Unassigned"}`}</span>
                 </span>
        </>
    )
}
export default AssignmentPill