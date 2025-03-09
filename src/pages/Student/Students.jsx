import Navbar from "../../components/Navbar";
import { useFetchStudentsQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import Greenbutton from "../../components/Buttons";
import Table from "../../components/Tables";
import ActionButtonDropdown from "../actionButton";
import { StudentnavBarOptions } from "../../ComponentConfig/navBarConfig";
import { StudentTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import AssignStudent from "../../ModalContent/Student/AssignStudent";
import DeactivateStudent from "../../ModalContent/Student/DeactivateStudent";
import DeleteStudent from "../../ModalContent/Student/DeleteStudent";
import SanctionStudent from "../../ModalContent/Student/SanctionStudent";
import StudentDetails from "../../ModalContent/Student/StudentDetails";
import StudentPerformance from "../../ModalContent/Student/StudentPerformance";
import SuspendStudent from "../../ModalContent/Student/SuspendStudent";
import UpdateStudent from "../../ModalContent/Student/UpdateStudent";
import DismissStudent from "../../ModalContent/Student/DismissStudent";
function Students() {
  const { data: data, error, isLoading } = useFetchStudentsQuery();
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
            <Greenbutton
              lable="create student"
              bg="green-bg"
              route="/create-student"
            />
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
      modalTitle: "Update Student",
      actionTitle: "Update",
      modalContent: UpdateStudent,
    },
    {
      modalTitle: "Student Details",
      actionTitle: "Details",
      modalContent: StudentDetails,
    },
    {
      modalTitle: "Delete Student",
      actionTitle: "Delete",
      modalContent: DeleteStudent,
    },
    {
      modalTitle: "Student Performance",
      actionTitle: "Peformance",
      modalContent: StudentPerformance,
    },
    {
      modalTitle: "Dismiss Student",
      actionTitle: "Dimiss",
      modalContent: DismissStudent,
    },
    {
      modalTitle: "Sanction Student",
      actionTitle: "Sanction",
      modalContent: SanctionStudent,
    },
    {
      modalTitle: "Suspend Student",
      actionTitle: "Suspend",
      modalContent: SuspendStudent,
    },
    {
      modalTitle: "Deactivate Student",
      actionTitle: "Deactivate",
      modalContent: DeactivateStudent,
    },
    {
      modalTitle: "Assign",
      actionTitle: "Assign",
      modalContent: AssignStudent,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
