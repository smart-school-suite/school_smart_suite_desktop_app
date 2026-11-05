import { Icon } from "@iconify/react";
import { ArrowDown } from "lucide-react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import DrawerTrigger from "../../components/drawer/DrawerTrigger";
import { NotFoundError } from "../../components/errors/Error";
import SearchInput from "../../components/input/search";
import SpecialtyNavigator from "../../components/SideBars/SpecialtyNavigator";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import AssignCourse from "../../DrawerContent/Course/AssignCourse";
import ManageCourseAssignment from "../../DrawerContent/Course/ManageCourseAssignment";
import { useGetCourseSpecialtyId } from "../../hooks/course/useGetCourseSpecialtyId";
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
        <SpecialtyNavigator
          title="Teacher courses"
          description="Select a specialty to assign teachers to its courses."
          specialty={specialty}
          setSpecialty={setSpecialty}
        />
        <div className="d-flex flex-column gap-2" style={{ width: "75%" }}>
          <div className="d-flex flex-row align-items-end justify-content-between">
            <div className="w-50">
              <SearchInput placeholder="Search for course" />
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
            </div>
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
                className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-2 pe-1"
                style={{ maxHeight: "75dvh", paddingBottom: "5rem" }}
              >
                {courses.data.map((semester) => (
                  <Fragment key={semester?.semester_id}>
                    <div className="d-flex flex-column gap-1">
                      <span className="font-size-sm fw-semibold text-capitalize">
                        {semester?.semester_name}
                      </span>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                        }}
                        className="gap-2"
                      >
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
                  src="./sss-maskot/happy.png"
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
      <div className="card p-2 rounded-4 border shadow-sm d-flex flex-column gap-3 font-size-sm">
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
                <span className="text-muted">
                  @ {course?.teachers[0]?.username}
                </span>
              </div>
            </div>
          )}
        </div>
        {course?.assignment_status === "unassigned" ? (
          <DrawerTrigger
            title="Assign Teacher To Course"
            placement="right"
            drawerChildren={AssignCourse}
            drawerData={{ ...course, specialtyId }}
            classname={
              "p-2 font-size-sm rounded-pill border-none  text-center border"
            }
          >
            <button className="rounded-pill p-2 font-size-sm bg-none border w-100">
              <span>Assign Teacher</span>
            </button>
          </DrawerTrigger>
        ) : (
          <DrawerTrigger
            title="Manage Assignment"
            placement="right"
            drawerChildren={ManageCourseAssignment}
            drawerData={{ ...course, specialtyId }}
            classname={
              "p-2 font-size-sm rounded-pill border-none  text-center border"
            }
          >
            <button className="rounded-pill p-2 font-size-sm bg-none border w-100">
              <span>Manage Assignment</span>
            </button>
          </DrawerTrigger>
        )}
      </div>
    </>
  );
}
