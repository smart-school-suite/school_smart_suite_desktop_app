import { Icon } from "@iconify/react";
import { useGetTeacherBySpecialty } from "../../hooks/teacher/useGetTeacherBySpecialty";
import { Fragment, useState } from "react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useAssignTeacherCourse } from "../../hooks/teacherCourse/useAssignTeacherCourse";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useRemoveAssignedTeacherCourse } from "../../hooks/teacherCourse/useRemoveTeacherAssignedCourse";
function ManageCourseAssignment({ handleClose, rowData }) {
  const [selectedAction, setSelectedAction] = useState(null);
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-row align-items-center justify-content-between w-100">
            <span className="m-0">Manage Assignment</span>
            <span
              className="m-0"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="charm:cross" width="22" height="22" />
            </span>
          </div>
          <p className="font-size-sm text-muted">
            Assign a teacher to this course.
          </p>
        </div>
        <div
          className="scroll-bar-sm px-1 height-auto overflow-x-hidden overflow-y-scroll overflow-y-auto d-flex flex-column gap-4"
          style={{ maxHeight: "65dvh" }}
        >
          <div className="card p-2 rounded-4  shadow-sm d-flex flex-column gap-3 font-size-sm">
            <div className="d-flex flex-column gap-1">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span style={{ width: "65%" }} className="fw-semibold">
                  {rowData?.course_title}
                </span>
                {rowData.assignment_status === "unassigned" ? (
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
                      <Icon
                        icon="lets-icons:check-fill"
                        width={18}
                        height={18}
                      />
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
                  <span>{rowData.course_credit} Credit</span>
                </div>
                <span>
                  <Icon icon="icon-park-outline:dot" />
                </span>
                <div className="d-flex flex-row align-items-center gap-1">
                  <span style={{ lineHeight: 0 }}>
                    <Icon icon="mynaui:hash-waves" width={18} height={18} />
                  </span>
                  <span>{rowData.course_code}</span>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <p
                className="text-muted font-size-sm m-0"
                style={{
                  height: "auto",
                  maxHeight: "80px",
                  display: "-webkit-box",
                  WebkitLineClamp: "3",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  wordBreak: "break-word",
                }}
              >
                {rowData?.description}
              </p>
              <div className="d-flex flex-row gap-2">
                {rowData.types.map((type) => (
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
              {rowData?.assignment_status === "assigned" && (
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
                    <span className="fw-medium">
                      {rowData?.teachers[0]?.name}
                    </span>
                    <span className="text-muted">
                      @ {rowData?.teachers[0]?.first_name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="d-flex flex-column gap-1">
            <span className="font-size-sm">Choose Action</span>
            <div className="d-flex flex-row align-items-center gap-2">
              <div
                className="card w-50 p-2 rounded-4 font-size-sm d-flex flex-column pointer-cursor"
                style={{ height: "16dvh" }}
                onClick={() => setSelectedAction("update")}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">Change Teacher</span>
                  {selectedAction === "update" && (
                    <span>
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        width={18}
                        height={18}
                        className="green-color"
                      />
                    </span>
                  )}
                </div>

                <p className="mt-auto m-0">
                  Assign this course to a different teacher while replacing the
                  current assignment.
                </p>
              </div>
              <div
                className="card w-50 p-2 rounded-4 font-size-sm d-flex flex-column pointer-cursor"
                style={{ height: "16dvh" }}
                onClick={() => setSelectedAction("remove")}
              >
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">Remove Assignment</span>
                  {selectedAction === "remove" && (
                    <span>
                      <Icon
                        icon="material-symbols:check-circle-rounded"
                        width={18}
                        height={18}
                        className="green-color"
                      />
                    </span>
                  )}
                </div>
                <p className="mt-auto m-0">
                  Remove the current teacher and leave this course without an
                  assigned teacher.
                </p>
              </div>
            </div>
          </div>
          {selectedAction === "update" ? (
            <ChangeTeacher rowData={rowData} />
          ) : selectedAction === "remove" ? (
            <RemoveAssignment
              rowData={rowData}
              setSelectedAction={setSelectedAction}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
export default ManageCourseAssignment;

function ChangeTeacher({ rowData }) {
  const teacherId = rowData?.teachers[0]?.id;
  const [selectedTeacher, setSelectedTeacher] = useState(teacherId);
  const {
    data: teachers,
    isLoading: isTeacherLoading,
    error: teacherError,
  } = useGetTeacherBySpecialty(rowData.specialtyId);
  return (
    <>
      <div>
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm fw-medium">Assign To</span>
            <input
              type="search"
              className="form-control font-size-sm w-50"
              placeholder="Search Teacher........"
            />
          </div>
          <div>
            {isTeacherLoading ? (
              <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                {[...Array(6)].map((_, index) => (
                  <Fragment key={index}>
                    <RectangleSkeleton
                      width={"32.5%"}
                      height={"18dvh"}
                      borderRadius={6}
                    />
                  </Fragment>
                ))}
              </div>
            ) : teacherError ? (
              <NotFoundError
                title={teacherError?.response?.data?.errors?.title || "Error"}
                description={
                  teacherError?.response?.data?.errors?.description ||
                  "Something went wrong"
                }
              />
            ) : (
              <div className="d-flex flex-row align-items-center flex-wrap gap-2">
                {teachers.data.map((teacher) => (
                  <Fragment key={teacher.id}>
                    <div
                      className="card font-size-sm rounded-4 p-2 d-flex flex-column pointer-cursor"
                      style={{ width: "49%", height: "18dvh" }}
                      onClick={() => setSelectedTeacher(teacher.id)}
                    >
                      <div className="d-flex flex-row align-items-start justify-content-between">
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
                            <span className="fw-medium">{teacher?.name}</span>
                            <span className="text-muted">
                              @{teacher?.first_name}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center gap-2">
                          {teacherId === teacher.id && (
                            <div
                              style={{
                                background: "#e3f5e3",
                                color: "#5cb85c",
                                fontSize: "0.7rem",
                              }}
                              className="rounded-pill px-1 d-flex flex-row align-items-center gap-1"
                            >
                              <span>current teacher</span>
                            </div>
                          )}
                          {selectedTeacher === teacher?.id && (
                            <span>
                              <Icon
                                icon="material-symbols:check-circle-rounded"
                                width={18}
                                height={18}
                                className="green-color"
                              />
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-auto ps-1">
                        <div className="d-flex flex-column gap-1">
                          <span className="font-size-sm">Courses Assigned</span>
                          <div className="d-flex flex-row align-items-center gap-1">
                            <span>
                              <Icon
                                icon="ion:book-outline"
                                width={18}
                                height={18}
                              />
                            </span>
                            <span className="fw-bold">
                              {teacher?.num_assigned_courses}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
        </div>
        
      </div>
    </>
  );
}

function RemoveAssignment({ rowData, setSelectedAction }) {
  const { mutate: removeAssigedCourse, isPending: isRemoving } =
    useRemoveAssignedTeacherCourse(rowData.specialtyId);
  const handleRemove = () => {
    removeAssigedCourse({
      teacher_id: rowData?.teachers[0]?.id,
      courseIds: [
        {
          course_id: rowData?.course_id,
        },
      ],
    });
  };
  return (
    <>
      <div className="d-flex flex-column gap-3">
        <p className="font-size-sm fw-medium">
          You are about to remove the teacher assigned to this course.
        </p>
        <div className="card p-2 rounded-4  shadow-sm d-flex flex-column gap-3 font-size-sm">
          <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-row align-items-center justify-content-between">
              <span style={{ width: "65%" }} className="fw-semibold">
                {rowData?.course_title}
              </span>
              {rowData.assignment_status === "unassigned" ? (
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
                <span>{rowData.course_credit} Credit</span>
              </div>
              <span>
                <Icon icon="icon-park-outline:dot" />
              </span>
              <div className="d-flex flex-row align-items-center gap-1">
                <span style={{ lineHeight: 0 }}>
                  <Icon icon="mynaui:hash-waves" width={18} height={18} />
                </span>
                <span>{rowData.course_code}</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <p
              className="text-muted font-size-sm m-0"
              style={{
                height: "auto",
                maxHeight: "80px",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                wordBreak: "break-word",
              }}
            >
              {rowData?.description}
            </p>
            <div className="d-flex flex-row gap-2">
              {rowData.types.map((type) => (
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
          </div>
        </div>
        <div className="d-flex flex-column gap-2">
          <span className="fw-medium font-size-sm">Current Teacher</span>
          <div className="d-flex flex-row align-items-center gap-1 font-size-sm">
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
              <span className="fw-medium">{rowData?.teachers[0]?.name}</span>
              <span className="text-muted">
                @ {rowData?.teachers[0]?.first_name}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column gap-2 font-size-sm">
          <span className="fw-medium font-size-sm">After Removal</span>
          <ul>
            <li>No Teacher Assigned</li>
          </ul>
        </div>
        <div className="d-flex flex-row align-items-center gap-2">
          <button
            className="border-none rounded-pill p-2 transparent-bg border font-size-sm w-50"
            onClick={() => setSelectedAction(null)}
          >
            Cancel
          </button>
          <button className="border-none rounded-pill p-2 bg-danger text-white font-size-sm w-50">
            Remove Assignment
          </button>
        </div>
      </div>
    </>
  );
}
