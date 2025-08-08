import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function AuthLayout(){
    return(
        <>
        <Toaster position="bottom-right" reverseOrder={false}></Toaster>
        <Outlet />
        </>
    )
}
export default AuthLayout;