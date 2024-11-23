import { Icon } from "@iconify/react";
import { useLocation, useNavigate } from "react-router-dom";
function Emailsidebar(){
  const navigate = useNavigate();
  const location = useLocation();
    return(
        <>
        <div className="col-lg-3">
                    <div className="card border-none pt-3 pb-3 height-100">
                        <div className="d-flex flex-row mb-2 align-items-center color-primary px-2 w-100 justify-content-start gap-3">
                            <span><Icon icon="clarity:email-line" className="fs-4"/></span>
                        <h5 className=" fw-bold my-0">Emails</h5>
                        </div>
                        <div className="d-flex flex-row align-items-center justify-content-center px-2 my-2">
                        <button 
                        className="border-none primary-background-100 fw-semibold align-items-center justify-content-between  color-primary rounded-3 w-100 p-3 d-flex flex-row gap-3"
                         onClick={() => {
                            navigate("/emails/compose-email");
                         }}
                        >
                          <span>
                          <Icon icon="cil:pen" />
                          </span>
                          <span className="fs-6">Compose Email</span>
                        </button>
                        </div>
                      <div
                      className={ 
                        location.pathname === "/emails/inbox" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1 gainsboro-color mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" } 
                         >
                        <div 
                        className="d-flex align-items-center gap-3 flex-row ps-3 fw-medium font-size-sm"
                        onClick={() => {
                          navigate("/emails/inbox")
                       }}
                        >
                          <span className="fs-6"><Icon icon="solar:inbox-broken" /></span>
                          <span>Inbox</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm fw-medium">230</span>
                        </div>
                      </div>
                      <div 
                      className={ 
                         location.pathname === "/emails/draft" ?
                         "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                         "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" }
                       onClick={() => {
                          navigate("/emails/draft")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="material-symbols:draft-outline" /></span>
                          <span>Draft</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <div 
                       className={ 
                        location.pathname === "/emails/sent" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                       onClick={() => {
                         navigate("/emails/sent")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="hugeicons:sent" /></span>
                          <span>Sent</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <div 
                      className={ 
                        location.pathname === "/emails/junk" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                       onClick={() => {
                          navigate("/emails/junk")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="ion:trash-bin-outline" /></span>
                          <span>Junk</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <div 
                      className={ 
                        location.pathname === "/emails/trash" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                       onClick={() => {
                         navigate("/emails/trash")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="tabler:trash" /></span>
                          <span>Trash</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <div 
                      className={ 
                        location.pathname === "/emails/archieve" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                       onClick={() => {
                          navigate("/emails/archieve")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="solar:archive-broken" /></span>
                          <span>Archive</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <hr className="mx-3"/>
                      <div 
                      className={ 
                        location.pathname === "/emails/socials" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                       onClick={() => {
                         navigate("/emails/socials")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="uit:social-distancing" /></span>
                          <span>Socials</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <div 
                      className={ 
                        location.pathname === "/settings/updates" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                       onClick={() => {
                         navigate("/settings/updates")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="solar:smartphone-update-broken" /></span>
                          <span>Updates</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <div 
                      className={ 
                        location.pathname === "/emails/forums" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                       onClick={() => {
                         navigate("/emails/forums")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="healthicons:forum-outline" /></span>
                          <span>Forums</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <div 
                       className={ 
                        location.pathname === "/emails/shopping" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                       onClick={() => {
                         navigate("/emails/shopping")
                       }}
                      >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="ic:outline-shopping-bag" /></span>
                          <span>Shopping</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                      <div  className={ 
                        location.pathname === "/emails/promotion" ?
                        "d-flex flex-row align-items-center justify-content-between my-1 primary-background-50 color-primary mx-1 py-2 rounded-2 transition-four-sec pointer-cursor transition-four-sec pointer-cursor" :
                        "d-flex flex-row align-items-center justify-content-between my-1  mx-1 py-2 rounded-2 transition-four-sec pointer-cursor gainsboro-color" 
                       }
                        onClick={() => {
                           navigate("/emails/promotion")
                        }}
                       >
                        <div className="d-flex align-items-center gap-3 flex-row ps-3  font-size-sm">
                          <span className="fs-6"><Icon icon="hugeicons:promotion" /></span>
                          <span>Promotion</span>
                        </div>
                        <div className="pe-3">
                            <span className="font-size-sm">230</span>
                        </div>
                      </div>
                    </div>
                </div>
        </>
    )
}
export default Emailsidebar;