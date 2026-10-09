import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import {
  UserCheck,
  ChevronDown,
  Dot,
  ArrowDown,
  Mail,
  Phone,
} from "lucide-react";
import JobPopOver from "../../components/Popover/JobPopover";
import SearchInput from "../../components/input/search";
import { useGetExams } from "../../hooks/exam/useGetExams";
import { Fragment, useState } from "react";
import { NotFoundError } from "../../components/errors/Error";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { isLastElement } from "../../utils/functions";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import AssignInvigilator from "../../DrawerContent/Invigilator/AssignInvigilator";
import { useGetAssignedInvigilators } from "../../hooks/invigilator/useGetAssignedInvigilators";
import { useRemoveInvigilator } from "../../hooks/invigilator/useRemoveInvigilator";
import {
  setSelectedExam,
  setSelectedAcademicYear,
} from "../../Slices/exam/examInvigilatorSlice";
import { useSelector, useDispatch } from "react-redux";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function ExamInvigilator() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const moduleState = useSelector((state) => state.examInvigilator);
  const { mutate: removeInvigilator, isPending } = useRemoveInvigilator(
    moduleState?.selectedExam?.id,
  );
  const {
    data: invigilators,
    isLoading,
    error,
  } = useGetAssignedInvigilators(moduleState?.selectedExam?.id);
  const handleRemoveInvigilator = (invigilatorId) => {
    removeInvigilator({
      exam_id: moduleState?.selectedExam?.id,
      invigilator_ids: [invigilatorId],
    });
  };
  return (
    <>
      <main>
        <div className="d-flex flex-column gap-2 h-100">
          <div className="d-flex flex-row align-items-center justify-content-between bg-white p-2 border rounded-3">
            <div className="d-flex align-items-center gap-2">
              <div
                className={`${
                  darkMode ? "dark-mode-active" : "light-mode-active"
                } d-flex justify-content-center align-items-center`}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                }}
              >
                <UserCheck size={16} />
              </div>
              <span className="fw-semibold font-size-sm">
                Manage Exam Invigilator
              </span>
            </div>
            <div className="d-flex flex-row align-item-center gap-2">
              <JobPopOver />
              <ModalButton
                classname={
                  "border-none border rounded-3 font-size-sm p-2 d-flex flex-row align-items-center gap-2 white-bg"
                }
              >
                <span style={{ lineHeight: "16px" }}>Actions</span>
                <ChevronDown size={16} />
              </ModalButton>
            </div>
          </div>
          <div className="d-flex flex-row align-items-start gap-1 h-100 w-100">
            <div
              className="card border-none border bg-white p-2 font-size-sm d-flex flex-column gap-3"
              style={{
                width: "25%",
                height: "91.4dvh",
                borderRadius: "0.8rem",
              }}
            >
              <div className="d-flex flex-column gap-1">
                <span className="font-size-sm fw-medium">Examinations</span>
                <div>
                  <SearchInput
                    placeholder="Search for Exam"
                    hotkey={"Ctrl+E"}
                    size="md"
                  />
                </div>
              </div>
              <div className="d-flex flex-column gap-3">
                <ExaminationDropDown moduleState={moduleState} />
              </div>
            </div>
            <div className="d-flex flex-column gap-2" style={{ width: "75%" }}>
              {moduleState?.selectedExam ? (
                <div className="d-flex flex-column gap-4">
                  <div className="d-flex flex-row align-items-center justify-content-between w-100">
                    <div className="w-50">
                      <SearchInput
                        placeholder="Search Admin or Teacher"
                        hotkey="Ctrl+T"
                      />
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2">
                      <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
                        <span>Export</span>
                        <ArrowDown size={16} />
                      </button>
                      <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
                        <span>Filter</span>
                        <Icon
                          icon="basil:filter-outline"
                          width={16}
                          height={16}
                        />
                      </button>
                      <DrawerTrigger
                        title="Assign Invigilator"
                        placement="right"
                        drawerChildren={AssignInvigilator}
                        drawerData={{ selectedExam: moduleState?.selectedExam }}
                        showHeader={false}
                      >
                        <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                          <span>Assign Invigilator</span>
                        </button>
                      </DrawerTrigger>
                    </div>
                  </div>
                  <div
                    className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pe-1"
                    style={{ maxHeight: "84dvh", paddingBottom: "10rem" }}
                  >
                    {isLoading ? (
                      [...Array(2)].map((_, index) => (
                        <Fragment key={index}>
                          <div className="d-flex flex-column gap-2">
                            <RectangleSkeleton
                              width={"15%"}
                              height={"1rem"}
                              borderRadius={6}
                            />
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                              }}
                              className="gap-2"
                            >
                              {[...Array(6)].map((_, index) => (
                                <Fragment key={index}>
                                  <RectangleSkeleton borderRadius={6} />
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        </Fragment>
                      ))
                    ) : error ? (
                      <NotFoundError
                        title={error?.response?.data?.errors?.title || "Error"}
                        description={
                          error?.response?.data?.errors?.description ||
                          "Something went wrong"
                        }
                      />
                    ) : Object.keys(invigilators?.data).length > 0 ? (
                      Object.keys(invigilators?.data).map((obj, index) => (
                        <Fragment key={index}>
                          <div className="d-flex flex-column gap-1">
                            <span className="font-size-sm fw-semibold text-capitalize">
                              {obj.replaceAll("_", " ")}
                            </span>
                            <div
                              style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(3, 1fr)",
                              }}
                              className="gap-2"
                            >
                              {invigilators?.data[obj].map((invig) => (
                                <Fragment key={invig.id}>
                                  <div className="card rounded-4 border-none border shadow-sm p-2 font-size-sm d-flex flex-column gap-4">
                                    <div className="d-flex flex-row justify-content-end">
                                      <small
                                        style={{
                                          height: "1rem",
                                          display: "grid",
                                          alignItems: "center",
                                          fontSize: "0.65rem",
                                        }}
                                        className="rounded-pill px-2 primary-background-100 color-primary text-capitalize"
                                      >
                                        {invig.actorable_type.replaceAll(
                                          "_",
                                          " ",
                                        )}
                                      </small>
                                    </div>
                                    <div className="d-flex flex-column gap-3">
                                      <div className="d-flex flex-row align-items-center justify-content-center">
                                        <div className="d-flex flex-column align-items-center gap-4">
                                          <div
                                            style={{
                                              width: "4rem",
                                              height: "4rem",
                                              display: "grid",
                                              placeItems: "center",
                                              flexShrink: 0,
                                            }}
                                            className="rounded-circle"
                                          >
                                            <img
                                              src="./images/user.png"
                                              alt=""
                                              className="object-fit-cover w-100 h-100 rounded-circle"
                                            />
                                          </div>
                                          <div className="d-flex flex-column align-items-center">
                                            <span
                                              className="fw-semibold"
                                              style={{ lineHeight: 1 }}
                                            >
                                              {invig?.name}
                                            </span>
                                            <small style={{ color: "#888" }}>
                                              @{invig?.username}
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                      <HorizontalDashedLine
                                        dashed={false}
                                        color="#ccc"
                                        thickness={0.2}
                                      />
                                      <div className="d-flex flex-column text-muted gap-2">
                                        <div className="d-flex flex-row align-items-center gap-2">
                                          <Mail size={16} />
                                          <span>{invig?.email}</span>
                                        </div>
                                        <div className="d-flex flex-row align-items-center gap-2">
                                          <Phone size={16} />
                                          <span>{invig?.phone}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      className="bg-none border-none border p-2 font-size-sm w-100 rounded-3 mt-auto"
                                      disabled={isPending}
                                      onClick={() =>
                                        handleRemoveInvigilator(invig?.id)
                                      }
                                    >
                                      {isPending ? (
                                        <SingleSpinner />
                                      ) : (
                                        "Remove Assignment"
                                      )}
                                    </button>
                                  </div>
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        </Fragment>
                      ))
                    ) : (
                      <div className="d-flex flex-column align-items-center gap-2 text-center flex-grow-1">
                        <img
                          src="./sss-maskot/404.png"
                          alt="sss-timetable-maskot"
                          style={{
                            height: "250px",
                            width: "250px",
                            objectFit: "contain",
                          }}
                        />
                        <span className="fw-semibold font-size-sm">
                          No Invigilators Assigned
                        </span>
                        <p className="text-muted font-size-sm mb-0">
                          You will have to Assign invigilators for this exam
                          before managing them
                        </p>
                        <DrawerTrigger
                          title="Assign Invigilator"
                          placement="right"
                          drawerChildren={AssignInvigilator}
                          drawerData={{
                            selectedExam: moduleState?.selectedExam,
                          }}
                          showHeader={false}
                        >
                          <button className="border-none border rounded-3 font-size-sm p-2 primary-background text-white text-capitalize">
                            <span>Assign Invigilator</span>
                          </button>
                        </DrawerTrigger>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="d-flex flex-column align-items-center gap-2 text-center">
                  <img
                    src="./sss-maskot/happy.png"
                    alt="sss-timetable-maskot"
                    style={{
                      height: "250px",
                      width: "250px",
                      objectFit: "contain",
                    }}
                  />
                  <span className="fw-semibold font-size-sm">
                    Ready To Manage Invigilator Assignment ?
                  </span>
                  <p className="text-muted font-size-sm mb-0">
                    Select a Exam To Get Started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default ExamInvigilator;

function ExaminationDropDown({ moduleState }) {
  const dispatch = useDispatch();
  const { data: exams, isLoading, error } = useGetExams();
  return isLoading ? (
    [...Array(6)].map((_, index) => (
      <RectangleSkeleton
        key={index}
        width={"100%"}
        height={"1.5rem"}
        borderRadius={6}
      />
    ))
  ) : error ? (
    <NotFoundError
      title={error?.response?.data?.errors?.title || "Error"}
      description={
        error?.response?.data?.errors?.description || "Something went wrong"
      }
    />
  ) : (
    groupBySchoolYearAndSemester(exams?.data).map((data, dataIndex) => {
      const isOpen = moduleState?.selectedAcademicYear === data?.school_year;
      return (
        <Fragment key={dataIndex}>
          <div className="d-flex flex-column gap-2">
            <button
              className="border-none bg-none px-1 d-flex flex-row align-items-center justify-content-between w-100 fw-semibold text-color"
              onClick={() =>
                dispatch(
                  setSelectedAcademicYear({
                    academicYear: data?.school_year,
                  }),
                )
              }
            >
              <span>{data?.school_year} Academic Year</span>
              <motion.span
                style={{ display: "inline-block" }}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown size={16} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="pe-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    className="scroll-bar-sm over-flow-x-hidden d-flex flex-column gap-2 over-flow-y-auto pe-1 "
                    style={{
                      overflowY: "auto",
                      maxHeight: "34dvh",
                      height: "auto",
                    }}
                  >
                    <div className="d-flex flex-column gap-3">
                      {data?.exams.map((examSemester, examSemesterIndex) => (
                        <Fragment key={examSemesterIndex}>
                          <div className="d-flex flex-column gap-1">
                            <small className="text-muted text-capitalize ps-1">
                              {examSemester?.semester}
                            </small>
                            <div className="d-flex flex-column gap-1">
                              {examSemester?.exams?.map((exam, examIndex) => (
                                <Fragment key={exam?.id}>
                                  <div
                                    className={`d-flex flex-column pointer-cursor 
                                    p-1 rounded-3 transition-all
                                   ${
                                     moduleState?.selectedExam?.id === exam?.id
                                       ? "primary-background-100 color-primary"
                                       : "bg-none hover-bg-primary-50 hover-text-primary-400"
                                   }
                                   `}
                                    onClick={() =>
                                      dispatch(
                                        setSelectedExam({
                                          exam: exam,
                                        }),
                                      )
                                    }
                                  >
                                    <span className="fw-medium">
                                      {exam?.specialty_name}
                                    </span>
                                    <div
                                      className={`d-flex flex-row
                                         align-items-center gap-1
                                         ${moduleState?.selectedExam?.id === exam?.id && "text-muted"} 
                                         text-capitalize`}
                                    >
                                      <span>{exam?.max_score} pts</span>
                                      <Dot size={12} />
                                      <span>{exam?.level_name}</span>
                                      <Dot size={12} />
                                      <span>{exam?.exam_type}</span>
                                      <Dot size={12} />
                                      {exam?.status == "active" ? (
                                        <small
                                          style={{
                                            height: "1rem",
                                            display: "grid",
                                            alignItems: "center",
                                            fontSize: "0.65rem",
                                          }}
                                          className="rounded-pill px-1 bg-fern-100 text-fern-400"
                                        >
                                          {exam?.status}
                                        </small>
                                      ) : exam?.status == "upcoming" ? (
                                        <small
                                          style={{
                                            height: "1rem",
                                            display: "grid",
                                            alignItems: "center",
                                            fontSize: "0.65rem",
                                          }}
                                          className="rounded-pill px-1 primary-background-100 color-primary"
                                        >
                                          {exam?.status}
                                        </small>
                                      ) : (
                                        <small
                                          style={{
                                            height: "1rem",
                                            display: "grid",
                                            alignItems: "center",
                                            background: "#fafafa",
                                            color: "#a3a3a3",
                                            fontSize: "0.65rem",
                                          }}
                                          className="rounded-pill px-1"
                                        >
                                          {exam?.status}
                                        </small>
                                      )}
                                    </div>
                                  </div>
                                  {!isLastElement(
                                    examIndex,
                                    examSemester?.exams?.length,
                                  ) && <hr />}
                                </Fragment>
                              ))}
                            </div>
                          </div>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Fragment>
      );
    })
  );
}

function groupBySchoolYearAndSemester(data) {
  const grouped = data.reduce((acc, item) => {
    const year = item.school_year || "";
    const semester = item.semester_name || "";

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][semester]) {
      acc[year][semester] = [];
    }

    acc[year][semester].push(item);
    return acc;
  }, {});

  return Object.entries(grouped).map(([school_year, semesters]) => ({
    school_year,
    exams: Object.entries(semesters).map(([semester, exams]) => ({
      semester,
      exams,
    })),
  }));
}
