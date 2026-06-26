import { Icon } from "@iconify/react";
import { Fragment, useState } from "react";
import { useGetLevelSpecialties } from "../../hooks/specialty/useGetLevelSpecialties";
import { AnimatePresence, motion } from "framer-motion";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetCourseSpecialtyId } from "../../hooks/course/useGetCourseSpecialtyId";
import { useNavigate } from "react-router-dom";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import AssignCourse from "../../ModalContent/TeacherCourse/AssignCourse";
import ManageCourseAssignment from "../../ModalContent/TeacherCourse/ManageCourseAssignment";
function TeacherCourse() {
  const [specialty, setSpecialty] = useState(null);
  const navigate = useNavigate();
  const {
    data: courses,
    isLoading: isSpecialtyCoursesLoading,
    error: specialtyCourseError,
  } = useGetCourseSpecialtyId(specialty);
  return (
    <>
      <main className="d-flex flex-row align-items-start gap-2 h-100 w-100">
        <div
          className="card border-none rounded-4 h-100 font-size-sm p-2 d-flex flex-column gap-4"
          style={{ width: "20%" }}
        >
          <div className="d-flex flex-column gap-3">
            <span className="font-size-sm fw-medium">Specialty</span>
            <div>
              <input
                type="search"
                className="form-control rounded-3 font-size-sm"
                placeholder="Search Specialty"
              />
            </div>
          </div>
          <LevelSpecialtyDropdown
            setSpecialty={setSpecialty}
            specialty={specialty}
          />
        </div>
        <div className="d-flex flex-column gap-2" style={{ width: "80%" }}>
          <div className="d-flex flex-row align-items-end justify-content-end">
            <input
              type="search"
              placeholder="Search for course"
              className="form-control font-size-sm"
            />
          </div>
          {specialty ? (
            isSpecialtyCoursesLoading ? (
              <div
                className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pe-1"
                style={{ maxHeight: "75dvh" }}
              >
                {[...Array(2)].map((_, index) => (
                  <Fragment key={index}>
                    <div className="d-flex flex-column gap-2">
                      <RectangleSkeleton
                        width={"15%"}
                        height={"1rem"}
                        borderRadius={6}
                      />
                      <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                        {[...Array(6)].map((_, index) => (
                          <Fragment key={index}>
                            <RectangleSkeleton
                              width={"32.8%"}
                              height={"20dvh"}
                              borderRadius={6}
                            />
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            ) : specialtyCourseError ? (
              <NotFoundError
                title={
                  specialtyCourseError?.response?.data?.errors?.title || "Error"
                }
                description={
                  specialtyCourseError?.response?.data?.errors?.description ||
                  "Something went wrong"
                }
              />
            ) : courses?.data?.length > 0 ? (
              <div
                className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pe-1"
                style={{ maxHeight: "75dvh", paddingBottom: "5rem" }}
              >
                {courses.data.map((semester) => (
                  <Fragment key={semester?.semester_id}>
                    <div className="d-flex flex-column gap-1">
                      <span className="font-size-md fw-semibold text-capitalize">
                        {semester?.semester_name}
                      </span>
                      <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                        {semester?.courses?.map((course) => (
                          <Fragment key={course.course_id}>
                            <Course course={course} specialtyId={specialty} />
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center gap-2 text-center">
                <img
                  src="./sss-maskot/timetable.png"
                  alt="sss-timetable-maskot"
                  style={{
                    height: "250px",
                    width: "250px",
                    objectFit: "contain",
                  }}
                />
                <span className="fw-semibold font-size-sm">
                  No Courses Available
                </span>
                <p className="text-muted font-size-sm mb-0">
                  You will have to create courses for this specialty before
                  assigning them click the button below to get started
                </p>
                <button
                  className="border-none rounded-3 p-2 font-size-sm primary-background text-white"
                  onClick={() => navigate("/courses")}
                >
                  Manage Courses
                </button>
              </div>
            )
          ) : (
            <div className="d-flex flex-grow-1 align-items-center justify-content-center">
              <div className="d-flex flex-column align-items-center gap-2 text-center">
                <img
                  src="./sss-maskot/timetable.png"
                  alt="sss-timetable-maskot"
                  style={{
                    height: "250px",
                    width: "250px",
                    objectFit: "contain",
                  }}
                />
                <span className="fw-semibold font-size-sm">
                  Ready To Manage Teacher Course Assignment ?
                </span>
                <p className="text-muted font-size-sm mb-0">
                  Select a Specialty To Get Started
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
export default TeacherCourse;

function Course({ course, specialtyId }) {
  return (
    <>
      <div
        className="card p-2 rounded-4 border-none shadow-sm d-flex flex-column gap-3 font-size-sm"
        style={{ width: "32.8%" }}
      >
        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span style={{ width: "65%" }} className="fw-semibold">
              {course?.course_title}
            </span>
            {course.assignment_status === "unassigned" ? (
              <div
                style={{
                  background: "#fbedd9",
                  color: "#e9994e",
                  fontSize: "0.7rem",
                  padding: "0.2rem",
                }}
                className="rounded-pill px-1 d-flex flex-row align-items-center gap-1"
              >
                <span>
                  <Icon
                    icon="fluent:warning-16-regular"
                    width={16}
                    height={16}
                  />
                </span>
                <span>unassigned</span>
              </div>
            ) : (
              <div
                style={{
                  background: "#e3f5e3",
                  color: "#5cb85c",
                  fontSize: "0.7rem",
                }}
                className="rounded-pill px-1 d-flex flex-row align-items-center gap-1"
              >
                <span>
                  <Icon icon="lets-icons:check-fill" width={18} height={18} />
                </span>
                <span>assigned</span>
              </div>
            )}
          </div>
          <div className="d-flex flex-row align-items-center gap-2 fw-medium">
            <div className="d-flex flex-row align-items-center gap-1">
              <span style={{ lineHeight: 0 }}>
                <Icon icon="iconoir:medal" width={18} height={18} />
              </span>
              <span>{course.course_credit} Credit</span>
            </div>
            <span>
              <Icon icon="icon-park-outline:dot" />
            </span>
            <div className="d-flex flex-row align-items-center gap-1">
              <span style={{ lineHeight: 0 }}>
                <Icon icon="mynaui:hash-waves" width={18} height={18} />
              </span>
              <span>{course.course_code}</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <p
            className="text-muted font-size-sm m-0"
            style={{
              height: "100px",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            }}
          >
            {course?.description}
          </p>
          <div className="d-flex flex-row gap-2">
            {course.types.map((type) => (
              <Fragment key={type.id}>
                <div
                  style={{
                    background: type?.background_color,
                    color: type?.text_color,
                    fontSize: "0.75rem",
                  }}
                  className="rounded-pill px-2"
                >
                  {type?.name}
                </div>
              </Fragment>
            ))}
          </div>
          {course?.assignment_status === "assigned" && (
            <div className="d-flex flex-row align-items-center gap-1">
              <img
                src="./images/user.png"
                alt=""
                style={{
                  width: "2rem",
                  height: "2rem",
                  objectFit: "contain",
                }}
              />
              <div className="d-flex flex-column">
                <span className="fw-medium">{course?.teachers[0]?.name}</span>
                <span className="text-muted">@ {course?.teachers[0]?.username}</span>
              </div>
            </div>
          )}
        </div>
        {course?.assignment_status === "unassigned" ? (
          <ModalButton
            action={{ modalContent: AssignCourse }}
            rowData={{ ...course, specialtyId }}
            classname={
              "p-2 font-size-sm rounded-pill border-none primary-background text-white text-center"
            }
            size={"lg"}
          >
            <span>Assign Teacher</span>
          </ModalButton>
        ) : (
          <ModalButton
            action={{ modalContent: ManageCourseAssignment }}
            rowData={{ ...course, specialtyId }}
            classname={
              "p-2 font-size-sm rounded-pill border-none  text-center border"
            }
            size={"lg"}
          >
            <span>Manage Assignment</span>
          </ModalButton>
        )}
      </div>
    </>
  );
}

function LevelSpecialtyDropdown({ setSpecialty, specialty }) {
  const { data: levelSpecialties, isLoading, error } = useGetLevelSpecialties();
  // Store the active level ID instead of a boolean to manage menus individually
  const [openLevelId, setOpenLevelId] = useState(null);

  const toggleDropdown = (levelId) => {
    setOpenLevelId(openLevelId === levelId ? null : levelId);
  };

  return (
    <>
      {isLoading ? (
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
        levelSpecialties?.data?.map((lSpecialty) => {
          const isOpen = openLevelId === lSpecialty.level_id;

          return (
            <Fragment key={lSpecialty.level_id}>
              <div className="d-flex flex-column gap-3 w-100 mb-2">
                <button
                  type="button"
                  onClick={() => toggleDropdown(lSpecialty.level_id)}
                  className="w-100 d-flex flex-row align-items-center justify-content-between border-none transparent-bg p-0"
                >
                  <span className="font-size-sm fw-semibold">
                    {`${lSpecialty.level_name} (${lSpecialty.specialties.length})`}
                  </span>
                  <motion.span
                    style={{ display: "inline-block" }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <Icon icon="mi:chevron-down" width="16" height="16" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                      className="d-flex flex-column gap-3"
                    >
                      {lSpecialty.specialties.map((spec) => (
                        <Fragment key={spec.id}>
                          <button
                            className="d-flex flex-row align-items-center justify-content-between border-none transparent-bg p-0 w-100 text-start"
                            onClick={() => setSpecialty(spec.id)}
                          >
                            <span>{spec.specialty_name}</span>
                            {spec.id === specialty && (
                              <span>
                                <Icon
                                  icon="material-symbols:check-rounded"
                                  width="16"
                                  height="16"
                                />
                              </span>
                            )}
                          </button>
                        </Fragment>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Fragment>
          );
        })
      )}
    </>
  );
}
