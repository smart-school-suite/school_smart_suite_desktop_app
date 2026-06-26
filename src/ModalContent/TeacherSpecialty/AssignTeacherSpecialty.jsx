import { Icon } from "@iconify/react";
import { useGetSpecialtyDetails } from "../../hooks/specialty/useGetSpecialtyDetail";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
function AssignTeacherSpecialty({ handleClose, rowData }) {
  const {
    data: specialty,
    isLoading: isSpecialtyLoading,
    error: specialtyError,
  } = useGetSpecialtyDetails(rowData?.specialtyId);
  return (
    <>
      <div className="d-flex flex-column gap-2">
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
        {isSpecialtyLoading ? (
          <RectangleSkeleton />
        ) : specialtyError ? (
          <div className="card rounded-3 p-2"></div>
        ) : (
          <div className="card rounded-4 p-2 font-size-sm d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-1">
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="fw-semibold">{specialty?.data?.specialty_name}</span>
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
            <p className="text-muted">
              {specialty?.data?.description}
            </p>
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
                    <span className="fw-bold font-size-md">{specialty?.data?.total_courses}</span>
                  </div>
                </div>
                <div className="d-flex flex-column gap-1">
                  <span style={{ fontSize: "0.7rem" }} className="text-muted">
                    Halls Assigned
                  </span>
                  <div className="d-flex flex-row align-items-center gap-2 justify-content-center">
                    <span>
                      <Icon icon="streamline-flex:city-hall" width={18} height={18} />
                    </span>
                    <span className="fw-bold font-size-md">{specialty?.data?.total_halls}</span>
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
                    <span className="fw-bold font-size-md">{specialty?.data?.total_teachers}</span>
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
                    <span className="fw-bold font-size-md">{specialty?.data?.total_students}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="d-flex flex-row align-items-center justify-content-end">
            <input type="search" className="form-control font-size-sm w-50" placeholder="Search Teacher" />
        </div>
        
      </div>
    </>
  );
}
export default AssignTeacherSpecialty;


function Teacher({ teacher, specialtyId }) {
  return (
    <>
      <div
        className="card font-size-sm rounded-4 p-2 d-flex flex-column pointer-cursor d-flex flex-column gap-3 border-none shadow-sm"
        style={{ width: "32%" }}
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
        <button className="bg-transparent w-100 rounded-pill p-2 font-size-sm border-none border mt-auto">
          Manage Assignment
        </button>
      </div>
    </>
  );
}