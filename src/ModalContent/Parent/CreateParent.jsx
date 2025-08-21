import { Icon } from "@iconify/react";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateParent } from "../../hooks/parent/useCreateParent";
import  { TextInput, PhoneNumberInput } from "../../components/FormComponents/InputComponents";
import {  emailValidationSchema, addressSchema, nameSchema, phoneValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { guardianTypes, languages } from "../../data/data";
import { useRef } from "react";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateParent({ handleClose }) {
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const occupationRef = useRef();
  const relationshipToStudentRef = useRef();
  const preferredLanguageRef = useRef();
  const { mutate:createParent, isPending } = useCreateParent(handleClose);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_one: "",
    address: "",
    occupation: "",
    relationship_to_student: "",
    preferred_language: "",
  });
   const [isInvalid, setIsInvalid] = useState({
    name: "",
    email: "",
    phone_one: "",
    address: "",
    occupation: "",
    relationship_to_student: "",
    preferred_language: "",
  });
  const [errors, setError] = useState({
     relationship_to_student: "",
     preferred_language: "",
  })
  const handlePrevalidation = async () => {
       const name = await nameRef.current.triggerValidation();
       const email = await emailRef.current.triggerValidation();
       const phone = await phoneRef.current.triggerValidation();
       const address = await addressRef.current.triggerValidation();
       const occupation = await occupationRef.current.triggerValidation();
       const relationship = await relationshipToStudentRef.current.triggerValidation();
       const language = await preferredLanguageRef.current.triggerValidation();
        return {
          name,
          email,
          phone,
          address,
          occupation,
          relationship,
          language
        };
  }
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateGuardian = async () => {
    const prevalidation = await handlePrevalidation();
    if(!allFieldsValid(prevalidation)){
        toast.custom(
          <ToastWarning 
            title={"Invalid Fields"}
            description={"Please ensure all fields are valid before creating a teacher."}
          />
        )
        return;
    }
     if(!allFieldsValid(isInvalid)){
        toast.custom(
          <ToastWarning 
            title={"Invalid Fields"}
            description={"Please ensure all fields are valid before creating a teacher."}
          />
        )
        return;
    }
    createParent(formData)
  };
  return (
    <>
      <div>
        <div className="d-flex flex-row align-items-center justify-content-between w-100 mb-3">
          <span className="m-0">Create Guardian</span>
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
          <label htmlFor="guardianName" className="font-size-sm">Guardian Name</label>
           <TextInput 
             onChange={(value) => handleStateChange('name', value, setFormData)}
             onValidationChange={(value) => handleStateChange('name', value, setIsInvalid)}
             validationSchema={nameSchema({
                min:3,
                max:150,
                required:"Guardian Name Is Required",
                message:{
                  required:"Guardian Name Required",
                  min:"Guardian Name Should Be Atleast 3 Characters",
                  max:"Guardian Name Should Not Exceed 150 Characters"
                }
             })}
             placeholder={"Enter Guardian Full Names"}
             value={formData.name}
             ref={nameRef}
           />
        </div>
        <div>
          <label htmlFor="email" className="font-size-sm">E-mail</label>
          <TextInput 
            onChange={(value) => handleStateChange('email', value, setFormData)}
            onValidationChange={(value) => handleStateChange('email', value, setIsInvalid)}
            validationSchema={emailValidationSchema({
               required:true
            })}
            placeholder={"example@gmail.com"}
            type="email"
            value={formData.email}
            ref={emailRef}
          />
        </div>
        <div>
          <label htmlFor="phone" className="font-size-sm">Phone Number</label>
          <PhoneNumberInput 
            onChange={(value) => handleStateChange('phone_one', value, setFormData)}
            value={formData.phone_one}
            onValidationChange={(value) => handleStateChange('phone_one', value, setIsInvalid)}
            validationSchema={phoneValidationSchema({
                optional:false,
                prefixes:['6', '2'],
            })}
            ref={phoneRef}
          />
        </div>
         <div className="d-flex flex-row align-items-center gap-2">
          <div className="w-50">
          <label htmlFor="address" className="font-size-sm">Address</label>
          <TextInput 
            type="address"
            onChange={(value) => handleStateChange('address', value, setFormData)}
            onValidationChange={(value) => handleStateChange('address', value, setIsInvalid)}
            validationSchema={addressSchema({
               required:true,
            })}
            placeholder={"Enter Guardian Address"}
            value={formData.address}
            ref={addressRef}
          />
        </div>
        <div className="w-50">
          <label htmlFor="occupation" className="font-size-sm">Occupation</label>
          <TextInput 
            type="occupation"
            onChange={(value) => handleStateChange('occupation', value, setFormData)}
            onValidationChange={(value) => handleStateChange('occupation', value, setIsInvalid)}
            validationSchema={nameSchema({
                min:3,
                max:150,
                required:true,
                message:{
                   required:"Guardian Occupation Required",
                   min:"Guardian Occupation Should Be Atleast 3 Characters",
                   max:"Guardian Occupation Should Not Exceed 150 Characters"
                }
            })}
            placeholder={"Enter Guardian Occupation"}
            value={formData.occupation}
            ref={occupationRef}
          />
        </div>
         </div>
        <div>
          <label htmlFor="relationshipToStudent" className="font-size-sm">RelationShip To Student</label>
           <CustomDropdown 
             data={guardianTypes}
             displayKey={["name"]}
             valueKey={['name']}
             direction="up"
             onSelect={(value) => handleStateChange('relationship_to_student', value.name, setFormData)}
             error={errors.relationship_to_student}
             onError={(msg) => handleStateChange('relationship_to_student', msg, setError)}
             errorMessage="Relationship To Student Required"
             placeholder="Select Relationship To Student"
             ref={relationshipToStudentRef}
           />
        </div>
        <div>
          <label htmlFor="preferredLanguage" className="font-size-sm">
            Preferred Language of Communication
          </label>
          <CustomDropdown 
            data={languages}
            displayKey={['name']}
            valueKey={['name']}
            direction="up"
            onSelect={(value) => handleStateChange('preferred_language', value.name, setFormData)}
            error={errors.preferred_language}
            onError={(msg) => handleStateChange('preferred_language', msg, setError)}
            errorMessage="Preferred Language Of Communication Required"
            placeholder="Select Preferred Language"
            ref={preferredLanguageRef}
          />
        </div>
        <div className="mt-3">
          <button
            className="border-none rounded-3 primary-background w-100 text-white font-size-sm px-3 py-2"
            onClick={handleCreateGuardian}
          >
            {isPending ? <SingleSpinner /> : "Create Guardian"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateParent;
