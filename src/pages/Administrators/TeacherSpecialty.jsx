import { Icon } from "@iconify/react";
import { ArrowDown } from "lucide-react";
import { Fragment, useState } from "react";
import AssignTeacherSpecialty from "../../DrawerContent/TeacherSpecialty/AssignTeacherSpecialty";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { NotFoundError } from "../../components/errors/Error";
import SearchInput from "../../components/input/search";
import SpecialtyNavigator from "../../components/SideBars/SpecialtyNavigator";
import { useGetTeacherBySpecialty } from "../../hooks/teacher/useGetTeacherBySpecialty";
import { isLastElement } from "../../utils/functions";
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
        <SpecialtyNavigator
          title="Teacher specialties"
          description="Select a specialty to manage the teachers assigned to it."
          specialty={specialty}
          setSpecialty={setSpecialty}
        />
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
