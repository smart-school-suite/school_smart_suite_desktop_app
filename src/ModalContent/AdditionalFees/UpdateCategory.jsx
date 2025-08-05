import { useUpdateAdditionalFeeCategory } from "../../hooks/additionalFee/useUpdateAdditionalFeeCategory";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useState } from "react";
function UpdateCategory({ handleClose, rowData }) {
  const categoryId = rowData.id;
  const [formData, setFormData] = useState({
    title: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const { mutate: updateCategory, isPending } =
    useUpdateAdditionalFeeCategory(handleClose);
  const handleUpdateCategory = () => {
    updateCategory({categoryId:categoryId, updateData:formData});
  };
  return (
    <>
      <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update Additional Category</span>
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
        <div className="modal-content-container">
          <div className="my-1">
          <span>Category Name</span>
          <input
            type="text"
            className="form-control"
            placeholder="Utility Bills"
            name="title"
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div className="my-1">
          <span>Description</span>
          <textarea name="" id="" className="form-control"></textarea>
        </div>
        </div>
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleUpdateCategory();
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
