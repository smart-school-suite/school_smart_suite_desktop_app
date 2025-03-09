import Navbar from "../../../components/Navbar";
import { ResitFeeNavBarConfig } from "../../../ComponentConfig/navBarConfig";
function ResitFeeTransactions(){
    return(
        <>
        <Navbar 
             options={ResitFeeNavBarConfig}
          />
        </>
    )
}
export default ResitFeeTransactions;