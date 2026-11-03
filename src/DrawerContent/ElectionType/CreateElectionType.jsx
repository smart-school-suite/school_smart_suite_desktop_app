import { useRef, useState } from "react";
import {
    nameSchema,
    textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import {
    TextAreaInput,
    TextInput,
} from "../../components/FormComponents/InputComponents";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useCreateElectionType } from "../../hooks/electionType/useCreateElectionType";
import { allFieldsValid } from "../../utils/functions";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function CreateElectionType({ handleClose }) {
  const { mutate: createElectionType, isPending } =
    useCreateElectionType(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Create Election Type");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    title: null,
    description: null,
  });
  const titleRef = useRef();
  const descriptionRef = useRef();
  const handlePrevalidation = async () => {
    const title = await titleRef.current.triggerValidation();
    const description = await descriptionRef.current.triggerValidation();
    return {
      title,
      description,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleCreateElectionType = async () => {
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
    createElectionType({
      election_title: formData.title,
      description: formData.description,
    }, { onError: handleServerError });
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
            <label htmlFor="electiontypetitle" className="font-size-sm">
              Title
            </label>
            <TextInput
              placeholder={"Student Union Government Elections"}
              onChange={(value) =>
                handleStateChange("title", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("title", value, setIsValid)
              }
              validationSchema={nameSchema({
                min: 5,
                max: 200,
                required: true,
                messages: {
                  min: "Election Type Title Must Be Aleast 5 Characters Long",
                  max: "Election Type Title Must Not Exceed 200 Characters",
                  required: "Election Type Title Required",
                },
              })}
              value={formData.title}
              ref={titleRef}
            />
          </div>
          <div>
            <label htmlFor="description" className="font-size-sm">
              Description
            </label>
            <TextAreaInput
              placeholder={"Write A Short Description of election type"}
              onChange={(value) =>
                handleStateChange("description", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("description", value, setIsValid)
              }
              validationSchema={textareaSchema({
                required: true,
                min: 10,
                max: 500,
                messages: {
                  min: "Election Type Description Must Be Atleast 10 Characters Long",
                  max: "Election Type Description Should Not Exceed 500 Characters Long",
                  required: "Election Type Description Required",
                },
              })}
              ref={descriptionRef}
              value={formData.description}
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
                handleCreateElectionType();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Election Type"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateElectionType;
