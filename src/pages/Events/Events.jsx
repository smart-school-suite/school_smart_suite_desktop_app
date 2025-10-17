import { Icon } from "@iconify/react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { CSSTransition } from "react-transition-group";
import { useState, useRef, useCallback } from "react";
import { useGetActiveEventCategories } from "../../hooks/eventCategory/useGetActiveEventCategories";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetSchoolEvents } from "../../hooks/schoolEvent/useGetSchoolEvents";
import { formatISODate } from "../../utils/functions";
import { useGetSchoolEventsByCategory } from "../../hooks/schoolEvent/useGetSchoolEventByCategory";
import { NotFoundError } from "../../components/errors/Error";
import TextDisplay from "../../components/TextComponents/TextDisplay";
function Events() {
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
              className="form-control font-size-sm p-2"
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
            <div className="event-list-container">
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
  return (
    <>
      <div className="d-flex flex-row align-items-center gap-2 event-card  w-100 rounded-3 border-none p-2">
        <img src="./images/event-img-two.jpg" alt="" />
        <div
          style={{ width: "65%", height: "100%" }}
          className="d-flex flex-column gap-2"
        >
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="fs-6 fw-bold">{data.title}</span>
            <span>
              <Icon
                icon="iconamoon:menu-kebab-vertical-bold"
                width="24"
                height="24"
              />
            </span>
          </div>
          <div className="fw-light font-size-sm gainsboro-color">
            <TextDisplay 
             content={data.description}
             maxLength={300}
            />
          </div>
          <div className="d-flex flex-row gap-3 flex-wrap">
            {JSON.parse(data.tags).map((item) => (
              <div
                className=" primary-background-50 px-3 py-2 rounded-pill color-primary"
                key={item.id}
                style={{ fontSize: "0.65rem" }}
              >
                <span>{item.name || "N/A"}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <div className="d-flex flex-row w-100 align-items-center justify-content-between">
              <div className="d-flex flex-column">
                <div className="d-flex font-size-sm fw-semibold gap-2 align-items-center">
                  <Icon icon="formkit:people" />
                  <span>{data.invitee_count} Invitee</span>
                </div>
                <div className="w-100 d-flex gap-1 font-size-sm fw-semibold align-items-center">
                  <Icon icon="solar:calendar-linear" />
                  <span>{formatISODate(data.start_date)}</span>
                  <Icon icon="radix-icons:dash" />
                  <span>{formatISODate(data.end_date)}</span>
                </div>
              </div>
              <div className="d-flex flex-row gap-2 align-items-center">
                <Icon icon="mynaui:heart" />
                <span>{data.likes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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


function Dropdownbutton({ eventId }) {
  const [isToggled, setIsToggled] = useState(false);
  const inputRef = useRef(null);
  const toggleDropdown = useCallback(() => {
    setIsToggled((prev) => !prev);
    if (!isToggled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isToggled]);
  return (
    <>
      <div className="position-relative z-2">
        <button
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isToggled}
          className="border-none font-size-sm text-white gap-3 bg-dark rounded-3 px-3 py-2 d-flex flex-row align-items-center justify-content-between"
        >
          <span>Edit</span>
          <span>
            <Icon icon="octicon:chevron-down-16" />
          </span>
        </button>
        <CSSTransition
          in={isToggled}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div className="d-flex drop-down flex-column bg-white p-2 rounded-3 w-100 border z-3 position-absolute">
            <ModalButton>
              <span>Details</span>
            </ModalButton>
            <span>Plan Event</span>
            <span>Event Calenda</span>
            <span>update event</span>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
