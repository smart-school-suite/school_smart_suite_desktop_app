import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import { useUpdateTeacher } from "../../hooks/teacher/useUpdateTeacher";
import { PhoneNumberInput, TextInput } from "../../components/FormComponents/InputComponents";
import { emailValidationSchema, nameSchema, phoneValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
function UpdateTeacher({ handleClose, rowData }) {
  const {id:teacherId, first_name, last_name, name, email, gender } = rowData;
  const { mutate:updateTeacher, isPending } = useUpdateTeacher(handleClose);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender: "",
    phone_one: "",
  });
  const [isValid, setIsValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    phone_one: "",
  })
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
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
        <div className="d-flex flex-row align-items-center gap-2 w-100">
          <div className="w-50">
          <label htmlFor="firstName" className="font-size-sm">First Name</label>
           <TextInput 
             placeholder={first_name}
             onChange={(value) => handleStateChange('first_name', value, stateFn)}
             onValidationChange={(value) => handleStateChange('first_name', value, stateFn)}
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
        <div className="w-50">
          <label htmlFor="lastName" className="font-size-sm">Last Name</label>
          <TextInput 
            placeholder={last_name}
            onChange={(value) => handleStateChange('last_name', value, setFormData)}
            onValidationChange={(value) => handleStateChange('last_name', value, setIsValid)}
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
        </div>
        <div>
          <label htmlFor="fullname" className="font-size-sm">Full Names</label>
           <TextInput 
             placeholder={name}
             onChange={(value) => handleStateChange('name', value, setFormData)}
             onValidationChange={(value) => handleInputValid('name', value, setIsValid)}
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
            onChange={(value) => handleStateChange('email', value, setFormData)}
            validationSchema={emailValidationSchema({
               required:false
            })}
            value={formData.email}
            onValidationChange={(value) => handleStateChange('email', value, setIsValid)}
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-size-sm">Contact One</label>
          <PhoneNumberInput 
             onChange={(value) => handleStateChange("phone_one", value, setFormData)}
            onValidationChange={(value) => handleStateChange('phone_one', value, setIsValid)}
            value={formData.phone_one}
            validationSchema={phoneValidationSchema({
               optional:true,
               prefixes:['6', '2'],
            })}
          />
        </div>
        <div>
          <label htmlFor="gender" className="font-size-sm">Gender</label>
          <CustomDropdown 
           data={gender}
           displayKey={["name"]}
           valueKey={["name"]}
           direction="up"
           onSelect={(value) => handleStateChange("gender", value.name, setFormData)}
           placeholder="Select Gender"
           optional={true}
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
