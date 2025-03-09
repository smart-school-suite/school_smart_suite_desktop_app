import { RegistrationFeesNavBarCongfig } from "../../../ComponentConfig/navBarConfig";
import Navbar from "../../../components/Navbar";
function RegistrationFeeStats(){
    return(
        <>
        <Navbar 
             options={RegistrationFeesNavBarCongfig}
          />
        </>
    )
}
export default RegistrationFeeStats