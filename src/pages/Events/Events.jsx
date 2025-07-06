import { Icon } from "@iconify/react";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { getWeekday, getDayOfMonth } from "../../utils/functions";
import { useFetchSchoolEventsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { CSSTransition } from "react-transition-group";
import { useState, useRef, useCallback } from "react";
import CreateEvent from "../../ModalContent/Events/CreateEvent";
function Events() {
  const {
    data: data,
    isLoading: isSchoolEventsLoading,
  } = useFetchSchoolEventsQuery();

  if (isSchoolEventsLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="container">
        <div className="d-flex flex-row w-100 justify-content-between my-3">
          <div className="d-flex flex-row align-items-center gap-2">
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "0.2rem",
              }}
              className="primary-background d-flex flex-row align-items-center justify-content-center"
            >
              <Icon
                icon="material-symbols:event"
                className="fs-6 text-white"
              />
            </div>
            <div className="d-block">
              <h5 className="my-0 fw-semibold">Manage School Events</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="card height-90 p-2 rounded-4">
              <p className="font-size-sm gainsboro-color my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
              <div className="d-flex flex-row align-items-center p-2 font-size-sm pointer-cursor justify-content-between rounded-3 primary-background-50  my-2 color-primary fw-semibold">
                <span className="my-0">Upcoming</span>
                <span className="my-0">
                  <Icon icon="material-symbols:upcoming" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 font-size-sm pointer-cursor justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Pending</span>
                <span className="my-0">
                  <Icon icon="material-symbols:pending-actions" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 font-size-sm pointer-cursor justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Recuring</span>
                <span className="my-0">
                  <Icon icon="fluent-mdl2:recurring-event" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 font-size-sm pointer-cursor justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Past</span>
                <span className="my-0">
                  <Icon icon="wpf:past" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 font-size-sm pointer-cursor justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Cancelled</span>
                <span className="my-0">
                  <Icon icon="ix:cancelled" />
                </span>
              </div>
              <p className="font-size-sm gainsboro-color my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
              <div className="d-flex flex-row align-items-center p-2 font-size-sm pointer-cursor justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Deleted</span>
                <span className="my-0">
                  <Icon icon="eos-icons:content-deleted" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 font-size-sm pointer-cursor justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Favourites</span>
                <span className="my-0">
                  <Icon icon="mdi:favourite" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="w-100 d-flex flex-row align-items-center justify-content-between">
              <div className="w-50">
                <input 
                 type="search w-50"
                 className="form-control"
                 placeholder="Search for An Event"
                />
              </div>
              <ModalButton
                classname={
                  "border-none px-3 py-2 bg-dark font-size-sm text-white rounded-3 d-flex flex-row align-items-ceneter justify-content-between gap-2"
                }
                action={{ modalContent: CreateEvent }}
              >
                <span>
                  <Icon icon="lucide:circle-plus" />
                </span>
                <span>Create Event</span>
              </ModalButton>
            </div>
            <div className="scrollable-list px-2">
              <div className="d-block">
                <span className="my-1 fw-bold fs-4">Febuary</span>
                {data.data.map((items) => {
                  return (
                    <div
                      className="card w-100 rounded-4 py-3 my-1 position-relative z-1 px-3 d-flex flex-row align-items-center justify-content-between"
                      key={items.id}
                    >
                      <div className="d-flex flex-row gap-4 align-items-center">
                        <div className="d-block text-center color-primary">
                          <p className="my-0">{getWeekday(items.start_date)}</p>
                          <h1 className="fw-bold my-0">
                            {getDayOfMonth(items.start_date)}
                          </h1>
                        </div>
                        <div className="d-flex flex-column gap-3">
                          <div
                            className="d-flex gap-2 flex-row align-items-center gainsboro-color"
                            style={{ fontSize: "0.9rem" }}
                          >
                            <span>
                              <Icon
                                icon="mingcute:time-fill"
                                className="fs-6"
                              />
                            </span>
                            <span>{items.duration}</span>
                          </div>
                          <div
                            className="d-flex gap-2 flex-row align-items-center gainsboro-color"
                            style={{ fontSize: "0.9rem" }}
                          >
                            <span>
                              <Icon icon="mdi:location" className="fs-6" />
                            </span>
                            <span>{items.location}</span>
                          </div>
                        </div>
                        <div className="d-flex flex-column gap-3">
                          <div>
                            <span
                              className="my-0 gainsboro-color"
                              style={{ fontSize: "0.9rem" }}
                            >
                              Lorem ipsum dolor sit amet consectetur elit...
                            </span>
                          </div>
                          <div className="d-flex gap-1 flex-row font-size-sm gainsboro-color">
                            <span>You were Invited,</span>
                            <span>Plus 10 Others</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Dropdownbutton eventId={items.id} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Events;

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
            <ModalButton
              
            >
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
