import { useState } from "react";
import { Icon } from "@iconify/react";
import { useCreateExpenseCategory } from "../../hooks/expenseCategory/useCreateExpenseCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateCategory({ handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: createCategory, isPending } = useCreateExpenseCategory();
  const handleCreateCategory = () => {
    createCategory(formData);
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Create Expenses Category</h5>
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
        <div className="my-1">
          <span>Category Name</span>
          <input
            type="text"
            className="form-control"
            placeholder="Utility Bills"
            name="name"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleCreateCategory();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Create Category"}
        </button>
      </div>
    </>
  );
}
export default CreateCategory;
