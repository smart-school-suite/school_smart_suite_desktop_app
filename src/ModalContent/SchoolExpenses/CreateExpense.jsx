import { useState } from "react";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { useGetExpensesCategories } from "../../hooks/expenseCategory/useGetExpensesCategories";
import { useCreateSchoolExpense } from "../../hooks/schoolExpenses/useCreateSchoolExpenses";
import { Icon } from "@iconify/react";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { useSelector } from "react-redux";
import { DateInput, InputGroup, TextAreaInput } from "../../components/FormComponents/InputComponents";
import { dateValidationSchema, numberSchema, textareaSchema } from "../../ComponentConfig/YupValidationSchema";
function CreateExpense({ handleClose }) {
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
  })
  const [errors, setErrors] = useState({
       expenses_category_id: "",
  }) 
   const currencyState = useSelector((state) => state.auth.user);
    const userCurrencySymbol = currencyState?.schoolDetails?.school?.country?.currency || '';
  const { data: expenseCategory, isFetching } = useGetExpensesCategories();
  const { mutate: createExpenses, isPending } =
    useCreateSchoolExpense(handleClose);
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    createExpenses(formData);
  };
  return (
    <>
      <div className="w-100 border-none">
        <div className="block">
          <div className="d-flex flex-row align-items-center justify-content-between mb-3">
            <span className="m-0">Create Expenses</span>
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
        <div>
          <label htmlFor="date" className="font-size-sm">Date</label>
           <DateInput 
            validationSchema={dateValidationSchema({
              required:true
            })}
            onChange={(value) => handleStateChange('date', value, setFormData)}
            onValidationChange={(value) => handleStateChange('date', value, setIsValid)}
           />
        </div>
        <div>
          <label htmlFor="amount" className="font-size-sm">Amount</label>
           <InputGroup 
            InputGroupText={userCurrencySymbol}
            onChange={(value) => handleStateChange('amount', value, setFormData)}
            onValidationChange={(value) => handleStateChange('amount', value, setErrors)}
            validationSchema={numberSchema({
              min:1, 
              max:10000000,
              required:true,
              messages:{
                 required:"Amount Required",
                 min:`Amount Must Be Atleast 1 ${userCurrencySymbol}`,
                 max:`Amount Must Not Exceed 10000000 ${userCurrencySymbol}`
              }
            })}
            placeholder={'E.g 1,00,000'}
            step="0.01"
          />
        </div>
        <div>
          <label htmlFor="categoryName" className="font-size-sm">Category Name</label>
            <CustomDropdown
              data={expenseCategory?.data || [] }
              displayKey={["name"]}
              valueKey={["id"]}
              isLoading={isFetching}
              direction="down"
              onSelect={(value) => handleStateChange('expenses_category_id', value.id, setFormData)}
              onError={(value) => handleStateChange('expenses_category_id', value, setErrors)}
              error={errors.expenses_category_id}
              errorMessage="Expenses Category Required"
              placeholder="Select Category"
            />
        </div>
        <div>
          <label htmlFor="description" className="font-size-sm">Reason</label>
           <TextAreaInput 
             onChange={(value) => handleStateChange('description', value, setFormData)}
             onValidationChange={(value) => handleStateChange('description', value, setIsValid)}
             placeholder={"Enter The Reason for the spending"}
             validationSchema={textareaSchema({
                min:5,
                max:1000,
                required:true,
                messages:{
                   required:"Reason For Expenses Required",
                   max:"Reason Must Be Exceed 1000 Characters Long",
                   min:"Reason Must Be Atleast 5 Characters Long"
                }
             })}
           />
        </div>
      </div>
      <div className="w-100 mt-4">
        <button
          className="border-none px-3 mt-2 py-2 rounded-3 font-size-sm primary-background text-white w-100"
          onClick={() => {
            handleSubmit();
          }}
          disabled={isPending}
        >
          {isPending ? <SingleSpinner /> : "Create Expense"}
        </button>
      </div>
    </>
  );
}
export default CreateExpense;
