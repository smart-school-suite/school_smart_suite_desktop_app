import Navbar from "../../components/Navbar";
import { useFetchStudentBatchQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys, formatDate } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import { StudentBatchesNavBarOptions } from "../../ComponentConfig/navBarConfig";
import ActionButtonDropdown, { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { StudentBatchesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateStudentBatch from "../../ModalContent/StudentBatches/CreateStudentBatch";
import UpdateStudentBatch from "../../ModalContent/StudentBatches/UpdateStudentBatch";
import DeleteStudentBatch from "../../ModalContent/StudentBatches/DeleteStudentBatch";
import StudentBatchDetails from "../../ModalContent/StudentBatches/StudentBatchDetails";
function StudentBatches() {
  const { data: data, error, isLoading } = useFetchStudentBatchQuery();
  const filter_array_keys = ["id", "name", "graduation_date", "created_at"];
  const renameMapping = {
    name: "Name",
    graduation_date: "Graduation Date",
    created_at: "Date of creation",
  };

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
              {data.data.length}
            </h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateStudentBatch }}
              classname="border-none rounded-3 green-bg text-white px-3 py-2"
            >
              <span className="font-size-sm">Create Student Batch</span>
            </ModalButton>
          </div>
        </div>
        <Table
          colDefs={StudentBatchesTableConfig({ DropdownComponent, DateComponent })}
          rowData={renameKeys(
            CleanArrayData(data.data, filter_array_keys),
            renameMapping
          )}
        />
      </div>
    </>
  );
}
export default StudentBatches;

function DateComponent(props) {
  return (
    <>
      <span className="text-overflow-elipse overflow-hidden my-0 text-start">
        {formatDate(props.value)}
      </span>
    </>
  );
}

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Student Batch",
      actionTitle: "Update",
      modalContent: UpdateStudentBatch,
    },
    {
      modalTitle: "Student Batch Details",
      actionTitle: "Details",
      modalContent: DeleteStudentBatch,
    },
    {
      modalTitle: "Delete Student Batch",
      actionTitle: "Delete",
      modalContent: StudentBatchDetails,
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
