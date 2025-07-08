import { Outlet } from "react-router-dom";
import SettingSideBar from "../components/SideBars/SetttingSideBar";
 function SetttingLayout(){
     return(
        <>
               <div className="py-3  setting-container">
                 <div className="row align-items-center d-flex">
                   <div style={{ width: "20%" }}>
                     <SettingSideBar />
                   </div>
                   <div style={{ width: "80%" }} className="d-flex mb-auto flex-column gap-2 setting-outlet" >
                     <Outlet />
                   </div>
                 </div>
               </div>
        </>
     )
 }
 export default SetttingLayout;