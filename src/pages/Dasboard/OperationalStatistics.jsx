import Navbar from "../../components/Navbar";
import { DashboardNavabarOptions } from "../../ComponentConfig/navBarConfig";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { CSSTransition } from "react-transition-group";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import ToastWarning from "../../components/Toast/ToastWarning";
import ToastDanger from "../../components/Toast/ToastDanger";
import toast from "react-hot-toast";
import TimeInput from "../../components/TimeInput";
import BulkActionsToast from "../../components/BulkActionsToast";
function OperationalStatistics() {
  const handleTimeChange = (time) => {
    console.log("Selected Time:", time);
    // You could save this data to state or handle it as needed
  };
  const [value, onChange] = useState('10:00');
  return (
    <>
      <Navbar options={DashboardNavabarOptions} />
       <div className="my-2">
         <ModalButton
           action={{ modalContent:createschool }}
         >
          <span>Hello World</span>
         </ModalButton>
       </div>
      <div className="position-relative my-1">
      <TimeInput onTimeChange={handleTimeChange}/>
      </div>
      <div className="position-relative my-1">
      <TimeInput onTimeChange={handleTimeChange}/>
      </div>
      <div className="position-relative my-1">
      <TimeInput onTimeChange={handleTimeChange}/>
      </div>
      <div className="position-relative my-1">
      <TimeInput onTimeChange={handleTimeChange}/>
      </div>
      <div className="position-relative my-1">
      <TimeInput onTimeChange={handleTimeChange}/>
      </div>
      <BulkActionsToast ></BulkActionsToast>
    </>
  );
}
export default OperationalStatistics;

export function createschool(){
  return(
    <>
    <h1>hello world</h1>
    </>
  )
}
export const CustomDropdown = () => {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: "bottom-end",
    middleware: [offset(5), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        !refs.reference.current?.contains(event.target) &&
        !refs.floating.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [refs]);
  return (
    <div
      className="position-relative d-flex"
      style={{
        width: "100rem",
      }}
    >
      <button
        ref={refs.setReference}
        onClick={() => setOpen(!open)}
        className="btn btn-primary font-size-sm"
      >
        Open Menu
      </button>
      <CSSTransition
        in={open}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="dropdown-menu show position-absolute shadow-sm border w-100 p-1 rounded-2"
        >
          <div className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm">
            <span>Deactivate</span>
            <span>
              <Icon icon="mynaui:logout" className="font-size-md" />
            </span>
          </div>
          <div className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm">
            <span>Update Admin</span>
            <span>
              <Icon icon="mynaui:logout" className="font-size-md" />
            </span>
          </div>
          <div className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm">
            <span>Delete Admin</span>
            <span>
              <Icon icon="mynaui:logout" className="font-size-md" />
            </span>
          </div>
          <div className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm">
            <span>Make HOD</span>
            <span>
              <Icon icon="mynaui:logout" className="font-size-md" />
            </span>
          </div>
          <div className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm">
            <span>Make HOS</span>
            <span>
              <Icon icon="mynaui:logout" className="font-size-md" />
            </span>
          </div>
          <div className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm">
            <span>Add Permission</span>
            <span>
              <Icon icon="mynaui:logout" className="font-size-md" />
            </span>
          </div>
          <div className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm">
            <span>Revoke Permission</span>
            <span>
              <Icon icon="mynaui:logout" className="font-size-md" />
            </span>
          </div>
          <div className="align-items-center justify-content-between d-flex px-1 profile-actions  font-size-sm">
            <span>School Admin Details</span>
            <span>
              <Icon icon="mynaui:logout" className="font-size-md" />
            </span>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};
