import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function AuthLayout(){
    return(
        <>
        <Toaster></Toaster>
        <Outlet />
        </>
    )
}
export default AuthLayout;