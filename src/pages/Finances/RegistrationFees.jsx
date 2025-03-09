import Navbar from "../../components/Navbar";
import { RegistrationFeesNavBarCongfig } from "../../ComponentConfig/navBarConfig";
function RegistrationFees(){
    return(
        <>
          <Navbar 
             options={RegistrationFeesNavBarCongfig}
          />
        </>
    )
}
export default RegistrationFees;