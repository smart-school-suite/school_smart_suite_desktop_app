import Navbar from "../../components/Navbar";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import {useFetchExamsQuery} from "../../Slices/Asynslices/fetchSlice";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import Table from "../../components/Tables";
import { ExamTimetableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { ExamTimeTableNavbarOptions } from "../../ComponentConfig/navBarConfig";
import CreateTimetable from "../../ModalContent/ExamTimetable/CreateTimetable";
import UpdateTimetable from "../../ModalContent/ExamTimetable/UpdateTimetable";
import DeleteTimetable from "../../ModalContent/ExamTimetable/DeleteTimetable";
import ViewTimetable from "../../ModalContent/ExamTimetable/ViewTimetable";
function ExamTimetable() {
 const { data:exams, isLoading:isExamLoading } = useFetchExamsQuery();
 if(isExamLoading){
   return <Pageloaderspinner />
 }
  return (
    <>
      <Navbar options={ExamTimeTableNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Exams</p>
            <h1 className="fw-bold my-0">{exams.data.length}</h1>
          </div>
        </div>
        {exams?.data?.length > 0 ? (
          <Table
            colDefs={ExamTimetableConfig({ DropdownComponent })}
             rowData={exams.data}
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
export default ExamTimetable;

function DropdownComponent(props){
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Create Timetable",
      modalContent:CreateTimetable
    },
    {
      actionTitle: "Update Timetable",
      modalContent:UpdateTimetable
    },
    {
      actionTitle: "Delete Timetable",
      modalContent:DeleteTimetable
    },
    {
      actionTitle:"View Timetable",
      modalContent:ViewTimetable
    }
  ];
 return(
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
 )
}