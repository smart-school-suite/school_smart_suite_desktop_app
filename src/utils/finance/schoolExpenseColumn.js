export const SCHOOL_EXPENSE_COLUMNS = [
  {
    program_name: "amount",
    type: "standard_field",
    label: "amount",
    required: true,
    aliases: ["expense_amount", "amount", "e_incurred", "amount_incurred"],
  },
  {
    program_name: "date",
    type: "standard_field",
    label: "Date Incurred",
    required: true,
    aliases: ["date_incurred", "date"],
  },
  {
    program_name: "description",
    type: "standard_field",
    label: "Description",
    required: true,
    aliases: ["description", "expense_description"],
  },
  {
    program_name: "category_name",
    type: "standard_field",
    label: "Category",
    required: true,
    aliases: ["category", "expense_category"],
  },
];
