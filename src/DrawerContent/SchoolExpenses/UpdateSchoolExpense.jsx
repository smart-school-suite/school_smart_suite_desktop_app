import { useEffect, useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useUpdateExpense } from "../../hooks/schoolExpenses/useUpdateSchoolExpense";
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
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import { useGetExpenseDetails } from "../../hooks/schoolExpenses/useGetSchoolExpenseDetails";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import FormErrorBanner from "../../components/errors/FormErrorBanner";
import { useFormError } from "../../hooks/form/useFormError";
function UpdateSchoolExpense({ handleClose, drawerData }) {
  const { id: expenseId } = drawerData;
  const currencyState = useSelector((state) => state.auth.user);
  const userCurrencySymbol =
    currencyState?.schoolDetails?.school?.country?.currency || "";
  const {
    data: expenseDetails,
    isLoading,
    error,
  } = useGetExpenseDetails(expenseId);
  const { mutate: updateExpense, isPending } = useUpdateExpense(handleClose);
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } =
    useFormError("Failed To Update School Expense");
  const { data: expenseCategory, isFetching } = useGetExpensesCategories();
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

  useEffect(() => {
    if (expenseDetails?.data) {
      setFormData((prev) => ({
        ...prev,
        date: expenseDetails.data.date,
        amount: expenseDetails.data.amount,
        expenses_category_id: { id: expenseDetails.data.expenses_category_id },
        description: expenseDetails.data.description,
      }));
    }
  }, [setFormData, isLoading]);

  const handleStateChange = (field, value, stateFn) => {
    if (stateFn === setFormData) clearFormError();
    stateFn((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = () => {
    if (optionalValidateObject(isValid) == false) {
      setClientError("Invalid Fields", "Please Ensure All Fields Are Valid Before Submitting");
      return;
    }
    if (hasNonEmptyValue(formData) == false) {
      setClientError("Nothing To Update", "Please Ensure Atleast One Field Is Updated Before Submitting");
      return;
    }
    clearFormError();
    updateExpense({
      expenseId: expenseId,
      updateData: {
        ...formData,
        expenses_category_id: formData.expenses_category_id,
      },
    }, { onError: handleServerError });
  };
  return (
    <>
      <div className="drawer-content px-2 pt-4">
        <FormErrorBanner
          ref={errorBannerRef}
          error={formError}
          onDismiss={clearFormError}
          className="mb-2"
        />
        {isLoading ? (
          <div className="d-flex flex-column w-100 gap-3">
            {[...Array(6)].map((_, index) => (
              <div className="d-flex flex-column gap-2 w-100" key={index}>
                <RectangleSkeleton width="25%" height="1dvh" />
                <RectangleSkeleton width="100%" height="5dvh" />
              </div>
            ))}
          </div>
        ) : error ? (
          <NotFoundError
            title={error?.response?.data?.errors?.title}
            description={error?.response?.data?.errors?.description}
          ></NotFoundError>
        ) : (
          <div className="d-flex flex-column gap-3">
            <div>
              <label htmlFor="Date" className="font-size-sm">
                Date
              </label>
              <DateInput
                onChange={(value) =>
                  handleStateChange("date", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("date", value, setIsValid)
                }
                value={formData.date}
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
                value={formData.amount}
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
                errorMessage="Expenses Category Required"
                optional={true}
                value={formData.expenses_category_id}
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
                value={formData.description}
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
              onClick={() => handleSubmit()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Update Expense"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default UpdateSchoolExpense;
