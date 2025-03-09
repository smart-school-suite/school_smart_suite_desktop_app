import Navbar from "../../components/Navbar";
import { useFetchStudentResitQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown from "../actionButton";
import { ResitFeeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { ResitFeeNavBarConfig } from "../../ComponentConfig/navBarConfig";
function ResitFee() {
  const { data: data, error, isLoading } = useFetchStudentResitQuery();
  const filter_array_keys = [
    "id",
    "student.name",
    "level.name",
    "specialty.specialty_name",
    "exam.examtype.exam_name",
    "courses.course_title",
    "paid_status",
    "resit_fee",
  ];
  const renameMapping = {
    id: "id",
    "student.name": "Student Name",
    "level.name": "Level",
    "specialty.specialty_name": "Specialty",
    "exam.examtype.exam_name": "Exam Name",
    "courses.course_title": "Course Title",
    paid_status: "Status",
    resit_fee: "Resit Fee",
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={ResitFeeNavBarConfig} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Resits</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
        </div>
        <div>
          <Table
            colDefs={ResitFeeTableConfig({ DropdownComponent })}
            rowData={renameKeys(
              CleanArrayData(data.data, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
    </>
  );
}
export default ResitFee;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      modalTitle: "Update Resit Payment",
      actionTitle: "Update",
      modalContent: Update,
    },
    {
      modalTitle: "Resit Payment Details",
      actionTitle: "Details",
      modalContent: Details,
    },
    {
      modalTitle: "Delete Resit Payment",
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
