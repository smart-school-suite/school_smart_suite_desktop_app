import { CSSTransition } from "react-transition-group";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { useState, useEffect } from "react";
import CustomTooltip from "./Tooltip";
import { Icon } from "@iconify/react";
function BulkActionsToast({rowCount, label, dropDownItems, actionButton, resetAll }) {
  const [isToggled, setIsToggeled] = useState(false);
  const { refs, floatingStyles } = useFloating({
    placement: "top-start",
    middleware: [offset(11), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });
  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        !refs.reference.current?.contains(event.target) &&
        !refs.floating.current?.contains(event.target)
      ) {
        setIsToggeled(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, [refs]);
  const toggleDropdown = () => {
    setIsToggeled((prevalue) => !prevalue);
  };
  return (
    <>
      <div className={`z-3 w-100 d-flex flex-column justify-content-center align-items-center table-toast-container
         ${ rowCount > 0 ? 'active' : 'inactive' }
        `}>
        <CSSTransition
          in={isToggled}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div
            className="w-50 d-flex flex-row justify-content-end mb-1"
            ref={refs.setFloating}
            style={floatingStyles}
          >
            <div className="w-50 d-flex flex-column gap-1 bg-white rounded-2 p-1 gap-2 border dropdown-content-sm">
              {dropDownItems}
            </div>
          </div>
        </CSSTransition>
        <div className="w-50 p-2 bg-white rounded-3 d-flex flex-row justify-content-between align-item-center table-toast shadow-sm border">
          <div className="d-flex flex-row align-items-center gap-3">
            <input type="checkbox" className="form-check-input m-0" checked />
            <span> <span>{rowCount}</span> {label} </span>
          </div>
          <div className="d-flex flex-row gap-3">
             {
                actionButton
             }
             <button className="border-none transparent-bg"
               ref={refs.setReference}
               onClick={() => {
                 toggleDropdown();
               }}
             >
             <div>
                <span className="pointer-cursor">
                  <Icon icon="circum:menu-kebab" width="24" height="24" />
                </span>
              </div>
             </button>
            <CustomTooltip tooltipText={"Cancel"}>
              <span className="pointer-cursor"
                onClick={() => {
                     resetAll()
                }}
              >
                <Icon
                  icon="material-symbols-light:cancel-outline"
                  width="24"
                  height="24"
                />
              </span>
            </CustomTooltip>
          </div>
        </div>
      </div>
    </>
  );
}
export default BulkActionsToast;
