const stringMatches = [
  { label: "Contains", value: "contains" },
  { label: "Does Not Contain", value: "doesNotContain" },
  { label: "Equals", value: "equals" },
  { label: "Does Not Equal", value: "doesNotEqual" },
  { label: "Begins With", value: "beginsWith" },
  { label: "Ends With", value: "endsWith" },
  { label: "Blank", value: "blank" },
  { label: "Not Blank", value: "notBlank" },
];

const dateMatches = [
  { label: "Equals", value: "equals" },
  { label: "Does Not Equal", value: "doesNotEqual" },
  { label: "Before", value: "before" },
  { label: "After", value: "after" },
  { label: "Between", value: "between" },
  { label: "Blank", value: "blank" },
  { label: "Not Blank", value: "notBlank" },
];

const numberMatches = [
  { label: "Equals", value: "equals" },
  { label: "Does Not Equal", value: "doesNotEqual" },
  { label: "Greater Than", value: "greaterThan" },
  { label: "Greater Than Or Equal To", value: "greaterThanOrEqual" },
  { label: "Less Than", value: "lessThan" },
  { label: "Less Than Or Equal To", value: "lessThanOrEqual" },
  { label: "Between", value: "between" },
  { label: "Blank", value: "blank" },
  { label: "Not Blank", value: "notBlank" },
];

export const filterMatchMap = [
  {
    type: "text",
    matches: stringMatches,
  },
  {
    type: "number",
    matches: numberMatches,
  },
  {
    type: "dateString",
    matches: dateMatches,
  },
];