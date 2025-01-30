import Navbar from "../components/Navbar";
import {
  useFetchCourseDetailsQuery,
  useFetchCoursesQuery,
  useFetchDepartmentsQuery,
  useFetchEducationLevelsQuery,
  useFetchSemestersQuery,
  useFetchSpecialtiesQuery,
} from "../Slices/Asynslices/fetchSlice";
import { useEffect, useState } from "react";
import CleanArrayData, { renameKeys } from "../utils/functions";
import Pageloaderspinner from "../components/Spinners";
import Greenbutton from "../components/Buttons";
import Table from "../components/Tables";
import DataComponent from "../components/dataComponent";
import { Icon } from "@iconify/react";
import ActionButtonDropdown from "./actionButton";
import {
  CourseCodeInput,
  CourseCreditInput,
  CourseTitleInput,
} from "../components/formComponents";
import { CoursesNavBarOptions } from "../componentConfigurations/navBarConfig";
import { ModialButton } from "./actionButton";
import { useAddCourseMutation } from "../Slices/Asynslices/postSlice";
import CustomDropdown from "../components/Dropdowns";
import toast from "react-hot-toast";
function Courses() {
  const cellStyle = {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    height: "100%",
    zIndex: "-1",
  };
  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      cellRenderer: DataComponent,
    },
    {
      field: "Course Code",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Course Title",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Credit",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Semester",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Specialty Name",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    {
      field: "Level",
      filter: true,
      floatingFilter: true,
      cellStyle: cellStyle,
      cellRenderer: DataComponent,
    },
    { field: "Action", cellRenderer: DropdownComponent },
  ]);
  const { data: courses, error, isLoading } = useFetchCoursesQuery();
  const filter_array_keys = [
    "id",
    "course_code",
    "course_title",
    "specialty.specialty_name",
    "semester.name",
    "credit",
    "level.level",
  ];
  const renameMapping = {
    id: "id",
    course_code: "Course Code",
    course_title: "Course Title",
    credit: "Credit",
    "semester.name": "Semester",
    "specialty.specialty_name": "Specialty Name",
    "level.level": "Level",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={CoursesNavBarOptions}></Navbar>
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Courses</p>
            <h1 className="fw-bold my-0">{courses.courses.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModialButton
              action={{ modalContent: CreateCourse }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span className="font-size-sm">Create Course</span>
            </ModialButton>
          </div>
        </div>
        <Table
          colDefs={colDefs}
          rowData={renameKeys(
            CleanArrayData(courses.courses, filter_array_keys),
            renameMapping
          )}
        />
      </div>
    </>
  );
}
export default Courses;

function CreateCourse({ handleClose }) {
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    course_code: "",
    course_title: "",
    credit: "",
    specialty_id: "",
    department_id: "",
    level_id: "",
    semester_id: "",
  });
  const [addCourse] = useAddCourseMutation();
  const {
    data: specialty,
    isLoading: isSpecailtyLoading,
    error: SpecailtyError,
  } = useFetchSpecialtiesQuery();
  const {
    data: department,
    isLoading: isDepartmentLoading,
    error: departmentError,
  } = useFetchDepartmentsQuery();
  const {
    data: education_level,
    isLoading: isLevelLoading,
    error: levelError,
  } = useFetchEducationLevelsQuery();
  const {
    data: semester_data,
    isLoading: isSemesterLoading,
    error: semesterError,
  } = useFetchSemestersQuery();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidation = (isInputValid) => {
    setIsValid(isInputValid);
  };

  const handleEducationSelect = (selectedValues) => {
    setFormData((prevalue) => ({ ...prevalue, level_id: selectedValues.id }));
  };

  const handleDepartmentSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      department_id: selectedValues.id,
    }));
  };

  const handleSemesterSelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      semester_id: selectedValues.id,
    }));
  };

  const handleSpecialtySelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      specialty_id: selectedValues.id,
    }));
  };
  const handleSubmit = async () => {
    if (!isValid) return;
    try {
      await addCourse(formData).unwrap();
      toast.success("Course  created successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to create Course. Try again.");
    }
  };
  return (
    <div className="w-100">
      <div className="d-flex flex-row">
        <div>
          <h5>Create Course</h5>
          <p className="gainsboro-color font-size-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
          </p>
        </div>
      </div>
      <div className="my-1">
        <CourseTitleInput
          onValidationChange={handleValidation}
          value={formData.course_title}
          onChange={(value) => handleInputChange("course_title", value)}
        />
      </div>
      <div className="my-1">
        <CourseCreditInput
          onValidationChange={handleValidation}
          value={formData.course_code}
          onChange={(value) => handleInputChange("credit", value)}
        />
      </div>
      <div className="my-1">
        <CourseCodeInput
          onValidationChange={handleValidation}
          value={formData.course_code}
          onChange={(value) => handleInputChange("course_code", value)}
        />
      </div>
      <div className="my-1">
        <span>Semester</span>
        {isSemesterLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={semester_data.semester_data}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isSemesterLoading}
            direction="up"
            onSelect={handleSemesterSelect}
          />
        )}
      </div>
      <div className="my-1">
        <span>Level</span>
        {isLevelLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={education_level.education_level}
            displayKey={["name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "name"]}
            renameMapping={{ id: "id", name: "name" }}
            isLoading={isLevelLoading}
            direction="up"
            onSelect={handleEducationSelect}
          />
        )}
      </div>
      <div className="my-1">
        <span>Department</span>
        {isDepartmentLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={department.department}
            displayKey={["department_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "department_name"]}
            renameMapping={{ id: "id", department_name: "department_name" }}
            isLoading={isDepartmentLoading}
            direction="up"
            onSelect={handleDepartmentSelect}
          />
        )}
      </div>
      <div className="my-1">
        <span>Specialty</span>
        {isSemesterLoading ? (
          <select name="" className="form-select">
            <option value="">loading</option>
          </select>
        ) : (
          <CustomDropdown
            data={specialty.specialty}
            displayKey={["specialty_name"]}
            valueKey={["id"]}
            filter_array_keys={["id", "specialty_name"]}
            renameMapping={{ id: "id", specialty_name: "specialty_name" }}
            isLoading={isSpecailtyLoading}
            direction="up"
            onSelect={handleSpecialtySelect}
          />
        )}
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 text-primary rounded-3 font-size-sm w-50"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-50"
            disabled={!isValid}
            onClick={() => {
              handleSubmit();
            }}
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
}

function Update({ handleClose }) {
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row">
          <div>
            <h5>Update Course</h5>
            <p className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </p>
          </div>
        </div>
        <div className="my-1">
          <CourseCodeInput />
        </div>
        <div className="my-1">
          <CourseTitleInput />
        </div>
        <div className="my-1">
          <CourseCreditInput />
        </div>
      </div>
      <div className="w-100 mt-2">
        <button
          className="border-none px-3 py-2 text-primary w-50 rounded-3 font-size-sm"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </button>
        <button className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white">
          Update
        </button>
      </div>
    </>
  );
}

