import { Icon } from "@iconify/react";
import {
  NumberInput,
  TimeInput,
  TimeRangeInput,
} from "../../../../components/FormComponents/InputComponents";
import CustomDropdown, {
  MultiSelectDropdown,
} from "../../../../components/Dropdowns/Dropdowns";
import { daysOfWeek } from "../../../../data/data";
import { useRef } from "react";
function ScheduleDailyFreePeriod({ handleClose }) {
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Schedule Daily Free Period</span>
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
                Min Free Period
              </label>
              <NumberInput placeholder="Enter Min Daily Free Period" />
            </div>
            <div className="w-50">
              <label htmlFor="DailyFreePeriod" className="font-size-sm">
                Max Free Period
              </label>
              <NumberInput placeholder="Enter Max Daily Free Period" />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm">Monday</span>
            <div className="d-flex flex-row align-items-center gap-2 w-75">
            <div className="w-50">
              <label htmlFor="DailyFreePeriod" className="font-size-sm">
                Min Free Period
              </label>
              <NumberInput placeholder="Enter Min Daily Free Period" />
            </div>
            <div className="w-50">
              <label htmlFor="DailyFreePeriod" className="font-size-sm">
                Max Free Period
              </label>
              <NumberInput placeholder="Enter Max Daily Free Period" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ScheduleDailyFreePeriod;
