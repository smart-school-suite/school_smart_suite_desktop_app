import Navbar from "../../../components/Navbar";
import { AdditionalFeesNavBarConfig } from "../../../ComponentConfig/navBarConfig";
function AdditionalFeeTransactions(){
    return(
        <>
        <Navbar 
          options={AdditionalFeesNavBarConfig}
         />
        </>
    )
}
export default AdditionalFeeTransactions;