import { Icon } from "@iconify/react";
import CustomDropdown from "../components/Dropdowns";
import { SchoolYearSelector } from "../components/yearPicker";
import { useState } from "react";
import { SchoolEventData } from "../data/data";
import { ModialButton } from "./actionButton";
import { EventTitleInput } from "../components/formComponents";
function Events() {
  return (
    <>
     <div className="container">
     <div className="d-flex flex-row w-100 justify-content-between my-2">
      <div className="d-flex flex-row align-items-center gap-4">
      <div style={{
         width:"3rem",
         height:"3rem",
         borderRadius:"3rem"
      }} className="bg-white d-flex flex-row align-items-center justify-content-center">
      <Icon icon="material-symbols:event"  className="fs-5 color-primary"/>
      </div>
      <div className="d-block">
        <h4 className="my-0 fw-semibold">Events</h4>
      </div>
      </div>
      <div>
      </div>
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
             <Icon icon="material-symbols:upcoming"/>
             </span>
          </div>
          <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
             <span className="my-0">Pending</span>
             <span className="my-0">
             <Icon icon="material-symbols:pending-actions"/>
             </span>
          </div>
          <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
             <span className="my-0">Recuring</span>
             <span className="my-0">
             <Icon icon="fluent-mdl2:recurring-event"  />
             </span>
          </div>
          <div className="d-flex flex-row align-items-center p-2 justify-content-between rounded-3 gainsboro-color my-2">
             <span className="my-0">Past</span>
             <span className="my-0">
             <Icon icon="wpf:past"  />
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
          <input type="text" placeholder="Search for an event" className="border-none search-input"/>
         </div>
         <ModialButton
          classname={"border-none px-3 py-2 bg-dark font-size-sm text-white rounded-pill d-flex flex-row align-items-ceneter justify-content-between gap-2"}
          action={{ modalContent:CreateEvent }}
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
          <div className="card w-100 rounded-4 py-3 my-1 px-3 d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row gap-4 align-items-center">
            <div className="d-block text-center color-primary">
              <p className="my-0">Wed</p>
              <h1 className="fw-bold my-0">23</h1>
            </div>
            <div className="d-flex flex-column gap-3">
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mingcute:time-fill" className="fs-6"/>
                </span>
                <span>9:00 pm</span>
                <span>9:00 pm</span>
               </div>
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mdi:location" className="fs-6"/>
                </span>
                <span>Location</span>
               </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
              <span className="my-0 gainsboro-color" style={{ fontSize:"0.9rem" }}>
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
              <button className="border-none text-white font-size-sm gap-3 bg-dark rounded-3 px-3 py-2 d-flex flex-row align-items-center justify-content-between">
                <span>Edit</span>
                <span>
                <Icon icon="octicon:chevron-down-16" />
                </span>
              </button>
            </div>
          </div>
          <div className="card w-100 rounded-4 py-3 my-1 px-3 d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row gap-4 align-items-center">
            <div className="d-block text-center color-primary">
              <p className="my-0">Wed</p>
              <h1 className="fw-bold my-0">23</h1>
            </div>
            <div className="d-flex flex-column gap-3">
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mingcute:time-fill" className="fs-6"/>
                </span>
                <span>9:00 pm</span>
                <span>9:00 pm</span>
               </div>
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mdi:location" className="fs-6"/>
                </span>
                <span>Location</span>
               </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
              <span className="my-0 gainsboro-color" style={{ fontSize:"0.9rem" }}>
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
              <button className="border-none font-size-sm text-white gap-3 bg-dark rounded-3 px-3 py-2 d-flex flex-row align-items-center justify-content-between">
                <span>Edit</span>
                <span>
                <Icon icon="octicon:chevron-down-16" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="d-block">
          <span className="my-1 fw-bold fs-4">March</span>
          <div className="card w-100 rounded-4 py-3 my-1 px-3 d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row gap-4 align-items-center">
            <div className="d-block text-center color-primary">
              <p className="my-0">Wed</p>
              <h1 className="fw-bold my-0">23</h1>
            </div>
            <div className="d-flex flex-column gap-3">
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mingcute:time-fill" className="fs-6"/>
                </span>
                <span>9:00 pm</span>
                <span>9:00 pm</span>
               </div>
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mdi:location" className="fs-6"/>
                </span>
                <span>Location</span>
               </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
              <span className="my-0 gainsboro-color" style={{ fontSize:"0.9rem" }}>
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
              <button className="border-none font-size-sm text-white gap-3 bg-dark rounded-3 px-3 py-2 d-flex flex-row align-items-center justify-content-between">
                <span>Edit</span>
                <span>
                <Icon icon="octicon:chevron-down-16" />
                </span>
              </button>
            </div>
          </div>
          <div className="card w-100 rounded-4 py-3 my-1 px-3 d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row gap-4 align-items-center">
            <div className="d-block text-center color-primary">
              <p className="my-0">Wed</p>
              <h1 className="fw-bold my-0">23</h1>
            </div>
            <div className="d-flex flex-column gap-3">
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mingcute:time-fill" className="fs-6"/>
                </span>
                <span>9:00 pm</span>
                <span>9:00 pm</span>
               </div>
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mdi:location" className="fs-6"/>
                </span>
                <span>Location</span>
               </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
              <span className="my-0 gainsboro-color" style={{ fontSize:"0.9rem" }}>
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
              <button className="border-none font-size-sm text-white gap-3 bg-dark rounded-3 px-3 py-2 d-flex flex-row align-items-center justify-content-between">
                <span>Edit</span>
                <span>
                <Icon icon="octicon:chevron-down-16" />
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="d-block">
          <span className="my-1 fw-bold fs-4">March</span>
          <div className="card w-100 rounded-4 py-3 my-1 px-3 d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row gap-4 align-items-center">
            <div className="d-block text-center color-primary">
              <p className="my-0">Wed</p>
              <h1 className="fw-bold my-0">23</h1>
            </div>
            <div className="d-flex flex-column gap-3">
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mingcute:time-fill" className="fs-6"/>
                </span>
                <span>9:00 pm</span>
                <span>9:00 pm</span>
               </div>
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mdi:location" className="fs-6"/>
                </span>
                <span>Location</span>
               </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
              <span className="my-0 gainsboro-color" style={{ fontSize:"0.9rem" }}>
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
              <button className="border-none font-size-sm text-white gap-3 bg-dark rounded-3 px-3 py-2 d-flex flex-row align-items-center justify-content-between">
                <span>Edit</span>
                <span>
                <Icon icon="octicon:chevron-down-16" />
                </span>
              </button>
            </div>
          </div>
          <div className="card w-100 rounded-4 py-3 my-1 px-3 d-flex flex-row align-items-center justify-content-between">
            <div className="d-flex flex-row gap-4 align-items-center">
            <div className="d-block text-center color-primary">
              <p className="my-0">Wed</p>
              <h1 className="fw-bold my-0">23</h1>
            </div>
            <div className="d-flex flex-column gap-3">
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mingcute:time-fill" className="fs-6"/>
                </span>
                <span>9:00 pm</span>
                <span>9:00 pm</span>
               </div>
               <div className="d-flex gap-2 flex-row align-items-center gainsboro-color" style={{ fontSize:"0.9rem" }}>
                <span>
                <Icon icon="mdi:location" className="fs-6"/>
                </span>
                <span>Location</span>
               </div>
            </div>
            <div className="d-flex flex-column gap-3">
              <div>
              <span className="my-0 gainsboro-color" style={{ fontSize:"0.9rem" }}>
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
              <button className="border-none font-size-sm text-white gap-3 bg-dark rounded-3 px-3 py-2 d-flex flex-row align-items-center justify-content-between">
                <span>Edit</span>
                <span>
                <Icon icon="octicon:chevron-down-16" />
                </span>
              </button>
            </div>
          </div>
        </div>
       </div>
      </div>
    </div>
     </div>
    </>
  );
}
export default Events;

function CreateEvent({ handleClose }){
  return(
    <div>
      <div className="d-flex flex-row">
        <div className="d-block">
          <h5>Create Event</h5>
          <p className="gainsboro-color font-size-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste deserun</p>
        </div>
      </div>
        <div className="my-1">
          <EventTitleInput />
        </div>
      <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
             onClick={handleClose}
            >
              Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50">
              Create Event
            </button>
          </div>
        </div>
    </div>
  )
}