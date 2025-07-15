import { Icon } from "@iconify/react"
function SpecailtyTableBadge(props){
    return (
         <span className={`${props.value === 'active' ? "pill-success" : "pill-warning"}`}>
            {
                props.value === 'active' ?
                <Icon icon="icon-park-solid:check-one" className="pill-icon" />
                : <Icon icon="icon-park-solid:caution"  className="pill-icon"  />
            }
           <span>{`${props.value === 'active' ? "Activated" : "Deactivated"}`}</span>
         </span>
    )
}

export default SpecailtyTableBadge;