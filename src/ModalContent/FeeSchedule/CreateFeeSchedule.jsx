import { Icon } from "@iconify/react";
import { useCreateFeeScheduleSlots } from "../../hooks/feeSchedule/useCreateFeeScheduleSlot";
import { useGetFeeInstallment } from "../../hooks/feeInstallment/useGetFeeInstallment";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateFeeScheduleSlots({ handleClose, rowData }) {
  const { id: feeScheduleId, tuition_fee } = rowData;
  const [formData, setFormData] = useState([]);
  const { mutate: createFeeSchedule, isPending } = useCreateFeeScheduleSlots(handleClose);
  const { data: installments, isLoading, error } = useGetFeeInstallment();
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol = currencyState?.schoolDetails?.school?.country?.currency || "";

  useEffect(() => {
    if (installments?.data) {
      setFormData(
        installments.data.map((items) => ({
          due_date: "",
          amount: 0,
          installment_id: items.id,
          fee_percentage: 0,
          fee_schedule_id:feeScheduleId
        }))
      );
    }
  }, [installments]);

  const handleInputChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedFormData = [...prev];
      updatedFormData[index] = { ...updatedFormData[index], [field]: value };
      if (field === "fee_percentage") {
        const percentage = parseFloat(value) || 0;
        updatedFormData[index].amount = (percentage / 100) * tuition_fee;
      }

      return updatedFormData;
    });
  };

  const handleSubmit = () => {
     const formatData = formData.filter((items) => items.due_date != "" || items.fee_percentage != "");
     createFeeSchedule({scheduleData:{ slots:formatData }, feeScheduleId});
  };

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <span className="m-0">Create Fee Schedule</span>
          <span
            className="m-0"
            onClick={handleClose}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        <div className="d-flex flex-row align-items-center w-100 justify-content-end">
          <button
            className="border-none p-2 rounded-2 primary-background text-white font-size-sm"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {
               isPending ? <SingleSpinner /> : "Create Schedule"
            }
          </button>
        </div>
        <div>
          {isLoading ? (
            <RectangleSkeleton width="100%" height="70dvh" speed={1} />
          ) : error ? (
            <NotFoundError
              title={error.response.data.errors.title}
              description={error.response.data.errors.description}
            />
          ) : (
            <div className="card grades-box rounded-3">
              <table className="table">
                <thead className="grades-thead">
                  <tr>
                    <th>Installment</th>
                    <th className="text-center">Due Date</th>
                    <th className="text-center">Percentage</th>
                    <th className="text-center">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {installments?.data?.map((items, index) => (
                    <tr key={items.id}>
                      <td className="font-size-sm" style={{ width:"20%" }}>{items.name}</td>
                      <td style={{ width:"25%" }}>
                        <input
                          type="date"
                          className="form-control p-2 font-size-sm"
                          value={formData[index]?.due_date || ""}
                          onChange={(e) =>
                            handleInputChange(index, "due_date", e.target.value)
                          }
                        />
                      </td>
                      <td style={{ width:"25%" }}>
                        <input
                          type="number"
                          className="form-control p-2 font-size-sm"
                          step="0.01"
                          min="0"
                          max="100"
                          value={formData[index]?.fee_percentage || ""}
                          onChange={(e) =>
                            handleInputChange(index, "fee_percentage", e.target.value)
                          }
                        />
                      </td>
                      <td className="font-size-sm text-center" style={{ width:"30%" }}>
                        {formData[index]?.amount.toFixed(2) || "0.00"} {userCurrencySymbol}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateFeeScheduleSlots;