import { Icon } from "@iconify/react";
import { useGetSpecialtyDetails } from "../../hooks/specialty/useGetSpecialtyDetail";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useGetAssignableTeachers } from "../../hooks/teacherSpecialty/useGetAssignableTeacherSpecialtyId";
import { Fragment, useState } from "react";
import { useAssignTeachers } from "../../hooks/teacherSpecialty/useAssignTeachers";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { NotFoundError } from "../../components/errors/Error";
function AssignTeacherSpecialty({ handleClose, rowData }) {
  const {
    data: specialty,
    isLoading: isSpecialtyLoading,
    error: specialtyError,
  } = useGetSpecialtyDetails(rowData?.specialtyId);
  const {
    data: teachers,
    isLoading: isTeachersLoading,
    error: teachersError,
  } = useGetAssignableTeachers(rowData?.specialtyId);
  const { mutate: assignTeacher, isPending: isAssigning } = useAssignTeachers(
    rowData?.specialtyId
  );
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const handleAssignTeachers = () => {
    if (selectedTeachers.length < 1) {
      toast.custom(
        <ToastWarning
          title={"Teachers Required"}
          description={
            "You must select atleast a one teacher before assigning to this specialty"
          }
        />,
      );
      return;
    }
    assignTeacher({
      specialty_id: rowData?.specialtyId,
      teacher_ids: selectedTeachers.map((teacher) => teacher.id),
    });
  };
  return (
    <>
      <div className="d-flex flex-column gap-2 ">
        <div className="d-flex flex-column">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="fw-medium font-size-md">Assign Teachers</span>
            <span onClick={handleClose} style={{ cursor: "pointer" }}>
              <Icon icon="proicons:cancel" width={18} height={18} />
            </span>
          </div>
          <p className="font-size-sm">
            Select one or more teachers to join this specialty.
          </p>
        </div>
        <div
          className="scroll-bar-sm over-flow-x-hidden over-flow-y-auto height-auto d-flex flex-column gap-3 pe-1"
          style={{ maxHeight: "65dvh" }}
        >
          {isSpecialtyLoading ? (
            <RectangleSkeleton />
          ) : specialtyError ? (
            <div className="card rounded-3 p-2"></div>
          ) : (
            <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-2">
              <div className="d-flex flex-column gap-1">
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="fw-semibold">
                    {specialty?.data?.specialty_name}
                  </span>
                  <div
                    style={{
                      background: "#e3f5e3",
                      color: "#5cb85c",
                      fontSize: "0.7rem",
                      width: "max-content",
                      padding: "0.1rem",
                    }}
                    className="rounded-pill px-2 d-flex flex-row align-items-center gap-1"
                  >
                    <span>{specialty?.data?.status}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center gap-1 fw-medium">
                  <div className="d-flex flex-row align-items-center gap-2">
                    <Icon icon="mynaui:graduation-cap" width={16} height={16} />
                    <span>{specialty?.data?.level?.name}</span>
                  </div>
                  <span>
                    <Icon icon="icon-park-outline:dot" width={14} height={14} />
                  </span>
                  <div className="d-flex flex-row align-items-center gap-1">
                    <Icon
                      icon="material-symbols:grid-on-outline"
                      width={16}
                      height={16}
                    />
                    <span>{specialty?.data?.department?.department_name}</span>
                  </div>
                </div>
              </div>
              <p className="text-muted">{specialty?.data?.description}</p>
              <div>
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
                        {specialty?.data?.total_courses}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <span style={{ fontSize: "0.7rem" }} className="text-muted">
                      Halls Assigned
                    </span>
                    <div className="d-flex flex-row align-items-center gap-2 justify-content-center">
                      <span>
                        <Icon
                          icon="streamline-flex:city-hall"
                          width={18}
                          height={18}
                        />
                      </span>
                      <span className="fw-bold font-size-md">
                        {specialty?.data?.total_halls}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <span style={{ fontSize: "0.7rem" }} className="text-muted">
                      Teachers Assigned
                    </span>
                    <div className="d-flex flex-row align-items-center gap-2 justify-content-center">
                      <span>
                        <Icon icon="solar:user-linear" width={18} height={18} />
                      </span>
                      <span className="fw-bold font-size-md">
                        {specialty?.data?.total_teachers}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    <span style={{ fontSize: "0.7rem" }} className="text-muted">
                      Student
                    </span>
                    <div className="d-flex flex-row align-items-center gap-2 justify-content-center">
                      <span>
                        <Icon icon="ph:student-light" width={18} height={18} />
                      </span>
                      <span className="fw-bold font-size-md">
                        {specialty?.data?.total_students}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-row align-items-center justify-content-end">
              <input
                type="search"
                className="form-control font-size-sm w-50"
                placeholder="Search Teacher"
              />
            </div>
            {isTeachersLoading ? (
              <div className="d-flex flex-row flex-wrap gap-2">
                {
                   [...Array(6)].map((_, index) => (
                    <Fragment key={index}>
                       <RectangleSkeleton
                        width={"49%"}
                        height={"1rem"}
                        borderRadius={6}
                      />
                    </Fragment>
                   ))
                }
              </div>
            ) : teachersError ? (
              <NotFoundError
                title={
                  teachersError?.response?.data?.errors?.title || "Error"
                }
                description={
                  teachersError?.response?.data?.errors?.description ||
                  "Something went wrong"
                }
              />
            ) : (
              <div>
                <div className="d-flex flex-row align-items-start flex-wrap gap-2">
                  {teachers?.data?.map((teacher) => (
                    <Fragment key={teacher.id}>
                      <Teacher
                        teacher={teacher}
                        selectedTeachers={selectedTeachers}
                        setSelectedTeachers={setSelectedTeachers}
                      />
                    </Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {selectedTeachers.length > 0 && (
          <button className="primary-background text-white w-100 rounded-pill p-2 font-size-sm border-none border mt-auto"
           onClick={() => handleAssignTeachers()}
          >
            {
               isAssigning ? <SingleSpinner /> : `Assign Teacher ${selectedTeachers.length}`
            }
          </button>
        )}
      </div>
    </>
  );
}
export default AssignTeacherSpecialty;

function Teacher({ teacher, selectedTeachers, setSelectedTeachers }) {
  return (
    <>
      <div
        className="card font-size-sm rounded-4 p-2 d-flex flex-column pointer-cursor d-flex flex-column gap-3 shadow-sm"
        style={{ width: "49%" }}
        onClick={() =>
          setSelectedTeachers((value) => {
            const newValue = [...value];
            const existingSelection = newValue.find((t) => t.id === teacher.id);
            if (existingSelection) {
              const index = newValue.findIndex((t) => t.id === teacher.id);
              newValue.splice(index, 1);
              return newValue;
            }
            newValue.push(teacher);
            return newValue;
          })
        }
      >
        <div className="d-flex flex-row align-items-center pe-1 justify-content-between">
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
          {selectedTeachers.find((t) => t.id === teacher.id) && (
            <Icon
              icon="material-symbols:check-circle-rounded"
              width={20}
              height={20}
              className="green-color"
            />
          )}
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
                    {!teacher.qualifications.length == index && <hr />}
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
        <div>
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
      </div>
    </>
  );
}
