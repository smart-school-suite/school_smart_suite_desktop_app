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
  export default EventDetails;