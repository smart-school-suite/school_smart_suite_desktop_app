import Navbar from "../../components/Navbar";
import { RegistrationFeesNavBarCongfig } from "../../ComponentConfig/navBarConfig";
import { useFetchRegistrationFeesQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners/Spinners";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import { registrationFeeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import Table from "../../components/Tables";
import UpdateRegistrationFee from "../../ModalContent/RegistrationFees/UpdateRegistrationFees";
import RegistrationFeeDetail from "../../ModalContent/RegistrationFees/RegistrationFeeDetails";
import DeleteAdditionalFees from "../../ModalContent/AdditionalFees/DeleteAdditionalFees";
import PayRegistrationFees from "../../ModalContent/RegistrationFees/PayRegistrationFees";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
function RegistrationFees() {
  const {
    data: registrationFees,
    error,
    isLoading,
  } = useFetchRegistrationFeesQuery();
  const filter_array_keys = [
    "id",
    "student.name",
    "amount",
    "status",
    "specialty.specialty_name",
    "level.level",
    "level.name",
  ];
  const renameMapping = {
    "student.name": "student_name",
    "amount": "amount",
    "status": "status",
    "specialty.specialty_name": "specialty_name",
    "level.name": "level_name",
    "level.level": "level_number",
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }

  return (
    <>
      <Navbar options={RegistrationFeesNavBarCongfig} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Resits</p>
            <h1 className="fw-bold my-0">{registrationFees.data.length}</h1>
          </div>
        </div>
        <div>
          <Table
            colDefs={registrationFeeTableConfig({ DropdownComponent })}
            rowData={renameKeys(
              CleanArrayData(registrationFees.data, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
    </>
  );
}
export default RegistrationFees;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle: "Make Payment",
      modalContent: PayRegistrationFees,
    },
    {
      actionTitle: "Details",
      modalContent: RegistrationFeeDetail,
    },
    {
      actionTitle:"Update Fee",
      modalContent:UpdateRegistrationFee
    },
    {
      actionTitle:"Delete Fee",
      modalContent:DeleteAdditionalFees
    }
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} 
      style={'tableActionButton primary-background text-white font-size-sm px-2'} >
        <span>Edit Fee</span>
        </ActionButtonDropdown>
    </>
  );
}
