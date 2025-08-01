import { useUpdateAdditionalFee } from "../../hooks/additionalFee/useUpdateAdditionalFee";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetAdditionalFeeCategory } from "../../hooks/additionalFee/useGetAdditionalFeeCategories";
function UpdateAdditionalFees({ rowData, handleClose }) {
  const [formData, setFormData] = useState({
    title: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleCategorySelect = (selectedValues) => {
    setFormData((prevalue) => ({
      ...prevalue,
      additionalfee_category_id: selectedValues.id,
    }));
  };
  const { data: category, isFetching } = useGetAdditionalFeeCategory();
  const { id: additionalFeeId } = rowData;
  const { mutate: updateAdditionalFee, isPending } = useUpdateAdditionalFee(
    handleClose,
    additionalFeeId
  );
  const handleUpdate = () => {
    updateAdditionalFee({ additionalFeeId, updateData: formData });
  };
  return (
    <>
      <div className="card w-100 border-none">
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Update Additional Fee</span>
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
            <span>Additional Fee Category</span>
            {isFetching ? (
              <select name="" className="form-select">
                <option value="">loading</option>
              </select>
            ) : (
              <CustomDropdown
                data={category.data}
                displayKey={["title"]}
                valueKey={["id"]}
                filter_array_keys={["id", "title"]}
                renameMapping={{ id: "id", title: "title" }}
                isLoading={isFetching}
                direction="up"
                onSelect={handleCategorySelect}
              />
            )}
          </div>
          <div className="my-1">
            <span>Reason</span>
            <textarea
              name="reason"
              className="form-control"
              onChange={(e) => handleInputChange("reason", e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="w-100 mt-2">
          <button
            className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleUpdate();
            }}
            disabled={isPending}
          >
            {isPending ? <SingleSpinner /> : "Update Additional Fee"}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateAdditionalFees;
