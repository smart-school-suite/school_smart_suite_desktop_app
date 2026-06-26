import { Icon } from "@iconify/react";
import { useGetTeacherBySpecialty } from "../../hooks/teacher/useGetTeacherBySpecialty";
import { Fragment, useState } from "react";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useAssignTeacherCourse } from "../../hooks/teacherCourse/useAssignTeacherCourse";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function AssignCourse({ handleClose, rowData }) {
  const { mutate: assignTeacherCourse, isPending } = useAssignTeacherCourse(
    rowData.specialtyId,
    handleClose,
  );
  const {
    data: teachers,
    isLoading: isTeacherLoading,
    error: teacherError,
  } = useGetTeacherBySpecialty(rowData.specialtyId);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const handleSubmit = () => {
    if (!selectedTeacher) {
      toast.custom(
        <ToastWarning
          title={"Teacher Required"}
          description={`You must select a teacher for ${rowData.course_title} before submitting`}
        />,
      );
      return;
    }
    assignTeacherCourse({
      teacher_id: selectedTeacher,
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
        <div className="d-flex flex-column gap-1">
          <div className="d-flex flex-row align-items-center justify-content-between w-100">
            <span className="m-0">Assign Teacher</span>
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
                maxHeight: "100px",
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
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="font-size-sm fw-medium">Available Teachers</span>
            <input
              type="search"
              className="form-control font-size-sm w-50"
              placeholder="Search Teacher........"
            />
          </div>
          <div
            className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pe-1"
            style={{ maxHeight: "30dvh" }}
          >
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
                      className="card font-size-sm rounded-4 p-2 d-flex flex-column pointer-cursor d-flex flex-column gap-3"
                      style={{ width: "49%" }}
                      onClick={() => setSelectedTeacher(teacher.id)}
                    >
                      <div className="d-flex flex-row align-items-center justify-content-between">
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
                      <div className="d-flex flex-column gap-1">
                        <span
                          style={{ fontSize: "0.7rem" }}
                          className="text-muted"
                        >
                          Qualifications
                        </span>
                        <div className="flex-row align-items-center flex-wrap gap-2">
                          {teacher.qualifications.map((quali) => (
                            <Fragment key={quali.id}>
                              <div
                                style={{
                                  background: "#e0f2fe",
                                  color: "#38bff8",
                                  fontSize: "0.7rem",
                                  width: "max-content",
                                }}
                                className="rounded-pill p-1 d-flex flex-row align-items-center gap-1 m-1"
                              >
                                <span>{quali?.abbreviation}</span>
                                <span style={{ lineHeight: 0 }}>
                                  <Icon icon="icon-park-outline:dot" />
                                </span>
                                <span>{quali?.pivot?.field_of_study}</span>
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      </div>
                      <div className="mt-auto ps-1">
                        <hr />
                        <div className="d-flex flex-row align-items-center justify-content-around">
                          <div className="d-flex flex-column gap-1 align-center  text-center">
                            <span
                              style={{ fontSize: "0.7rem" }}
                              className="text-muted"
                            >
                              Courses Assigned
                            </span>
                            <div className="d-flex flex-row align-items-center gap-2 justify-content-center">
                              <span>
                                <Icon
                                  icon="ion:book-outline"
                                  width={18}
                                  height={18}
                                />
                              </span>
                              <span className="fw-bold font-size-md">
                                {teacher?.num_assigned_courses}
                              </span>
                            </div>
                          </div>
                          <div
                            style={{
                              height: "2.5rem",
                              background: "#ddd",
                              width: "0.05rem",
                            }}
                          ></div>
                          <div className="d-flex flex-column gap-1">
                            <span
                              style={{ fontSize: "0.7rem" }}
                              className="text-muted"
                            >
                              Specailties Assigned
                            </span>
                            <div className="d-flex flex-row align-items-center gap-2 justify-content-center">
                              <span>
                                <Icon
                                  icon="ion:book-outline"
                                  width={18}
                                  height={18}
                                />
                              </span>
                              <span className="fw-bold font-size-md">
                                {teacher?.num_assigned_specialties}
                              </span>
                            </div>
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
        <button
          className="border-none px-3 py-2 rounded-pill font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleSubmit();
          }}
        >
          {isPending ? <SingleSpinner /> : "Assign Teacher"}
        </button>
      </div>
    </>
  );
}
export default AssignCourse;
