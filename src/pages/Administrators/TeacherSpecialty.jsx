import { Icon } from "@iconify/react";
import { Fragment, useState } from "react";
import { useGetLevelSpecialties } from "../../hooks/specialty/useGetLevelSpecialties";
import { AnimatePresence, motion } from "framer-motion";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetCourseSpecialtyId } from "../../hooks/course/useGetCourseSpecialtyId";
import { useNavigate } from "react-router-dom";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { useGetTeacherBySpecialty } from "../../hooks/teacher/useGetTeacherBySpecialty";
import AssignTeacherSpecialty from "../../DrawerContent/TeacherSpecialty/AssignTeacherSpecialty";
import { NotFoundError } from "../../components/errors/Error";
import { isLastElement } from "../../utils/functions";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { ArrowDown } from "lucide-react";
import SearchInput from "../../components/input/search";
function TeacherSpecialty() {
  const [specialty, setSpecialty] = useState(null);
  const {
    data: teachers,
    isLoading: isTeacherLoading,
    error: teacherError,
  } = useGetTeacherBySpecialty(specialty);
  return (
    <>
      <main className="d-flex flex-row align-items-start gap-2 h-100 w-100">
        <div
          className="card border rounded-4 h-100 font-size-sm p-2 d-flex flex-column gap-3"
          style={{ width: "25%" }}
        >
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-2">
              <span className="font-size-sm fw-medium">Specialty</span>
              <div>
                <SearchInput
                  placeholder="Search for Specialty"
                  hotkey="Ctrl+U"
                  size="sm"
                />
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <LevelSpecialtyDropdown
              setSpecialty={setSpecialty}
              specialty={specialty}
            />
          </div>
        </div>
        <div className="d-flex flex-column gap-3" style={{ width: "75%" }}>
          <div className="d-flex flex-row align-items-end justify-content-between w-100">
            <div className="w-50">
              <SearchInput placeholder="Search for Teacher" hotkey="Ctrl+K" />
            </div>
            <div className="d-flex flex-row align-items-center gap-2">
              <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
                <span>Export</span>
                <ArrowDown size={16} />
              </button>
              <button className="font-size-sm bg-white border-none border rounded-3 p-2 d-flex flex-row align-items-center gap-2">
                <span>Filter</span>
                <Icon icon="basil:filter-outline" width={16} height={16} />
              </button>
              {specialty && (
                <DrawerTrigger
                  title="Manage Assignment"
                  placement="right"
                  drawerChildren={AssignTeacherSpecialty}
                  drawerData={{
                    specialtyId: specialty,
                  }}
                  classname={
                    "p-2 font-size-sm rounded-pill border-none  text-center border"
                  }
                >
                  <button
                    className="border-none border rounded-3 font-size-sm px-2 primary-background text-white text-capitalize"
                    style={{ padding: "0.38rem" }}
                  >
                    <span>Assign Teacher</span>
                  </button>
                </DrawerTrigger>
              )}
            </div>
          </div>
          {specialty ? (
            isTeacherLoading ? (
              <div
                className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pe-1"
                style={{ maxHeight: "75dvh" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                  }}
                  className="gap-2"
                >
                  {[...Array(8)].map((_, index) => (
                    <Fragment key={index}>
                      <RectangleSkeleton borderRadius={6} />
                    </Fragment>
                  ))}
                </div>
              </div>
            ) : teacherError ? (
              <NotFoundError
                title={teacherError?.response?.data?.errors?.title || "Error"}
                description={
                  teacherError?.response?.data?.errors?.description ||
                  "Something went wrong"
                }
              />
            ) : teachers?.data?.length > 0 ? (
              <div
                className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pe-1"
                style={{ maxHeight: "75dvh", paddingBottom: "5rem" }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                  }}
                  className="gap-2"
                >
                  {teachers?.data?.map((teacher) => (
                    <Fragment key={teacher?.id}>
                      <Teacher teacher={teacher} specialtyId={specialty} />
                    </Fragment>
                  ))}
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column align-items-center gap-2 text-center">
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
                  No Teachers Assigned
                </span>
                <p className="text-muted font-size-sm mb-0">
                  You will have to assign teachers for this specialty before
                  assigning them click the button below to get started
                </p>
                <DrawerTrigger
                  title="Manage Assignment"
                  placement="right"
                  drawerChildren={AssignTeacherSpecialty}
                  drawerData={{
                    specialtyId: specialty,
                  }}
                  classname={
                    "p-2 font-size-sm rounded-pill border-none  text-center border"
                  }
                >
                  <button
                    className="border-none border rounded-3 font-size-sm px-2 primary-background text-white text-capitalize"
                    style={{ padding: "0.38rem" }}
                  >
                    <span>Assign Teacher</span>
                  </button>
                </DrawerTrigger>
              </div>
            )
          ) : (
            <div className="d-flex flex-grow-1 align-items-center justify-content-center">
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
                  Ready To Manage Teacher Specialty Assignment ?
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
export default TeacherSpecialty;

function LevelSpecialtyDropdown({ setSpecialty, specialty }) {
  const { data: levelSpecialties, isLoading, error } = useGetLevelSpecialties();
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
                  className="w-100 d-flex flex-row align-items-center justify-content-between border-none transparent-bg px-1"
                >
                  <span className="fw-medium" style={{ fontSize: "0.8rem" }}>
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
                      className="d-flex flex-column gap-3 pe-2"
                    >
                      <div
                        className="scroll-bar-sm over-flow-x-hidden d-flex flex-column gap-2 over-flow-y-auto pe-1"
                        style={{
                          overflowY: "auto",
                          maxHeight: "34dvh",
                          height: "auto",
                        }}
                      >
                        {lSpecialty.specialties.map((spec) => (
                          <Fragment key={spec.id}>
                            <button
                              className={`d-flex flex-row align-items-center justify-content-between border-none rounded-3 p-2 w-100 text-start transition-all  ${spec.id == specialty ? "primary-background-100 color-primary" : "bg-transparent hover-bg-primary-50 hover-text-primary-400"}`}
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
                      </div>
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

function Teacher({ teacher, specialtyId }) {
  return (
    <>
      <div
        className="card font-size-sm rounded-4 p-2 d-flex flex-column pointer-cursor d-flex flex-column gap-3 border shadow-sm"
        onClick={() => setSelectedTeacher(teacher.id)}
      >
        <div className="d-flex flex-row align-items-start justify-content-between">
          <div className="d-flex flex-row align-items-center gap-1">
            <img
              src="./images/user.png"
              alt=""
              style={{
                width: "2.5rem",
                height: "2.5rem",
                objectFit: "contain",
              }}
            />
            <div className="d-flex flex-column">
              <span className="fw-medium">{teacher?.name}</span>
              <span className="text-muted">@{teacher?.username}</span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-3">
          <div className="card p-2 rounded-4 d-flex flex-column gap-2 border-none">
            <div className="d-flex flex-column gap-1">
              {teacher?.qualifications?.map((quali, index) => {
                return (
                  <Fragment key={quali.id}>
                    <div
                      style={{ fontSize: "0.7rem" }}
                      className="d-flex flex-column gap-1"
                    >
                      <div className="d-flex flex-row align-items-center gap-1">
                        <span>
                          <Icon
                            icon="streamline-plump:graduation-cap"
                            width={14}
                            height={14}
                          />
                        </span>
                        <span className="fw-semibold">{quali?.name}</span>
                      </div>
                      <div className="d-flex flex-row align-items-center gap-1 fw-normal">
                        <span>University of Buea</span>
                        <span style={{ lineHeight: 0 }}>
                          <Icon icon="icon-park-outline:dot" />
                        </span>
                        <span> 2018</span>
                      </div>
                    </div>
                    {!isLastElement(index, teacher.qualifications.length) && (
                      <hr />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </div>
          <div className="d-flex flex-row flex-wrap gap-2">
            {teacher?.levels?.map((level) => (
              <Fragment key={level?.id}>
                <div
                  style={{
                    background: "#e0f2fe",
                    color: "#38bff8",
                    fontSize: "0.7rem",
                    width: "max-content",
                    padding: "0.1rem",
                  }}
                  className="rounded-pill px-2 d-flex flex-row align-items-center gap-1"
                >
                  <span>{level?.name}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="mt-auto">
          <hr />
          <div className="d-flex flex-row align-items-center justify-content-around">
            <div className="d-flex flex-column gap-1 align-center  text-center">
              <span style={{ fontSize: "0.7rem" }} className="text-muted">
                Courses Assigned
              </span>
              <div className="d-flex flex-row align-items-center gap-2 justify-content-center">
                <span>
                  <Icon icon="ion:book-outline" width={18} height={18} />
                </span>
                <span className="fw-bold font-size-md">
                  {teacher?.num_assigned_courses}
                </span>
              </div>
            </div>
            <div
              style={{ height: "2.5rem", background: "#ddd", width: "0.05rem" }}
            ></div>
            <div className="d-flex flex-column gap-1">
              <span style={{ fontSize: "0.7rem" }} className="text-muted">
                Specailties Assigned
              </span>
              <div className="d-flex flex-row align-items-center gap-2 justify-content-center">
                <span>
                  <Icon icon="ion:book-outline" width={18} height={18} />
                </span>
                <span className="fw-bold font-size-md">
                  {teacher?.num_assigned_specialties}
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-transparent w-100 rounded-pill p-2 font-size-sm border-none border mt-auto">
          Manage Assignment
        </button>
      </div>
    </>
  );
}
