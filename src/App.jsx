import { Icon } from "@iconify/react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Table from "./components/Tables";
function App() {
  return (
    <>
      <div className="container">
        <div className="row">
          <Sidebar />
          <div className="col-lg-10">
            <div className="container">
              <Navbar />
              <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number of students</p>
                  <h1 className="fw-bold my-0">12,000</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <div className="search-group">
                    <span>
                      <Icon
                        icon="material-symbols:search"
                        className="fs-5"
                        style={{ color: "#888" }}
                      />
                    </span>
                    <input type="search" placeholder="Search for anything" />
                  </div>
                  <button className="filter-btn border-none justify-content-between px-2 width-10 search-btn-color d-flex flex-row align-items-center rounded-3">
                    <span className="font-size-sm fw-medium">Filter</span>
                    <Icon icon="iconoir:filter" />
                  </button>
                  <button className="action-btn border-none justify-content-center px-2 fw-medium d-flex flex-row rounded-3 align-items-center green-bg text-white font-size-sm ">
                    Create Student
                  </button>
                </div>
              </div>
             <Table />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
