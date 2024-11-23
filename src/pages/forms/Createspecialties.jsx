import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Customdropdown from "../../components/Dropdowns";
function Createspecialties(){
    const navigate = useNavigate();
    const navBarOptions = {
      route_data: [
          {
              lable:"Specialties",
              icon:null,
              route:"/specialties"
          },
          {
             lable:"Academic Analysis",
             icon:null,
             route:"/academic-analysis"
          },
          {
            lable:"Financial Analysis",
            route:"/financial-analysis",
            icon:null
         }
      ],
  }
    return(
        <>
         <Navbar 
           options={navBarOptions}
        />
         <div className="d-flex flex-row justify-content-between w-100  align-items-center my-2">
        <div className="d-flex flex-row align-items-center gap-2">
          <div className="badge-input d-flex flex-row align-items-center justify-content-center">
            <Icon
              icon="clarity:administrator-line"
              className="fs-3 color-primary"
            />
          </div>
          <p className="my-0 fs-6 fw-semibold">Create New Specailty</p>
        </div>
        <div>
          <button
            className="border-none rounded-2 font-size-sm p-2 d-flex flex-row gap-4 primary-background text-white"
            onClick={() => {
              navigate("/courses");
            }}
          >
            <span>
              <Icon icon="ion:arrow-back" className="fs-5" />
            </span>
            <span>Back</span>
          </button>
        </div>
      </div>
      <div className="w-100 d-flex flex-column align-items-center justify-content-center height-90 pt-1 pb-2">
        <div className="card w-100 rounded-4 py-2 px-3">
          <div className="heading my-1">
            <h4 className="text-center">Create New Specialty</h4>
          </div>
          <div className="my-1">
            <label>Specialty Name</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Specialty Name"
            />
          </div>
          <div className="my-1">
            <label>Select Department</label>
            <Customdropdown />
          </div>
          <div className="my-1">
            <label>Registration Fee</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Registration Fee"
            />
          </div>
          <div className="my-1">
            <label>Tuition Fee</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Tuition Fee"
            />
          </div>
          <div className="my-2">
            <button className="border-none rounded-3 w-100 fs-6 text-white p-2 primary-background">
              Create Specialty
            </button>
          </div>
        </div>
      </div>
        </>
    )
}
export default Createspecialties;