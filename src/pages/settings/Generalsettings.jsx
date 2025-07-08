import { Icon } from "@iconify/react";
function Generalsettings() {
  return (
    <>
      <div className="d-flex flex-column gap-2">
           <div>
            <span style={{ fontSize: "0.87rem" }} className="fw-semibold">Country Details</span>
            <div className="card border-none p-2 w-100 d-flex flex-column rounded-4 gap-2"
             style={{ fontSize: "0.87rem" }}
            >
               <div className="d-flex flex-column">
                  <span>Country Name</span>
                  <span className="gainsboro-color fw-light">Cameroon</span>
               </div>
               <hr />
               <div className="d-flex flex-column">
                  <span>Official Language</span>
                  <span className="gainsboro-color fw-light">French</span>
               </div>
               <hr />
               <div className="d-flex flex-column">
                  <span>Currency</span>
                  <span className="gainsboro-color fw-light" >XAF</span>
               </div>
            </div>
           </div>
           <div>
            <span style={{ fontSize: "0.87rem" }} className="fw-semibold">Application Details</span>
             <div className="card border-none p-2 w-100 d-flex flex-column rounded-4 gap-2"
             style={{ fontSize: "0.87rem" }}
            >
               <div className="d-flex flex-column">
                  <span>App Name</span>
                  <span className="gainsboro-color fw-light">School Smart Suite (SSS) Desktop</span>
               </div>
               <hr />
               <div className="d-flex flex-column">
                  <span>Version</span>
                  <span className="gainsboro-color fw-light">1.23.10</span>
               </div>
            </div>
           </div>
          </div>
    </>
  );
}
export default Generalsettings;
