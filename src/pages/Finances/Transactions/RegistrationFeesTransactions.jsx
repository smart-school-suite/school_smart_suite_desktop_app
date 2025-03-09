import Navbar from "../../../components/Navbar";
import { RegistrationFeesNavBarCongfig } from "../../../ComponentConfig/navBarConfig";
function RegistrationFeeTransactions(){
    return(
        <>
        <Navbar 
             options={RegistrationFeesNavBarCongfig}
          />
        </>
    )
}
export default RegistrationFeeTransactions;