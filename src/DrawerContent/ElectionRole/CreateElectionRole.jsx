import { useRef, useState } from "react";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateElectionRole } from "../../hooks/electionRole/useCreateElectionRole";
import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";
import { allFieldsValid } from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function CreateElectionRole({ handleClose }) {
  const { mutate: createElectionRole, isPending } =
    useCreateElectionRole(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Create Election Role");
  const { data: electionTypes, isLoading } = useGetElectionTypes();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    election_type_id: "",
  });
  const [isValid, setIsValid] = useState({
    name: null,
    description: null,
  });
  const [error, setErrors] = useState({
    election_type_id: "",
  });
  const nameRef = useRef();
  const descriptionRef = useRef();
  const electionTypeRef = useRef();
  const handlePrevalidation = async () => {
    const name = await nameRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    const electionType = await electionTypeRef.current.triggerValidation();
    return {
      name,
      description,
      electionType,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateElectionRole = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      setClientError("Invalid Fields", "Some Fields Seem To Be Invalid Please Go Through the form and try again");
      return;
    }
    if (!allFieldsValid(isValid)) {
      setClientError("Invalid Fields", "Some Fields Seem To Be Invalid Please Go Through the form and try again");
      return;
    }
    clearFormError();
    createElectionRole(formData, { onError: handleServerError });
  };
  return (
    <>
      <div className="drawer-content ps-2 pt-3">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        <div className="d-flex flex-column gap-3">
          <div>
            <label htmlFor="electionRoleTile" className="font-size-sm">
              Title
            </label>
            <TextInput
              placeholder={"e.g Student Union Goverment"}
              value={formData.name}
              validationSchema={nameSchema({
                min: 3,
                max: 150,
                required: true,
                messages: {
                  required: "Election Role Tilte Required",
                  min: "Election Role Title Must Be Atleast 3 Characters Long",
                  max: "Election Role Title Must Not Exceed 150 Characters",
                },
              })}
              onValidationChange={(value) =>
                handleStateChange("name", value, setIsValid)
              }
              onChange={(value) =>
                handleStateChange("name", value, setFormData)
              }
              ref={nameRef}
            />
          </div>
          <div>
            <label htmlFor="electionType" className="font-size-sm">
              Election Type
            </label>
            <CustomDropdown
              data={electionTypes?.data || []}
              displayKey={["election_title"]}
              valueKey={["id"]}
              direction="up"
              onSelect={(value) =>
                handleStateChange("election_type_id", value, setFormData)
              }
              placeholder="Select Election Type"
              error={error.election_type_id}
              isLoading={isLoading}
              errorMessage="Election Type Required"
              onError={(msg) =>
                handleStateChange("election_type_id", msg, setErrors)
              }
              ref={electionTypeRef}
              value={formData?.election_type_id?.id}
            />
          </div>
          <div>
            <label htmlFor="electionRoleDescription" className="font-size-sm">
              Description
            </label>
            <TextAreaInput
              placeholder={"Enter Election Role Description"}
              onChange={(value) =>
                handleStateChange("description", value, setFormData)
              }
              value={formData.description}
              onValidationChange={(value) =>
                handleStateChange("description", value, setIsValid)
              }
              validationSchema={textareaSchema({
                min: 10,
                max: 1000,
                required: true,
                messages: {
                  required: "Election Role Description Required",
                  min: "Election Role Description Must Be Atleast 10 Characters Long",
                  max: "Election Role Description Must Not Exceed 1000 Charactes",
                },
              })}
              ref={descriptionRef}
            />
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => {
                handleCreateElectionRole();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Election Role"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateElectionRole;
