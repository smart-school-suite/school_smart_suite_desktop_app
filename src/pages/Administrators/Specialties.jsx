import Navbar from "../../components/Navbar";
import { useFetchSpecialtiesQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import { SpecialtyTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { SpecailtyNavBarOptions } from "../../ComponentConfig/navBarConfig";
import CreateSpecialty from "../../ModalContent/Specialty/CreateSpecialty";
import UpdateSpecialty from "../../ModalContent/Specialty/UpdateSpecialty";
import SpecialtyDetails from "../../ModalContent/Specialty/SpecialtyDetails";
import DeleteSpecialty from "../../ModalContent/Specialty/DeleteSpecialty";
import DeactivateSpecialty from "../../ModalContent/Specialty/DeactivateSpecialty";
import ActionButtonDropdown, { ModalButton } from "../../components/DataTableComponents/ActionComponent";
import CurrencyComponent from "../../components/DataTableComponents/CurrencyComponent";
function Specialties() {
  const { data: data, error, isLoading } = useFetchSpecialtiesQuery();
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={SpecailtyNavBarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number specialties</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
          <div className="end-block d-flex flex-row ms-auto w-75 justify-content-end gap-3">
            <ModalButton
              action={{ modalContent: CreateSpecialty }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span>Create Specialty</span>
            </ModalButton>
          </div>
        </div>
        <Table
          colDefs={SpecialtyTableConfig({ DropdownComponent, CurrencyComponent })}
          rowData={data.data}
        />
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
      icon:"mynaui:edit-solid",
      modalContent: UpdateSpecialty,
    },
    {
      actionTitle: "Details",
      icon:"bxs:detail",
      modalContent: SpecialtyDetails,
    },
    {
      actionTitle: "Delete",
      icon:"fluent:delete-16-filled",
      modalContent: DeleteSpecialty,
    },
    {
      actionTitle: "Manage Status",
      icon:"heroicons-outline:status-online",
      modalContent: DeactivateSpecialty,
    }
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id}
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      > 
      <span>Edit Specialty</span>
      </ActionButtonDropdown>
    </>
  );
}
