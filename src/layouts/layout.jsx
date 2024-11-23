import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NetworkStatus from "../features/networkStatus";
function Layout(){
    return(
        <>
        <Toaster></Toaster>
        <div className="container">
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 col-sm-10 col-md-10">
            <div className="container">
              <main className="transition-four-sec">
               <Outlet />
              </main>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}
export default Layout;