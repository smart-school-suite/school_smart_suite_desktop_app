import Navbar from "../../components/Navbar";
import { AdditionalFeesNavBarConfig } from "../../ComponentConfig/navBarConfig";
function AdditionalFees(){
    return(
        <>
         <Navbar 
          options={AdditionalFeesNavBarConfig}
         />
        </>
    )
}
export default AdditionalFees;
