import { Icon } from "@iconify/react"
function RegistrationFeeTableBadge(props){
    return(
         <span className={`${props.value === "paid" ? "pill-success" : "pill-warning"}`}>
                    {
                        props.value === "paid" ?
                        <Icon icon="icon-park-solid:check-one" className="pill-icon" />
                        : <Icon icon="icon-park-solid:caution"  className="pill-icon"  />
                    }
                   <span>{`${props.value === "paid" ? "Paid" : "UnPaid"}`}</span>
        </span>
    )
}
export default RegistrationFeeTableBadge