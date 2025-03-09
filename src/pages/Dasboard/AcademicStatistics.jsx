import Navbar from "../../components/Navbar";
import { DashboardNavabarOptions } from "../../ComponentConfig/navBarConfig";
function AcademicStatistics(){
    return(
        <>
          <Navbar options={DashboardNavabarOptions}/>
        </>
    )
}
export default AcademicStatistics;