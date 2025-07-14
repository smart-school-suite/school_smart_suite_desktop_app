import Pageloaderspinner from "../../components/Spinners/Spinners";
import Table from "../../components/Tables/Tables";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import CourseDetails from "../../ModalContent/Course/CourseDetails";
import CreateCourse from "../../ModalContent/Course/CreateCourse";
import DeactivateCourse from "../../ModalContent/Course/DeactivateCourse";
import DeleteCourse from "../../ModalContent/Course/DeleteCourse";
import UpdateCourse from "../../ModalContent/Course/UpdateCourse";
import { CoursesTable } from "../../ComponentConfig/AgGridTableConfig";
import { Icon } from "@iconify/react";
import { useGetCourses } from "../../hooks/course/useGetCourses";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
function Courses() {
  const { data: specialty, isFetching } = useGetCourses();
  if (isFetching) {
    return  <DataTableNavLoader />;
  }
  return (
    <>
      <div>
        <div className="my-2">
          <div className="d-flex align-items-center gap-2">
            <div
              className="d-flex justify-content-center align-items-center primary-background-100"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "0.5rem",
              }}
            >
              <Icon
                icon="grommet-icons:user-admin"
                className="font-size-md primary-color"
              />
            </div>
            <span className="my-0 fw-semibold">Courses</span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Courses</p>
            <h1 className="fw-bold my-0">{specialty.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateCourse }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span className="font-size-sm">Create Course</span>
            </ModalButton>
          </div>
        </div>
        <Table
          colDefs={CoursesTable({ DropdownComponent })}
          rowData={specialty.data}
        />
      </div>
    </>
  );
}
export default Courses;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Course",
      actionTitle: "Update",
      modalContent: UpdateCourse,
    },
    {
      modalTitle: "Delete Course",
      actionTitle: "Delete",
      modalContent: DeleteCourse,
    },
    {
      modalTitle: "Course Details",
      actionTitle: "Details",
      modalContent: CourseDetails,
    },
    {
      modalTitle: "Deactivate Course",
      actionTitle: "Deactivate",
      modalContent: DeactivateCourse,
    },
  ];
  return (
    <>
      <ActionButtonDropdown
        actions={actions}
        row_id={id}
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <span>Edit Action</span>
      </ActionButtonDropdown>
    </>
  );
}
