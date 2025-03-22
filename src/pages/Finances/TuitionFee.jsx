import Navbar from "../../components/Navbar";
import { TuitionFeeNavbarOptions } from "../../ComponentConfig/navBarConfig";
import Table from "../../components/Tables";
import { useFetchTuitionFeeQuery } from "../../Slices/Asynslices/fetchSlice";
import Pageloaderspinner from "../../components/Spinners";
import { renameKeys } from "../../utils/functions";
import CleanArrayData from "../../utils/functions";
import { tuitionFeeTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import PayStudentTuitionFee from "../../ModalContent/TuitionFee/PayTuitionFee";
import TuitionFeeDetails from "../../ModalContent/TuitionFee/TuitionFeeDetails";
import UpdateTuitionFee from "../../ModalContent/TuitionFee/UpdateTuitionFee";
import DeleteTuitionFee from "../../ModalContent/TuitionFee/DeleteTuitionFee";
function TuitionFees() {
  const { data: data, isLoading, error } = useFetchTuitionFeeQuery();
  const filter_array_keys = [
    "id",
    "student.name",
    "amount_paid",
    "amount_left",
    "tution_fee_total",
    "status",
    "specialty.specialty_name",
    "level.level",
    "level.name",
  ];
  const renameMapping = {
    "student.name": "student_name",
    amount_paid: "amount_paid",
    amount_left: "amount_left",
    tution_fee_total: "tuition_fee",
    status: "status",
    "specialty.specialty_name": "specialty_name",
    "level.name": "level_name",
    "level.level": "level_number",
  };
  if (isLoading) {
    return <Pageloaderspinner />;
  }
  return (
    <>
      <Navbar options={TuitionFeeNavbarOptions} />
      <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Resits</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
        </div>
        <div>
          <Table
            colDefs={tuitionFeeTableConfig({ DropdownComponent })}
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
export default TuitionFees;

export function DropdownComponent(props) {
  const { id } = props.data;
  const actions = [
    {
      actionTitle:"Make Payment",
      modalContent:PayStudentTuitionFee
    },
    {
      actionTitle: "Update",
      modalContent: UpdateTuitionFee,
    },
    {
      actionTitle: "Detail",
      modalContent: TuitionFeeDetails,
    },
    {
      actionTitle: "Delete",
      modalContent: DeleteTuitionFee,
    },
  ];
  return (
    <>
      <ActionButtonDropdown actions={actions} row_id={id} 
       style={'tableActionButton primary-background text-white font-size-sm px-2'}
      >
        <span>Edit Fee</span>
         </ActionButtonDropdown>
    </>
  );
}
