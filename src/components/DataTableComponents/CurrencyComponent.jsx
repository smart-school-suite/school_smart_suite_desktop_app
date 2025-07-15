import { useSelector } from 'react-redux';
import { formatNumber } from '../../utils/functions';
function CurrencyComponent(props) {
    const currencyState = useSelector((state) => state.auth.user);
    const userCurrencySymbol = currencyState?.schoolDetails?.school?.country?.currency || '';
    const displayValue = props.value == null || props.value === '' ? 0 : parseFloat(props.value);
    return (
        <>
            <span className="text-overflow-elipse overflow-hidden my-0 text-start">
                {/* Format the numeric value */}
                {formatNumber(displayValue)}{' '}
                {/* Display the currency symbol */}
                {userCurrencySymbol}
            </span>
        </>
    );
}

export default CurrencyComponent;
