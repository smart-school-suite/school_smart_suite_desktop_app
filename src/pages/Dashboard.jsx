import Navbar from "../components/Navbar";
import Progress from "../components/Progress";
function Dashboard(){
    const navBarOptions = {
         route_data: [
             {
                 lable:"Financial Analysis",
                 icon:"fluent-mdl2:financial",
                 route:"/"
             },
             {
                lable:"Operational Analysis",
                route:"/operational-analysis",
                icon:"ep:operation"
             },
             {
                lable:"Academic Analysis",
                icon:"heroicons:academic-cap",
                route:"/academic-analysis"
             }
         ],
    }
    return(
        <>
        <Navbar 
          options={navBarOptions}
        />
        <Progress />
        </>
    )
}
export default Dashboard