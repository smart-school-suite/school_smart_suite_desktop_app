import { Icon } from "@iconify/react";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateAnnouncementCategory } from "../../hooks/announcement/useCreateAnnouncementCategory";
function CreateAnnouncementCategory({ handleClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const {mutate:createCategory, isPending }= useCreateAnnouncementCategory(handleClose);
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    createCategory(formData);
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
              disabled={isPending}
             onClick={() => {
              handleSubmit();
            }}
            >
            {
              isPending ? <SingleSpinner />: "Create Category"
            }
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateAnnouncementCategory;
