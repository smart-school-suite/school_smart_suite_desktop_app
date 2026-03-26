import { Icon } from "@iconify/react";
import { NumberInput } from "../../../../components/FormComponents/InputComponents";
function TeacherWeeklyHour({ handleClose }) {
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Teacher Weekly Hour</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-center w-100 gap-2">
            <div className="w-50">
              <label htmlFor="DailyFreePeriod" className="font-size-sm">
                Min Hours
              </label>
              <NumberInput placeholder="Enter Min Daily Free Period" />
            </div>
            <div className="w-50">
              <label htmlFor="DailyFreePeriod" className="font-size-sm">
                Max Hours
              </label>
              <NumberInput placeholder="Enter Max Daily Free Period" />
            </div>
          </div>
          <label htmlFor="breakPeriodDaysException" className="font-size-sm">
            Teacher Weekly Hour Exception (optional)
          </label>
          <div className="d-flex flex-column">
            <div className="d-flex flex-row gap-2">
              <div className="d-flex flex-row align-items-center gap-2 w-25">
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
              <div className="d-flex flex-row align-items-center w-75 gap-2">
                <div className="w-50">
                  <label htmlFor="DailyFreePeriod" className="font-size-sm">
                    Min Hours
                  </label>
                  <NumberInput placeholder="Enter Min Daily Free Period" />
                </div>
                <div className="w-50">
                  <label htmlFor="DailyFreePeriod" className="font-size-sm">
                    Max Hours
                  </label>
                  <NumberInput placeholder="Enter Max Daily Free Period" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TeacherWeeklyHour;
