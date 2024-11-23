import { Icon } from "@iconify/react";
function Customersupport(){
    return(
        <>
        <div className="height-100 d-flex flex-column">
        <div className="card border-none rounded-3 w-100 mt-1 shadow-sm py-2 px-2">
            <div className="d-flex flex-row gap-3">
                <div className="cs-avatar">
                    <img src="./images/protrait-one.jpg" alt="" />
                </div>
                <div className="d-block">
                    <p className="my-0 fw-medium">Flora Ondricka</p>
                    <p className="my-0 font-size-sm gainsboro-color ">Customer Support</p>
                </div>
            </div>
        </div>
        <div className="message-container pt-3">
            <div className="card d-flex flex-row justify-content-start transparent-bg border-none my-1">
                <div className="cs-message-box card border-none primary-background-50 p-2 rounded-4 font-size-sm">
                   <p className="my-0 primary-color-dark">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Sit mollitia tempora soluta obcaecati ab minus dolorem
                   </p>
                </div>
            </div>
            <div className="card d-flex flex-row justify-content-start transparent-bg border-none my-1">
                <div className="cs-message-box card border-none primary-background-50 p-2 rounded-4 font-size-sm">
                   <p className="my-0 primary-color-dark">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Sit mollitia tempora soluta
                   </p>
                </div>
            </div>
            <div className="card d-flex flex-row justify-content-start transparent-bg border-none my-1">
                <div className="cs-message-box card border-none primary-background-50 p-2 rounded-4 font-size-sm">
                   <p className="my-0 primary-color-dark">
                    Lorem ipsum dolor 
                   </p>
                </div>
            </div>
            <div className="card d-flex flex-row justify-content-end transparent-bg border-none my-1">
                <div className="cs-message-box card border-none primary-background-dark p-2 rounded-4 text-white font-size-sm">
                   <p className="my-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Sit mollitia tempora soluta obcaecati 
                   </p>
                </div>
            </div>
            <div className="card d-flex flex-row justify-content-end transparent-bg border-none my-1">
                <div className="cs-message-box card border-none primary-background-dark p-2 rounded-4 text-white font-size-sm">
                   <p className="my-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Sit mollitia tempora soluta obcaecati ab minus dolorem. 
                    Similique asperiores mollitia corporis
                   </p>
                </div>
            </div>
            <div className="card d-flex flex-row justify-content-end transparent-bg border-none my-1">
                <div className="cs-message-box card border-none primary-background-dark p-2 rounded-4 text-white font-size-sm">
                   <p className="my-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Sit mollitia tempora soluta obcaecati ab minus dolorem. 
                    Similique asperiores mollitia corporis
                   </p>
                </div>
            </div>
        </div>
        <div className="mt-auto pb-4">
         <div>
            <textarea placeholder="Write Message Here" className="cs-message-area">

            </textarea>
         </div>
         <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row gap-3 align-items-center fs-4 gainsboro-color" >
                <span>
                <Icon icon="cil:smile" />
                </span>
                <span>
                <Icon icon="mynaui:image" />
                </span>
                <span>
                <Icon icon="mdi:attachment-vertical" />
                </span>
            </div>
            <div>
              <button className="border-none  p-2 primary-background-dark send-btn text-white fs-5">
              <Icon icon="proicons:send" />
              </button>
            </div>
         </div>
        </div>
        </div>
        </>
    )
}
export default Customersupport;