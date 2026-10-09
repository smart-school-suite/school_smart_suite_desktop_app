import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useRef, useState } from "react";
import { useCreateElection } from "../../hooks/election/useCreateElection";
import { DateTimeRangeInput } from "../../components/FormComponents/InputComponents";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import {
  dateTimeRangeValidationSchema,
  timeValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { Icon } from "@iconify/react";
import { allFieldsValid, formatToMySQLDateTime } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
function CreateElection({ handleClose }) {
  const applicationDateRangeRef = useRef();
  const votingDateRangeRef = useRef();
  const schoolYearRef = useRef();
  const electionTypeRef = useRef();
  const { data: electionType, isLoading } = useGetElectionTypes();
  const { mutate: createElection, isPending } = useCreateElection(handleClose);
  const [formData, setFormData] = useState({
    application_start: "",
    application_end: "",
    voting_start: "",
    voting_end: "",
    school_year: "",
    election_type_id: "",
  });
  const [error, setError] = useState({
    school_year: "",
    election_type_id: "",
  });
  const [isValid, setIsValid] = useState({
    application_start: null,
    application_end: null,
    voting_start: null,
    voting_end: null,
  });
  const handlePrevalidation = async () => {
    const applicationStart =
      await applicationDateRangeRef.current.preValidateStart();
    const applicationEnd =
      await applicationDateRangeRef.current.preValidateEnd();
    const voteStart = await votingDateRangeRef.current.preValidateStart();
    const voteEnd = await votingDateRangeRef.current.preValidateEnd();
    const schoolYear = await schoolYearRef.current.triggerValidation();
    const electionType = await electionTypeRef.current.triggerValidation();
    return {
      applicationStart,
      applicationEnd,
      voteEnd,
      voteStart,
      schoolYear,
      electionType,
    };
  };
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    if (!allFieldsValid(isValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Some Fields Seem To Be Invalid Please Go Through the form and try again"
          }
        />,
      );
      return;
    }
    const payload = {
      application_start: formData.application_start,
      application_end: formData.application_end,
      voting_start: formData.voting_start,
      voting_end: formData.voting_end,
      school_year: formData.school_year,
      election_type_id: formData.election_type_id.id,
    };
    createElection(payload);
  };
  return (
    <>
      <div className="drawer-content px-2">
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
                required: true,
                futureOrNow: true,
                messages: {
                  startRequired: "Election Application start time required",
                  endRequired: "Election Application end time required",
                },
              })}
              ref={applicationDateRangeRef}
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
                required: true,
                futureOrNow: true,
                messages: {
                  startRequired: "Election Vote start time required",
                  endRequired: "Election Vote end time required",
                },
              })}
              ref={votingDateRangeRef}
              startDateLabel={"Vote Start Date & Time"}
              endDateLable={"Vote End Date & Time"}
            />
          </div>
          <div>
            <label htmlFor="schoolYear" className="font-size-sm">
              School Year
            </label>
            <SchoolYearSelector
              onSelect={(value) =>
                handleStateChange("school_year", value, setFormData)
              }
              onError={(msg) => handleStateChange("school_year", msg, setError)}
              error={error.school_year}
              required={true}
              ref={schoolYearRef}
            />
          </div>
          <div>
            <label htmlFor="electionType" className="font-size-sm">
              Election Type
            </label>
            <CustomDropdown
              data={electionType?.data || []}
              isLoading={isLoading}
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
              ref={electionTypeRef}
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
              onClick={() => handleSubmit()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Election"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateElection;
