import { Icon } from "@iconify/react";
import { useState } from "react";
import toast from "react-hot-toast";
import ToastDanger from "../../components/Toast/ToastDanger";
import ToastSuccess from "../../components/Toast/ToastSuccess";
import { useCreateAnnouncementCategoryMutation } from "../../Slices/Asynslices/postSlice";
import { SingleSpinner } from "../../components/Spinners/Spinners";
function CreateAnnouncementCategory({ handleClose }) {
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [createAnnouncementCategory] = useCreateAnnouncementCategoryMutation();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsCreating(true);
    try {
      await createAnnouncementCategory(formData).unwrap();
      handleClose();
      toast.custom(
        <ToastSuccess
          title={"Creation Successfull ✅"}
          description={
            "The Anouncement Category has been created successfully "
          }
        />
      );
      setIsCreating(false);
    } catch (error) {
        toast.custom(<ToastDanger 
        title={"Something went wrong ❌"}
        description={"❌ Something went wrong! The Announcement Category creation failed due to an error. Please try again later."}
      />)
      setIsCreating(false);
    }
  };
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="block">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3">
              <h5 className="m-0">Create Category</h5>
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
        <div className="mt-2">
          <button 
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
              disabled={isCreating}
             onClick={() => {
              handleSubmit();
            }}
            >
            {
              isCreating ? <SingleSpinner />: "Create Category"
            }
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateAnnouncementCategory;
