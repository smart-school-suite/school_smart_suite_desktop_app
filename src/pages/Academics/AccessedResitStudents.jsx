import Navbar from "../../components/Navbar";
import { ExamResitNavbarOptions } from "../../ComponentConfig/navBarConfig";
import Table from "../../components/Tables";
import { useFetchResitCandidatesQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import SummitScores from "../../ModalContent/AccessedResitCandidate/SubmitScores";
import DeleteCandidate from "../../ModalContent/AccessedResitCandidate/DeleteCandidate";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { AccessedResitCandidateTableConfig } from "../../ComponentConfig/AgGridTableConfig";
function AccessedResitStudents() {
  const { data: resitCandidates, isLoading: isResitCandidateLoading } =
    useFetchResitCandidatesQuery();
  if (isResitCandidateLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ExamResitNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Students</p>
            <h1 className="fw-bold my-0">{resitCandidates.data.length}</h1>
          </div>
        </div>
      </div>
      <Table
        colDefs={AccessedResitCandidateTableConfig({ DropdownComponent })}
        rowData={resitCandidates.data}
      />
    </>
  );
}
export default AccessedResitStudents;
export function DropdownComponent(props) {
    const { id, student_id, exam_id } = props.data;
    const actions = [
      {
        actionTitle: "Submit Scores",
        modalContent: SummitScores,
      },
      {
        actionTitle: "Delete Candidate",
        modalContent: DeleteCandidate,
      }
    ];
    return (
      <>
        <ActionButtonDropdown
          actions={actions}
          row_id={id}
          studentId={student_id}
          examId={exam_id}
          style={
            "tableActionButton primary-background text-white font-size-sm px-2"
          }
        >
          <span>Edit Actions</span>
        </ActionButtonDropdown>
      </>
    );
  }