import Greenbutton from "../components/Buttons";
import {
  useFetchSchoolAdminsQuery,
  useFetchSchoolAdminDetailsQuery,
} from "../Slices/Asynslices/fetchSlice";
import { useDeleteSchoolAdminMutation } from "../Slices/Asynslices/deleteSlice";
import { useEffect, useMemo, useState } from "react";
import CleanArrayData, {
  renameKeys,
  formatNumber,
  formatDateWithAge,
  formatDate,
} from "../utils/functions";
import Table from "../components/Tables";
import { Icon } from "@iconify/react";
import DataComponent from "../components/dataComponent";
import ActionButtonDropdown from "./actionButton";
import Pageloaderspinner, { SingleSpinner } from "../components/Spinners";
import { useUpdateSchoolAdminMutation } from "../Slices/Asynslices/updateSlice";
import {
  FullNamesInput,
  EmailInput,
  FieldOfStudyInput,
  Reason,
} from "../components/formComponents";
import DatePicker from "../components/datePicker";
function SchoolAdmin() {
  const cellStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
    zIndex: "-1",
  };
  const colDefs = useMemo(
    () => [
      {
        field: "Avatar",
        cellRenderer: ImageComponent,
        cellStyle: cellStyle,
      },
      { field: "id", cellRenderer: DataComponent },
      { field: "Full Names", cellRenderer: DataComponent },
      { field: "Role", cellRenderer: DataComponent },
      { field: "Email", cellRenderer: DataComponent },
      { field: "Salary", cellRenderer: DataComponent },
      {
        field: "Status",
        cellRenderer: StatusComponent,
        cellStyle: cellStyle,
      },
      { field: "Created At", cellRenderer: DataComponent },
      {
        field: "Action",
        cellRenderer: ActionButtonGroup,
        cellStyle: cellStyle,
      },
    ],
    []
  );

  const {
    data: school_admin_data,
    error,
    isLoading,
  } = useFetchSchoolAdminsQuery();

  const filter_array_keys = [
    "id",
    "name",
    "email",
    "role",
    "salary",
    "created_at",
  ];
  const renameMapping = {
    id: "id",
    name: "Full Names",
    role: "Role",
    salary: "Salary",
    created_at: "Created At",
    email: "Email",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "2.5rem",
                background: "#fff",
              }}
            >
              <Icon
                icon="grommet-icons:user-admin"
                className="fs-5 text-primary"
              />
            </div>
            <h4 className="fw-bold my-0">School Administrator</h4>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-flex flex-row align-items-end gap-2">
            <div className="d-block">
              <p className="font-size-xs my-0">Total Number adminstrators</p>
              <h1 className="fw-bold my-0">
                {school_admin_data.school_admin_data.length}
              </h1>
            </div>
          </div>
          <div className="end-block d-flex flex-row ms-auto justify-content-end gap-3">
            <Greenbutton
              lable="Create Admin"
              bg="green-bg"
              route="/create-school-admin"
            />
          </div>
        </div>
        <div className="pt-3 position-relative z-0">
          <Table
            colDefs={colDefs}
            rowData={renameKeys(
              CleanArrayData(
                school_admin_data.school_admin_data,
                filter_array_keys
              ),
              renameMapping
            )}
            rowHeight={55}
          />
        </div>
      </div>
    </>
  );
}
export default SchoolAdmin;

