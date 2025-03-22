import { useState } from "react";
import { useFetchSchoolExpensesCategoryQuery } from "../../Slices/Asynslices/fetchSlice";
import { useAddSchoolExpensesMutation } from "../../Slices/Asynslices/postSlice";
import toast from "react-hot-toast";
import CustomDropdown from "../../components/Dropdowns";
function CreateExpense({ handleClose }) {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    expenses_category_id: "",
    description: "",
  });
  const {
    data: expensesCategory,
    isLoading: isExpensesCategoryLoading,
    error: expensesCategoryError,
  } = useFetchSchoolExpensesCategoryQuery();
  const [addSchoolExpenses] = useAddSchoolExpensesMutation();
  const handleExpensesCategorySelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      expenses_category_id: selectedValues.id,
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addSchoolExpenses(formData).unwrap();
      toast.success("Expenses  created successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to create expenses. Try again.");
    }
  };
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row">
          <div>
            <h5>Create Expenses</h5>
            <p className="gainsboro-color font-size-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
            </p>
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
          {isExpensesCategoryLoading ? (
            <select name="" className="form-select">
              <option value="">loading</option>
            </select>
          ) : (
            <CustomDropdown
              data={expensesCategory.data}
              displayKey={["name"]}
              valueKey={["id"]}
              filter_array_keys={["id", "name"]}
              renameMapping={{ id: "id", name: "name" }}
              isLoading={isExpensesCategoryLoading}
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
          className="border-none px-3 py-2 text-primary w-50 rounded-3 font-size-sm"
          onClick={() => {
            handleClose();
          }}
        >
          Cancel
        </button>
        <button
          className="border-none px-3 py-2 rounded-3 font-size-sm w-50 primary-background text-white"
          onClick={() => {
            handleSubmit();
          }}
        >
          Create
        </button>
      </div>
    </>
  );
}
export default CreateExpense;
