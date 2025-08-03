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
import { useGetNotifications } from "../../hooks/notification/useGetNotification";
import { useMarkAllNotificationsAsRead } from "../../hooks/notification/useMarkAllNotifcationAsRead";
import { formatISOTimeSince } from "../../utils/functions";
function NotificationDropdown() {
  const [isToggled, setIsToggeled] = useState(false);
  const { data:notifications, isLoading } = useGetNotifications();
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
        <button className="notification-pill">{isLoading ? 0 : notifications?.data?.unread?.length }</button>
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
          <span className="font-size-lg my-2 fw-bold">Notifications</span>
          <div className="notifcation-container">
            <Notifications  isLoading={isLoading}  unreadNotifications={notifications?.data?.unread}/>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default NotificationDropdown;


function Notifications({ unreadNotifications, isLoading }) {
  return (
    <>
      {
        isLoading ? null : unreadNotifications?.map((items) => (
        <div className="d-flex flex-row align-items-center gap-2 w-100 px-1">
          <div className="blue-pill"></div>
          <div className="flex flex-column w-100">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm fw-semibold">
              {items.data.title}
            </span>
            <span style={{ fontSize: "0.65rem" }}>{formatISOTimeSince(items.created_at)}</span>
          </div>
          <TextDisplay 
            content={items.data.body}
            maxLength={100}
            textStyle={"font-size-sm fw-light"}
            readMeStyle={"font-size-sm fw-semibold"}
          />
        </div>
        </div>
      ))
      }
    </>
  );
}