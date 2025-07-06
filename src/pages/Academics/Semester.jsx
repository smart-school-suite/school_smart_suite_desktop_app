import { Icon } from "@iconify/react";
import Table from "../../components/Tables";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import { useFetchSchoolSemestersQuery } from "../../Slices/Asynslices/fetchSlice";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { semesterTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import UpdateSemester from "../../ModalContent/Semesters/UpdateSemester";
import DeleteSemester from "../../ModalContent/Semesters/DeleteSemester";
import SemeseterDetails from "../../ModalContent/Semesters/SemesterDetails";
import CreateSemester from "../../ModalContent/Semesters/CreateSemester";
function Semester() {
  const { data, isLoading, error } = useFetchSchoolSemestersQuery();
  const filter_array_keys = [
    "id",
    "start_date",
    "end_date",
    "school_year_start",
    "specailty.specialty_name",
    "semester.name",
    "status",
    "timetable_published",
    "specailty.level.level",
    "specailty.level.name"
  ];
  const renameMapping = {
    "id": "id",
    "start_date": "start_date",
    "school_year_start": "school_year",
    "end_date": "end_date",
    "specailty.specialty_name": "specialty_name",
    "semester.name": "semester_name",
    "specailty.level.level":"level",
    "specailty.level.name":"level_name",
    "timetable_published":"timetable_status"
  };

  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <div className="my-2">
        <div className="d-flex align-items-center gap-2">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "2.5rem",
              background: "#fff",
            }}
          >
            <Icon
              icon="grommet-icons:user-admin"
              className="fs-5 text-primary"
            />
          </div>
          <h4 className="fw-bold my-0">Specialty Semester</h4>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mt-4 w-100">
        <div className="d-flex flex-row align-items-end gap-2">
          <div className="d-block">
            <p className="font-size-xs my-0">Created Semesters</p>
            <h1 className="fw-bold my-0">1000</h1>
          </div>
        </div>
        <div className="end-block d-flex flex-row ms-auto justify-content-end gap-3">
          <ModalButton
            classname={
              "border-none green-bg font-size-sm rounded-3 px-3 gap-2 py-2 d-flex flex-row align-items-center d-flex text-white"
            }
            action={{ modalContent: CreateSemester }}
          >
            <Icon icon="icons8:plus" className="font-size-md" />
            <span className="font-size-sm">Create Semester</span>
          </ModalButton>
        </div>
      </div>
      <div>
        <Table
          colDefs={semesterTableConfig({
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
export default Semester;
function ActionButtonGroup(props) {
    const { id } = props.data;
    const actions = [
      {
        modalTitle: "Delete Semester",
        actionTitle: "Delete Semester",
        modalContent: DeleteSemester,
      },
      {
        modalTitle: "Update Semester",
        actionTitle: "Update Semester",
        modalContent: UpdateSemester,
      },
      {
        modalTitle: "Semester Details",
        actionTitle: "Semester Details",
        modalContent: SemeseterDetails,
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