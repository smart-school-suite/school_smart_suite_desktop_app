import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import {
  nameSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { NotFoundError } from "../../components/errors/Error";
import {
  TextAreaInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetElectionRoleDetails } from "../../hooks/electionRole/useGetElectionRoleDetails";
import { useUpdateElectionRole } from "../../hooks/electionRole/useUpdateElectionRole";
import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
function UpdateElectionRole({ drawerData, handleClose }) {
  const { id: electionRoleId, role_title: title, description } = drawerData;
  const { mutate: updateElectionRole, isPending } =
    useUpdateElectionRole(handleClose);
  const {
    data: electionDetails,
    isLoading: isElectionDetailsLoading,
    error: electionDetailsError,
  } = useGetElectionRoleDetails(electionRoleId);
  const { data: electionTypes, isLoading } = useGetElectionTypes();
  const [formData, setFormData] = useState({
    name: isElectionDetailsLoading ? "" : electionDetails?.data?.name || "",
    description: isElectionDetailsLoading
      ? ""
      : electionDetails?.data?.description || "",
    election_type_id: isElectionDetailsLoading
      ? ""
      : { id: electionDetails?.data?.election_type_id } || {},
  });
  const [isValid, setIsValid] = useState({
    name: null,
    description: null,
  });
  const [errors, setErrors] = useState({
    election_type_id: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdate = () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please Ensure All Fields Are Valid Before Submitting"}
        />,
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
        />,
      );
      return;
    }
    updateElectionRole({ electionRoleId, updateData: formData });
  };
  return (
    <>
      <div className="drawer-content ps-2 pt-3">
        {isElectionDetailsLoading ? (
          <div className="d-flex flex-column gap-3">
            {[...Array(4)].map((index) => (
              <Fragment key={index}>
                <div className="d-flex flex-column gap-2">
                  <RectangleSkeleton width="25%" height="1dvh" speed={0.5} />
                  <RectangleSkeleton width="100%" height="3dvh" speed={0.5} />
                </div>
              </Fragment>
            ))}
          </div>
        ) : electionDetailsError ? (
          <NotFoundError
            title={electionDetailsError?.response?.data?.errors?.title}
            description={
              electionDetailsError?.response?.data?.errors?.description
            }
          ></NotFoundError>
        ) : (
          <div className="d-flex flex-column gap-3">
            <div>
              <label htmlFor="electionRoleTile" className="font-size-sm">
                Title
              </label>
              <TextInput
                placeholder={title}
                value={formData.name}
                validationSchema={nameSchema({
                  min: 3,
                  max: 150,
                  required: false,
                  messages: {
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
                error={errors.election_type_id}
                isLoading={isLoading}
                errorMessage="Election Type Required"
                onError={(msg) =>
                  handleStateChange("election_type_id", msg, setErrors)
                }
                optional={true}
                value={formData?.election_type_id}
              />
            </div>
            <div>
              <label htmlFor="electionRoleDescription" className="font-size-sm">
                Description
              </label>
              <TextAreaInput
                placeholder={description}
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
                  required: false,
                  messages: {
                    min: "Election Role Description Must Be Atleast 10 Characters Long",
                    max: "Election Role Description Must Not Exceed 1000 Charactes",
                  },
                })}
              />
            </div>
          </div>
        )}
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
                handleUpdate();
              }}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Update Election Role"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateElectionRole;
