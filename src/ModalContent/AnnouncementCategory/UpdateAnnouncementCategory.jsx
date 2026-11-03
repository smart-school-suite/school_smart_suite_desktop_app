import { useState } from "react";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useUpdateAnnouncementCategory } from "../../hooks/announcement/useUpdateAnnouncementCategory";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateAnnouncementCategory({ handleClose, rowData }) {
  const { id:categoryId } = rowData;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const {mutate:updateCategory, isPending} = useUpdateAnnouncementCategory();
  const { formError, errorBannerRef, handleServerError, clearFormError } =
    useFormError("Failed To Update Announcement Category");
  const handleUpdate = async () => {
     clearFormError();
     updateCategory({ categoryId, updateData:formData }, { onError: handleServerError })
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Update Category</h5>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              harum nesciunt sunt
            </span>
          </div>
        </div>
        <div className="my-1">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter Announcement Title"
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="my-1">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            className="form-control"
            placeholder="Enter Description"
            onChange={(e) => handleInputChange("description", e.target.value)}
          ></textarea>
        </div>
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="mt-2">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            disabled={isPending}
            onClick={() => {
              handleUpdate();
            }}
          >
            {isPending ? <SingleSpinner /> : "Update Category"}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateAnnouncementCategory;
