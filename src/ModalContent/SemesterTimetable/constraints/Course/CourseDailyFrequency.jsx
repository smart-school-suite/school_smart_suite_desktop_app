import { Icon } from "@iconify/react";
import { NumberInput } from "../../../../components/FormComponents/InputComponents";
function CourseDailyFrequency({ handleClose }) {
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Course Daily Frequency</span>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-row align-items-center gap-2">
            <div className="w-50">
              <label htmlFor="minFrequency" className="font-size-sm">
                Min Frequency
              </label>
              <NumberInput placeholder="Enter Min Frequency" />
            </div>
            <div className="w-50">
              <label htmlFor="maxPeriods" className="font-size-sm">
                Max Frequency
              </label>
              <NumberInput placeholder="Enter Max Frequency" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default CourseDailyFrequency;
