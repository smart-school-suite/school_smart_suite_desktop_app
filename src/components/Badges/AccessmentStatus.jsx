import { Icon } from "@iconify/react"
function AccessmentStatus(props){
    return(
        <>
        <span className={`${props.value === 'accessed' ? "pill-success" : "pill-warning"}`}>
                    {
                        props.value === 'accessed' ?
                        <Icon icon="icon-park-solid:check-one" className="pill-icon" />
                        : <Icon icon="icon-park-solid:caution"  className="pill-icon"  />
                    }
                   <span>{`${props.value === 'accessed' ? "Accessed" : "Not Accessed"}`}</span>
         </span>
        </>
    )
}
export default AccessmentStatus;