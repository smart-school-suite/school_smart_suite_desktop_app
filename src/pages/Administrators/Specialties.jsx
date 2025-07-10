import { useFetchSpecialtiesQuery } from "../../Slices/Asynslices/fetchSlice";
import Table from "../../components/Tables/Tables";
import { SpecialtyTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { SpecailtyNavBarOptions } from "../../ComponentConfig/navBarConfig";
import CreateSpecialty from "../../ModalContent/Specialty/CreateSpecialty";
import UpdateSpecialty from "../../ModalContent/Specialty/UpdateSpecialty";
import SpecialtyDetails from "../../ModalContent/Specialty/SpecialtyDetails";
import DeleteSpecialty from "../../ModalContent/Specialty/DeleteSpecialty";
import DeactivateSpecialty from "../../ModalContent/Specialty/DeactivateSpecialty";
import ActionButtonDropdown, {
  ModalButton,
} from "../../components/DataTableComponents/ActionComponent";
import DataTableNavLoader from "../../components/PageLoaders/DataTableNavLoader";
import { Icon } from "@iconify/react";
import { useMemo } from "react";
function Specialties() {
  const { data: specialty, isLoading } = useFetchSpecialtiesQuery();
  const memoizedColDefs = useMemo(() => {
    return SpecialtyTableConfig({
      DropdownComponent,
    });
  }, []);

  const memoizedRowData = useMemo(() => {
    return specialty?.data ?? [];
  }, [specialty]);

  const memoizedNavConfig = useMemo(() => {
    return SpecailtyNavBarOptions;
  }, []);
  if (isLoading) {
    return <DataTableNavLoader />;
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
            <span className="my-0 fw-semibold">Specialty</span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number specialties</p>
            <h1 className="fw-bold my-0">{memoizedRowData.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateSpecialty }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 gap-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <Icon icon="icons8:plus" className="font-size-md" />
              <span>Create Specialty</span>
            </ModalButton>
          </div>
        </div>
        <Table colDefs={memoizedColDefs} rowData={memoizedRowData} />
      </div>
    </>
  );
}
export default Specialties;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Update",
      icon: "mynaui:edit-solid",
      modalContent: UpdateSpecialty,
    },
    {
      actionTitle: "Details",
      icon: "bxs:detail",
      modalContent: SpecialtyDetails,
    },
    {
      actionTitle: "Delete",
      icon: "fluent:delete-16-filled",
      modalContent: DeleteSpecialty,
    },
    {
      actionTitle: "Manage Status",
      icon: "heroicons-outline:status-online",
      modalContent: DeactivateSpecialty,
    },
  ];
  const memoizedActions = useMemo(() => actions, []);
  return (
    <>
      <ActionButtonDropdown
        actions={memoizedActions}
        row_id={id}
        style={
          "tableActionButton primary-background text-white font-size-sm px-2"
        }
      >
        <span>Edit Specialty</span>
      </ActionButtonDropdown>
    </>
  );
}
