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
import TextDisplay from "../TextComponents/TextDisplay";
import { useDispatch, useSelector } from "react-redux";
import { markAllNotificationsAsRead } from "../../Slices/Asynslices/NotificationSlice";
function NotificationDropdown() {
  const [isToggled, setIsToggeled] = useState(false);
  const dispatch = useDispatch();
  const notificationCount = useSelector((state => state.notification.unreadNotificationCount));
  const unreadNotifications = useSelector((state => state.notification.unreadNotifications));
  const readNotifications = useSelector((state => state.notification.readNotifications));
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
        onClick={toggleDropdown}
      >
        <Icon icon="solar:bell-linear" className="z-1" />
        <button className="notification-pill">{notificationCount}</button>
      </div>
      <CSSTransition
        in={isToggled}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <div
          className="px-3 py-2 card border-none shadow-sm rounded-4 position-absolute"
          ref={refs.setFloating}
          style={{ ...floatingStyles, zIndex: 1000, width: "27%" }}
        >
          <span className="font-size-sm my-2 fw-semibold">Notifications</span>
          <div className="notifcation-container">
            <UnreadNotifications unreadNotifications={unreadNotifications}/>
            <ReadNotifications  readNotifications={readNotifications}/>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default NotificationDropdown;

function ReadNotifications({ readNotifications }) {
  return (
    <>
     {
       readNotifications.map((items) => (
         <div className="flex flex-column">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm fw-semibold">
              {items.title}
            </span>
            <span style={{ fontSize: "0.65rem" }}>{items.created_at}</span>
          </div>
          <TextDisplay 
            content={items.body}
            maxLength={100}
            textStyle={"font-size-sm fw-light"}
            readMeStyle={"font-size-sm fw-semibold"}
          />
        </div>
       ))
     }
    </>
  );
}
function UnreadNotifications({ unreadNotifications }) {
  return (
    <>
      {unreadNotifications.map((items) => (
        <div className="d-flex flex-row align-items-center gap-2 w-100 px-1">
          <div className="blue-pill"></div>
          <div className="flex flex-column w-100">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm fw-semibold">
              {items.title}
            </span>
            <span style={{ fontSize: "0.65rem" }}>{items.created_at}</span>
          </div>
          <TextDisplay 
            content={items.body}
            maxLength={100}
            textStyle={"font-size-sm fw-light"}
            readMeStyle={"font-size-sm fw-semibold"}
          />
        </div>
        </div>
      ))}
    </>
  );
}