const AdminDetails = ({ row_id, handleClose }) => {
  const {
    data: school_admin_details,
    isLoading,
    error,
  } = useFetchSchoolAdminDetailsQuery({
    school_admin_id: row_id,
  });
  useEffect(() => {
    if (school_admin_details) {
      console.table(school_admin_details.school_admin_details);
    }
    if (error) {
      console.error("Error fetching parents:", error);
    }
  }, [school_admin_details, error]);

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3 px-2">
        <h5 className="fw-semibold">School Admin Details</h5>
        <button
          className="border-none text-white primary-background"
          onClick={() => {
            handleClose();
          }}
          style={{
            width: "2rem",
            height: "2rem",
            borderRadius: "2rem",
            fontSize: "0.75rem",
          }}
        >
          <span>IC</span>
        </button>
      </div>
      <div className="w-100">
        <div>
          <div className="card border-none pb-4 shadow-sm rounded-3 profile-section white-bg d-flex flex-column">
            <div className="top-section rounded-top-4 px-4">
              <div className="d-flex flex-row profile-picture-group z-5 justify-content-between align-items-center">
                <div className="profile-img">
                  <img src="./images/protrait-one.jpg" alt="" />
                </div>
                <div>
                  <Icon
                    icon="mdi:dots-vertical"
                    className="fs-3 pointer-cursor"
                  />
                </div>
              </div>
            </div>
            <div className="ms-2 mt-auto">
              <div className="d-block">
                <h5 className="fw-bold">
                  {school_admin_details.school_admin_details[0].name}
                </h5>
                <div className="d-flex flex-row my-1 gainsboro-color">
                  <span>Yaounde , Cameroon</span>
                </div>
                <div className="d-flex flex-row gap-2 mt-2 align-items-center">
                  <span className="font-size-sm fw-medium">
                    @
                    {school_admin_details.school_admin_details[0].work_location}
                  </span>
                  <div className="divider-pill"></div>
                  <span className="font-size-sm fw-medium">
                    {school_admin_details.school_admin_details[0].role}
                  </span>
                  <div className="divider-pill"></div>
                  <span className="font-size-sm gainsboro-color">
                    {
                      school_admin_details.school_admin_details[0]
                        .employment_status
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 mt-2">
        <p className="fs-6 my-2">Contact Info</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="clarity:email-line" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {school_admin_details.school_admin_details[0].email}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Email
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="ph:phone" />
          </button>
          <div className="border-bottom py-2 d-block" style={{ width: "87%" }}>
            <p className="my-0">
              {
                school_admin_details.school_admin_details[0]
                  .emergency_contact_phone
              }
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Contact one
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Address</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="icon-park-outline:address-book" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">Quater</p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              {school_admin_details.school_admin_details[0].address}
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Emergency Contact Details</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="icon-park-outline:address-book" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {
                school_admin_details.school_admin_details[0]
                  .emergency_contact_phone
              }
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Emergency Contact Phone
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="icon-park-outline:address-book" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {
                school_admin_details.school_admin_details[0]
                  .emergency_contact_name
              }
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Emergency Contact Name
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <p className="fs-6 my-2">Qualifacations</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="carbon:education" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {
                school_admin_details.school_admin_details[0]
                  .highest_qualification
              }
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Highest School Qualification
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {school_admin_details.school_admin_details[0].years_experience}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Years of Experience
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {school_admin_details.school_admin_details[0].field_of_study}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Field of study
            </p>
          </div>
        </div>
      </div>
      <div className="w-100 my-2">
        <p className="fs-6 my-2">About Job</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {school_admin_details.school_admin_details[0].years_experience}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Years of Experience
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {school_admin_details.school_admin_details[0].role}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Role
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {school_admin_details.school_admin_details[0].employment_status}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Employment Status
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {formatNumber(
                Number(school_admin_details.school_admin_details[0].salary)
              )}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Monthly Salary
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="fluent-mdl2:calendar-year" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {formatDate(
                school_admin_details.school_admin_details[0].hire_date
              )}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Hire Date
            </p>
          </div>
        </div>
      </div>

      <div className="w-100 my-2">
        <p className="fs-6 my-2">Personal Details</p>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="tabler:gender-male" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {school_admin_details.school_admin_details[0].cultural_background}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Cultural Background
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="solar:calendar-date-linear" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {school_admin_details.school_admin_details[0].religion}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Religion
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-1">
          <button
            className="border-none d-flex flex-row align-items-center fs-5 justify-content-center color-primary"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
            }}
          >
            <Icon icon="mynaui:heart" />
          </button>
          <div className="border-bottom py-2" style={{ width: "87%" }}>
            <p className="my-0">
              {formatDateWithAge(
                school_admin_details.school_admin_details[0].date_of_birth
              )}
            </p>
            <p
              className="my-0 font-size-sm gainsboro-color"
              onClick={() => {
                handleShow();
              }}
            >
              Date of birth
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-end gap-2">
        <button
          className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
          onClick={() => {
            handleClose();
          }}
        >
          Close
        </button>
      </div>
    </>
  );
};

