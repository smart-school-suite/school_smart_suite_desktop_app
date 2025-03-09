import Navbar from "../components/Navbar";
import CustomDropdown from "../components/Dropdowns";
import { SchoolYearSelector } from "../components/yearPicker";
import { Icon } from "@iconify/react";
import {
  useFetchSpecialtyTimetableQuery,
  useFetchSpecialtiesQuery,
} from "../Slices/Asynslices/fetchSlice";
import { useState, useEffect } from "react";
import Pageloaderspinner from "../components/Spinners";
import toast from "react-hot-toast";
import { ActionButtonDropUp } from "./actionButton";
import CustomTooltip from "../components/Tooltip";
import { ExamTimeTableNavbarOptions } from "../../ComponentConfig/navBarConfig";
function Timetable() {
  const [selectedValue, setSelectedValue] = useState(null);
  const handleSelect = (value) => {
    setSelectedValue(value);
    toast.success(
      `Selected Specialty: ${value.id} level id: ${value.level_id}`
    );
  };

  const {
    data: specialty,
    error: specialtyError,
    isLoading: specialtyLoading,
  } = useFetchSpecialtiesQuery();

  const {
    data: timetable,
    error: timetableError,
    isLoading: timetableLoading,
  } = useFetchSpecialtyTimetableQuery(
    { level_id: selectedValue?.level_id, specialty_id: selectedValue?.id },
    { skip: !selectedValue }
  );

  const filter_array_keys = [
    "id",
    "specialty_name",
    "level.name",
    "level.level",
    "level.id",
  ];
  const renameMapping = {
    "level.name": "level_name",
    "level.level": "Level",
    "level.id": "level_id",
  };

  if (timetableLoading || specialtyLoading) {
    return <Pageloaderspinner />;
  }

  if (specialtyError) {
    return <p>Error loading specialties: {specialtyError.message}</p>;
  }

  if (timetableError) {
    return <p>Error loading timetable: {timetableError.message}</p>;
  }

  return (
    <>
      <Navbar options={ExamTimeTableNavbarOptions} />
      <div className="d-flex flex-row align-items-center justify-content-between my-2 z-0">
        <div className="d-fl py-2 px-2 d-flex flex-row align-items-center justify-content-center gap-3 rounded-3">
          <button
            className="border-none bg-white d-flex justify-content-center align-items-center"
            style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }}
          >
            <Icon icon="akar-icons:schedule" className="fs-5 color-primary" />
          </button>
          <h5 className="my-0 fw-semibold">Specialty TimeTable</h5>
        </div>
        <div className="d-flex flex-row gap-2">
          <button className="border-none green-bg rounded-3 p-2 text-white font-size-sm">
            Create Time Table
          </button>
        </div>
      </div>

      <div className="card py-2 rounded-4 w-100">
        <div className="d-flex flex-row justify-content-between align-items-center w-100 px-2">
          <div className="d-flex flex-row gap-2 align-items-center w-50">
            <div className="w-50">
              <SchoolYearSelector />
            </div>
            <div className="w-50">
              <CustomDropdown
                data={specialty?.specialty || []}
                displayKey={["specialty_name", "level_name"]}
                valueKey={["id", "level_id"]}
                onSelect={handleSelect}
                isLoading={specialtyLoading}
                error={specialtyError}
                filter_array_keys={filter_array_keys}
                renameMapping={renameMapping}
              />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center gap-3">
            <CustomTooltip tooltipText={"Download Time Table"}>
              <button
                className="border-none d-flex justify-content-center align-items-center color-primary"
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  borderRadius: "2.5rem",
                }}
              >
                <Icon icon="material-symbols:download" />
              </button>
            </CustomTooltip>
            <button
              className="border-none p-2 rounded-3 font-size-sm color-primary bg-white fill-hover"
              style={{ outline: "1px solid #0285C6" }}
            >
              Update Timetable
            </button>
          </div>
        </div>

        <div className="table-container w-100">
          <table className="mt-1 custom-table">
            <thead>
              <tr>
                <td className="first-column border-top">
                  <p className="rotate-90 text-center my-0">Days</p>
                </td>
                <td className="border-top">
                  <p className="mt-3">Courses</p>
                </td>
              </tr>
            </thead>
            <tbody className="scrollable-table">
              {Object.keys(timetable?.timetable || {}).map((day, index) => {
                const courses = timetable?.timetable[day] || [];
                return (
                  <tr key={index}>
                    <td className="first-column">
                      <div className="d-flex flex-column justify-content-center">
                        <p className="my-0 text-end font-size-sm text-uppercase">
                          {day}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div
                        className="d-flex flex-row align-items-center justify-content-between"
                        style={{ width: "70vw" }}
                      >
                        <CardComponent courses={courses} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Timetable;

function CardComponent(props) {
  const initialDisplayCount = 4;
  const [currentIndex, setCurrentIndex] = useState(0);
  const displayedCourses = props.courses.slice(
    currentIndex,
    currentIndex + initialDisplayCount
  );
  const handleNext = () => {
    if (currentIndex + initialDisplayCount < props.courses.length) {
      setCurrentIndex((prevIndex) => prevIndex + initialDisplayCount);
    }
  };
  const handlePrevious = () => {
    if (currentIndex - initialDisplayCount >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - initialDisplayCount);
    }
  };
  const actions = [
    {
      modalTitle: "Update Time Table",
      actionTitle: "Update",
      modalContent: Update,
    },
    {
      modalTitle: "Time Table  Details",
      actionTitle: "Details",
      modalContent: Details,
    },
    {
      modalTitle: "Delete  Time Table",
      actionTitle: "Delete",
      modalContent: Delete,
    },
  ];
  return (
    <>
      <div className="d-flex flex-row align-items-center gap-2 w-100">
        {displayedCourses.map((course, courseIndex) => (
          <div
            key={courseIndex + currentIndex}
            className="p-2 primary-background-50 rounded-3 d-flex flex-column w-25 timetable-cards"
          >
            <div className="d-flex align-items-center justify-content-between">
              <p className="my-0 font-size-sm">{course.course}</p>
              <ActionButtonDropUp actions={actions} row_id={course.id} />
            </div>
            <div className="my-2">
              <p className="my-0 font-size-sm text-wrap">{course.teacher}</p>
            </div>
            <div className="mt-auto d-flex flex-row justify-content-between font-size-sm">
              <span>{course.start_time}</span>
              <span>{course.end_time}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <button
          className={`border-none transparent-bg fs-5 color-primary ${
            currentIndex > 0 ? "visually-hidden" : null
          }`}
          onClick={() => {
            handlePrevious();
          }}
        >
          <Icon icon="akar-icons:circle-chevron-up-fill" />
        </button>
        <button
          className={`border-none transparent-bg fs-5 color-primary ${
            currentIndex + initialDisplayCount < props.courses.length
              ? "visually-hidden"
              : null
          }`}
          onClick={() => {
            handleNext();
          }}
        >
          <Icon icon="akar-icons:circle-chevron-down-fill" />
        </button>
      </div>
    </>
  );
}

function Delete() {
  return <></>;
}

function Update() {
  return <></>;
}

function Details({ row_id }) {
  return (
    <>
      <span>{row_id}</span>
    </>
  );
}
