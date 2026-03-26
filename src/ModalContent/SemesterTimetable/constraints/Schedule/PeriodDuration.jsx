import { Icon } from "@iconify/react";
import { NumberInput } from "../../../../components/FormComponents/InputComponents";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setPeriodDurationField,
  setPeriodDurationValidation,
} from "../../../../Slices/Asynslices/semesterTimetableSlice";
import { numberSchema } from "../../../../ComponentConfig/YupValidationSchema";
import { Fragment } from "react";
function PeriodDuration({ handleClose }) {
  const periodDurationState = useSelector(
    (state) =>
      state.semesterTimetable.hard_constraints.schedule_period_duration_minutes,
  );
  const dispatch = useDispatch();
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between w-100">
          <span className="m-0">Period Duration</span>
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
          <div>
            <label htmlFor="DailyFreePeriod" className="font-size-sm">
              Duration
            </label>
            <NumberInput
              placeholder="Enter Period Duration Minutes"
              value={periodDurationState.duration_minutes.value ?? null}
              onChange={(value) =>
                dispatch(
                  setPeriodDurationField({ field: "duration_minutes", value }),
                )
              }
              onValidationChange={(value) =>
                dispatch(
                  setPeriodDurationValidation({
                    field: "duration_minutes",
                    value,
                  }),
                )
              }
              validationSchema={numberSchema({
                required:true,
                min: 1,
                max: 1440,
                messages:{
                  required:"Period Duration is required",
                  min:"Period Duration must be at least 1 minute",
                  max:"Period Duration cannot exceed 1440 minutes (24 hours)"
                }
              })}
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="breakPeriodDaysException" className="font-size-sm">
              Period Duration Exception (optional)
            </label>
            {periodDurationState.day_exceptions.map((exception, index) => (
              <Fragment key={index}>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <div className="w-25">
                    <span className="font-size-sm text-capitalize">{exception.day}</span>
                  </div>
                  <div className="w-75">
                    <NumberInput
                      placeholder="Enter Period Duration Minutes"
                      value={periodDurationState?.day_exceptions?.find((d) => d.day === exception.day)?.duration_minutes ?? ""}
                      onChange={(value) =>
                        dispatch(
                          setPeriodDurationField({
                            field: "day_exceptions",
                            value: {
                              day: exception.day,
                              duration_minutes: value,
                            },
                          }),
                        )
                      }
                      onValidationChange={(value) =>
                        dispatch(
                          setPeriodDurationValidation({
                            field: "day_exceptions",
                            value: {
                              day: exception.day,
                              duration_minutes: value,
                            },
                          }),
                        )
                      }
                      validationSchema={numberSchema({
                        optional: false,
                        min: 1,
                        max: 1440,
                      })}
                    />
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default PeriodDuration;
