import { Icon } from "@iconify/react";
import { Navbarsettings } from "../../components/Navbar";
import { formatNumber } from "../../utils/functions";
function Profile(){
    const user_details = localStorage.getItem("AUTH_USER_DETAILS");
    const formatedData = JSON.parse(user_details);
    return(
        <>
        <Navbarsettings />
        <div>
            <div className="card border-none pb-4 shadow-sm rounded-3 profile-section white-bg d-flex flex-column">
               <div className="top-section rounded-top-4 px-4">
                   <div className="d-flex flex-row profile-picture-group z-5 justify-content-between align-items-center">
                     <div className="profile-img">
                        <img src="./images/portrait-three.jpg" alt="" />
                     </div>
                     <div>
                     <Icon icon="mdi:dots-vertical"  className="fs-3 pointer-cursor"/>
                     </div>
                   </div>
               </div>
               <div className="ms-4 mt-auto">
                <div className="d-block">
                    <h5 className="fw-bold">{formatedData.name}</h5>
                    <div className="d-flex flex-row my-1 gainsboro-color">
                        <span>Yaounde, Cameroon</span>
                    </div>
                    <div className="d-flex flex-row gap-3 mt-2 align-items-center">
                        <span className="font-size-sm fw-medium">@Gilbert.Bernhard57</span>
                        <div className="divider-pill"></div>
                        <span className="font-size-sm fw-medium">{formatedData.role}</span>
                        <div className="divider-pill"></div>
                        <span className="font-size-sm gainsboro-color">{formatedData.employment_status}</span>
                    </div>
                </div>
               </div>
            </div>
            <h5 className="my-2 ms-1 fs-6 fw-bold">Personal Information</h5>
            <div className="card mt-2 px-2 pt-3 height-30 border-none shadow-sm rounded-3 white-bg">
                <div className="d-flex flex-row px-2 justify-content-between">
                <div className="d-flex flex-column gap-2 border-right">
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">E-mail</p>
                    <p className="fs-6">{formatedData.email}</p>
                   </div>
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">Phone</p>
                    <p className="fs-6">832-832-999</p>
                   </div>
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">Gender</p>
                    <p className="fs-6">Female</p>
                   </div>
                </div>
                <div className="d-flex flex-column gap-2">
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">Salary</p>
                    <p className="fs-6">{formatNumber(Number(formatedData.salary))} </p>
                   </div>
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">State Of Origin</p>
                    <p className="fs-6">Northwest</p>
                   </div>
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">Tribe</p>
                    <p className="fs-6">{formatedData.cultural_background}</p>
                   </div>
                </div>
                <div className="d-flex flex-column gap-2">
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">Qualification</p>
                    <p className="fs-6">{formatedData.highest_qualification}</p>
                   </div>
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">Religion</p>
                    <p className="fs-6">{formatedData.religion}</p>
                   </div>
                   <div className="d-block">
                    <p className="gainsboro-color font-size-sm my-0">Address</p>
                    <p className="fs-6">{formatedData.address}</p>
                   </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Profile;