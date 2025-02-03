import { Icon } from "@iconify/react";
import { ModialButton } from "./actionButton";
import { useAddEventMutation } from "../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import { schoolEventCategories } from "../data/data";
import { formatDuration, getWeekday, getDayOfMonth } from "../utils/functions";
import { useFetchSchoolEventsQuery } from "../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../components/Spinners";
import { CSSTransition } from "react-transition-group";
import { useState, useRef, useCallback } from "react";
function Events() {
  const {
    data: events_data,
    isLoading: isSchoolEventsLoading,
    error: schoolEventError,
  } = useFetchSchoolEventsQuery();

  if (isSchoolEventsLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="container">
        <div className="d-flex flex-row w-100 justify-content-between my-2">
          <div className="d-flex flex-row align-items-center gap-4">
            <div
              style={{
                width: "3rem",
                height: "3rem",
                borderRadius: "3rem",
              }}
              className="bg-white d-flex flex-row align-items-center justify-content-center"
            >
              <Icon
                icon="material-symbols:event"
                className="fs-5 color-primary"
              />
            </div>
            <div className="d-block">
              <h4 className="my-0 fw-semibold">Events</h4>
            </div>
          </div>
          <div></div>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div className="card height-90 p-2 rounded-4">
              <p className="font-size-sm gainsboro-color my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
              <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 primary-background-50  my-2 color-primary fw-semibold">
                <span className="my-0">Upcoming</span>
                <span className="my-0">
                  <Icon icon="material-symbols:upcoming" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Pending</span>
                <span className="my-0">
                  <Icon icon="material-symbols:pending-actions" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Recuring</span>
                <span className="my-0">
                  <Icon icon="fluent-mdl2:recurring-event" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Past</span>
                <span className="my-0">
                  <Icon icon="wpf:past" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Cancelled</span>
                <span className="my-0">
                  <Icon icon="ix:cancelled" />
                </span>
              </div>
              <p className="font-size-sm gainsboro-color my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
              <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Deleted</span>
                <span className="my-0">
                  <Icon icon="eos-icons:content-deleted" />
                </span>
              </div>
              <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
                <span className="my-0">Favourites</span>
                <span className="my-0">
                  <Icon icon="mdi:favourite" />
                </span>
              </div>
              <p className="font-size-sm gainsboro-color my-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </p>
              <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3  my-2 gainsboro-color">
                <span className="my-0">New</span>
                <span className="my-0">
                  <Icon icon="clarity:new-solid" width="36" height="36" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="w-100 d-flex flex-row align-items-center justify-content-between">
              <div className="rounded-3 p-2 bg-white w-50 border mb-2">
                <input
                  type="text"
                  placeholder="Search for an event"
                  className="border-none search-input"
                />
              </div>
              <ModialButton
                classname={
                  "border-none px-3 py-2 bg-dark font-size-sm text-white rounded-pill d-flex flex-row align-items-ceneter justify-content-between gap-2"
                }
                action={{ modalContent: CreateEvent }}
              >
                <span>
                  <Icon icon="lucide:circle-plus" />
                </span>
                <span>Create Event</span>
              </ModialButton>
            </div>
            <div className="scrollable-list px-2">
              <div className="d-block">
                <span className="my-1 fw-bold fs-4">Febuary</span>
                {events_data.events_data.map((items) => {
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

function CreateEvent({ handleClose }) {
  const [formData, setFormData] = useState({
    title: "",
    start_date: "",
    end_date: "",
    location: "",
    description: "",
    organizer: "",
    category: "",
    duration: "",
    hours: "",
    minutes: "",
  });
  const [addEvent] = useAddEventMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    try {
      const formattedDuration = formatDuration(
        Number(formData.hours),
        Number(formData.minutes)
      );

      const eventData = {
        ...formData,
        duration: formattedDuration,
      };

      await addEvent(eventData).unwrap();
      toast.success("Event Created successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to create Event. Try again.");
    }
  };
  return (
    <div>
      <div className="d-flex flex-row">
        <div className="d-block">
          <h5>Create Event</h5>
          <p className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            deserun
          </p>
        </div>
      </div>
      <div className="my-1">
        <span>Event Title</span>
        <input
          type="text"
          className="form-control"
          placeholder="Christmass Party"
          name="title"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
      </div>
      <div className="d-flex flex-row gap-2">
        <div className="my-1">
          <span>Start date</span>
          <input
            type="date"
            className="form-control"
            name="start_date"
            value={formData.start_date}
            onChange={(e) => handleInputChange("start_date", e.target.value)}
          />
        </div>
        <div className="my-1">
          <span>End Date</span>
          <input
            type="date"
            className="form-control"
            name="end_date"
            value={formData.end_date}
            onChange={(e) => handleInputChange("end_date", e.target.value)}
          />
        </div>
      </div>
      <div className="my-1">
        <span>Location</span>
        <input
          type="location"
          name="location"
          className="form-control"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      <div className="my-1">
        <span>Organizer Name</span>
        <input
          type="text"
          className="form-control"
          placeholder="Organizer's name"
          value={formData.organizer}
          onChange={(e) => handleInputChange("organizer", e.target.value)}
        />
      </div>
      <div className="my-1">
        <span>Category</span>
        <select
          name="category"
          className="form-select"
          onChange={(e) => handleInputChange("category", e.target.value)}
          value={formData.category}
        >
          {schoolEventCategories.map((items) => {
            return (
              <option value={items.name} key={items.id}>
                {items.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="my-1">
        <span>Duration</span>
        <div className="d-flex flex-row gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="hours"
            value={formData.hours}
            onChange={(e) => handleInputChange("hours", e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="minutes"
            value={formData.minutes}
            onChange={(e) => handleInputChange("minutes", e.target.value)}
          />
        </div>
      </div>
      <div className="my-1">
        <span>Description</span>
        <textarea
          name=""
          id=""
          className="form-control"
          placeholder="Describe this interesting event"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></textarea>
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            onClick={() => {
              handleSubmit();
            }}
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}

function EventDetails({ handleClose, row_id }) {
  return (
    <>
      <div className="w-100">
        <div className="my-2">
          <p className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
            molestias repellendus facere voluptate?
            {row_id}
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between my-3">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="ph:phone" />
          </button>
          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">dashdjkash</span>
            <span className="my-0 font-size-sm gainsboro-color">
              Course Title
            </span>
          </div>
        </div>

        <div className="my-2 position-relative">
          <div className="postion-absolute d-flex flex-row justify-content-end">
            <button
              className="px-3 w-25 py-2 font-size-sm text-white border-none rounded-3 primary-background"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
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
            <ModialButton
              action={{ modalContent: EventDetails, row_id: eventId }}
            >
              <span>Details</span>
            </ModialButton>
            <span>Plan Event</span>
            <span>Event Calenda</span>
            <span>update event</span>
          </div>
        </CSSTransition>
      </div>
    </>
  );
}
