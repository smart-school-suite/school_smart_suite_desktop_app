import { formatDate } from "../../utils/functions";
function DateComponent(props){
    return(
        <>
        <span className="text-overflow-elipse overflow-hidden my-0 text-start">{formatDate(props.value)}</span>
        </>
    )
}
export default DateComponent;