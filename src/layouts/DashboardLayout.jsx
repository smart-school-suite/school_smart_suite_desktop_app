import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBars/Navbar";
function DashboardLayout() {
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default DashboardLayout;
