import { Icon } from "@iconify/react";
import Table from "../../components/Tables/Tables";
import { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import { semesterTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import UpdateSemester from "../../ModalContent/Semesters/UpdateSemester";
import DeleteSemester from "../../ModalContent/Semesters/DeleteSemester";
import SemeseterDetails from "../../ModalContent/Semesters/SemesterDetails";
import CreateSemester from "../../ModalContent/Semesters/CreateSemester";
import { useGetActiveSchoolSemesters } from "../../hooks/schoolSemester/useGetSchoolSemesters";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
function Semester() {
  const { data:schoolSemesters, isFetching } = useGetActiveSchoolSemesters();
  if (isFetching) {
    return <DataTableNavLoader />;
  }
  return (
    <>
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
          <span className="my-0 fw-semibold">Semester</span>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mt-4 w-100">
        <div className="d-flex flex-row align-items-end gap-2">
          <div className="d-block">
            <p className="font-size-xs my-0">Created Semesters</p>
            <h1 className="fw-bold my-0">{schoolSemesters.data.length}</h1>
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
            ActionButtonGroup,
          })}
          rowData={schoolSemesters.data}
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
