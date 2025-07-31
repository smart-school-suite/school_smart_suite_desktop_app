import { Icon } from "@iconify/react";

const UpdateIcon = ({ iconStyle, iconClass }) => {
    return (
         <Icon icon="iconamoon:edit-thin" style={{...iconStyle, fontSize:"1rem"}} className={`${iconClass}`}/>
    )
}

const DeleteIcon = ({ iconStyle, iconClass }) => {
    return (
        <Icon icon="fluent:delete-20-regular" style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`} />
    )
}

const DetailsIcon = ({ iconStyle, iconClass }) => {
    return (
        <Icon icon="clarity:details-line" style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`}/>
    )
}

const CreateIcon = ({ iconStyle, iconClass }) => {
    return (
        <Icon icon="ic:round-plus"  style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`}/>
    )
}

const PermissionIcon = ({ iconStyle, iconClass }) => {
    return (
       <Icon icon="fluent:shield-24-regular" style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`} />
    )
}

const RoleIcon = ({ iconStyle, iconClass }) => {
    return (
         <Icon icon="iconoir:group" style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`} />
    )
}

const SuspendIcon = ({ iconStyle, iconClass }) => {
    return (
        <Icon icon="carbon:pause-outline" style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`} />
    )
}


const CancelIcon = ({ iconStyle, iconClass }) => {
    return (
        <Icon icon="iconoir:cancel" style={{...iconStyle, fontSize:"1rem"}}  />
    )
}

const ChoiceIcon = ({ iconStyle }) => {
     return (
        <Icon icon="mingcute:choice-line" style={{...iconStyle, fontSize:"1rem"}} />
     )
}

const ActivateIcon = ({ iconStyle }) => {
     return(
        <Icon icon="material-symbols-light:notifications-active-outline-rounded" style={{...iconStyle, fontSize:"1rem"}} />
     )
}

const ReuseIcon = ({ iconStyle }) => {
     return (
        <Icon icon="fluent:recycle-32-regular" style={{...iconStyle, fontSize:"1rem"}} />
     )
}

export { ReuseIcon, UpdateIcon, DeleteIcon, DetailsIcon, CreateIcon, PermissionIcon, RoleIcon, SuspendIcon,  CancelIcon, ChoiceIcon, ActivateIcon }