const Delete = ({ row_id, handleClose }) => {
  const [feedback, setFeedback] = useState({
    message: "",
    type: null,
    loading: false,
  });
  const [deleteSchoolAdmin] = useDeleteSchoolAdminMutation();

  const handleDeleteSchoolAdmin = async () => {
    setFeedback({ message: "", type: null, loading: true });

    try {
      await deleteSchoolAdmin(row_id).unwrap();
      setFeedback({
        message: "School Admin Deleted Successfully",
        type: "success",
        loading: false,
      });
    } catch (e) {
      setFeedback({
        message: "Oops, Couldn't Delete School Admin",
        type: "error",
        loading: false,
      });
    }
  };
  return (
    <>
      {feedback.loading ? (
        <SingleSpinner />
      ) : !feedback.message ? (
        <div className="w-100">
          <h4 className="fw-semibold">Are you absolutely sure?</h4>
          <p className="my-3" style={{ fontSize: "0.85rem" }}>
            This action cannot be undone. This will permanently delete this
            account and remove this account data from our servers.
          </p>
          <div className="mt-4 d-flex justify-content-end gap-2">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
              onClick={handleDeleteSchoolAdmin}
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="w-100">
          {feedback.message && (
            <div
              className={`alert ${
                feedback.type === "error" ? "alert-warning" : "alert-success"
              } font-size-sm`}
            >
              {feedback.message}
            </div>
          )}
          <div className="mt-4 d-flex justify-content-end gap-2">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
              onClick={handleClose}
            >
              Close
            </button>
            {feedback.type === "error" && (
              <button
                className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white"
                onClick={handleDeleteSchoolAdmin}
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
const Update = ({ row_id, handleClose }) => {
  const [updateSchoolAdmin] = useUpdateSchoolAdminMutation();
  const [feedback, setFeedback] = useState({
    message: "",
    type: null,
    loading: false,
  });
  const handleAdminUpdate = async () => {
    setFeedback({ message: "", type: null, loading: true });
    try {
      await updateSchoolAdmin({ school_admin_id: row_id }).unwrap();
      setFeedback({
        message: "School Admin Updated Succefully",
        type: "success",
        loading: false,
      });
    } catch (e) {
      setFeedback({
        message: "Something went wrong",
        type: "error",
        loading: false,
      });
    }
  };
  return (
    <>
      {feedback.loading ? (
        <SingleSpinner />
      ) : (
        <>
          <div className="w-100 mb-4 pe-2 d-flex flex-row justify-content-between align-items-center">
            <span className="fw-semibold fs-5">Update School Admin</span>
            <button
              className="border-none transparent-bg color-primary d-flex flex-row align-items-center"
              onClick={() => {
                handleClose();
              }}
            >
              <Icon icon="ic:round-cancel" width="28" height="28" />
            </button>
          </div>
          {feedback.message && (
            <div
              className={`alert ${
                feedback.type === "error" ? "alert-warning" : "alert-success"
              } font-size-sm`}
            >
              {feedback.message}
            </div>
          )}
          <div className="card w-100 border-none">
            <FullNamesInput />
            <EmailInput />
            <div className="my-1">
              <p className="my-0">Role</p>
            </div>
            <div className="my-1 d-flex flex-row align-items-center justify-content-between gap-2">
              <div className="my-1 w-50">
                <p className="my-0">Qualification</p>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Software Engineering"
                  name=""
                />
              </div>
              <div className="my-1 w-50">
                <FieldOfStudyInput />
              </div>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center gap-2">
              <div className="my-1 w-100">
                <p className="my-0">Work Schedule</p>
              </div>
            </div>
          </div>
          <div className="mt-4 d-flex justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary w-50 rounded-3 font-size-sm"
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </button>
            <button
              className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white"
              onClick={() => {
                handleAdminUpdate();
              }}
            >
              Update
            </button>
          </div>
        </>
      )}
    </>
  );
};
const Promote = () => {
  return (
    <>
      <div>
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero
        </p>
        <div className="my-2">
          <div className="d-flex w-100 flex-row  gap-2 align-items-center">
            <div className="w-50">
              <span>Current Position</span>
              <input
                type="text"
                className="form-control"
                placeholder="school buser"
              />
            </div>
            <div className="w-50">
              <span>New Position</span>
              <input
                type="text"
                className="form-control"
                placeholder="school buser"
              />
            </div>
          </div>
          <div className="my-2">
            <div className="w-100">
              <span>New Salary</span>
              <input
                type="number"
                className="form-control"
                placeholder="Enter new salary"
              />
            </div>
          </div>
          <div className="my-2">
            <div className="w-100">
              <span>Select New Role</span>
              <input
                type="text"
                className="form-control"
                placeholder="Manager"
              />
            </div>
          </div>
          <div className="my-2">
            <div className="w-100">
              <span>
                Congratulatory Message{" "}
                <span className="font-size-sm gainsboro-color">Optional</span>
              </span>
              <div className="w-100">
                <textarea
                  placeholder="Enter congratulatory message"
                  className="form-control"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-100 border-top position-relative mt-4 py-2">
        <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
          <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
            Promote
          </button>
        </div>
      </div>
    </>
  );
};

const Deactivate = ({ row_id, handleClose }) => {
  return (
    <>
      <div className="w-100">
        <div className="w-100 mb-4 pe-2 d-flex flex-row justify-content-between align-items-center">
          <span className="fw-semibold fs-5">
            Deactivate School Admin Account
          </span>
          <button
            className="border-none transparent-bg color-primary d-flex flex-row align-items-center"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="ic:round-cancel" width="28" height="28" />
          </button>
        </div>
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero natus unde, libero
        </p>
        <div className="my-2">
          <DatePicker lable={"Start Date"} />
        </div>
        <div className="my-2">
          <DatePicker lable={"End Date"} />
        </div>
        <div className="my-2">
          <Reason />
        </div>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50">
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const GrantLift = () => {
  return (
    <>
      <div className="w-100">
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero natus unde, libero
        </p>
        <div className="my-2">
          <span>
            Start Date{" "}
            <span className="font-size-sm gainsboro-color">
              {" "}
              (Starting Date)
            </span>
          </span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>
            End Date{" "}
            <span className="font-size-sm gainsboro-color">
              {" "}
              (Expected Return Date)
            </span>
          </span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>
            Lift Category{" "}
            <span className="font-size-sm gainsboro-color">
              {" "}
              (Something like, Materal lift, Health lift etc)
            </span>
          </span>
          <input
            type="type"
            className="form-control"
            placeholder="Enter lift category"
          />
        </div>
        <div className="my-2">
          <span>Reason</span>
          <textarea
            placeholder="Enter the reason"
            className="form-control"
          ></textarea>
        </div>
        <div className="my-2">
          <div className="w-100 border-top position-relative mt-4 py-2">
            <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
              <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
                Grant Lift
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Suspend = () => {
  return (
    <>
      <div className="w-100">
        <p className="font-size-sm gainsboro-color">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim natus
          unde, libero natus unde, libero
        </p>
        <div className="my-2">
          <span>Start Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>End Date</span>
          <input type="date" className="form-control" />
        </div>
        <div className="my-2">
          <span>Reason</span>
          <textarea
            placeholder="Enter the reason"
            className="form-control"
          ></textarea>
        </div>
        <div className="my-2">
          <div className="w-100 border-top position-relative mt-4 py-2">
            <div className="d-flex flex-row align-items-center position-relative justify-content-between gap-2">
              <button className="border-none rounded-3 p-2 w-100 primary-background text-white font-size-sm">
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function ActionButtonGroup(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Admin",
      actionTitle: "Update",
      modalContent: Update,
    },
    {
      modalTitle: "Delete Admin",
      actionTitle: "Delete",
      modalContent: Delete,
    },
    {
      modalTitle: "Admin Details",
      actionTitle: "Details",
      modalContent: AdminDetails,
    },
    {
      modalTitle: "Promote School Admin",
      actionTitle: "Promote",
      modalContent: Promote,
    },
    {
      modalContent: "Deactivate School Admin",
      actionTitle: "Deactivate",
      modalContent: Deactivate,
    },
    {
      modalTitle: "Grant Work lift",
      actionTitle: "Lift",
      modalContent: GrantLift,
    },
    {
      modalTitle: "Suspend School Admin",
      actionTitle: "Suspend",
      modalContent: Suspend,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}

export const ImageComponent = () => {
  return (
    <>
      <div
        style={{ width: "2.8rem", height: "2.8rem" }}
        className="rounded-circle"
      >
        <img
          src="./images/protrait-one.jpg"
          alt=""
          className="object-fit-cover w-100 h-100"
          style={{ borderRadius: "2.8rem" }}
        />
      </div>
    </>
  );
};
export const StatusComponent = () => {
  return (
    <>
      <div className="position-relative z-0">
        <button
          className="border-none  rounded-1 primary-background d-flex flex-row gap-4 align-items-center font-size-sm"
          style={{ background: "#c8eac8", color: "#224523", height: "1.2rem" }}
        >
          <span>online</span>
        </button>
      </div>
    </>
  );
};
