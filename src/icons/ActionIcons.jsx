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
        <Icon icon="line-md:plus"  style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`}/>
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

const HodIcon = ({ iconStyle, iconClass }) => {
    return (
        <Icon icon="solar:user-plus-broken" style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`} />
    )
}

const HosIcon = ({ iconStyle, iconClass }) => {
    return (
        <Icon icon="ph:user-circle-plus" style={{...iconStyle, fontSize:"1rem"}}  className={`${iconClass}`}  />
    )
}

const CancelIcon = ({ iconStyle, iconClass }) => {
    return (
        <Icon icon="iconoir:cancel" style={{...iconStyle, fontSize:"1rem"}}  />
    )
}
export { UpdateIcon, DeleteIcon, DetailsIcon, CreateIcon, PermissionIcon, RoleIcon, SuspendIcon, HosIcon, HodIcon, CancelIcon }