import Emailsidebar from "../../components/Emailsidebar";
import CustomTooltip from "../../components/Tooltip";
import { Icon } from "@iconify/react";
function Sent(){
    return(
        <>
             <div>
            <div className="row">
                <Emailsidebar />
                <div className="col-lg-4">
                    <div className="card border-none px-2 pt-3 pb-2 height-100">
                       <div className="d-flex flex-row justify-content-between align-items-center border-bottom pb-1">
                       <h5 className="color-primary my-0 fw-semibold">Emails Sent</h5>
                        <div className="px-1 py-1 d-flex align-items-center rounded-2 primary-background-50 gap-2">
                            <button className="border-none rounded-2 font-size-sm primary-background text-white px-3 py-1">All Mail</button>
                            <button className="border-none rounded-2 font-size-sm transparent-bg color-primary px-3 py-1">Unread</button>
                        </div>
                       </div>
                       <div className="input-section my-2">
                        <input type="search" className="form-control form-control-sm" placeholder="Search For Mails"/>
                       </div>
                       <div className="card my-1 rounded-3 p-2 primary-background-50">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className="my-0 fw-bold font-size-sm"> <span>To</span> <span>example@gmail.com</span> </p>
                            <p className="my-0 fw-semibold font-size-xs gainsboro-color">About 3 Months Ago</p>
                        </div>
                        <div className="d-flex flex-row align-items-center my-2 justify-content-between">
                            <p className="my-0 fw-semibold font-size-sm">Web development internship</p>
                        </div>
                        <p className="font-size-sm gainsboro-color">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, neque.
                             Esse laudantium sequi, sapiente....</p>
                       </div>
                       <div className="card my-1 rounded-3 p-2">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className="my-0 fw-bold font-size-sm"> <span>To</span> <span>example@gmail.com</span> </p>
                            <p className="my-0 fw-semibold font-size-xs gainsboro-color">About 3 Months Ago</p>
                        </div>
                        <div className="d-flex flex-row align-items-center my-2 justify-content-between">
                            <p className="my-0 fw-semibold font-size-sm">Web development internship</p>
                        </div>
                        <p className="font-size-sm gainsboro-color">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, neque.
                             Esse laudantium sequi, sapiente....</p>
                       </div>
                       <div className="card my-1 rounded-3 p-2">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className="my-0 fw-bold font-size-sm"> <span>To</span> <span>example@gmail.com</span> </p>
                            <p className="my-0 fw-semibold font-size-xs gainsboro-color">About 3 Months Ago</p>
                        </div>
                        <div className="d-flex flex-row align-items-center my-2 justify-content-between">
                            <p className="my-0 fw-semibold font-size-sm">Web development internship</p>
                        </div>
                        <p className="font-size-sm gainsboro-color">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, neque.
                             Esse laudantium sequi, sapiente....</p>
                       </div>
                       <div className="card my-1 rounded-3 p-2">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className="my-0 fw-bold font-size-sm"> <span>To</span> <span>example@gmail.com</span> </p>
                            <p className="my-0 fw-semibold font-size-xs gainsboro-color">About 3 Months Ago</p>
                        </div>
                        <div className="d-flex flex-row align-items-center my-2 justify-content-between">
                            <p className="my-0 fw-semibold font-size-sm">Web development internship</p>
                        </div>
                        <p className="font-size-sm gainsboro-color">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, neque.
                             Esse laudantium sequi, sapiente....</p>
                       </div>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="card d-flex flex-column border-none pt-3 pb-2 height-100 px-1">
                         <div className="d-flex flex-row justify-content-between px-2 gainsboro-color align-items-center">
                         <div className="d-flex flex-row align-items-center gap-4 border-right">
                         <CustomTooltip placement="bottom" tooltipText="Archive Email"> 
                         <span className="fs-6"><Icon icon="solar:archive-broken" /></span>
                         </CustomTooltip>
                         <CustomTooltip placement="bottom" tooltipText="Move Email To Junk">
                         <span className="fs-6"><Icon icon="ion:trash-bin-outline" /></span>
                         </CustomTooltip>
                         <CustomTooltip placement="bottom" tooltipText="Move email to Trash">
                         <span className="fs-6"><Icon icon="tabler:trash" /></span>
                         </CustomTooltip>
                         <div className="divider-sm"></div>
                         <CustomTooltip placement="bottom" tooltipText="Snooze">
                         <span className="fs-6"><Icon  icon="weui:time-outlined" /></span>
                         </CustomTooltip>
                         </div>
                         <div className="d-flex align-items-center gap-4">
                            <CustomTooltip placement="bottom" tooltipText="reply">
                            <span className="fs-6"><Icon icon="proicons:arrow-reply" /></span>
                            </CustomTooltip>
                            <CustomTooltip placement="bottom" tooltipText="Reply All">
                            <span className="fs-6"><Icon icon="streamline:mail-send-reply-all-email-message-reply-all-actions-action-arrow" /></span>
                            </CustomTooltip>
                            <CustomTooltip placement="bottom" tooltipText="forward">
                            <span className="fs-6"><Icon icon="proicons:arrow-foward" /></span>
                            </CustomTooltip>
                            <div className="divider-sm"></div>
                            <span><Icon icon="charm:menu-kebab" /></span>
                         </div>
                         </div>
                         <hr className="my-3"/>
                         <div className="d-flex flex-row align-items-start justify-content-between">
                            <div className="d-flex flex-row align-items-start gap-2">
                                <div className="em-avatar">
                                    WS
                                </div>
                                <div className="d-block font-size-sm">
                                 <p className="my-0">Willaim Smith</p>
                                 <p className="my-0">Meeting Tomorrow</p>
                                 <div className="d-flex">
                                    <span>Reply-To:</span>
                                    <span>Williamsmith@gmail.com</span>
                                 </div>
                                </div>
                            </div>
                            <div className="date-area font-size-sm">
                                <span>Oct 22, 2024, 9:00:00 AM</span>
                            </div>
                         </div>
                         <hr className="my-3"/>
                         <div className="message-body pt-2 font-size-sm ">
                            <p>
                            Hi, let's have a meeting tomorrow to discuss the project. 
                            I've been reviewing the project details and have some ideas I'd like to share.
                             It's crucial that we align on our next steps to ensure the project's success.
                            </p>
                            <p>
                            Please come prepared with any questions or insights you may have. Looking forward to our meeting!
                            </p>
                            <p>
                            Best regards, William
                            </p>
                         </div>
                         <div className="mt-auto">
                         <hr className="my-3"/>
                            <div className="card">
                            <textarea 
                             className="form-control"
                             id="exampleFormControlTextarea1" 
                             rows="3"
                             placeholder="Reply  <span>To</span> <span>example@gmail.com</span> ..."
                             ></textarea>
                            </div>
                            <div className="d-flex flex row justify-content-end">
                                <button className="border-none rounded-3 p-2 w-25 my-2 primary-background text-white font-size-sm">Send Email</button>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Sent;