export const guardianTypes = [
  { id: 1, name: "Mother" },
  { id: 2, name: "Father" },
  { id: 3, name: "Stepmother" },
  { id: 4, name: "Stepfather" },
  { id: 5, name: "Grandmother" },
  { id: 6, name: "Grandfather" },
  { id: 7, name: "Aunt" },
  { id: 8, name: "Uncle" },
  { id: 9, name: "Older Brother" },
  { id: 10, name: "Older Sister" },
  { id: 11, name: "Guardian (non-family)" },
  { id: 12, name: "Foster Parent" },
  { id: 13, name: "Adoptive Parent" },
  { id: 14, name: "Older Cousin" },
  { id: 15, name: "Legal Guardian" },
  { id: 16, name: "Sibling (younger brother or sister)" },
  { id: 17, name: "Family Friend" },
  { id: 18, name: "Caretaker" },
  { id: 19, name: "Single Parent" },
  { id: 20, name: "Godparent" }
];

export const languages = [
  { id: 1, name: 'Pigin' },
  { id: 2, name: 'English' },
  { id: 3, name: 'French' }
];

export const gender = [
    {
        id:1, name:'male',
    },
    {
      id:2, name:'female'
    }
]

export const paymentMethods = [
  { value: 'cash', label: 'Cash Payment' },
  { value: 'cheque', label: 'cheque' },
  { value: 'credit_card', label: 'Credit card' },
  { value: 'debit_card', label: 'Debit card' },
  { value: 'bank_transfer', label: 'Bank transfer' }
];
export const examRemarks = [
  { value: "Excellent", name: "Excellent", id: "remark1" },
  { value: "Great", name: "Great", id: "remark2" },
  { value: "Good", name: "Good", id: "remark3" },
  { value: "Well Done", name: "Well Done", id: "remark4" },
  { value: "Satisfactory", name: "Satisfactory", id: "remark5" },
  { value: "Pass", name: "Pass", id: "remark6" },
  { value: "Nice", name: "Nice", id: "remark7" },
  { value: "Solid", name: "Solid", id: "remark8" },
  { value: "Adequate", name: "Adequate", id: "remark9" },
  { value: "Competent", name: "Competent", id: "remark10" },
  { value: "Poor", name: "Poor", id: "remark11" },
  { value: "Unsatisfactory", name: "Unsatisfactory", id: "remark12" },
  { value: "Fail", name: "Fail", id: "remark13" },
  { value: "Needs Improvement", name: "Needs Improvement", id: "remark14" },
  { value: "Weak", name: "Weak", id: "remark15" },
  { value: "Inadequate", name: "Inadequate", id: "remark16" },
  { value: "Unacceptable", name: "Unacceptable", id: "remark17" },
  { value: "Below Par", name: "Below Par", id: "remark18" },
  { value: "Reconsider", name: "Reconsider", id: "remark19" }
];

export const resitOptions = [
  {
    value: "high_resit_potential",
    name: "High Resit Potential",
    id: "option1"
  },
  {
    value: "low_resit_potential",
    name: "Low Resit Potential",
    id: "option2"
  },
  {
    value: "resit",
    name: "Resit",
    id: "option3"
  },
  {
    value: "no_resit",
    name: "No Resit",
    id: "option4"
  }
];

export const passFailOptions = [
  {
    value: "passed",
    name: "Pass",
    id: "option1"
  },
  {
    value: "failed",
    name: "Fail",
    id: "option2"
  }
];

export const daysOfWeek = [
  { id: 1, value: "monday", label: "Monday" },
  { id: 2, value: "tuesday", label: "Tuesday" },
  { id: 3, value: "wednesday", label: "Wednesday" },
  { id: 4, value: "thursday", label: "Thursday" },
  { id: 5, value: "friday", label: "Friday" },
  { id: 6, value: "saturday", label: "Saturday" },
  { id: 7, value: "sunday", label: "Sunday" },
];

export const schoolTypes = [
  { id: 1, name: "Private" },
  { id: 2, name: "Government" }
]

export const announcementStatus = [
  {
    id: 1,
    name: "Publish Now",
    value: "active",
    description: "Immediately publishes the announcement and makes it visible to the intended audience."
  },
  {
    id: 2,
    name: "Set As Draft",
    value: "draft",
    description: "Saves the announcement as a draft for future editing. It won’t be visible to the audience until published."
  },
  {
    id: 3,
    name: "Schedule For Later",
    value: "scheduled",
    description: "Allows you to set a specific date and time for the announcement to be automatically published."
  }
];
