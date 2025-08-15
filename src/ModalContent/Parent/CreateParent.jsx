import { Icon } from "@iconify/react";
import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateParent } from "../../hooks/parent/useCreateParent";
import  { TextInput, PhoneNumberInput } from "../../components/FormComponents/InputComponents";
import { addressValidationSchema, emailValidationSchema, fullNameSchema, occupationValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { guardianTypes, languages } from "../../data/data";
function CreateParent({ handleClose }) {
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
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldError = (field, value) => {
    setError((prev) => ({ ...prev, [field]: value }));
  };
    const handleValidation = (field, value) => {
    setIsInvalid((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateGuardian = async () => {
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
             onChange={(value) => handleInputChange('name', value)}
             onValidationChange={(value) => handleValidation('name', value)}
             validationSchema={fullNameSchema}
             placeholder={"Enter Guardian Full Names"}
           />
        </div>
        <div>
          <label htmlFor="email" className="font-size-sm">E-mail</label>
          <TextInput 
            onChange={(value) => handleInputChange('email', value)}
            onValidationChange={(value) => handleValidation('email', value)}
            validationSchema={emailValidationSchema}
            placeholder={"example@gmail.com"}
            type="email"
          />
        </div>
        <div>
             <label htmlFor="phone" className="font-size-sm">Phone Number</label>
          <PhoneNumberInput 
            onChange={(value) => handleInputChange('phone_one', value)}
            value={formData.phone_one}
            onValidationChange={(value) => handleValidation('phone_one', value)}
          />
        </div>
        <div>
          <label htmlFor="address" className="font-size-sm">Address</label>
          <TextInput 
            type="address"
            onChange={(value) => handleInputChange('address', value)}
            onValidationChange={(value) => handleValidation('address', value)}
            validationSchema={addressValidationSchema}
            placeholder={"Enter Guardian Address"}
          />
        </div>
        <div>
          <label htmlFor="occupation" className="font-size-sm">Occupation</label>
          <TextInput 
            type="address"
            onChange={(value) => handleInputChange('occupation', value)}
            onValidationChange={(value) => handleValidation('occupation', value)}
            validationSchema={occupationValidationSchema}
            placeholder={"Enter Guardian Occupation"}
          />
        </div>
        <div>
          <label htmlFor="relationshipToStudent" className="font-size-sm">RelationShip To Student</label>
           <CustomDropdown 
             data={guardianTypes}
             displayKey={["name"]}
             valueKey={['name']}
             direction="up"
             onSelect={(value) => handleInputChange('relationship_to_student', value.name)}
             error={errors.relationship_to_student}
             onError={(msg) => handleFieldError('relationship_to_student', msg)}
             errorMessage="Relationship To Student Required"
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
            onSelect={(value) => handleInputChange('preferred_language', value.name)}
            error={errors.preferred_language}
            onError={(msg) => handleFieldError('preferred_language', msg)}
            errorMessage="Preferred Language Of Communication Required"
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
