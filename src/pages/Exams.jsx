import Greenbutton from "../components/Buttons";
import Navbar from "../components/Navbar";
function Exams(){
  const navBarOptions = {
    route_data: [
        {
            lable:"Exams",
            icon:"healthicons:i-exam-multiple-choice-outline",
            route:"/exams"
        },
        {
           lable:"Exam Analysis",
           route:"/exam-analysis",
           icon:"icon-park-outline:market-analysis"
        },
        {
           lable:"Grades Configuration",
           icon:"ix:configuration",
           route:"/grades-configuration"
        }
    ],
}
    return(
        <>
        <Navbar 
             options={navBarOptions}
         />
        <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
                <div className="d-block">
                  <p className="font-size-xs my-0">Total Number of Exams</p>
                  <h1 className="fw-bold my-0">500</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create New Exam"
                    bg="green-bg"
                    route="/create-exam"
                  />
                </div>
          </div>
          
        </div>
        </>
    )
}
export default Exams;