import Navbar from "../../../components/Navbar";
import { AdditionalFeesNavBarConfig } from "../../../ComponentConfig/navBarConfig";
function AdditionalFeeStats(){
    return(
        <>
        <Navbar 
          options={AdditionalFeesNavBarConfig}
         />
        </>
    )
}
export default AdditionalFeeStats;