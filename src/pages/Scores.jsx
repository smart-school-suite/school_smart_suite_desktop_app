import Greenbutton from "../components/Buttons";
import Navbar from "../components/Navbar";
function Scores(){
  const navBarOptions = {
    route_data: [
        {
            lable:"Scores",
            icon:null,
            route:"/scores"
        },
        {
           lable:"Score Statistics",
           route:"/scores-analytics",
           icon:null
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
                  <p className="font-size-xs my-0">Total Number of Accessed students</p>
                  <h1 className="fw-bold my-0">12,000</h1>
                </div>
                <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
                  <Greenbutton 
                    lable="Create Scores"
                    bg="green-bg"
                    route="/create-scores"
                  />
                </div>
              </div>
        </div>
        </>
    )
}
export default Scores;