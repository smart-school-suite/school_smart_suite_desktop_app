import { useAutoGenerateFeeSchedule } from "../../hooks/feeSchedule/useAutoGenerateFeeSchedule";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useEffect, useRef, useState } from "react";
import {
  NumberInput,
  DateInput,
} from "../../components/FormComponents/InputComponents";
import { Icon } from "@iconify/react";
import {
  dateValidationSchema,
  numberSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { allFieldsValid } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useSelector } from "react-redux";
import { useCreateFeeScheduleSlots } from "../../hooks/feeSchedule/useCreateFeeScheduleSlot";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { NotFoundError } from "../../components/errors/Error";
function AutoGenerateFeeSchedule({ handleClose, rowData }) {
  const { id: feeScheduleId } = rowData;
  const [toggle, setToggle] = useState("schedule");
  const [formData, setFormData] = useState({
    installments: 0,
    percentage: 0,
    fee_schedule_id: feeScheduleId,
  });
  const [isInvalid, setIsInvalid] = useState({
    installments: "",
    percentage: "",
  });

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div >
      {toggle === "schedule" ? (
        <Schedule
          setToggle={setToggle}
          handleClose={handleClose}
          formData={formData}
          handleStateChange={handleStateChange}
          setFormData={setFormData}
          setIsInvalid={setIsInvalid}
          isInvalid={isInvalid}
        />
      ) : (
        <SchedulePreview
          handleClose={handleClose}
          formData={formData}
          setFormData={setFormData}
          setIsInvalid={setIsInvalid}
          isInvalid={isInvalid}
          feeScheduleId={feeScheduleId}
          setToggle={setToggle}
        />
      )}
    </div>
  );
}

function Schedule({
  setToggle,
  handleClose,
  formData,
  handleStateChange,
  setFormData,
  setIsInvalid,
  isInvalid,
}) {
  const installmentRef = useRef();
  const percentageRef = useRef();

  const handlePrevalidation = async () => {
    const [installment, percentage] = await Promise.all([
      installmentRef.current.triggerValidation(),
      percentageRef.current.triggerValidation(),
    ]);
    return { installment, percentage };
  };

  const handleSubmit = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation) || !allFieldsValid(isInvalid)) {
      toast.custom(
        <ToastWarning
          title="Invalid Fields"
          description="Some fields seem to be invalid. Please review the form and try again."
        />
      );
      return;
    }
    setToggle("preview");
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <span className="m-0">Generate Fee Schedule</span>
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
        <label htmlFor="installments" className="form-label font-size-sm">
          Installments
        </label>
        <NumberInput
          id="installments"
          placeholder="Enter Number of installments"
          validationSchema={numberSchema({
            min: 1,
            max: 5,
            integerOnly: true,
            required: true,
            messages: {
              required: "Number of fee installments required",
              min: "Number of fee installments must be at least 1",
              max: "Number of fee installments must not exceed 5",
            },
          })}
          value={formData.installments}
          ref={installmentRef}
          onChange={(value) =>
            handleStateChange("installments", value, setFormData)
          }
          onValidationChange={(value) =>
            handleStateChange("installments", value, setIsInvalid)
          }
        />
      </div>
      <div>
        <label htmlFor="feePercentage" className="form-label font-size-sm">
          Fee Percentage (Tip: Fee Percentage Of Tuition Fee That Will Be Paid This Semester)
        </label>
        <NumberInput
          id="feePercentage"
          placeholder="Enter Fee Percentage"
          validationSchema={numberSchema({
            min: 0.01,
            max: 100,
            integerOnly: false,
            required: true,
            messages: {
              required: "Fee Percentage Required",
              min: "Fee Percentage must be at least 0.01%",
              max: "Fee Percentage must not exceed 100%",
            },
          })}
          value={formData.percentage}
          step="0.01"
          ref={percentageRef}
          onChange={(value) =>
            handleStateChange("percentage", value, setFormData)
          }
          onValidationChange={(value) =>
            handleStateChange("percentage", value, setIsInvalid)
          }
        />
      </div>
      <button
        className="border-none p-2 font-size-sm rounded-2 primary-background text-white w-100 mt-3"
        onClick={handleSubmit}
      >
        Generate Schedule
      </button>
    </div>
  );
}

function SchedulePreview({ handleClose, formData, feeScheduleId, setToggle }) {
  const [schedule, setSchedule] = useState([]);
  const [isValid, setIsValid] = useState([]);
  const { mutateAsync: autoGenerateFeeSchedule, isPending: isGenerating, error } =
    useAutoGenerateFeeSchedule();
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
    const darkMode = useSelector((state) => state.theme.darkMode);
  const { mutate: createFeeSchedule, isPending } =
    useCreateFeeScheduleSlots(handleClose);
  useEffect(() => {
    const generateSchedule = async () => {
      const response = await autoGenerateFeeSchedule({ ...formData });
      setSchedule(response.data);
      setIsValid(
        response.data.map(() => ({ percentage: null, due_date: null }))
      );
    };
    generateSchedule();
  }, [formData, autoGenerateFeeSchedule]);

  const handleStateChange = (index, field, value, stateFn) => {
    stateFn((prev) => {
      const newData = [...prev];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };
  const handleSubmit = () => {
    isValid.forEach((invalid) => {
      if (optionalValidateObject(invalid) == false) {
        toast.custom(
          <ToastWarning
            title={"Invalid Fields"}
            description={"Please Ensure All Fields Are Valid Before Submitting"}
          />
        );
        return;
      }
    });
    schedule.forEach((schedule) => {
      if (hasNonEmptyValue(schedule) == false) {
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
    });
   createFeeSchedule({ scheduleData: { slots: schedule }, feeScheduleId });
  };
  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex flex-row align-items-center justify-content-between">
        <span className="m-0">Fee Schedule</span>
        <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
      </div>
      <div className="d-flex flex-row align-items-center w-100 justify-content-end">
        <button
          className="border-none p-2 rounded-2 primary-background text-white font-size-sm"
          onClick={handleSubmit}
          disabled={isPending || isGenerating}
        >
          {isPending ? <SingleSpinner /> : "Create Schedule"}
        </button>
      </div>
      {isGenerating ? (
        <RectangleSkeleton width="100%" height="30dvh" speed={1} />
      ) : error ? (
        <NotFoundError
          title={error.response.data.errors.title}
          description={error.response.data.errors.description}
        />
      ) : (
        <div className={`${darkMode ? 'dark-theme-border dark-bg' : 'bg-white border'}  card grades-box rounded-3`}>
          <table className={`${darkMode ? 'table-dark' : null} table-responsive table`}>
            <thead className="grades-thead">
              <tr>
                <th scope="col">Installment</th>
                <th scope="col" className="text-center">
                  Due Date
                </th>
                <th scope="col" className="text-center">
                  Percentage
                </th>
                <th scope="col" className="text-center">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={item.id} className="grades-tr">
                  <td className="font-size-sm" style={{ width: "20%" }}>
                    {item.installment_name}
                  </td>
                  <td style={{ width: "25%" }}>
                    <DateInput
                      validationSchema={dateValidationSchema({
                        futureOrToday: true,
                        required: false,
                      })}
                      value={item.due_date || ""}
                      onChange={(value) =>
                        handleStateChange(index, "due_date", value, setSchedule)
                      }
                      onValidationChange={(value) =>
                        handleStateChange(index, "due_date", value, setIsValid)
                      }
                    />
                  </td>
                  <td style={{ width: "25%" }}>
                    <NumberInput
                      placeholder="Enter Fee Percentage"
                      validationSchema={numberSchema({
                        min: 0.01,
                        max: 100,
                        integerOnly: false,
                        required: false,
                        messages: {
                          required: "Fee Percentage Required",
                          min: "Fee Percentage must be at least 0.01%",
                          max: "Fee Percentage must not exceed 100%",
                        },
                      })}
                      value={item.fee_percentage || formData.fee_percentage }
                      step="0.01"
                      onChange={(value) =>
                        handleStateChange(
                          index,
                          "fee_percentage",
                          value,
                          setSchedule
                        )
                      }
                      onValidationChange={(value) =>
                        handleStateChange(
                          index,
                          "fee_percentage",
                          value,
                          setIsValid
                        )
                      }
                      optional={true}
                    />
                  </td>
                  <td
                    className="font-size-sm text-center"
                    style={{ width: "30%" }}
                  >
                    {(item.amount || 0).toFixed(2)} {userCurrencySymbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       <div
        className="d-flex flex-row align-items-center pointer-cursor color-primary gap-2 font-size-sm"
        onClick={() => {
             if(isGenerating || isPending){
                 return
             }
            setToggle("schedule")
          }}
       >
        <Icon icon="eva:arrow-back-outline" />
        <span>Back</span>
       </div>
    </div>
  );
}

export default AutoGenerateFeeSchedule;
