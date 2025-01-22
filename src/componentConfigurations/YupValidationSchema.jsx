import * as Yup from "yup";

const sanitizeInput = (input) => {
  return input.replace(/<[^>]*>/g, '').trim();
};
const cameroonLanguages = [
  "English", "French", "Bamileke", "Douala", "Fang", "Basa'a", "Mungaka", "Yembe", "Banyang",
  "Ntumba", "Mbenga", "Bamoun", "Cameroonian Pidgin English", "Mokpwe", "Mbole", "Tikar", "Aleghe",
  "Madi", "Mofo", "Bassa", "Besingo", "Fuso", "Bendjum", "Other (Please Specify)"
];
export const preferredLanguageSchema = Yup.string()
  .trim() 
  .required("Preferred language is required")
  .oneOf(cameroonLanguages, "Invalid language selection")
  .max(50, "Language name is too long")
  .test("valid-language", "Invalid language selection", value => {
    return cameroonLanguages.includes(value);
  });
 export  const relationshipSchema = Yup.object({
    relationshipToStudent: Yup.string()
      .trim()
      .required('Relationship to student is required.')
      .min(3, 'Relationship must be at least 3 characters.')
      .max(50, 'Relationship must be less than 50 characters.')
      .matches(/^[a-zA-Z\s]+$/, 'Relationship must only contain letters and spaces.')
      .strict()
  });
