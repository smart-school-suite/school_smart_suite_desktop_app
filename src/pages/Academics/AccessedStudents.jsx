import Navbar from "../../components/Navbar";
import Table from "../../components/Tables";
import Pageloaderspinner from "../../components/Spinners";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import { AccessedStudentsTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { useFetchAccessedStudentsQuery } from "../../Slices/Asynslices/fetchSlice";
import { ScoresNavBarOptions } from "../../ComponentConfig/navBarConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
function AccessedStudents() {
  const { data: data, error, isLoading } = useFetchAccessedStudentsQuery();
  const filter_array_keys = [
    "id",
    "student.name",
    "student.specialty.specialty_name",
    "student.level.name",
    "exam.examtype.exam_name",
    "student.level.level",
    "student_accessed",
    "grades_submitted",
  ];
  const renameMapping = {
    "id":"id",
    "student.name":"student_name",
    "student.specialty.specialty_name":"specialty_name",
    "student.level.name":"level_name",
    "student.level.level":"level_number",
    "exam.examtype.exam_name":"exam_name",
    "student_accessed":"student_accessed",
    "grades_submitted":"grades_submitted"
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ScoresNavBarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Students</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
        </div>
      </div>
      <Table
        colDefs={AccessedStudentsTableConfig({DropdownComponent})}
        rowData={renameKeys(
          CleanArrayData(data.data, filter_array_keys),
          renameMapping
        )}
      />
    </>
  );
}
export default AccessedStudents;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Submit Scores",
      modalContent: SubmitScores,
    },
    {
      actionTitle: "Delete Accessed Student",
      modalContent: DeleteAccessedStudent,
    }
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}

function SubmitScores(){
  return(
    <>
    </>
  )
}

function DeleteAccessedStudent(){
   return(
    <>
    </>
   )
}
