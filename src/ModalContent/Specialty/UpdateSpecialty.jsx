import { useEffect, useState } from "react";
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
import {
  formatNumber,
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetSpecialtyDetails } from "../../hooks/specialty/useGetSpecialtyDetail";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
function UpdateSpecialty({ handleClose, rowData }) {
  const { id: specialtyId } = rowData;
  const {
    data: specialtyDetails,
    isLoading: isSpecialtyDetailsLoading,
    error: specialtyError,
  } = useGetSpecialtyDetails(specialtyId);
  const {
    data: educationLevels,
    isFetching: educationIsLoading,
    error: levelError,
  } = useGetLevels();
  const {
    data: departments,
    isFetching: departmentIsLoading,
    error: departmentError,
  } = useGetDepartments();
  const currencyState = useSelector((state) => state.auth.user);
  const currency =
    currencyState?.schoolDetails?.school?.country?.currency || "";
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
    specialty_name: null,
    registration_fee: null,
    school_fee: null,
    description: null,
  });

  useEffect(() => {
    if (specialtyDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        specialty_name: specialtyDetails.data.specialty_name,
        registration_fee: specialtyDetails.data.registration_fee,
        school_fee: specialtyDetails.data.school_fee,
        department_id: { id: specialtyDetails.data.department_id },
        level_id: { id: specialtyDetails.data.level_id },
        description: specialtyDetails.data.description,
      }));
    }
  }, [isSpecialtyDetailsLoading, setFormData]);

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSpecialtyUpdate = async () => {
    if (optionalValidateObject(isFieldValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />
      );
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing To Update"}
          description={
            "Please Ensure Atleast One Field Is Updated Before Submitting"
          }
        />
      );
      return;
    }
    const payload = {
      specialty_name: formData.specialty_name,
      registration_fee: formData.registration_fee,
      school_fee: formData.school_fee,
      department_id: formData.department_id.id,
      level_id: formData.level_id.id,
      description: formData.description,
    };
    updateSpecialty({ specialtyId, updateData: payload });
  };
  return (
    <>
      <div>
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
      </div>
      {isSpecialtyDetailsLoading ? (
        <div className="d-flex flex-column w-100 gap-3">
          {[...Array(6)].map((items, index) => (
            <div className="d-flex flex-column gap-2 w-100" key={index}>
              <RectangleSkeleton width="25%" height="1dvh" />
              <RectangleSkeleton width="100%" height="5dvh" />
            </div>
          ))}
        </div>
      ) : specialtyError || levelError || departmentError ? (
        <NotFoundError
          title={
            specialtyError?.response?.data?.errors?.title ||
            levelError?.response?.data?.errors?.title ||
            departmentError?.response?.data?.errors?.title
          }
          description={
            specialtyError?.response?.data?.errors?.description ||
            levelError?.response?.data?.errors?.description ||
            departmentError?.response?.data?.errors?.description
          }
        ></NotFoundError>
      ) : (
        <>
          <div>
            <label htmlFor="specialtyName" className="font-size-sm">
              Specialty Name
            </label>
            <TextInput
              value={formData.specialty_name}
              onChange={(value) =>
                handleStateChange("specialty_name", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("specialty_name", value, setIsFieldValid)
              }
              validationSchema={nameSchema({
                min: 3,
                max: 150,
                required: false,
                messages: {
                  min: `Specialty Name Must Be Atleast 3 Characters`,
                  max: `Specialty Name Must Not Exceed 150 Characters`,
                },
              })}
            />
          </div>
          <div className="d-flex flex-row align-items-center gap-2 w-100">
            <div className="w-50">
              <label htmlFor="registrationFees" className="font-size-sm">
                Registration Fees
              </label>
              <InputGroup
                onChange={(value) =>
                  handleStateChange("registration_fee", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("registration_fee", value, setIsFieldValid)
                }
                step="0.01"
                validationSchema={numberSchema({
                  min: 1,
                  max: 500000,
                  required: false,
                  integerOnly: false,
                  messages: {
                    min: `Registration Fee Must Be Atleast 1 ${currency}`,
                    max: `Registration Fee Must Not Exceed 500000 ${currency}`,
                  },
                })}
                type="number"
                InputGroupText={currency}
                value={formData.registration_fee}
              />
            </div>
            <div className="w-50">
              <label htmlFor="schoolFees" className="font-size-sm">
                School Fees
              </label>
              <InputGroup
                onChange={(value) =>
                  handleStateChange("school_fee", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("school_fee", value, setIsFieldValid)
                }
                step="0.01"
                validationSchema={numberSchema({
                  min: 1,
                  max: 10000000,
                  required: false,
                  integerOnly: false,
                  messages: {
                    min: `Registration Fee Must Be Atleast 1 ${currency}`,
                    max: `Registration Fee Must Not Exceed  10000000 ${currency}`,
                  },
                })}
                type="number"
                InputGroupText={currency}
                value={formData.school_fee}
              />
            </div>
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
              onSelect={(value) =>
                handleStateChange("department_id", value.id, setFormData)
              }
              placeholder={"Select Department"}
              optional={true}
              value={formData.department_id}
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
              onSelect={(value) =>
                handleStateChange("level_id", value.id, setFormData)
              }
              placeholder={"Select Level"}
              optional={true}
              value={formData.level_id}
            />
          </div>
          <div>
            <label htmlFor="specialtyDescription" className="font-size-sm">
              Specialty Description
            </label>
            <TextAreaInput
              onValidationChange={(value) =>
                handleStateChange("description", value, setIsFieldValid)
              }
              onChange={(value) =>
                handleStateChange("description", value, setFormData)
              }
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: false,
                messages: {
                  min: "Description Must Be Atleast 10 Characters",
                  max: "Description Must Not Exceed 1000 Characters",
                  required: "Description Is Required",
                },
              })}
              value={formData.description}
            />
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
      )}
    </>
  );
}
export default UpdateSpecialty;
