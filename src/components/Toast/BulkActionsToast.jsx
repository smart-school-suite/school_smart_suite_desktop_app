import { CSSTransition } from "react-transition-group";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
function BulkActionsToast({rowCount, label, dropDownItems, actionButton, resetAll }) {
  const [isToggled, setIsToggeled] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
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
            <div className={`${darkMode ? 'dark-bg-light dark-mode-text dark-mode-border' : 'bg-white border '} w-50 d-flex flex-column gap-1 rounded-3 p-1 gap-2 dropdown-content-sm`}>
              {dropDownItems}
            </div>
          </div>
        </CSSTransition>
        <div className={`${darkMode ? 'dark-bg-light dark-mode-text dark-mode-border' : 'bg-white gainsboro-color border'} w-50 p-2 rounded-3 d-flex flex-row justify-content-between align-item-center table-toast shadow-sm`}>
          <div className="d-flex flex-row align-items-center gap-3">
            <input type="checkbox" className="form-check-input m-0 p-2" checked />
            <span className="font-size-sm"> {label} {rowCount} </span>
          </div>
          <div className={`d-flex flex-row gap-1`}>
             {
                actionButton
             }
             <button className={`${darkMode ? 'dark-mode-text border-none transparent-bg' : 'border-none transparent-bg gainsboro-color'}`}
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
              <button className={`${darkMode ? 'dark-mode-text border-none transparent-bg' : 'border-none transparent-bg gainsboro-color'}`}>
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
              </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default BulkActionsToast;
