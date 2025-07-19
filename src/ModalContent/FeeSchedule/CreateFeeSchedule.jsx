import { Icon } from "@iconify/react";
import { useCreateFeeScheduleSlots } from "../../hooks/feeSchedule/useCreateFeeScheduleSlot";
function CreateFeeScheduleSlots({ handleClose, rowData }) {
  const feeScheduleId = rowData.id;
  return (
    <>
     <div>
       <div className="block">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="m-0">Create Fee Schedule</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <span className="gainsboro-color font-size-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem harum
          nesciunt sunt
        </span>
      </div>
      <div>
         <table>
            <thead>
               <tr>
                  <th>Percentage</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Installment</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>
                     <input type="number" className="form-control-sm" />
                  </td>
                  <td>
                     <input type="date" className="form-control form-control-sm" />
                  </td>
                  <td>
                     0 XAF
                  </td>
                  <td>
                     0 XAF
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
     </div>
    </>
  );
}
export default CreateFeeScheduleSlots;
