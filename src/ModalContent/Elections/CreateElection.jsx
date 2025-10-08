import { useGetElectionTypes } from "../../hooks/electionType/useGetElectionTypes";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useRef, useState } from "react";
import { useCreateElection } from "../../hooks/election/useCreateElection";
import {
  DateInput,
  TimeInput,
} from "../../components/FormComponents/InputComponents";
import { SchoolYearSelector } from "../../components/FormComponents/YearPicker";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import {
  dateValidationSchema,
  timeValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { Icon } from "@iconify/react";
import { allFieldsValid, formatToMySQLDateTime } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function CreateElection({ handleClose }) {
  const voteStartDateRef = useRef();
  const voteStartTimeRef = useRef();
  const voteEndDateRef = useRef();
  const voteEndTimeRef = useRef();
  const applicationStartDateRef = useRef();
  const applcationStartTimeRef = useRef();
  const applicationEndDateRef = useRef();
  const applicationEndTimeRef = useRef();
  const schoolYearRef = useRef();
  const electionTypeRef = useRef();
  const { data: electionType, isLoading } = useGetElectionTypes();
  const { mutate: createElection, isPending } = useCreateElection(handleClose);
  const [formData, setFormData] = useState({
    application_start_time: "",
    application_start_date: "",
    application_end_date: "",
    application_end_time: "",
    voting_start_date: "",
    voting_end_date: "",
    voting_end_time: "",
    voting_start_time: "",
    school_year: "",
    election_type_id: "",
  });
  const [error, setError] = useState({
    school_year: "",
    election_type_id: "",
  });
  const [isValid, setIsValid] = useState({
    application_start_time: null,
    application_start_date: null,
    application_end_date: null,
    application_end_time: null,
    voting_start_date: null,
    voting_end_date: null,
    voting_end_time: null,
    voting_start_time: null,
  });
  const handlePrevalidation = async () => {
      const voteStartTime = await voteStartTimeRef.current.triggerValidation();
      const voteEndTime = await voteEndTimeRef.current.triggerValidation();
      const voteStartDate = await voteStartDateRef.current.triggerValidation();
      const voteEndDate = await voteEndDateRef.current.triggerValidation();
      const applicationStartDate = await applicationStartDateRef.current.triggerValidation();
      const applicationEndDate = await applicationEndDateRef.current.triggerValidation();
      const applicationEndTime = await applicationEndTimeRef.current.triggerValidation();
      const applicationStartTime = await applcationStartTimeRef.current.triggerValidation();
      const schoolYear = await schoolYearRef.current.triggerValidation();
      const electionType = await electionTypeRef.current.triggerValidation();
      return {
          voteStartTime,
          voteEndTime,
          voteStartDate,
          voteEndDate,
          applicationStartDate,
          applicationEndDate,
          applicationEndTime,
          applicationStartTime,
          schoolYear,
          electionType
      }
  }
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    const prevalidation =  await handlePrevalidation();
    if(!allFieldsValid(prevalidation)){
        toast.custom(
           <ToastWarning 
              title={"Invalid Fields"}
              description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
           />
        )
        return
    }
    if(!allFieldsValid(isValid)){
        toast.custom(
           <ToastWarning 
              title={"Invalid Fields"}
              description={"Some Fields Seem To Be Invalid Please Go Through the form and try again"}
           />
        )
        return
    }
    const payload = {
         application_start:formatToMySQLDateTime(formData.application_start_date, formData.application_start_time),
         application_end:formatToMySQLDateTime(formData.application_end_date, formData.application_end_time),
         voting_start:formatToMySQLDateTime(formData.application_end_date, formData.application_end_time),
         voting_end:formatToMySQLDateTime(formData.voting_end_date, formData.voting_end_time),
         school_year:formData.school_year,
         election_type_id:formData.election_type_id,
    }     
    createElection(payload);
  }
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
            <span className="m-0">Create Election</span>
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
        <div className="d-flex flex-row align-items-center gap-2 w-100">
          <div className="d-flex w-50 flex-column">
            <label htmlFor="applicationStartDate" className="font-size-sm">
              Application Start Date
            </label>
            <DateInput
              onChange={(value) =>
                handleStateChange("application_start_date", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("application_start_date", value, setIsValid)
              }
              value={formData.application_start_date}
              validationSchema={dateValidationSchema({
                required: true,
                futureOrToday: true,
              })}
              ref={applicationStartDateRef}
            />
          </div>
          <div className="d-flex w-50 flex-column">
            <label htmlFor="applicationEndTime" className="font-size-sm">
              Application Start Time
            </label>
            <TimeInput
              onChange={(value) =>
                handleStateChange("application_start_time", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("application_start_time", value, setIsValid)
              }
              value={formData.application_start_time}
              validationSchema={timeValidationSchema({
                required: true,
                futureOrNow: true,
              })}
              ref={applcationStartTimeRef}
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 w-100">
          <div className="d-flex w-50 flex-column">
            <label htmlFor="applicationStartDate" className="font-size-sm">
              Application end Date
            </label>
            <DateInput
              onChange={(value) =>
                handleStateChange("application_end_date", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("application_end_date", value, setIsValid)
              }
              value={formData.application_end_date}
              validationSchema={dateValidationSchema({
                required: true,
                futureOrToday: true,
              })}
              ref={applicationEndDateRef}
            />
          </div>
          <div className="d-flex w-50 flex-column">
            <label htmlFor="applicationEndTime" className="font-size-sm">
              Application End Time
            </label>
            <TimeInput
              onChange={(value) =>
                handleStateChange("application_end_time", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("application_end_time", value, setIsValid)
              }
              value={formData.application_end_time}
              validationSchema={timeValidationSchema({
                required: true,
                futureOrNow: true,
              })}
              ref={applicationEndTimeRef}
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 w-100">
          <div className="d-flex w-50 flex-column">
            <label htmlFor="votingStartDate" className="font-size-sm">
              Vote Start Date
            </label>
            <DateInput
              onChange={(value) =>
                handleStateChange("voting_start_date", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("voting_start_date", value, setIsValid)
              }
              value={formData.voting_start_date}
              validationSchema={dateValidationSchema({
                required: true,
                futureOrToday: true,
              })}
              ref={voteStartDateRef}
              className={"w-100"}
            />
          </div>
          <div className="d-flex w-50 flex-column">
            <label htmlFor="votingEndTime" className="font-size-sm">
              Vote Start Time
            </label>
            <TimeInput
              onChange={(value) =>
                handleStateChange("voting_start_time", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("voting_start_time", value, setIsValid)
              }
              value={formData.voting_start_time}
              validationSchema={timeValidationSchema({
                required: true,
                futureOrNow: true,
              })}
              ref={voteStartTimeRef}
            />
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-2 w-100">
          <div className="d-flex w-50 flex-column">
            <label htmlFor="votingEndDate" className="font-size-sm">
              Vote End Date
            </label>
            <DateInput
              onChange={(value) =>
                handleStateChange("voting_end_date", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("voting_end_date", value, setIsValid)
              }
              value={formData.voting_end_date}
              validationSchema={dateValidationSchema({
                required: true,
                futureOrToday: true,
              })}
              ref={voteEndDateRef}
            />
          </div>
          <div className="d-flex w-50 flex-column">
            <label htmlFor="votingEndTime" className="font-size-sm">
              Vote End Time
            </label>
            <TimeInput
              onChange={(value) =>
                handleStateChange("voting_end_time", value, setFormData)
              }
              onValidationChange={(value) =>
                handleStateChange("voting_end_time", value, setIsValid)
              }
              value={formData.voting_end_time}
              validationSchema={timeValidationSchema({
                required: true,
                futureOrNow: true,
              })}
              ref={voteEndTimeRef}
            />
          </div>
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
              handleStateChange("election_type_id", value.id, setFormData)
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
            ref={electionTypeRef}
          />
        </div>
        <div className="d-flex flex-row align-items-center justify-content-end gap-2 w-100 mt-3">
          <button
            className="border-none px-3 py-2 rounded-3 font-size-sm primary-background text-white w-100"
            onClick={() => {
              handleSubmit();
            }}
          >
            {isPending ? <SingleSpinner /> : "Create Election"}
          </button>
        </div>
      </div>
    </>
  );
}
export default CreateElection;
