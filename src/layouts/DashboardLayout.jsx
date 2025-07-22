import { Outlet } from "react-router-dom";;
import Navbar from "../components/NavBars/Navbar";
function DashboardLayout(){
    return(
        <>
        <Navbar />
        <div>
            <Outlet />
        </div>
        </>
    )
}
export default DashboardLayout;