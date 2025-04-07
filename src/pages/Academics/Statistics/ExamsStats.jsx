import Navbar from "../../../components/Navbar";
import { GradesConfigurationNavbarOptions } from "../../../ComponentConfig/navBarConfig";
function ExamStatistics(){
    return(
        <>
        <Navbar options={GradesConfigurationNavbarOptions} />
        </>
    )
}
export default ExamStatistics;