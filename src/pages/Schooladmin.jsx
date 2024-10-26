import Greenbutton from "../components/Buttons";
import Table from "../components/Tables";
function Schooladmin(){
    return(
        <>
        <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number of School adminstrators</p>
                  <h1 className="fw-bold my-0">12,000</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create Admin"
                  />
                </div>
              </div>
        </div>
        </>
    )
}
export default Schooladmin;