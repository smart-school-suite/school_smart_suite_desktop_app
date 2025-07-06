import React from "react";
import { Icon } from "@iconify/react";
import { CSSTransition } from "react-transition-group";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { useState, useEffect } from "react";
function NotificationDropdown() {
  const [isToggled, setIsToggeled] = useState(false);
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
      <div
        className="bg-white gainsboro-color fs-4 z-0 d-flex position-relative flex-row justify-content-center align-items-center"
        style={{
          width: "3.0rem",
          height: "3.0rem",
          borderRadius: "3.0rem",
        }}
        ref={refs.setReference}
        onClick={() => {
          toggleDropdown();
        }}
      >
        <Icon icon="solar:bell-linear" className="z-1" />
        <button
          className="z-3 border-none rounded-circle font-size-xs position-absolute fw-semibold bg-danger text-white px-1"
          style={{ top: "0px", right: "0px", padding: "0.2rem" }}
        >
          32
        </button>
      </div>
      <CSSTransition
        in={isToggled}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <div className="w-50 px-3 py-2 card border-none shadow-sm rounded-3 z-3 position-absolute"
          ref={refs.setFloating}
          style={floatingStyles}
        >
          <div className="d-flex flex-row justify-content-between">
            <span className="fw-semibold">Notifications</span>
            <span className="font-size-sm">Mark As Read All</span>
          </div>
          <span className="my-2">Today</span>
          <div className="d-flex flex-row gap-3 align-items-center my-1 border-bottom px-2">
            <span>
              <Icon
                icon="icon-park-outline:dot"
                className="font-size-lg color-primary"
              />
            </span>
            <div>
              <div className="d-flex flex-row gap-2 justify-content-between">
                <span className="fw-semibold">Maintainance Update Request</span>
                <span className="font-size-xs">Just Now</span>
              </div>
              <div className="font-size-sm gainsboro-color">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit voluptate obcaecati aperiam! Pariatur
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row gap-3 align-items-center my-1 border-bottom px-2">
            <span>
              <Icon
                icon="icon-park-outline:dot"
                className="font-size-lg color-primary"
              />
            </span>
            <div>
              <div className="d-flex flex-row gap-2 justify-content-between">
                <span className="fw-semibold">Maintainance Update Request</span>
                <span className="font-size-xs">Just Now</span>
              </div>
              <div className="font-size-sm gainsboro-color">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit voluptate obcaecati aperiam! Pariatur
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex flex-row gap-3 align-items-center my-1 px-2">
            <span>
              <Icon
                icon="icon-park-outline:dot"
                className="font-size-lg color-primary"
              />
            </span>
            <div>
              <div className="d-flex flex-row gap-2 justify-content-between">
                <span className="fw-semibold">Maintainance Update Request</span>
                <span className="font-size-xs">Just Now</span>
              </div>
              <div className="font-size-sm gainsboro-color">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Suscipit voluptate obcaecati aperiam! Pariatur
                </p>
              </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default NotificationDropdown;