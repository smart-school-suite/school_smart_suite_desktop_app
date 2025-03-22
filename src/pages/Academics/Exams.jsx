import Navbar from "../../components/Navbar";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import { useFetchExamsQuery } from "../../Slices/Asynslices/fetchSlice";
import ActionButtonDropdown, {ModalButton} from "../../components/DataTableComponents/ActionComponent";
import { GradesConfigurationNavbarOptions } from "../../ComponentConfig/navBarConfig";
import { ExamsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateExam from "../../ModalContent/Exams/CreateExam";
import DeleteExam from "../../ModalContent/Exams/DeleteExam";
import ExamDetails from "../../ModalContent/Exams/ExamDetails";
import UpdateExam from "../../ModalContent/Exams/UpdateExam";
import { Icon } from "@iconify/react";
function Exams() {
  const { data: data, error, isLoading } = useFetchExamsQuery();
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={GradesConfigurationNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Exams</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 gap-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
              action={{ modalContent: CreateExam }}
            >
              <Icon icon="icons8:plus"  className="font-size-md"/>
              <span className="font-size-sm">Create Exam</span>
            </ModalButton>
          </div>
        </div>
        {data?.data?.length > 0 ? (
          <Table
            colDefs={ExamsTableConfig({ DropdownComponent })}
            rowData={data.data}
          />
        ) : (
          <div className="alert alert-warning">
            Oops, looks like you don't have any teachers.
          </div>
        )}
      </div>
    </>
  );
}
export default Exams;


export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Parent",
      actionTitle: "Update",
      modalContent: UpdateExam,
    },
    {
      modalTitle: "Parent Details",
      actionTitle: "Details",
      modalContent: ExamDetails,
    },
    {
      modalTitle: "Delete Parent",
      actionTitle: "Delete",
      modalContent: DeleteExam ,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} 
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      >
       <span>Edit Exam</span>
      </ActionButtonDropdown>
    </>
  );
}
