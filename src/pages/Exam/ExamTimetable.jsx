import { Drawer } from "../../components/drawer/Drawer";
import React, { useState } from "react";
import VersionWrapper from "../../examTimetable/VersionWrapper";
import GridWrapper from "../../examTimetable/GridWrapper";
import DiagnosticWrapper from "../../examTimetable/DiagnosticWrapper";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
function ExamTimetable() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  return (
    <>
      <main className="main-container gap-2">
        <div style={{ height: "5%" }}>
          <div className="d-flex align-items-center gap-2">
            <div
              className={`${
                darkMode ? "dark-mode-active" : "light-mode-active"
              } d-flex justify-content-center align-items-center`}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <Icon
                icon="ant-design:schedule-outlined"
                width="16"
                height="16"
              />
            </div>
            <span className="my-0 fw-semibold font-size-sm">Manage Exam Timetable</span>
          </div>
        </div>
        <div
          className="d-flex flex-row align-items-start"
          style={{ height: "95%" }}
        >
          <VersionWrapper />
          <GridWrapper />
          <DiagnosticWrapper />
        </div>
      </main>
    </>
  );
}
export default ExamTimetable;
