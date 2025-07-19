import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import { useUpdateExpense } from "../../hooks/schoolExpenses/useUpdateSchoolExpense";
function UpdateExpense({ handleClose, rowData }) {
    const [formData, setFormData] = useState({
    date: "",
    amount: "",
    expenses_category_id: "",
    description: "",
  });
  const expenseId = rowData.id;
  const { mutate:updateExpense, isPending } = useUpdateExpense(handleClose);
    const handleExpensesCategorySelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      expenses_category_id: selectedValues.id,
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    updateExpense({ expenseId:expenseId, updateData:formData });
  };
  return (
    <>
          <div className="card w-100 border-none">
            <div className="block">
              <div className="d-flex flex-row align-items-center justify-content-between mb-3">
                <h5 className="m-0">Update Expenses</h5>
                <span
                  className="m-0"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <Icon icon="charm:cross" width="22" height="22" />
                </span>
              </div>
            </div>
            <div className="my-1">
              <span>Date</span>
              <input
                type="date"
                className="form-control"
                value={formData.date}
                name="date"
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
            <div className="my-1">
              <span>Amount</span>
              <input
                type="number"
                className="form-control"
                placeholder="enter the cost"
                name="amount"
                onChange={(e) => handleInputChange("amount", e.target.value)}
                step="0.01"
              />
            </div>
            <div className="my-1">
              <span>Expenses Category</span>
              {isFetching ? (
                <select name="" className="form-select">
                  <option value="">loading</option>
                </select>
              ) : (
                <CustomDropdown
                  data={expenseCategory.data}
                  displayKey={["name"]}
                  valueKey={["id"]}
                  filter_array_keys={["id", "name"]}
                  renameMapping={{ id: "id", name: "name" }}
                  isLoading={isFetching}
                  direction="up"
                  onSelect={handleExpensesCategorySelect}
                />
              )}
            </div>
            <div className="my-1">
              <span>Description</span>
              <textarea
                name="description"
                className="form-control"
                onChange={(e) => handleInputChange("description", e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="w-100 mt-2">
            <button
              className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
              onClick={() => {
                handleSubmit();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Expense"}
            </button>
          </div>
    </>
  );
}
export default UpdateExpense;
