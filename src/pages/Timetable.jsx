import Table from "../components/Tables";
import Greenbutton from "../components/Buttons";
function Timetable(){
    return(
        <>
        <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0"></p>
                  <h1 className="fw-bold my-0">12,000</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create Timetable"
                  />
                </div>
              </div>
              <Table />
        </div>
        </>
    )
}
export default Timetable