import { Icon } from "@iconify/react";
import { Navbarsettings } from "../../components/Navbar";
function Account(){
    return(
        <>
        <Navbarsettings />
        <div>
        <h5 className="mt-2 fs-6">Profile Picture</h5>
               <div className="white-bg d-flex flex-row py-3 rounded-3 align-items-center w-100 pe-3 ps-3">
               <div className="start-component d-flex flex-row align-items-center gap-3">
                 <div className="protrait">
                    <img src="./images/portrait-six" alt=""/>
                 </div>
                 <div className="vertical-line"></div>
                 <div className="d-block">
                    <p className="my-0 fw-medium">Change Update or Delete Photo</p>
                    <p className="gainsboro-color font-size-sm">
                        You can update your profile picture once every 3 months
                    </p>
                 </div>
               </div>
               <div className="end-component d-flex flex-row gap-3 ms-auto">
                    <div className="d-block">
                        <button className="border-none font-size-sm rounded-3 p-2 primary-background-50">
                           Upload Picture
                        </button>
                        <p className="my-0 font-size-xs">Max file size - 2MB</p>
                    </div>
                    <div>
                    <button className="border-danger text-danger transparent-bg  rounded-3 p-2 font-size-sm">
                       Delete Photo
                    </button>
                    </div>
                 </div>
               </div>
               <h5 className="mt-3 fs-6">Personal Information</h5>
               <div className="card border-none shadow-sm px-3 rounded-3 py-1">
                <div className="d-flex flex-row gap-4">
                  <div className="width-50">
                    <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Full Name</p>
                        <p className=" fs-6 fw-bold my-1">Chongong Keron</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Email</p>
                        <p className=" fs-6 fw-bold my-1">Chongongkeron@gmail.com</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Username</p>
                        <p className=" fs-6 fw-bold my-1">@chongongprecious</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Phone Number</p>
                        <p className=" fs-6 fw-bold my-1">812-223-445</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Gender</p>
                        <p className=" fs-6 fw-bold my-1">Female</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                  </div>
                  <div className="width-50">
                  <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Gender</p>
                        <p className=" fs-6 fw-bold my-1">Female</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Gender</p>
                        <p className=" fs-6 fw-bold my-1">Female</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Gender</p>
                        <p className=" fs-6 fw-bold my-1">Female</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center border-bottom justify-content-between pb-1 my-4">
                      <div className="d-block">
                        <p className="my-0 font-size-sm gainsboro-color">Gender</p>
                        <p className=" fs-6 fw-bold my-1">Female</p>
                      </div>
                      <div>
                      <Icon icon="icon-park-outline:edit-two" className="fs-5 gainsboro-color"/>
                      </div>
                    </div>
                    <div className="w-100 d-flex flex-row justify-content-end">
                     <button className="border-none mt-3 py-2 px-3 rounded-3 primary-background font-size-sm text-white">Save Changes</button>
                    </div>
                  </div>
                </div>
               </div>
        </div>
        </>
    )
}
export default Account;