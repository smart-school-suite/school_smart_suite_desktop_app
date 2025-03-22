import Navbar from "../../components/Navbar";
import { useFetchCoursesQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown, {ModalButton} from "../../components/DataTableComponents/ActionComponent";
import { CoursesNavBarOptions } from "../../ComponentConfig/navBarConfig";
import CourseDetails from "../../ModalContent/Course/CourseDetails";
import CourseStats from "../../ModalContent/Course/CourseStats";
import CreateCourse from "../../ModalContent/Course/CreateCourse";
import DeactivateCourse from "../../ModalContent/Course/DeactivateCourse";
import DeleteCourse from "../../ModalContent/Course/DeleteCourse";
import UpdateCourse from "../../ModalContent/Course/UpdateCourse";
import { CoursesTable } from "../../ComponentConfig/AgGridTableConfig";
function Courses() {
  const { data: data, error, isLoading } = useFetchCoursesQuery();
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
            <h1 className="fw-bold my-0">{data.data.length}</h1>
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
          rowData={data.data}
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
    {
      modalTitle: "Course Statistics/Performance",
      actionTitle: "stats",
      modalContent: CourseStats,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
