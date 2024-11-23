import Navbar from "../components/Navbar";
import Greenbutton from "../components/Buttons";
function StudentBatches(){
    const navBarOptions = {
        route_data: [
            {
                lable:"Student Batches",
                icon:null,
                route:"/student-batches"
            },
            {
               lable:"Financial Analysis",
               route:"/exam-analysis",
               icon:null
            },
            {
               lable:"Academic Analysis",
               icon:null,
               route:"/grades-configuration"
            }
        ],
    }
    return(
        <>
        <div>
            <Navbar 
              options={navBarOptions}
            />
        </div>
        <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number of batches</p>
                  <h1 className="fw-bold my-0">13</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create Student Batch"
                    bg="green-bg"
                    route="/create-exam"
                  />
                </div>
          </div>
          
        </div>
        </>
    )
}
export default StudentBatches;