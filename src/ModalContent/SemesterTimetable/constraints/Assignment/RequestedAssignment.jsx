import { Icon } from "@iconify/react";
import { daysOfWeek } from "../../../../data/data";
import { Fragment } from "react";
function RequestedAssignment({ handleClose }) {
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100 px-2">
          <span className="m-0">Teacher Requested Time Slot</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-row gap-2">
          <input
            type="search"
            placeholder="search teacher"
            className="form-control font-size-sm w-75"
          />
          <div className="w-25">
            <button className="border-none rounded-pill p-2 font-size-sm w-100 d-flex flex-row align-items-center justify-content-around">
              <span>Select Time Format</span>
              <span>
                <Icon icon="mi:chevron-down" width="16" height="16" />
              </span>
            </button>
          </div>
        </div>
        <div className="d-flex flex-column gap-4 modal-content-container px-2">
          {[...Array(4)].map((_, index) => (
            <Fragment key={index}>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-row align-items-center gap-2">
                  <div>
                    <img
                      src="./images/user.png"
                      alt="user-image"
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="font-size-sm fw-bold">
                      Chongong Precious
                    </span>
                    <span className="font-size-sm">@keron</span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <span className="font-size-sm">Select Day</span>
                  <div className="d-flex flex-row gap-2">
                    {daysOfWeek.map((items, index) => (
                      <Fragment key={index}>
                        <button
                          className="border-none rounded-2 font-size-sm w-100"
                          style={{ height: "4rem" }}
                        >
                          <span className="text-capitalize">{items.label}</span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <span className="font-size-sm">Select Slot</span>
                  <div className="d-flex flex-row flex-wrap">
                    {[...Array(10)].map((_, index) => (
                      <Fragment key={index}>
                        <button className="font-size-sm border-none rounded-pill m-2  px-3 py-2 d-flex flex-row align-items-center gap-2">
                          <span>8:00</span>
                          <span>-</span>
                          <span>9:00</span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className="d-flex flex-column gap-2">
                  <span className="font-size-sm">Select Hall</span>
                  <div className="d-flex flex-row flex-wrap">
                    {[...Array(10)].map((_, index) => (
                      <Fragment key={index}>
                        <button className="font-size-sm border-none rounded-pill m-2  px-3 py-2 d-flex flex-row align-items-center gap-2">
                          Hall B
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
export default RequestedAssignment;
