import { useCreateEventCategory } from "../../hooks/eventCategory/useCreateEventCategory";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
function CreateCategory({ handleClose }){
  const { mutate:createCategory, isPending } = useCreateEventCategory();
  const [formData, setFormData] = useState({
     name:"",
     description:""
  })
  const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  const handleCreateCategory = () => {
      createCategory(formData);
  }
  return(
    <>
       <div>
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <h5 className="m-0">Create Event Category</h5>
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
        <div className="my-1">
            <textarea 
             className="form-control"
             placeholder="Enter Category Description"
             name="description"
             onChange={(e)  =>  handleInputChange("description", e.target.value)}
             ></textarea>
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
  )
}
export default CreateCategory;