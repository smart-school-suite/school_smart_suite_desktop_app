import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { dateTimeRangeValidationSchema } from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { NotFoundError } from "../../components/errors/Error";
import { DateTimeRangeInput } from "../../components/FormComponents/InputComponents";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetAllSystemAcademicYear } from "../../hooks/academicYear/useGetAllSystemAcademicYear";
import { useGetElectionDetails } from "../../hooks/election/useGetElectionDetail";
import { useUpdateElection } from "../../hooks/election/useUpdateElection";
import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
function UpdateElection({ drawerData, handleClose }) {
  const { id: electionId } = drawerData;
  const {
    data: electionDetails,
    isLoading,
    error: electionDetailsError,
  } = useGetElectionDetails(electionId);
  const { data: academicYears, isLoading: isAcademicYearLoading } =
    useGetAllSystemAcademicYear();
  const { data: electionType, isLoading: isElectionTypeLoading } =
    useGetElectionTypes();
  const [formData, setFormData] = useState({
    application_start: "",
    application_end: "",
    voting_start: "",
    voting_end: "",
    school_year_id: "",
    election_type_id: "",
  });
  const [isValid, setIsValid] = useState({
    application_start: "",
    application_end: "",
    voting_start: "",
    voting_end: "",
  });
  const [error, setError] = useState({
    school_year_id: "",
    election_type_id: "",
  });
  useEffect(() => {
    if (electionDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        application_start: electionDetails?.data?.application_start || "",
        application_end: electionDetails?.data?.application_end || "",
        voting_start: electionDetails?.data?.voting_start || "",
        voting_end: electionDetails?.data?.voting_end || "",
        school_year_id: { id: electionDetails?.data?.academic_year_id } || "",
        election_type_id: { id: electionDetails?.data?.election_type_id } || "",
      }));
    }
  }, [isLoading, setFormData]);

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const { mutate: updateElection, isPending } = useUpdateElection(handleClose);
  const handleElectionUpdate = () => {
    if (optionalValidateObject(isValid) == false) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={"Please ensure all fields are valid before updating."}
        />,
      );
      return;
    }

    if (hasNonEmptyValue(formData) == false) {
      toast.custom(
        <ToastWarning
          title={"Nothing to Update"}
          description={"Please ensure all fields are filled before updating."}
        />,
      );
      return;
    }
    updateElection({ electionId: electionId, electionData: formData });
  };
  return (
    <>
      <div className="drawer-content ps-2 pt-3">
        <div className="">
          {isLoading ? (
            <div className="d-flex flex-column gap-3">
              {[...Array(5)].map((_, index) => (
                <Fragment key={index}>
                  <div className="d-flex flex-column gap-2">
                    <RectangleSkeleton width="20%" height="1dvh" speed={1} />
                    <RectangleSkeleton width="100%" height="4dvh" speed={1} />
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
            <>
              <div className="d-flex flex-column gap-3">
                <div className=" w-100">
                  <DateTimeRangeInput
                    startValue={formData.application_start}
                    endValue={formData.application_end}
                    onStartDateTimeChange={(value) =>
                      handleStateChange("application_start", value, setFormData)
                    }
                    onEndDateTimeChange={(value) =>
                      handleStateChange("application_end", value, setFormData)
                    }
                    onStartDateTimeValidationChange={(value) =>
                      handleStateChange("application_start", value, setIsValid)
                    }
                    onEndDateTimeValidationChange={(value) =>
                      handleStateChange("application_end", value, setIsValid)
                    }
                    validationSchema={dateTimeRangeValidationSchema({
                      required: false,
                      futureOrNow: true,
                    })}
                    startDateLabel={"Application Start Date & Time"}
                    endDateLable={"Application End Date & Time"}
                  />
                </div>
                <div className="w-100">
                  <DateTimeRangeInput
                    startValue={formData.voting_start}
                    endValue={formData.voting_end}
                    onStartDateTimeChange={(value) =>
                      handleStateChange("voting_start", value, setFormData)
                    }
                    onEndDateTimeChange={(value) =>
                      handleStateChange("voting_end", value, setFormData)
                    }
                    onStartDateTimeValidationChange={(value) =>
                      handleStateChange("voting_start", value, setIsValid)
                    }
                    onEndDateTimeValidationChange={(value) =>
                      handleStateChange("voting_end", value, setIsValid)
                    }
                    validationSchema={dateTimeRangeValidationSchema({
                      required: false,
                      futureOrNow: true,
                    })}
                    startDateLabel={"Vote Start Date & Time"}
                    endDateLable={"Vote End Date & Time"}
                  />
                </div>
                <div>
                  <label htmlFor="schoolYear" className="font-size-sm">
                    Academic Year
                  </label>
                  <CustomDropdown
                    data={academicYears?.data || []}
                    isLoading={isAcademicYearLoading}
                    onSelect={(value) =>
                      handleStateChange("school_year_id", value, setFormData)
                    }
                    displayKey={["name"]}
                    valueKey={["id"]}
                    direction="up"
                    placeholder="Select Academic Year"
                    error={error.school_year_id}
                    errorMessage="Academic Year Required"
                    onError={(msg) =>
                      handleStateChange("school_year_id", msg, setError)
                    }
                    value={formData.school_year_id}
                  />
                </div>
                <div>
                  <label htmlFor="electionType" className="font-size-sm">
                    Election Type
                  </label>
                  <CustomDropdown
                    data={electionType?.data || []}
                    isLoading={isElectionTypeLoading}
                    onSelect={(value) =>
                      handleStateChange("election_type_id", value, setFormData)
                    }
                    displayKey={["election_title"]}
                    valueKey={["id"]}
                    direction="up"
                    placeholder="Select Election"
                    error={error.election_type_id}
                    errorMessage="Election Type Required"
                    onError={(msg) =>
                      handleStateChange("election_type_id", msg, setError)
                    }
                    value={formData.election_type_id}
                  />
                </div>
              </div>
            </>
          )}
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
              onClick={() => handleElectionUpdate()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Update Election"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateElection;
