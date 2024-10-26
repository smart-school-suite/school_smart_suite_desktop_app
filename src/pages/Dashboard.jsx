import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar";
import Greenbutton from "../components/Buttons";
function Dashboard(){
    return(
        <>
        <Navbar />
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number of students</p>
                  <h1 className="fw-bold my-0">12,000</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create Admin"
                  />
                </div>
              </div>
        </>
    )
}
export default Dashboard