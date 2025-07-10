
import Pageloaderspinner from "../../components/Spinners/Spinners";
import Table from "../../components/Tables/Tables";
import { useFetchExamsQuery } from "../../Slices/Asynslices/fetchSlice";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import { ExamsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import CreateExam from "../../ModalContent/Exams/CreateExam";
import DeleteExam from "../../ModalContent/Exams/DeleteExam";
import ExamDetails from "../../ModalContent/Exams/ExamDetails";
import UpdateExam from "../../ModalContent/Exams/UpdateExam";
import AddExamGrading from "../../ModalContent/Exams/AddExamGrading";
import { Icon } from "@iconify/react";
function Exam() {
  const { data: data, isLoading } = useFetchExamsQuery();
  if (isLoading) {
    return <Pageloaderspinner />;
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
                    <span className="my-0 fw-semibold">Exams</span>
                  </div>
                </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Exams</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
              action={{ modalContent: CreateExam }}
            >
              <Icon icon="icons8:plus" className="font-size-md" />
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
            No Exams Found 
          </div>
        )}
      </div>
    </>
  );
}
export default Exam;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update",
      modalContent: UpdateExam,
    },
    {
      actionTitle: "Details",
      modalContent: ExamDetails,
    },
    {
      actionTitle: "Delete",
      modalContent: DeleteExam,
    },
    {
      modalContent:AddExamGrading,
      actionTitle: "Add Grading",
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
        <span>Edit Actions</span>
      </ActionButtonDropdown>
    </>
  );
}
