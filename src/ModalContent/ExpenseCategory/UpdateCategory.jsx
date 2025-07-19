import { useUpdateExpenseCategory } from "../../hooks/expenseCategory/useUpdateExpenseCategory";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
import { Icon } from "@iconify/react";
function UpdateCategory({ handleClose, rowData }) {
    const categoryId = rowData.id;
     const [formData, setFormData] = useState({
        name: "",
      });
      const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      };
    const { mutate:updateCategory, isPending } = useUpdateExpenseCategory();
    const handleUpdate = () => {
         updateCategory({ categoryId:categoryId, updateData:formData })
    }
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Update Expenses Category</h5>
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
            handleUpdate();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update Category"}
        </button>
      </div>
    </>
  );
}
export default UpdateCategory;
