import Navbar from "../../components/Navbar";
import { AdditionalFeesNavBarConfig } from "../../ComponentConfig/navBarConfig";
import { useFetchAdditionalFeesQuery } from "../../Slices/Asynslices/fetchSlice";
import Table from "../../components/Tables";
import CleanArrayData, { renameKeys } from "../../utils/functions";
import Pageloaderspinner from "../../components/Spinners";
import { additionalFeesTableConfig } from "../../ComponentConfig/AgGridTableConfig";
import ActionButtonDropdown from "../../components/DataTableComponents/ActionComponent";
import DeleteAdditionalFees from "../../ModalContent/AdditionalFees/DeleteAdditionalFees";
import PayAdditionalFees from "../../ModalContent/AdditionalFees/PayAdditionalFees";
import UpdateAdditionalFees from "../../ModalContent/AdditionalFees/UpdateAdditionalFees";
import AdditionalFeeDetail from "../../ModalContent/AdditionalFees/AdditionalFeesDetails";
function AdditionalFees(){
    const { data:data, isLoading, error } = useFetchAdditionalFeesQuery();
    const filter_array_keys = [
        "id",
        "student.name",
        "amount",
        "status",
        "reason",
        "specialty.specialty_name",
        "fee_category.title",
        "level.level",
        "level.name",
      ];
      const renameMapping = {
        "student.name": "student_name",
        "amount": "amount",
        "status": "status",
        "reason":"reason",
        "fee_category.title":"category",
        "specialty.specialty_name": "specialty_name",
        "level.name": "level_name",
        "level.level": "level_number",
      };
    if(isLoading){
        return <Pageloaderspinner />
    }
    return(
        <>
         <Navbar 
          options={AdditionalFeesNavBarConfig}
         />
            <div>
        <div className="d-flex flex-row align-items-center mt-4 w-100">
          <div className="d-block">
            <p className="font-size-xs my-0">Total Number of Resits</p>
            <h1 className="fw-bold my-0">{data.data.length}</h1>
          </div>
        </div>
        <div>
          <Table
            colDefs={additionalFeesTableConfig({ DropdownComponent })}
            rowData={renameKeys(
              CleanArrayData(data.data, filter_array_keys),
              renameMapping
            )}
          />
        </div>
      </div>
        </>
    )
}
export default AdditionalFees;

export function DropdownComponent(props) {
    const { id } = props.data;
    const actions = [
      {
        actionTitle: "Make Payment",
        modalContent: PayAdditionalFees,
      },
      {
        actionTitle: "Details",
        modalContent: AdditionalFeeDetail,
      },
      {
        actionTitle:"Update Fee",
        modalContent:UpdateAdditionalFees
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


