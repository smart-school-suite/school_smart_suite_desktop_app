import Navbar from "../../components/Navbar";
import { ExamTimeTableNavbarOptions } from "../../ComponentConfig/navBarConfig";
import { useFetchExamByTypeResitQuery } from "../../Slices/Asynslices/fetchSlice";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import Table from "../../components/Tables";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { ExamsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import UpdateExam from "../../ModalContent/Exams/UpdateExam";
import AddExamGrading from "../../ModalContent/Exams/AddExamGrading";
import DeleteExam from "../../ModalContent/Exams/DeleteExam";
import ExamDetails from "../../ModalContent/Exams/ExamDetails";
import CreateTimetable from "../../ModalContent/ExamResitTimetable/CreateTimetable";
import UpdateTimetable from "../../ModalContent/ExamResitTimetable/UpdateTimetable";
import DeleteTimetable from "../../ModalContent/ExamResitTimetable/DeleteTimetable";
function ExamResitTimetable() {
  const { data: examResit, isLoading: examResitFetching } =
  useFetchExamByTypeResitQuery();
  if (examResitFetching) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ExamTimeTableNavbarOptions} />
      <div className="d-flex flex-row align-items-center mt-4 w-100">
        <div className="d-block">
          <p className="font-size-xs my-0">Total Number of Exams</p>
          <h1 className="fw-bold my-0">{examResit.data.length}</h1>
        </div>
      </div>
      {examResit?.data?.length > 0 ? (
        <Table
          colDefs={ExamsTableConfig({ DropdownComponent })}
          rowData={examResit.data}
        />
      ) : (
        <div className="alert alert-warning">
          Oops, looks like you don't have any teachers.
        </div>
      )}
    </>
  );
}
export default ExamResitTimetable;

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
    },
    {
      modalContent:CreateTimetable,
        actionTitle: "Create Timetable",
    },
    {
      modalContent:UpdateTimetable,
        actionTitle: "Update Timetable",
    },
    {
      modalContent:DeleteTimetable,
        actionTitle: "Delete Timetable",
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
