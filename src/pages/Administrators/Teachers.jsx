import Navbar from "../../components/Navbar";
import { useFetchTeachersQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import Greenbutton from "../../components/Buttons";
import Table from "../../components/Tables";
import ActionButtonDropdown from "../actionButton";
import { TeacherNavBarConfig } from "../../ComponentConfig/navBarConfig";
import { teacherTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeactivateTeacher from "../../ModalContent/Teacher/DeactivateTeacher";
import DeleteTeacher from "../../ModalContent/Teacher/DeleteTeacher";
import HolidayGrant from "../../ModalContent/Teacher/GrantHoliday";
import GrantTeacherLift from "../../ModalContent/Teacher/GrantTeacherLift";
import PromoteTeacher from "../../ModalContent/Teacher/PromoteTeacher";
import SuspendTeacher from "../../ModalContent/Teacher/SuspendTeacher";
import TeacherDetails from "../../ModalContent/Teacher/TeacherDetails";
import UpdateTeacher from "../../ModalContent/Teacher/UpdateTeacher";
function Teachers() {
  const { data: data, error, isLoading } = useFetchTeachersQuery();
  const filter_array_keys = [
    "id",
    "name",
    "email",
    "employment_status",
    "hire_date",
    "highest_qualification",
    "field_of_study",
    "religion",
    "years_experience",
    "salary",
  ];
  const renameMapping = {
    id: "id",
    name: "Name",
    employment_status: "Employment Status",
    hire_date: "Hire Date",
    highest_qualification: "Highest qualification",
    field_of_study: "Field of study",
    religion: "Religion",
    years_experience: "Years experience",
    salary: "Salary",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={TeacherNavBarConfig}></Navbar>
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number Teachers</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <Greenbutton
              lable="Add Teacher"
              bg="green-bg"
              route="/create-teacher"
            />
          </div>
        </div>
        <div>
          {data?.data?.length > 0 ? (
            <Table
              colDefs={teacherTableConfig({ DropdownComponent })}
              rowData={renameKeys(
                CleanArrayData(data.data, filter_array_keys),
                renameMapping
              )}
            />
          ) : (
            <div className="alert alert-warning">
              Oops, looks like you don't have any teachers.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Teachers;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Teacher",
      actionTitle: "Update",
      modalContent: UpdateTeacher,
    },
    {
      modalTitle: "Teacher Details",
      actionTitle: "Details",
      modalContent: TeacherDetails,
    },
    {
      modalTitle: "Delete Teacher",
      actionTitle: "Delete",
      modalContent: DeleteTeacher,
    },
    {
      modalTitle: "Promote Teacher",
      actionTitle: "Promote",
      modalContent: PromoteTeacher,
    },
    {
      modalTitle: "Suspend Teacher",
      actionTitle: "suspend",
      modalContent: SuspendTeacher,
    },
    {
      modalTitle: "Deactivate Teacher Account",
      actionTitle: "Deactivate",
      modalContent: DeactivateTeacher,
    },
    {
      modalTitle: "Grant Teacher Holiday",
      actionTitle: "Grant Holiday",
      modalContent: HolidayGrant,
    },
    {
      modalTitle: "Grant Teacher Lift",
      actionTitle: "Grant Lift",
      modalContent: GrantTeacherLift,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
