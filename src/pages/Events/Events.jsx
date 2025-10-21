import { Icon } from "@iconify/react";
import ActionButtonDropdown, { ModalButton, DropDownMenuItem } from "../../components/DataTableComponents/ActionComponent";
import { CSSTransition } from "react-transition-group";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useGetActiveEventCategories } from "../../hooks/eventCategory/useGetActiveEventCategories";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSchoolEvents } from "../../hooks/schoolEvent/useGetSchoolEvents";
import { formatISODate } from "../../utils/functions";
import { useGetSchoolEventsByCategory } from "../../hooks/schoolEvent/useGetSchoolEventByCategory";
import { NotFoundError } from "../../components/errors/Error";
import TextDisplay from "../../components/TextComponents/TextDisplay";
import { useLikeSchoolEvent } from "../../hooks/schoolEvent/useLikeSchoolEvent";
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate,
} from "@floating-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { DeleteIcon, DetailsIcon, UpdateIcon } from "../../icons/ActionIcons";
import EventDetails from "../../ModalContent/Events/EventDetails";
import UpdateEventContent from "../../ModalContent/Events/UpdateEventContent";
import CustomModal from "../../components/Modals/Modal";
import DeleteEvent from "../../ModalContent/Events/DeleteEvent";
function Events() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [category, setCategory] = useState("all");
  const {
    data: activeCategories,
    isLoading,
    error,
  } = useGetActiveEventCategories();
  return (
    <>
      <div className="h-100">
        <div className="w-100 d-flex flex-row align-items-center justify-content-between mb-2">
          <div className="w-50">
            <input
              type="search w-50"
              className={`${darkMode ? "dark-mode-input" : ""} form-control font-size-sm p-2 `}
              placeholder="Search for An Event"
            />
          </div>
        </div>
        {error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <>
            <div className="d-flex flex-row align-items-center gap-2 event-category-container py-2">
              {isLoading ? (
                [...Array(4)].map((items, index) => (
                  <div key={index} style={{ width: "20%" }}>
                    <RectangleSkeleton width="100%" height="5dvh" speed={0.5} />
                  </div>
                ))
              ) : (
                <>
                  <button
                    className={`border-none align-items-center px-3 py-2 font-size-sm rounded-pill 
                ${
                  category == "all"
                    ? "selected-event-category"
                    : "unselected-event-category"
                }`}
                    onClick={() => {
                      setCategory("all");
                    }}
                  >
                    All
                  </button>
                  {activeCategories.data.map((items) => (
                    <button
                      className={`
                    border-none align-items-center px-3 py-2 font-size-sm rounded-pill 
                    ${
                      category == items.id
                        ? "selected-event-category"
                        : "unselected-event-category"
                    }
                    `}
                      key={items.id}
                      onClick={() => {
                        setCategory(items.id);
                      }}
                    >
                      {items.name}
                    </button>
                  ))}
                </>
              )}
            </div>
            <div className="event-list-container pt-2">
              {category == "all" ? (
                <AllEvents />
              ) : (
                <CategorizedEvents categoryId={category} />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Events;

function EventCategoryComponent({ data }) {
  const { mutate: likeEvent } = useLikeSchoolEvent();
  const [isToggled, setIsToggled] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const { x, y, strategy, refs, update } = useFloating({
    placement: "bottom-end",
    middleware: [offset(6), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalSize, setModalSize] = useState("md");
  const [fullscreen, setFullScreen] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleShowModal = (ContentComponent, size = "md", fullscreen = false) => {
    setModalContent(
      React.createElement(ContentComponent, {
        rowData: data,
        handleClose: handleCloseModal,
      })
    );
    setModalSize(size);
    setFullScreen(fullscreen)
    setShowModal(true);
    setIsToggled(false); 
  };

  useEffect(() => {
    if (!isToggled) return;

    const handleClickOutside = (event) => {
      if (
        refs.floating.current &&
        refs.reference.current &&
        !refs.floating.current.contains(event.target) &&
        !refs.reference.current.contains(event.target)
      ) {
        setIsToggled(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside, true);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside, true);
  }, [isToggled, refs]);

  const toggleDropdown = () => {
    setIsToggled((prev) => !prev);
    update();
  };

  return (
    <>
      <div className={`${darkMode ? "dark-mode-border dark-bg" : "border-none bg-white"} d-flex flex-row align-items-center gap-2 event-card w-100 rounded-3 p-2`}>
        <img src="./images/event-img-two.jpg" alt="event-image" />
        <div
          style={{ width: "65%", height: "100%" }}
          className="d-flex flex-column gap-2"
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="fs-6 fw-bold">{data.title}</span>
            <div className="position-relative">
              <button
                style={{
                  background: "transparent",
                  outline: "none",
                  border: "none",
                }}
                onClick={toggleDropdown}
                ref={refs.setReference}
                aria-haspopup="true"
                aria-expanded={isToggled}
              >
                <Icon
                  icon="iconamoon:menu-kebab-vertical-bold"
                  width="24"
                  height="24"
                />
              </button>
              <AnimatePresence>
                {isToggled && (
                  <motion.div
                    ref={refs.setFloating}
                    style={{
                      position: strategy,
                      top: y ?? 0,
                      left: x ?? 0,
                      width: "20vw",
                      zIndex: 1,
                      borderRadius:"0.75rem"
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`${
                      darkMode ? "dark-bg dark-mode-border" : "bg-white border"
                    } d-flex flex-column p-2 shadow-sm`}
                  >
                    <div className="d-flex flex-column gap-1">
                      <DropdownComponent data={data} handleShowModal={handleShowModal} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="fw-light font-size-sm gainsboro-color">
            <TextDisplay content={data.description} maxLength={300} />
          </div>
          <div className="d-flex flex-row gap-3 flex-wrap">
            {JSON.parse(data.tags).map((item) => (
              <div
                className={`${darkMode ? "dark-bg-light" : "primary-background-50 "} px-2 py-1 rounded-pill color-primary`}
                key={item.id}
                style={{ fontSize: "0.65rem" }}
              >
                <span>{item.name || "N/A"}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <div className="d-flex flex-row w-100 align-items-end justify-content-between">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-column">
                  <div className="d-flex font-size-sm fw-semibold gap-2 align-items-center">
                  <Icon icon="formkit:people" />
                  <span>{data.invitee_count} Invitee</span>
                </div>
                <div className="d-flex font-size-sm fw-semibold gap-2 align-items-center">
                  <Icon icon="ion:location-outline" />
                  <span>{data.location}</span>
                </div>
                </div>
                <div className="d-flex flex-column">
                  <span className="font-size-xs gainsboro-color">Event Time Range</span>
                  <div className="w-100 d-flex gap-2 font-size-sm fw-medium align-items-center">
                  <Icon icon="solar:calendar-linear" />
                  <div className="d-flex gap-1 flex-row align-items-center">
                    <span>{formatISODate(data.start_date)}</span>
                  <Icon icon="radix-icons:dash" />
                  <span>{formatISODate(data.end_date)}</span>
                  </div>
                </div>
                </div>
              </div>
              <div className="d-flex flex-row gap-2 align-items-center pe-2">
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "#ff9494",
                    borderRadius: "0.2rem",
                  }}
                  onClick={() => {
                    likeEvent(data.id);
                  }}
                >
                  {data.event_like_status ? (
                    <Icon icon="mynaui:heart-solid" className="fs-5" />
                  ) : (
                    <Icon icon="mynaui:heart" className="fs-5" />
                  )}
                </button>
                <span className="fw-semibold">{data.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalSize}
        centered
        fullscreen={fullscreen}
      >
        {modalContent}
      </CustomModal>
    </>
  );
}

function AllEvents() {
  const { data: schoolEvents, isLoading, error } = useGetSchoolEvents();
  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column gap-2 w-100">
          {[...Array(3)].map((items, index) => (
            <div key={index} className="px-2 mt-2">
              <RectangleSkeleton width="100%" height="30dvh" />
            </div>
          ))}
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <>
          {schoolEvents.data.map((items) => (
            <>
              <div>
                <span className="fw-semibold">{items.category_name}</span>
                <div className="d-flex flex-column gap-2 px-2">
                  {items.events.map((items) => (
                    <EventCategoryComponent data={items} />
                  ))}
                </div>
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
}
function CategorizedEvents({ categoryId }) {
  const {
    data: events,
    isLoading,
    error,
  } = useGetSchoolEventsByCategory(categoryId);
  return (
    <>
      {isLoading ? (
        <div className="d-flex flex-column gap-2 w-100">
          {[...Array(3)].map((items, index) => (
            <div key={index} className="px-2 mt-2">
              <RectangleSkeleton width="100%" height="30dvh" />
            </div>
          ))}
        </div>
      ) : error ? (
        <NotFoundError
          title={error?.response?.data?.errors?.title}
          description={error?.response?.data?.errors?.description}
        ></NotFoundError>
      ) : (
        <>
          <div className="d-flex flex-column gap-2 px-2">
            {events.data.map((items) => (
              <EventCategoryComponent data={items} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

function DropdownComponent({ data, handleShowModal }) {
  return (
    <>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table py-2 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(UpdateEventContent, null, true)}
        >
          <div>
            <div className=" d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Update Event Content</span>
              <UpdateIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table py-2 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(EventDetails, "md")}
        >
          <div>
            <div className="d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Event Details</span>
              <DetailsIcon />
            </div>
          </div>
        </DropDownMenuItem>
        <DropDownMenuItem
          className={
            "remove-button-styles w-100 dropdown-item-table py-2 rounded-2 pointer-cursor"
          }
          onClick={() => handleShowModal(DeleteEvent, "md")}
        >
          <div>
            <div className="d-flex flex-row align-items-center w-100 font-size-sm  justify-content-between">
              <span>Delete Event</span>
              <DeleteIcon />
            </div>
          </div>
        </DropDownMenuItem>
    </>
  );
}