export const descriptionSchema = Yup.string()
  .trim()
  .min(10, 'Description must be at least 10 characters.') 
  .max(1000, 'Description cannot be longer than 1000 characters.') 
  .matches(/^[\w\s.,!?'"()-]*$/, 'Description contains invalid characters.') 
  .test('no-xss', 'Description contains potentially harmful content.', (value) => {
    if (value) {
      const sanitizedValue = sanitizeInput(value);
      return sanitizedValue === value;
    }
    return true;
  })
  .required('Description is required.');
export const phoneValidationSchema = Yup.string()
  .matches(/^6\d{8}$/, "Phone number must start with 6 and be 9 digits long.")
  .required("Phone number is required.");
export const emailValidationSchema = Yup.string()
  .email("Invalid email format")
  .required("Email is required") 
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    "Invalid email format"
  )
  .test('no-blacklist', 'Email is blacklisted', (value) => {
    const blacklistedDomains = ['example.com', 'test.com'];
    const domain = value?.split('@')[1];
    return !blacklistedDomains.includes(domain);
  })
  .test('no-restricted-chars', 'Email contains restricted characters', (value) => {
    return !/[<>]/.test(value);
  })
  .max(320, 'Email must be less than 320 characters');


  export const nameValidationSchema = Yup.string()
  .required("Name is required") 
  .min(3, "Name must be at least 3 characters")
  .max(100, "Name must be less than 100 characters")
  .trim()
  .matches(
    /^[A-Za-z\s'-]+$/,
    "Name can only contain letters, spaces, apostrophes, and hyphens"
  ) 
  .test('no-double-spaces', 'Name should not contain double spaces', (value) => {
    return value && !/\s{2,}/.test(value);
  });

 export  const fieldOfStudyValidationSchema = Yup.string()
  .required("Field of study is required")
  .min(3, "Field of study must be at least 3 characters long")
  .max(100, "Field of study must be less than 100 characters")
  .trim()
  .matches(
    /^[A-Za-z0-9\s.,;:'"-]+$/,
    "Field of study can only contain letters, numbers, spaces, and common punctuation"
  ) 
  .test('no-double-spaces', 'Field of study should not contain double spaces', (value) => {
    return value && !/\s{2,}/.test(value);
  });

  export const createNumberSchema = (maxValue) => {
    return Yup.number()
      .typeError('Value must be a number.')
      .required('Field is required.')
      .min(0, 'Value must be at least 0.')
      .max(maxValue, `Value cannot be more than ${maxValue}.`); 
  };

  export const religionValidationSchema = Yup.string()
  .required("Religion is required")
  .min(3, "Religion name must be at least 3 characters long")
  .max(50, "Religion name must be less than 50 characters")
  .trim()
  .matches(
    /^[A-Za-z\s'-]+$/,
    "Religion name can only contain letters, spaces, apostrophes, and hyphens"
  ) 
  .test('no-double-spaces', 'Religion name should not contain double spaces', (value) => {
    return value && !/\s{2,}/.test(value);
  });

  export const culturalBackgroundValidationSchema = Yup.string()
  .required("Cultural background is required")
  .min(3, "Cultural background must be at least 3 characters long")
  .max(100, "Cultural background must be less than 100 characters")
  .trim()  
  .matches(
    /^[A-Za-z0-9\s.,;:'"-]+$/,
    "Cultural background can only contain letters, numbers, spaces, and common punctuation"
  )  
  .test('no-double-spaces', 'Cultural background should not contain double spaces', (value) => {
    return value && !/\s{2,}/.test(value); 
  });

  export const cityValidationSchema = Yup.string()
  .required("City is required")
  .min(2, "City name must be at least 2 characters long")
  .max(100, "City name must be less than 100 characters")
  .trim()
  .matches(
    /^[A-Za-z\s-]+$/,
    "City name can only contain letters, spaces, and hyphens"
  ) 
  .test('no-double-spaces', 'City name should not contain double spaces', (value) => {
    return value && !/\s{2,}/.test(value); 
  });


  export const salaryValidationSchema = Yup.number()
  .required("Salary is required")
  .positive("Salary must be a positive number")
  .typeError("Salary must be a valid number")
  .min(1000, "Salary must be at least 1000")
  .max(1000000, "Salary must be less than 1,000,000")
  .integer("Salary must be an integer");

  export const experienceValidationSchema = Yup.number()
  .required("Years of experience is required")
  .positive("Years of experience must be a positive number")
  .integer("Years of experience must be an integer")
  .min(0, "Years of experience cannot be negative")
  .max(50, "Years of experience must be less than or equal to 50")
  .typeError("Years of experience must be a valid number");

  export const addressValidationSchema = Yup.string()
  .required("Address is required")
  .min(10, "Address must be at least 10 characters long")
  .max(200, "Address must be less than 200 characters")
  .trim()
  .matches(
    /^[A-Za-z0-9\s,.-/#]+$/,
    "Address can only contain letters, numbers, spaces, commas, periods, slashes, and hyphens"
  ) 
  .typeError("Address must be a valid string");

  export const courseCodeValidationSchema = Yup.string()
  .required("Course code is required")
  .matches(
    /^[A-Za-z]{2,4}[-_]{0,1}[0-9]{3,4}$/,
    "Course code must consist of 2-4 letters followed by 3-4 digits, optionally with a hyphen or underscore"
  )
  .min(5, "Course code must be at least 5 characters long")
  .max(10, "Course code must be no more than 10 characters long")
  .trim()
  .test("no-double-hyphen-or-underscore", "Course code cannot have consecutive hyphens or underscores", (value) => {
    return value && !/[-_]{2,}/.test(value);
  });

  export const courseTitleValidationSchema = Yup.string()
  .required("Course title is required")
  .min(3, "Course title must be at least 3 characters long")
  .max(100, "Course title must be less than 100 characters")
  .matches(
    /^[A-Za-z0-9\s,.-]+$/,
    "Course title can only contain letters, numbers, spaces, commas, periods, and hyphens"
  )
  .trim()
  .test("no-double-spaces", "Course title should not contain double spaces", (value) => {
    return value && !/\s{2,}/.test(value);
  })
  .typeError("Course title must be a valid string");

  export const courseCreditValidationSchema = Yup.number()
  .required("Course credit is required")
  .positive("Course credit must be a positive number")
  .integer("Course credit must be an integer")
  .min(1, "Course credit must be at least 1")
  .max(6, "Course credit cannot exceed 6")
  .typeError("Course credit must be a valid number");



  export const weightedMarkValidationSchema = Yup.number()
  .required("Weighted mark is required")
  .positive("Weighted mark must be a positive number")
  .min(0, "Weighted mark cannot be less than 0")
  .max(100, "Weighted mark cannot exceed 100")
  .typeError("Weighted mark must be a valid number")
  .test("valid-number-format", "Invalid number format", (value) => {
    return /^[0-9]+(\.[0-9]{1,2})?$/.test(value);
  });

  export const occupationValidationSchema = Yup.string()
  .required("Occupation is required")
  .min(3, "Occupation must be at least 3 characters long")
  .max(100, "Occupation must be less than 100 characters")
  .matches(
    /^[A-Za-z\s,.'-]+$/, 
    "Occupation can only contain letters, spaces, commas, periods, apostrophes, and hyphens"
  )
  .trim() 
  .test("no-double-spaces", "Occupation should not contain consecutive spaces", (value) => {
    return value && !/\s{2,}/.test(value); 
  })
  .typeError("Occupation must be a valid string");

  export const specialtyValidationSchema = Yup.string()
  .required("Specialty is required")
  .min(3, "Specialty must be at least 3 characters long")
  .max(100, "Specialty must be less than 100 characters")
  .matches(
    /^[A-Za-z\s,.'-]+$/, 
    "Specialty can only contain letters, spaces, commas, periods, apostrophes, and hyphens"
  )
  .trim()
  .test("no-double-spaces", "Specialty should not contain consecutive spaces", (value) => {
    return value && !/\s{2,}/.test(value);
  })
  .typeError("Specialty must be a valid string");

  export const departmentValidationSchema = Yup.string()
  .required("Department is required")
  .min(3, "Department name must be at least 3 characters long")
  .max(100, "Department name must be less than 100 characters")
  .matches(
    /^[A-Za-z\s,.-]+$/,
    "Department name can only contain letters, spaces, commas, periods, and hyphens"
  )
  .trim() 
  .test("no-double-spaces", "Department name should not contain double spaces", (value) => {
    return value && !/\s{2,}/.test(value);
  })
  .typeError("Department name must be a valid string");

 export  const registrationFeeValidationSchema = Yup.number()
  .required("Registration fee is required")
  .positive("Registration fee must be a positive number")
  .min(0, "Registration fee cannot be less than 0")
  .max(10000, "Registration fee cannot exceed $10,000")
  .typeError("Registration fee must be a valid number")
  .test("valid-currency", "Registration fee must be a valid currency amount", (value) => {
    return /^\d+(\.\d{1,2})?$/.test(value);
  });

  export const schoolFeeValidationSchema = Yup.number()
  .required("School fee is required")
  .positive("School fee must be a positive number")
  .min(0, "School fee cannot be less than $0")
  .max(100000, "School fee cannot exceed $100,000")
  .typeError("School fee must be a valid number")
  .test("valid-currency", "School fee must be a valid currency amount", (value) => {
    return /^\d+(\.\d{1,2})?$/.test(value);  // Valid currency format
  });

 export const notesValidationSchema = Yup.string()
  .max(1000, "Notes must be less than 1000 characters")
  .matches(
    /^[A-Za-z0-9\s.,!?'"()-]*$/,
    "Notes can only contain letters, numbers, spaces, and common punctuation marks"
  )
  .optional();

 export const reasonValidationSchema = Yup.string()
  .max(500, 'Reason must be less than 500 characters')
  .matches(
    /^[A-Za-z0-9\s.,!?'"()-]*$/, 
    'Reason can only contain letters, numbers, spaces, and common punctuation marks'
  )
  .optional();  // Allow empty input

 export const firstNameValidationSchema = Yup.string()
  .required('First name is required')
  .max(50, 'First name must be less than 50 characters')
  .matches(
    /^[A-Za-zÀ-ÿÁ-Ýá-ý'’\- ]+$/, 
    'First name can only contain letters, spaces, apostrophes, and hyphens'
  );

 export const lastNameValidationSchema = Yup.string()
  .required('Last name is required')
  .max(50, 'Last name must be less than 50 characters')
  .matches(
    /^[A-Za-zÀ-ÿÁ-Ýá-ý'’\- ]+$/, 
    'Last name can only contain letters, spaces, apostrophes, and hyphens'
  );
 export const batchTitleValidationSchema = Yup.string()
  .required('Batch title is required')
  .max(100, 'Batch title must be less than 100 characters')
  .matches(
    /^[A-Za-z0-9\s\-_]+$/, 
    'Batch title can only contain letters, numbers, spaces, hyphens, and underscores'
  );
  export const locationValidationSchema = Yup.string()
  .required('Location is required') 
  .min(3, 'Location must be at least 3 characters') 
  .matches(/^[a-zA-Z\s]+$/, 'Location should only contain letters and spaces');

  export const titleValidationSchema = Yup.string()
  .required('Title is required')
  .trim()
  .min(3, 'Title must be at least 3 characters long')
  .max(100, 'Title must be less than 100 characters long')
  .matches(
    /^[A-Za-z0-9\s.,;:'"-]+$/,
    'Title can only contain letters, numbers, spaces, and basic punctuation.'
  ) 
  .test('capitalize', 'Title should start with a capital letter', (value) => {
    return value && /^[A-Z]/.test(value.trim());
  })
  .test('no-double-spaces', 'Title should not contain double spaces', (value) => {
    return value && !/\s{2,}/.test(value);
  });

