import { useGetTeacherAvailabilitySlots } from "../../hooks/teacherAvailability/useGetTeacherAvailabilitySlots";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { days } from "../../constants/day";
import { Fragment, useState } from "react";
import { parse, format } from "date-fns";
function TeacherAvailabilitySlot({ rowData, handleClose }) {
  const [selectedDay, setSelectedDay] = useState("mon");
  const {
    data: slots,
    isLoading,
    error,
  } = useGetTeacherAvailabilitySlots(rowData.id);

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span>Teacher Availability Slots</span>
          <span onClick={handleClose} style={{ cursor: "pointer" }}>
            <Icon icon="proicons:cancel" />
          </span>
        </div>
        <div className="d-flex flex-column gap-2">
          <div className="day-calendar-container">
            {days?.map((day, index) => (
              <Fragment key={index}>
                <button
                  className={`${
                    selectedDay == day?.short?.toLowerCase()
                      ? "day-selected"
                      : null
                  } font-size-sm`}
                  style={{ height: "3rem" }}
                  onClick={() => setSelectedDay(day?.short?.toLowerCase())}
                >
                  {day?.short}
                </button>
              </Fragment>
            ))}
          </div>
          <div className="modal-content-child pe-2">
            {isLoading ? (
              <div>
                <RectangleSkeleton width="20%" height="1dvh" />
                <div className="avaibility-slot-grid">
                  {[...Array(10)].map((_, index) => (
                    <Fragment key={index}>
                      <RectangleSkeleton width="100%" height="100%" />
                    </Fragment>
                  ))}
                </div>
              </div>
            ) : error ? (
              <NotFoundError
                title={error?.response?.data?.errors?.title}
                description={error?.response?.data?.errors?.description}
              ></NotFoundError>
            ) : (
              slots?.data
                ?.filter((items) => items.short == selectedDay)
                .map((items, index) => (
                  <Fragment key={index}>
                    <span className="font-size-sm fw-medium text-capitalize">
                      {items?.day}
                    </span>
                    <div className="avaibility-slot-grid">
                      {items.slots.map((slot) => (
                        <div
                          className="card border p-2 d-flex flex-column gap-2"
                          style={{ height: "100%" }}
                        >
                          <div className="d-flex flex-column">
                            <span className="font-size-sm fw-semibold text-capitalize">
                              {slot.day_of_week}
                            </span>
                            <span className="font-size-sm">Teacher Name</span>
                          </div>
                          <div className="d-flex flex-row align-items-center font-size-sm gap-1 fw-medium mt-auto">
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="weui:time-outlined"
                                width="16"
                                height="16"
                              />
                            </span>
                            <span>
                              {format(
                                parse(slot.start_time, "HH:mm:ss", new Date()),
                                "hh:mm a"
                              )}
                            </span>
                            <span style={{ lineHeight: 0 }}>
                              <Icon
                                icon="octicon:dash-16"
                                width="10"
                                height="10"
                              />
                            </span>
                            <span>
                              {format(
                                parse(slot.end_time, "HH:mm:ss", new Date()),
                                "hh:mm a"
                              )}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Fragment>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default TeacherAvailabilitySlot;
