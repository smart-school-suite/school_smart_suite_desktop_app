import { useGetTeacherAvailabilitySlots } from "../../hooks/teacherAvailability/useGetTeacherAvailabilitySlots";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { Icon } from "@iconify/react";
import { days } from "../../constants/day";
import { Fragment, useState } from "react";
import { parse, format } from "date-fns";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import {
  CircleX,
  ChevronDown,
  Plus,
  Dot,
  ArrowRight,
  Trash2,
  TriangleAlert,
  Info,
  CircleCheck,
  Minus,
} from "lucide-react";
import { isLastElement } from "../../utils/functions";
import { groupAndFormatSlots } from "../../utils/time/time";
import InstructorAvailabilitySchedule from "../../components/Schedule/InstructorAvailabilitySchedule";
function TeacherAvailabilitySlot({ drawerData, handleClose }) {
  const {
    data: slots,
    isLoading,
    error,
  } = useGetTeacherAvailabilitySlots(drawerData.id);

  return (
    <>
      <div
        className="pt-2 font-size-sm d-flex flex-column"
        style={{ flex: 1, minHeight: 0 }}
      >
        {isLoading ? (
          <RectangleSkeleton />
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <>
            <div className="drawer-content pb-4">
              <div className="d-flex flex-column gap-3">
                <div className="d-flex flex-row align-items-center gap-2 px-2">
                  <div
                    style={{ width: "2.8rem", height: "2.8rem" }}
                    className="rounded-circle"
                  >
                    <img
                      src="./images/user.png"
                      alt=""
                      className="object-fit-cover w-100 h-100"
                      style={{
                        borderRadius: "2.8rem",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <span className="fw-medium">
                      {slots?.data?.teacher?.name}
                    </span>
                    <small>@{slots?.data?.teacher?.username}</small>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.5}
                  color="#ddd"
                />
                <div className="d-flex flex-column gap-3 px-2">
                  <span className="text-muted">Context</span>
                  <div className="d-flex flex-column gap-2">
                    <div className="d-flex flex-column fw-medium">
                      <span>School year</span>
                      <span>
                        {
                          slots?.data?.school_semester?.school_year
                            ?.system_academic_year?.name
                        }
                      </span>
                    </div>
                    <HorizontalDashedLine
                      dashed={false}
                      thickness={0.5}
                      color="#ddd"
                    />
                    <div className="d-flex flex-column fw-medium">
                      <span>Semester </span>
                      <span>
                        {slots?.data?.school_semester?.semester?.name}
                      </span>
                    </div>
                    <HorizontalDashedLine
                      dashed={false}
                      thickness={0.5}
                      color="#ddd"
                    />
                    <div className="d-flex flex-column fw-medium">
                      <span>Specialty </span>
                      <div className="d-flex flex-row align-items-center">
                        <span>
                          {
                            slots?.data?.school_semester?.school_year?.specialty
                              ?.specialty_name
                          }
                        </span>
                        <Dot size={12} />
                        <span>
                          {
                            slots?.data?.school_semester?.school_year?.specialty
                              ?.level.name
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.5}
                  color="#ddd"
                />
                <div className="d-flex flex-column gap-3 px-2">
                  <span className="text-muted">Weekly Availability</span>
                  <div className="d-flex flex-column fw-medium">
                    <span>{slots?.data?.summary?.total_weekly_hours} Hours</span>
                    <span>Available each week</span>
                  </div>
                  <InstructorAvailabilitySchedule />
                </div>
                <HorizontalDashedLine
                  dashed={false}
                  thickness={0.5}
                  color="#ddd"
                />
                <div className="d-flex flex-column gap-3 px-2">
                  <span className="text-muted">Availability Windows</span>
                  {slots?.data?.pref_times?.map((ptimes, index) => {
                    const slots = groupAndFormatSlots(ptimes.slots);
                    return (
                      <>
                        <Fragment key={index}>
                          <div className="d-flex flex-column gap-2 fw-semibold">
                            <span className="text-capitalize">
                              {ptimes.day}
                            </span>
                            {Object.keys(slots).map((obj, objIndex) => {
                              return (
                                <div
                                  className="d-flex flex-column gap-2"
                                  key={objIndex}
                                >
                                  <small className="text-muted fw-normal text-capitalize">
                                    {obj}
                                  </small>
                                  <div className="d-flex flex-row flex-wrap gap-2">
                                    {slots[obj].map((slot) => (
                                      <Fragment key={slot.id}>
                                        <button className="border-none rounded-pill d-flex flex-row gap-1 align-items-center px-2"
                                         style={{ padding:"0.2rem" }}
                                        >
                                          <span>{slot.formatted_start}</span>
                                          <Minus size={8} />
                                          <span>{slot.formatted_end}</span>
                                        </button>
                                      </Fragment>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Fragment>
                        {!isLastElement(index, slots?.data?.pref_times) && (
                          <HorizontalDashedLine
                            dashed={false}
                            color="#ccc"
                            thickness={0.5}
                          />
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="drawer-footer font-size-sm">
              <div className="d-flex flex-column w-100">
                <HorizontalDashedLine
                  dashed={false}
                  color="#ccc"
                  thickness={0.5}
                />
                <div className="d-flex flex-row align-items-center justify-content-between p-2">
                  <span> Last updated {slots?.data?.summary?.last_updated_human}</span>
                  <button
                    className="border-none bg-none border p-2 rounded-3"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default TeacherAvailabilitySlot;
