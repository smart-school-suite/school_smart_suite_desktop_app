import Navbar from "../components/Navbar";
import TimeTableGrid from "../components/timeTableGrid";
import { Icon } from "@iconify/react";
function SchoolTimeTable(){
    const navBarOptions = {
        route_data: [
            {
                lable:"Specialty Timetable",
                icon:"tabler:category-2",
                route:"/time-table"
            },
            {
               lable:"Exam Timetable",
               route:"/exam-timetable",
               icon:"healthicons:i-exam-multiple-choice-outline" 
            },
            {
               lable:"School Timetable",
               icon:"teenyicons:school-outline",
               route:"/school-timetable"
            }
        ],
    }
    return(
        <>
         <Navbar 
           options={navBarOptions}
         />
         <div className="d-flex flex-row align-items-center justify-content-between my-2">
            <div className="d-fl py-2 px-2 d-flex flex-row align-items-center justify-content-center gap-3 rounded-3 align-items-center gap-2">
                <button className="border-none bg-white d-flex justify-content-center align-items-center" style={{ width:"3rem", height:"3rem", borderRadius:"3rem" }}>
                <Icon icon="akar-icons:schedule" className="fs-5 color-primary"/>
                </button>
                <h5 className="my-0 fw-semibold">School Calender</h5>
            </div>
            <div className="d-flex flex-row gap-2">
                <button className="border-none green-bg rounded-3 p-2 text-white font-size-sm">
                    Create Time Table
                </button>
            </div>
         </div>
         <TimeTableGrid />
        </>
    )
}
export default SchoolTimeTable;