import Navbar from "../../components/Navbar";
import { ExamResitNavbarOptions } from "../../ComponentConfig/navBarConfig";
function ResitCourses(){
    return(
        <>
        <Navbar options={ExamResitNavbarOptions} />
        </>
    )
}
export default ResitCourses;