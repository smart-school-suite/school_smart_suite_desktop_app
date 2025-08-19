import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useUpdateTeacher } from "../../hooks/teacher/useUpdateTeacher";
import { PhoneNumberInput, TextInput } from "../../components/FormComponents/InputComponents";
import { emailValidationSchema, nameSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
function UpdateTeacher({ handleClose, rowData }) {
  const {id:teacherId, first_name, last_name, name, email, gender } = rowData;
  const { mutate:updateTeacher, isPending } = useUpdateTeacher(handleClose);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender: gender,
    phone_one: "",
  });
  const [isValid, setIsValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender: "",
    phone_one: "",
  })
   const [errors, setErrors] = useState({
    gender: "",
  });
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleInputValid = (field, value) => {
    setIsValid((prev) => ({...prev, [field]:value}));
  }
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({...prev, [field]:value}));
  }
  const handleTeacherUpdate = async () => {
    updateTeacher({ teacherId, updateData:formData })
  };
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Update Teacher</span>
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
          <label htmlFor="firstName" className="font-size-sm">First Name</label>
           <TextInput 
             placeholder={first_name}
             onChange={(value) => handleInputChange('first_name', value)}
             onValidationChange={(value) => handleInputValid('first_name', value)}
             value={formData.first_name}
             validationSchema={nameSchema({
                min:3,
                max:50,
                required:false,
                messages:{
                   min:"First Name Must Be Atleast 3 Characters Long",
                   max:"First Name Must Not Exceed 50 Characters"
                }
             })}
           />
        </div>
        <div>
          <label htmlFor="lastName" className="font-size-sm">Last Name</label>
          <TextInput 
            placeholder={last_name}
            onChange={(value) => handleInputChange('last_name', value)}
            onValidationChange={(value) => handleInputValid('last_name', value)}
            value={formData.last_name}
            validationSchema={nameSchema({
                min:3,
                max:50,
                required:false,
                messages:{
                   min:"Last Name Must Be Atleast 3 Characters Long",
                   max:"Last Name Must Not Exceed 50 Characters"
                }
            })}
          />
        </div>
        <div>
          <label htmlFor="fullname" className="font-size-sm">Full Names</label>
           <TextInput 
             placeholder={name}
             onChange={(value) => handleInputChange('name', value)}
             onValidationChange={(value) => handleInputValid('name', value)}
             validationSchema={nameSchema({
                min:3, 
                max:150,
                required:false,
                messages:{
                   min:"Full Names Must Be Atleast 3 Characters Long",
                   max:"Full Names Must Not Exceed 150 Characters"
                }
             })}
           />
        </div>
        <div>
          <label htmlFor="email" className="font-size-sm">E-mail</label>
          <TextInput 
            placeholder={email}
            onChange={(value) => handleInputChange('email', value)}
            validationSchema={emailValidationSchema({
               required:false
            })}
            value={formData.email}
            onValidationChange={(value) => handleInputValid('email', value)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-size-sm">Contact One</label>
          <PhoneNumberInput 
            onChange={(value) => handleInputChange('phone_one', value)}
            value={formData.phone_one}
            onValidationChange={(value) => handleInputValid('phone_one', value)}
          />
        </div>
        <div>
          <label htmlFor="gender" className="font-size-sm">Gender</label>
          <CustomDropdown 
           data={gender}
           displayKey={["name"]}
           valueKey={["name"]}
           direction="up"
           onSelect={(value) => handleInputChange("gender", value.name)}
           onError={(value) => handleFieldError("gender", value)}
           errorMessage="Gender Required"
           error={errors.gender}
           placeholder="Select Gender"
          />
        </div>
      </div>
      <div className="mt-2">
        <button 
          className="border-none p-2 font-size-sm primary-background rounded-3 w-100 text-white"
           onClick={() => {
             handleTeacherUpdate();
           }}
          >
          {isPending ? <SingleSpinner /> : <>Update Teacher</>}
        </button>
      </div>
    </>
  );
}
export default UpdateTeacher;
