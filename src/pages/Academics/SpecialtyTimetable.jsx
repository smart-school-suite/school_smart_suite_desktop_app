import Navbar from "../../components/Navbar";
import Table from "../../components/Tables";
import Pageloaderspinner from "../../components/Spinners";
import { ExamTimeTableNavbarOptions } from "../../ComponentConfig/navBarConfig";
import { useFetchSchoolSemestersQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import { SpecialtyTimetableTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import CreateTimetable from "../../ModalContent/SpecialtyTimetable/CreateTimetable";
import ViewTimetable from "../../ModalContent/SpecialtyTimetable/ViewTimetable";

function SpecialtyTimetable() {
 const { data, isLoading, error } = useFetchSchoolSemestersQuery();
  const filter_array_keys = [
    "id",
    "start_date",
    "end_date",
    "school_year_start",
    "specailty.specialty_name",
    "semester.name",
    "specailty.id",
    "status",
    "student_batch.id",
    "student_batch.name",
    "timetable_published",
  ];
  const renameMapping = {
    "id": "id",
    "start_date": "start_date",
    "school_year_start": "school_year",
    "end_date": "end_date",
    "specailty.specialty_name": "specialty_name",
    "semester.name": "semester_name",
    "student_batch.name":"batch_title",
    "specailty.id":"specialty_id",
    "student_batch.id":"batch_id"
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ExamTimeTableNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Number of semesters</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
        </div>
        <Table
          colDefs={SpecialtyTimetableTableConfig({
            ActionButtonGroup
          })}
          rowData={renameKeys(
            CleanArrayData(data.data, filter_array_keys),
            renameMapping
          )}
          rowHeight={55}
        />
      </div>
    </>
  );
}
export default SpecialtyTimetable;


function ActionButtonGroup(props) {
  const { id, specialty_id, batch_id } = props.data;
  const actions = [
    {

      actionTitle: "Create TimeTable",
      modalContent: CreateTimetable,
    },
    {
      actionTitle: "View TimeTable",
      modalContent: ViewTimetable,
    }
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} specialtyId={specialty_id} batchId={batch_id}
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      >
         <span>Edit Actions</span>
      </ActionButtonDropdown>
    </>
  );
}
