import { useSelector } from "react-redux";
import { formatNumber } from "../../utils/functions";
function CurrencyComponent(props){
    const currency = useSelector((state) => state.auth.user);
    return(
        <>
        <span className="text-overflow-elipse overflow-hidden my-0 text-start">{formatNumber(parseFloat(props.value))} {currency.schoolDetails.school.country.currency}</span>
        </>
    )
}
export default CurrencyComponent;