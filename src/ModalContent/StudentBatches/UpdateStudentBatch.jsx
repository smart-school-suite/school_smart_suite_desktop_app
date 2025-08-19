import { Icon } from "@iconify/react";
import { useState } from "react";
import { useUpdateBatch } from "../../hooks/studentBatch/useUpdateBatch";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { TextAreaInput, TextInput } from "../../components/FormComponents/InputComponents";
import { nameSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
function UpdateStudentBatch({ handleClose, rowData }) {
  const {id:batchId, name, description} = rowData;
  const { mutate:updateBatch, isPending } = useUpdateBatch();
  const [formData, setFormData] = useState({
        name: "",
        description: "",
      });
  const [isValid, setIsValid] = useState({
        name: "",
        description: "", 
  })
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }; 
  const handleInputValid = (field, value) => {
     setIsValid((prev) => ({...prev, [field]:value}))
  }
  const handleUpdateStudentBatch = async () => {
     updateBatch({ batchId:batchId, updateData:formData })
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
        <span className="m-0">Update Student Batch</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div>
        <label htmlFor="batchTitle" className="font-size-sm">Batch Title</label>
         <TextInput 
           onChange={(value) => handleInputChange('name', value)}
           onValidationChange={(value) => handleInputValid('name', value)}
           placeholder={formData.name}
           validationSchema={nameSchema({
               min:3,
               max:150,
               required:false,
               messages:{
                 min:"Batch Title Must Be Atleast 3 Characters Long",
                 max:"Batch Title Must Not Exceed 150 Characters",
               }
           })}
           value={formData.name}
         />
      </div>
      <div>
        <label htmlFor="description" className="font-size-sm">Description</label>
        <TextAreaInput 
          onChange={(value) => handleInputChange('description', value)}
          onValidationChange={(value) => handleInputValid('description', value)}
          validationSchema={textareaSchema({
              min:10,
              max:1000,
              required:false,
              messages:{
                 min:"Batch Description Must Be Alteast 10 Characters Long",
                 max:"Batch Title Must Not Exceed 1000 Characters"
              }
          })}
          value={formData.description}
          placeholder={description || "Enter Description"}
        />
      </div>
      <div className="mt-2">
        <button
          className="border-none px-3 py-2 w-100 rounded-3 font-size-sm primary-background text-white w-50"
          onClick={() => {
            handleUpdateStudentBatch();
          }}
        >
          {isPending ? <SingleSpinner /> : "Update Batch"}
        </button>
      </div>
    </>
  );
}
export default UpdateStudentBatch;
