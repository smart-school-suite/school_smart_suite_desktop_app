import Navbar from "../../../components/Navbar";
import { ResitFeeNavBarConfig } from "../../../ComponentConfig/navBarConfig";
function ResitFeeStats(){
    return(
        <>
        <Navbar 
             options={ResitFeeNavBarConfig}
          />
        </>
    )
}
export default ResitFeeStats;