import Emailsidebar from "../../components/Emailsidebar";
function Draft(){
    return(
        <>
        <div>
            <div className="row">
                <Emailsidebar />
                <div className="col-lg-9">
                    <div className="card border-none px-2 pt-3 pb-2 height-100">
                       <div className="d-flex flex-row justify-content-between align-items-center border-bottom pb-1">
                       <h5 className="color-primary my-0 fw-semibold">Draft</h5>
                        <div className="px-1 py-1 d-flex align-items-center rounded-2 primary-background-50 gap-2">
                            <button className="border-none rounded-2 font-size-sm primary-background text-white px-3 py-1">All Mail</button>
                            <button className="border-none rounded-2 font-size-sm transparent-bg color-primary px-3 py-1">Unread</button>
                        </div>
                       </div>
                       <div className="input-section my-2">
                        <input type="search" className="form-control form-control-sm" placeholder="Search For Mails"/>
                       </div>
                       <div className="card my-1 rounded-3 p-2 email-box">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className="my-0 fw-bold font-size-sm"> <span>To</span> <span>example@gmail.com</span> </p>
                            <p className="my-0 fw-semibold font-size-xs gainsboro-color">About 3 Months Ago</p>
                        </div>
                        <div className="d-flex flex-row align-items-center my-2 justify-content-between">
                            <p className="my-0 fw-semibold font-size-sm">Web development intern</p>
                        </div>
                        <p className="font-size-sm gainsboro-color">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, neque.
                             Esse laudantium sequi, sapiente....</p>
                             <div className="d-flex flex-row justify-content-end">
                                <button className="border-none rounded-3 font-size-sm">
                                    Delete from draft
                                </button>
                             </div>
                       </div>
                       <div className="card my-1 rounded-3 p-2 email-box">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className="my-0 fw-bold font-size-sm"> <span>To</span> <span>example@gmail.com</span> </p>
                            <p className="my-0 fw-semibold font-size-xs gainsboro-color">About 3 Months Ago</p>
                        </div>
                        <div className="d-flex flex-row align-items-center my-2 justify-content-between">
                            <p className="my-0 fw-semibold font-size-sm">Web development intern</p>
                        </div>
                        <p className="font-size-sm gainsboro-color">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, neque.
                             Esse laudantium sequi, sapiente....</p>
                             <div className="d-flex flex-row justify-content-end">
                                <button className="border-none rounded-3 font-size-sm">
                                    Delete from draft
                                </button>
                             </div>
                       </div>
                       <div className="card my-1 rounded-3 p-2 email-box">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className="my-0 fw-bold font-size-sm"> <span>To</span> <span>example@gmail.com</span> </p>
                            <p className="my-0 fw-semibold font-size-xs gainsboro-color">About 3 Months Ago</p>
                        </div>
                        <div className="d-flex flex-row align-items-center my-2 justify-content-between">
                            <p className="my-0 fw-semibold font-size-sm">Web development intern</p>
                        </div>
                        <p className="font-size-sm gainsboro-color">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, neque.
                             Esse laudantium sequi, sapiente....</p>
                             <div className="d-flex flex-row justify-content-end">
                                <button className="border-none rounded-3 font-size-sm">
                                    Delete from draft
                                </button>
                             </div>
                       </div>
                       <div className="card my-1 rounded-3 p-2 email-box">
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <p className="my-0 fw-bold font-size-sm"> <span>To</span> <span>example@gmail.com</span> </p>
                            <p className="my-0 fw-semibold font-size-xs gainsboro-color">About 3 Months Ago</p>
                        </div>
                        <div className="d-flex flex-row align-items-center my-2 justify-content-between">
                            <p className="my-0 fw-semibold font-size-sm">Web development intern</p>
                        </div>
                        <p className="font-size-sm gainsboro-color">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis, neque.
                             Esse laudantium sequi, sapiente....</p>
                             <div className="d-flex flex-row justify-content-end">
                                <button className="border-none rounded-3 font-size-sm">
                                    Delete from draft
                                </button>
                             </div>
                       </div>
                    </div>
                </div>
                
            </div>
        </div>
        </>
    )
}
export default Draft;