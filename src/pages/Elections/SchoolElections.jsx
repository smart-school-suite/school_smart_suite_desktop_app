import SchoolElectionSideBar from "../../components/SideBar/SchoolElection";
import { Icon } from "@iconify/react";
function SchoolElection() {
  return (
    <>
      <div className="container pt-2">
        <div className="row">
          <SchoolElectionSideBar />
        <div className="col-lg-9 pt-4">
           <div className="d-flex flex-row gap-2 align-items-center mt-4">
             <div
              style={{
                 width:"2rem",
                 height:"2rem",
                 borderRadius:"0.5rem"
              }}
              className="d-flex align-items-center justify-content-center primary-background text-white" 
             >
             <span>
              <Icon icon="mage:dashboard-4-fill" />
             </span>
             </div>
             <span>Overview</span>
           </div>
           <div className="row">
            <div className="col-lg-4">
              <div className="card my-1 p-2 rounded-3 d-flex flex-column"
               style={{
                 height:"15dvh"
               }}
              >
                <div className="align-items-center d-flex gap-2">
                   <div
                    style={{
                       width:"2rem",
                       height:"2rem",
                       borderRadius:"2rem",
                       background:"#f9f9f9"
                    }}
                    className="d-flex align-items-center justify-content-center"
                   > <span>IC</span> 
                   </div>
                   <span className="font-size-md">Number of Elections</span>

                </div>
                <span className="font-size-lg fw-bold mt-auto">205</span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card my-1 p-2 rounded-3 d-flex flex-column"
               style={{
                 height:"15dvh"
               }}
              >
                <div className="align-items-center d-flex gap-2">
                   <div
                    style={{
                       width:"2rem",
                       height:"2rem",
                       borderRadius:"2rem",
                       background:"#f9f9f9"
                    }}
                    className="d-flex align-items-center justify-content-center"
                   > <span>IC</span> 
                   </div>
                   <span className="font-size-md">Number of Votes</span>

                </div>
                <span className="font-size-lg fw-bold mt-auto">205K</span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card my-1 p-2 rounded-3 d-flex flex-column"
               style={{
                 height:"15dvh"
               }}
              >
                <div className="align-items-center d-flex gap-2">
                   <div
                    style={{
                       width:"2rem",
                       height:"2rem",
                       borderRadius:"2rem",
                       background:"#f9f9f9"
                    }}
                    className="d-flex align-items-center justify-content-center"
                   > <span>IC</span> 
                   </div>
                   <span className="font-size-md">Number of Candidates</span>

                </div>
                <span className="font-size-lg fw-bold mt-auto">205</span>
              </div>
            </div>
           </div>
           <div className="row">
            <div className="col-lg-7">
              <div className="card p-2">
                <span className="font-size-sm">Election Role With Highest Application</span>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="card p-2">
               <span className="font-size-sm">Number of Votes by Specialty</span>
              </div>
            </div>
           </div>
        </div>
        </div>
      </div>
    </>
  );
}
export default SchoolElection;
