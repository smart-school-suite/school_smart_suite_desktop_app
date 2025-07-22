function ScheduledEvents() {
  return (
    <>
      <div>
        <div>
          <span className="fw-semibold">Scheduled Events</span>
        </div>
        <div className="w-100 d-flex flex-row align-items-center justify-content-between mb-2">
          <div className="w-50">
            <input
              type="search w-50"
              className="form-control"
              placeholder="Search for An Event"
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 my-3">
          <button className="border-none align-items-center px-3 py-2 font-size-sm rounded-pill">
            All
          </button>
          <button className="border-none align-items-center px-3 py-2 font-size-sm rounded-pill">
            Category Title
          </button>
        </div>
      </div>
      <EventCategoryComponent />
    </>
  );
}
export default ScheduledEvents;

function EventCategoryComponent() {
  return (
    <>
      <div>
        <span className="fw-semibold">Event Category</span>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center gap-2 event-card  w-100 rounded-3 border-none p-2">
            <img src="./images/event-img-two.jpg" alt="" />
            <div
              style={{ width: "65%", height: "100%" }}
              className="d-flex flex-column flex-start gap-3"
            >
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="fs-4 fw-semibold">Cultural Week</span>
                <span>IC</span>
              </div>
              <div className="fw-light font-size-sm gainsboro-color">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui
                quisquam nesciunt ut impedit illum dolorem, voluptatum tenetur
                at quasi repudiandae quas in dolore, eius, perferendis sint
                similique voluptatibus architecto excepturi. Lorem ipsum dolor
                sit amet consectetur, adipisicing elit. Qui quisquam nesciunt ut
                impedit illum dolorem, voluptatum tenetur at quasi repudiandae
                quas in dolore, eius, perferendis sint similique voluptatibus
                architecto excepturi.
              </div>
              <div className="d-flex flex-row gap-3 ">
                <button className="border-none px-2 py-1 font-size-sm primary-background-50 color-primary rounded-pill">
                  sports
                </button>
                <button className="border-none px-3 py-1 font-size-sm primary-background-50 color-primary rounded-pill">
                  football
                </button>
                <button className="border-none px-2 py-1 font-size-sm primary-background-50 color-primary rounded-pill">
                  handball
                </button>
                <button className="border-none px-2 py-1 font-size-sm primary-background-50 color-primary rounded-pill">
                  Pill Tag
                </button>
              </div>
              <div className="mt-auto">
                <div className="d-flex font-size-sm fw-semibold gap-2">
                  <span>IC</span>
                  <span>1000 Invitee</span>
                </div>
                <div className="w-100 d-flex gap-1 font-size-sm fw-semibold">
                  <span>IC</span>
                  <span>Jan 30 2025</span>
                  <span>IC</span>
                  <span>Feb 10 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
