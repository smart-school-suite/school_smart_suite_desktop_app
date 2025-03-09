import Navbar from "../../components/Navbar";
import { useFetchSpecialtiesQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import Table from "../../components/Tables";
import ActionButtonDropdown, { ModialButton } from "../actionButton";
import { SpecialtyTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import { SpecailtyNavBarOptions } from "../../ComponentConfig/navBarConfig";
import CreateSpecialty from "../../ModalContent/Specialty/CreateSpecialty";
import UpdateSpecialty from "../../ModalContent/Specialty/UpdateSpecialty";
import SpecialtyDetails from "../../ModalContent/Specialty/SpecialtyDetails";
import DeleteSpecialty from "../../ModalContent/Specialty/DeleteSpecialty";
import DeactivateSpecialty from "../../ModalContent/Specialty/DeactivateSpecialty";
import AssignSpecialty from "../../ModalContent/Specialty/AssignSpecialty";
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
            <ModialButton
              action={{ modalContent: CreateSpecialty }}
              classname={
                "border-none green-bg font-size-sm rounded-3 px-3 py-2 d-flex flex-row align-items-center d-flex text-white"
              }
            >
              <span>Create Specialty</span>
            </ModialButton>
          </div>
        </div>
        <Table
          colDefs={SpecialtyTableConfig({ DropdownComponent })}
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
      modalTitle: "Update Specialty",
      actionTitle: "Update",
      modalContent: UpdateSpecialty,
    },
    {
      modalTitle: "Specialty Details",
      actionTitle: "Details",
      modalContent: SpecialtyDetails,
    },
    {
      modalTitle: "Delete Specialty",
      actionTitle: "Delete",
      modalContent: DeleteSpecialty,
    },
    {
      modalTitle: "Deactivate Specialty",
      actionTitle: "Deactivate",
      modalContent: DeactivateSpecialty,
    },
    {
      modalTitle: "Assign Specialty",
      actionTitle: "Assign",
      modalContent: AssignSpecialty,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} />
    </>
  );
}
