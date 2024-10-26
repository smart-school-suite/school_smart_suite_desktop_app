import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
function Layout(){
    return(
        <>
        <div className="container">
        <div className="row">
          <Sidebar />
          <div className="col-lg-10">
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