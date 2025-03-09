import Navbar from "../../components/Navbar";
import { useFetchStudentScoresQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown from "../actionButton";
import { ScoresNavBarOptions } from "../../ComponentConfig/navBarConfig";
import { StudentScoresTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import Greenbutton from "../../components/Buttons";
function ExamScores() {
  const { data: scores, error, isLoading } = useFetchStudentScoresQuery();
  const filter_array_keys = [
    "id",
    "student.name",
    "specialty.specialty_name",
    "level.name",
    "level.level",
    "school_year",
    "exams.examtype.exam_name",
    "course.course_title",
    "score",
    "grade",
  ];
  const renameMapping = {
    id: "id",
    "student.name": "Student Name",
    "specialty.specialty_name": "Specialty Name",
    "level.name": "Level Name",
    "level.level": "Level",
    school_year: "School Year",
    "exams.examtype.exam_name": "Exam Name",
    "course.course_title": "Course Title",
    score: "Score",
    grade: "Grade",
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
            <p className="font-size-xs my-0">Total Number of Entries</p>
            <h1 className="fw-bold my-0">{scores.scores.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <Greenbutton
              lable="Create Scores"
              bg="green-bg"
              route="/create-scores"
            />
          </div>
        </div>
        <Table
          colDefs={StudentScoresTableConfig({ DropdownComponent })}
          rowData={renameKeys(
            CleanArrayData(scores.scores, filter_array_keys),
            renameMapping
          )}
        />
      </div>
    </>
  );
}
export default ExamScores;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Parent",
      actionTitle: "Update",
      modalContent: Update,
    },
    {
      modalTitle: "Parent Details",
      actionTitle: "Details",
      modalContent: Details,
    },
    {
      modalTitle: "Delete Parent",
      actionTitle: "Delete",
      modalContent: Delete,
    },
  ];

  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
