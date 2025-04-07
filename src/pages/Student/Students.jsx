import Navbar from "../../components/Navbar";
import { useFetchStudentsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown, { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { StudentnavBarOptions } from "../../ComponentConfig/navBarConfig";
import { StudentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import DeactivateStudent from "../../ModalContent/Student/DeactivateStudent";
import DeleteStudent from "../../ModalContent/Student/DeleteStudent";
import StudentDetails from "../../ModalContent/Student/StudentDetails";
import UpdateStudent from "../../ModalContent/Student/UpdateStudent";
import CreateStudent from "../../ModalContent/Student/CreateStudent";
import MarkAsDropout from "../../ModalContent/Student/MarkAsDropout";
function Students() {
  const { data: data, isLoading } = useFetchStudentsQuery();
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={StudentnavBarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Students</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent:CreateStudent }}
              classname="border-none rounded-3 green-bg font-size-sm text-white px-3 py-2"
            >
              <span className="font-size-sm">Create Student</span>
            </ModalButton>
          </div>
        </div>
      </div>
      <Table
        colDefs={StudentTableConfig({ DropdownComponent })}
        rowData={data.data}
      />
    </>
  );
}
export default Students;
export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update Student",
      modalContent: UpdateStudent,
    },
    {
      actionTitle: "Student Details",
      modalContent: StudentDetails,
    },
    {
      actionTitle: "Delete Student",
      modalContent: DeleteStudent,
    },
    {
      actionTitle: "Account Status",
      modalContent: DeactivateStudent,
    },
    {
      actionTitle: "Mark As Dropout",
      modalContent: MarkAsDropout,
    },
  ];
  return (
    <>
       <ActionButtonDropdown actions={actions} row_id={id} 
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      >
      <span>Edit Actions</span>
      </ActionButtonDropdown>
    </>
  );
}
