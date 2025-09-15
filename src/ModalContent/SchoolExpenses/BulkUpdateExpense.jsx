import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { Icon } from "@iconify/react";
import { useBulkUpdateSchoolExpenses } from "../../hooks/schoolExpenses/useBulkUpdateSchoolExpenses";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useGetExpensesCategories } from "../../hooks/expenseCategory/useGetExpensesCategories";
import {
  DateInput,
  InputGroup,
  TextAreaInput,
} from "../../components/FormComponents/InputComponents";
import {
  dateValidationSchema,
  numberSchema,
  textareaSchema,
} from "../../ComponentConfig/YupValidationSchema";
import { useSelector } from "react-redux";
import {
  hasNonEmptyValue,
  optionalValidateObject,
} from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
function BulkUpdateExpense({ handleClose, resetAll, bulkData }) {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    expenses_category_id: "",
    description: "",
  });
  const [isValid, setIsValid] = useState({
    date: "",
    amount: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    expenses_category_id: "",
  });
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const { mutate: updateExpense, isPending } = useBulkUpdateSchoolExpenses(
    handleClose,
    resetAll
  );
  const { data: expenseCategory, isFetching } = useGetExpensesCategories();

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    if (optionalValidateObject(isValid) == false) {
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
    const formattedData = bulkData.map((items) => ({
      expense_id: items.id,
      expenses_category_id: formData.expenses_category_id,
      date: formData.date,
      amount: formData.amount,
      description: formData.description,
    }));
    updateExpense({ school_expenses: formattedData });
  };
  return (
    <>
      <div className=" w-100 border-none">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3 w-100">
          <span className="m-0">Update Expenses</span>
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
          <label htmlFor="Date" className="font-size-sm">
            Date
          </label>
          <DateInput
            onChange={(value) => handleStateChange("date", value, setFormData)}
            onValidationChange={(value) =>
              handleStateChange("date", value, setIsValid)
            }
            validationSchema={dateValidationSchema({
              required: false,
            })}
          />
        </div>
        <div>
          <label htmlFor="amount" className="font-size-sm">
            Amount
          </label>
          <InputGroup
            onChange={(value) =>
              handleStateChange("amount", value, setFormData)
            }
            placeholder="Enter Amount"
            validationSchema={numberSchema({
              min: 1,
              max: 1000000,
              required: false,
              messages: {
                min: `Amount must be atleast 1 ${userCurrencySymbol}`,
                max: `Amount must not exceed 1000000 ${userCurrencySymbol}`,
              },
            })}
            onValidationChange={(value) =>
              handleStateChange("amount", value, setIsValid)
            }
            step="0.01"
            InputGroupText={userCurrencySymbol}
          />
        </div>
        <div>
          <label htmlFor="category" className="font-size-sm">
            Expenses Category
          </label>
          <CustomDropdown
            data={expenseCategory?.data || []}
            displayKey={["name"]}
            valueKey={["id"]}
            isLoading={isFetching}
            direction="up"
            onSelect={(value) =>
              handleStateChange("expenses_category_id", value, setFormData)
            }
            onError={(value) =>
              handleStateChange("expenses_category_id", value, setErrors)
            }
            error={errors.expenses_category_id}
            placeholder="Select Category"
            errorMessage="Expenses Category Required"
            optional={true}
          />
        </div>
        <div>
          <label htmlFor="description" className="font-size-sm">
            Description
          </label>
          <TextAreaInput
            onChange={(value) =>
              handleStateChange("description", value, setFormData)
            }
            onValidationChange={(value) =>
              handleStateChange("description", value, setIsValid)
            }
            validationSchema={textareaSchema({
              min: 5,
              max: 1000,
              required: false,
              messages: {
                max: "Reason Must Be Exceed 1000 Characters Long",
                min: "Reason Must Be Atleast 5 Characters Long",
              },
            })}
            placeholder={"Enter The Reason for the spending"}
          />
        </div>
      </div>
      <div className="w-100 mt-2">
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleSubmit();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Update Expense"}
        </button>
      </div>
    </>
  );
}
export default BulkUpdateExpense;
