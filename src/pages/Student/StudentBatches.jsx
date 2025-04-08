import Navbar from "../../components/Navbar";
import { useFetchStudentBatchQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import { StudentBatchesNavBarOptions } from "../../ComponentConfig/navBarConfig";
import ActionButtonDropdown, { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { StudentBatchesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateStudentBatch from "../../ModalContent/StudentBatches/CreateStudentBatch";
import UpdateStudentBatch from "../../ModalContent/StudentBatches/UpdateStudentBatch";
import DeleteStudentBatch from "../../ModalContent/StudentBatches/DeleteStudentBatch";
import StudentBatchDetails from "../../ModalContent/StudentBatches/StudentBatchDetails";
import AssignGraduationDates from "../../ModalContent/StudentBatches/AssignGraduationDate";
import ViewGraduationDates from "../../ModalContent/StudentBatches/ViewGraduationDates";
function StudentBatches() {
  const { data: studentBatches, isLoading } = useFetchStudentBatchQuery();
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div>
        <Navbar options={StudentBatchesNavBarOptions} />
      </div>
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of batches</p>
            <h1 className="fw-bold my-0">
              {studentBatches.data.length}
            </h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateStudentBatch }}
              classname="border-none rounded-3 green-bg font-size-sm text-white px-3 py-2"
            >
              <span className="font-size-sm">Create Batch</span>
            </ModalButton>
          </div>
        </div>
        <Table
          colDefs={StudentBatchesTableConfig({ DropdownComponent})}
          rowData={studentBatches.data}
        />
      </div>
    </>
  );
}
export default StudentBatches;


export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update Student Batch",
      modalContent: UpdateStudentBatch,
    },
    {
      actionTitle: "Student Batch Details",
      modalContent: StudentBatchDetails,
    },
    {
      actionTitle: "Delete student Batch",
      modalContent: DeleteStudentBatch,
    },
    {
      actionTitle: "Assign Graduation Dates",
      modalContent: AssignGraduationDates,
    }, 
    {
      actionTitle: "View Graduation Dates",
      modalContent: ViewGraduationDates,
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
