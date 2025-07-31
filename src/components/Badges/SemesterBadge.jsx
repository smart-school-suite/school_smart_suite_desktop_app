import { Icon } from "@iconify/react";
function SemesterBadge(props){
    return(
        <>
        <span className={`${props.value === 'active' ? "pill-success" : props.value === 'inactive' ? "pill-warning" : 'pill-pending'}`}>
                    {
                        props.value === 'active' ?
                        <Icon icon="fluent:live-20-regular" className="pill-icon"/>:
                         props.value === 'inactive' ?
                         <Icon icon="pajamas:expire" className="pill-icon" /> : 
                         <Icon icon="material-symbols:pending-outline" className="pill-icon" />
                        
                    }
                   <span>{`${props.value === 'active' ? "Active" : props.value === 'inactive' ? 'InActive' : 'Pending'}`}</span>
        </span>
        </>
    )
}
export default SemesterBadge;