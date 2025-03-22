import Navbar from "../../components/Navbar";
import { useFetchTeachersQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { TeacherNavBarConfig } from "../../ComponentConfig/navBarConfig";
import { teacherTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeactivateTeacher from "../../ModalContent/Teacher/DeactivateTeacher";
import DeleteTeacher from "../../ModalContent/Teacher/DeleteTeacher";
import TeacherDetails from "../../ModalContent/Teacher/TeacherDetails";
import UpdateTeacher from "../../ModalContent/Teacher/UpdateTeacher";
import CurrencyComponent from "../../components/DataTableComponents/CurrencyComponent";
import AddSpecialtyPreference from "../../ModalContent/Teacher/AddSpecialtyPreference";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import AppointHod from "../../ModalContent/Teacher/AppointHod";
import AppointHos from "../../ModalContent/Teacher/AppointHos";
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
            <ModalButton
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span>Create Teacher</span>
            </ModalButton>
          </div>
        </div>
        <div>
          {data?.data?.length > 0 ? (
            <Table
              colDefs={teacherTableConfig({
                DropdownComponent,
                CurrencyComponent,
              })}
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
      actionTitle: "Update",
      icon:"mynaui:edit-solid",
      modalContent: UpdateTeacher,
    },
    {
      actionTitle: "Details",
      icon:"bxs:detail",
      modalContent: TeacherDetails,
    },
    {
      actionTitle: "Delete",
      icon:"fluent:delete-16-filled",
      modalContent: DeleteTeacher,
    },
    {
      actionTitle:"Add Specialty Preference",
      modalContent:AddSpecialtyPreference,
      icon:"material-symbols:star-rounded"    
    },
    {
      actionTitle: "Account Status",
      modalContent: DeactivateTeacher,
      icon:"heroicons-outline:status-online",
    },
    {
      actionTitle:"Appoint HOD",
      icon:"subway:admin-1",
      modalContent:AppointHod
    },
    {
      actionTitle:"Appoint HOS",
      icon:"solar:user-plus-bold",
      modalContent:AppointHos
    }
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
