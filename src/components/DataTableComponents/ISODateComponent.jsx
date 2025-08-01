import { formatISODate } from "../../utils/functions";
function ISODateComponent(props){
    return (
        <>
        <span className="text-overflow-elipse overflow-hidden my-0 text-start">{formatISODate(props.value)}</span>
        </>
    )
}
export default ISODateComponent;