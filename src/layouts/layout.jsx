import Sidebar from "../components/Sidebars/Sidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
function Layout() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false}></Toaster>
      <div className={`${darkMode ? 'dark-bg-light container' : 'container'}`}>
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 col-sm-10 col-md-10">
            <main className={`${darkMode ? 'text-white' : null} pt-1`}>
                <Outlet />
              </main>
          </div>
        </div>
      </div>
    </>
  );
}
export default Layout;
