import { useState } from "react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { Icon } from "@iconify/react";
import {
  InputGroup,
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useSelector } from "react-redux";
import { useUpdateSpecialty } from "../../hooks/specialty/useUpdateSpecialty";
import { useGetDepartments } from "../../hooks/department/useGetDepartments";
import { useGetLevels } from "../../hooks/level/useGetLevels";
import {
  nameSchema,
  numberSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { formatNumber } from "../../utils/functions";
function UpdateSpecialty({ handleClose, rowData }) {
  const currencyState = useSelector((state) => state.auth.user);
  const currency =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const {
    id: specialtyId,
    specialty_name,
    registration_fee,
    tuition_fee,
    description,
  } = rowData;
  const { mutate: updateSpecialty, isPending } =
    useUpdateSpecialty(handleClose);
  const [formData, setFormData] = useState({
    specialty_name: "",
    registration_fee: "",
    school_fee: "",
    department_id: "",
    level_id: "",
    description: "",
  });
  const [isFieldValid, setIsFieldValid] = useState({
    specialty_name: "",
    registration_fee: "",
    school_fee: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    department_id: "",
    level_id: "",
  });
  const { data: educationLevels, isFetching: educationIsLoading } =
    useGetLevels();

  const { data: departments, isFetching: departmentIsLoading } =
    useGetDepartments();
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldValid = (field, value) => {
    setIsFieldValid((prev) => ({ ...prev, [field]: value }));
  };
  const handleFieldError = (field, value) => {
    setErrors((prev) => ({ ...prev, [field]: value }));
  };
  const handleSpecialtyUpdate = async () => {
    updateSpecialty({ specialtyId, updateData: formData });
  };
  return (
    <>
      <div className="card w-100 border-none">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <span className="m-0">Update Specialty</span>
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
          <label htmlFor="specialtyName" className="font-size-sm">
            Specialty Name
          </label>
          <TextInput
            placeholder={specialty_name}
            onChange={(value) => handleInputChange("specialty_name", value)}
            onValidationChange={(value) =>
              handleFieldValid("specialty_name", value)
            }
            validationSchema={nameSchema({
            min:3,
            max:150,
            required:false,
            messages:{
               min:`Specialty Name Must Be Atleast 3 Characters`,
               max:`Specialty Name Must Not Exceed 150 Characters`
            }
        })}
          />
        </div>
        <div>
          <label htmlFor="registrationFees" className="font-size-sm">
            Registration Fees
          </label>
          <InputGroup
            placeholder={formatNumber(registration_fee)}
            onChange={(value) => handleInputChange("registration_fee", value)}
            onValidationChange={(value) =>
              handleFieldValid("registration_fee", value)
            }
            step="0.01"
            validationSchema={numberSchema({
              min: 1, 
              max: 500000,
              required:false,
              integerOnly:false,
              messages:{
                 min:`Registration Fee Must Be Atleast 1 ${currency}`,
                 max:`Registration Fee Must Not Exceed 500000 ${currency}` 
              } 
            })}
            type="number"
            InputGroupText={currency}
            value={formData.registration_fee}
          />
        </div>
        <div>
          <label htmlFor="schoolFees" className="font-size-sm">
            School Fees
          </label>
          <InputGroup
            placeholder={formatNumber(tuition_fee)}
            onChange={(value) => handleInputChange("school_fee", value)}
            onValidationChange={(value) =>
              handleFieldValid("school_fee", value)
            }
            step="0.01"
            validationSchema={numberSchema({ 
               min: 1,
               max: 10000000,
              required:false,
              integerOnly:false,
              messages:{
                 min:`Registration Fee Must Be Atleast 1 ${currency}`,
                 max:`Registration Fee Must Not Exceed  10000000 ${currency}` 
              } 
              })}
            type="number"
            InputGroupText={currency}
            value={formData.school_fee}
          />
        </div>
        <div>
          <label htmlFor="departmentName" className="font-size-sm">
            Department Name
          </label>
          <CustomDropdown
            data={departments?.data || []}
            displayKey={["department_name"]}
            valueKey={["id"]}
            isLoading={departmentIsLoading}
            direction="up"
            onSelect={(value) => handleInputChange("department_id", value.id)}
            error={errors.department_id}
            onError={(value) => handleFieldError("department_id", value)}
            placeholder={"Select Department"}
          />
        </div>
        <div>
          <label htmlFor="level" className="font-size-sm">
            Level
          </label>
          <CustomDropdown
            data={educationLevels?.data || []}
            displayKey={["name", "level"]}
            valueKey={["id"]}
            isLoading={educationIsLoading}
            direction="up"
            onSelect={(value) => handleInputChange("level_id", value.id)}
            error={errors.level_id}
            onError={(value) => handleFieldError("level_id", value)}
            placeholder={"Select Level"}
            errorMessage="Level Required"
          />
        </div>
        <div>
          <label htmlFor="specialtyDescription" className="font-size-sm">
            Specialty Description
          </label>
          <TextAreaInput
            onValidationChange={(value) =>
              handleFieldValid("description", value)
            }
            onChange={(value) => handleInputChange("description", value)}
            placeholder={description}
            validationSchema={textareaSchema({
              min:10,
              max:1000,
              required:false,
              messages:{
                 min:"Description Must Be Atleast 10 Characters",
                 max:"Description Must Not Exceed 1000 Characters",
                 required:"Description Is Required"
              }
          })}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={handleSpecialtyUpdate}
          >
            {isPending ? <SingleSpinner /> : <>Update Specialty</>}
          </button>
        </div>
      </div>
    </>
  );
}
export default UpdateSpecialty;
