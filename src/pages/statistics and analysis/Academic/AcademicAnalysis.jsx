import Navbar from "../../../components/Navbar";
function AcademicAnalysis(){
    const navBarOptions = {
        route_data: [
            {
                lable:"Financial Analysis",
                icon:null,
                route:"/"
            },
            {
               lable:"Operational Analysis",
               route:"/operational-analysis",
               icon:null
            },
            {
               lable:"Academic Analysis",
               icon:null,
               route:"/academic-analysis"
            }
        ],
   }
    return(
        <>
         <Navbar 
          options={navBarOptions}
        />
        </>
    )
}
export default AcademicAnalysis;