import { Icon } from "@iconify/react"
function GradeSubmittedStatus(props){
    return(
        <>
        <span className={`${props.value === 'Submitted' ? "pill-success" : "pill-warning"}`}>
                    {
                        props.value === 'Submitted' ?
                        <Icon icon="icon-park-solid:check-one" className="pill-icon" />
                        : <Icon icon="icon-park-solid:caution"  className="pill-icon"  />
                    }
                   <span>{`${props.value === 'Submitted' ? "Submitted" : "Not Submitted"}`}</span>
         </span>
        </>
    )
}
export default GradeSubmittedStatus;