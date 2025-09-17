import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import TextDisplay from "../TextComponents/TextDisplay";
function ToastWarning({ title, description }) {
const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <div className={`${darkMode ? 'dark-bg-light dark-mode-text dark-mode-border' : 'bg-white border'} toast-custom shadow-sm p-2`}>
       <div className="d-flex flex-row align-items-start w-100 gap-2">
        <div style={{  width:"5%"}}>
          <Icon icon="quill:warning" className="text-warning"/>
        </div>
        <div className="d-flex flex-column" style={{  width:"95%"}}>
           <div className="d-flex flex-row align-items-center w-100 justify-content-between">
          <div className="d-flex flex-row align-items-center font-size-sm gap-2">
            <span><Icon icon="oui:generate"/></span>
            <span className="fw-bolder">{title}</span>
          </div>
          <span><Icon icon="iconoir:cancel" /></span>
        </div>
        <div className="font-size-sm fw-light">
          <TextDisplay 
            content={description}
            maxLength={70}
          />
            
        </div>
        </div>
       </div>
      </div>
    </>
  );
}
export default ToastWarning;