function Delete({ handleClose }) {
  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button
              className="border-none px-3 py-2 text-primary rounded-3 font-size-sm"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function Details({ row_id, handleClose }) {
  const {
    data: course_details,
    isLoading,
    error,
  } = useFetchCourseDetailsQuery({
    course_id: row_id,
  });
  useEffect(() => {
    if (course_details) {
      console.table(course_details.course_details);
    }
    if (error) {
      console.error("Error fetching parents:", error);
    }
  }, [course_details, error]);

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="w-100">
        <div className="my-2">
          <p className="font-size-sm gainsboro-color">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
            molestias repellendus facere voluptate?
          </p>
        </div>
        <div className="d-flex align-items-center justify-content-between my-3">
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
          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {course_details.course_details[0].course_title}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Course Title
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3">
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {course_details.course_details[0].credit} Credit
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Course Credit
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3">
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {course_details.course_details[0].course_code}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Course Code
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3">
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {course_details.course_details[0].level.name}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Level Title
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3">
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {course_details.course_details[0].level.level}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Level Code
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3">
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {course_details.course_details[0].semester.name}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Semester Name
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between my-3">
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

          <div
            className="border-bottom py-2 d-flex flex-column"
            style={{ width: "87%" }}
          >
            <span className="my-0">
              {course_details.course_details[0].specialty.specialty_name}
            </span>
            <span className="my-0 font-size-sm gainsboro-color">
              Specailty Name
            </span>
          </div>
        </div>
        <div className="my-2 position-relative">
          <div className="postion-absolute d-flex flex-row justify-content-end">
            <button 
            className="px-3 w-25 py-2 font-size-sm text-white border-none rounded-3 primary-background"
             onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function Deactivate() {
  return (
    <>
      <div className="w-100">
        <h4 className="fw-semibold">Are you Absolutely sure ?</h4>
        <p className="my-3" style={{ fontSize: "0.85rem" }}>
          This action cannot be undone. This will Permanently delete This
          account and remove this account data from our servers
        </p>
        <div className="mt-4">
          <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
            <button className="border-none px-3 py-2 text-primary rounded-3 font-size-sm">
              Cancel
            </button>
            <button className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white">
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function Stats() {
  return <></>;
}

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Course",
      actionTitle: "Update",
      modalContent: Update,
    },
    {
      modalTitle: "Delete Course",
      actionTitle: "Delete",
      modalContent: Delete,
    },
    {
      modalTitle: "Course Details",
      actionTitle: "Details",
      modalContent: Details,
    },
    {
      modalTitle: "Deactivate Course",
      actionTitle: "Deactivate",
      modalContent: Deactivate,
    },
    {
      modalTitle: "Course Statistics/Performance",
      actionTitle: "stats",
      modalContent: Stats,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
