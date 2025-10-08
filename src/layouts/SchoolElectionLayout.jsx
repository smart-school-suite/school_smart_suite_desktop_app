import SchoolElectionSideBar from "../components/SideBars/SchoolElection";
import { Outlet } from "react-router-dom";
import { ElectionIcon } from "../icons/Icons";
import { useSelector } from "react-redux";
import { ModalButton } from "../components/DataTableComponents/ActionComponent";
import CreateElection from "../ModalContent/Elections/CreateElection";
import { Icon } from "@iconify/react";
function SchoolElectionLayout() {
    const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <main className="main-container gap-2">
        <div style={{ height:"5%" }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className={`${
                darkMode ? "dark-mode-active" : "light-mode-active"
              } d-flex justify-content-center align-items-center`}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
                background: "#e6efd8",
              color: "#769946",
              }}
            >
              <ElectionIcon />
            </div>
            <span className="my-0 fw-semibold">Manage School Elections</span>
          </div>
      </div>
      <div style={{ height: "95%" }}>
          <div className="d-flex flex-row align-items-start gap-2 w-100 h-100">
            <div className="d-flex flex-column width-20 h-100 gap-2">
              <ModalButton
              action={{ modalContent:CreateElection }}
              size={"lg"}
            >
              <button className="border-none rounded-3 justify-content-between w-100 font-size-sm d-flex flex-row gap-2 align-items-center" 
            style={{ background:"#b2cc8a", padding:"0.7rem", color:"#f5f8ed" }}>
              <span>Create Election</span>
              <span><Icon icon="icons8:plus" className="font-size-md" /></span>
            </button>
            </ModalButton>
              <SchoolElectionSideBar />
            </div>
            <div className="width-80 h-100">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default SchoolElectionLayout;
