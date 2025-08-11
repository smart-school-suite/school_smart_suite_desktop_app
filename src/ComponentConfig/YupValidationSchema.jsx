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

export const firstNameSchema = Yup.string()
  .trim()
  .min(2, "First name must be at least 2 characters long.")
  .max(50, "First name cannot exceed 50 characters.")
  .matches(
    /^[a-zA-Z\u00C0-\u017F\s'-.]+$/,
    "First name can only contain letters, spaces, hyphens, apostrophes, and periods."
  )
  .required("First name is required.");

export const lastNameSchema = Yup.string()
  .trim()
  .min(2, "Last name must be at least 2 characters long.")
  .max(50, "Last name cannot exceed 50 characters.")
  .matches(
    /^[a-zA-Z\u00C0-\u017F\s'-.]+$/,
    "Last name can only contain letters, spaces, hyphens, apostrophes, and periods."
  )
  .required("Last name is required.");

export const fullNameSchema = Yup.string()
  .trim()
  .min(3, "Full name must be at least 3 characters long.")
  .max(100, "Full name cannot exceed 100 characters.")
  .matches(
    /^[a-zA-Z\u00C0-\u017F\s'-.]+$/,
    "Full name can only contain letters, spaces, hyphens, apostrophes, and periods."
  )
  .test('has-multiple-parts', 'Please provide at least a first name and a last name for the full name.', (value) => {
    if (!value) return false;
    return value.trim().split(/\s+/).length >= 2;
  })
  .required("Full name is required.");

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
  .required("Email address is required.")
  .email("Please enter a valid email address (e.g., user@domain.com).")
  .max(254, 'Email address must be less than 255 characters.')
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    "The email address format is invalid."
  )
  .test('no-ip-address-domain', 'Email domain cannot be an IP address.', (value) => {
    if (!value) return true;
    const domain = value.split('@')[1];
    return !/^\[?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]?$/.test(domain);
  })
  .test('no-temp-domains', 'Disposable email addresses are not allowed.', async (value) => {
    const disposableDomains = ['mailinator.com', 'tempmail.com', 'guerrillamail.com'];
    if (!value) return true;
    const domain = value.split('@')[1];
    return !disposableDomains.includes(domain);
  })
  .test('no-blacklist', 'This email domain is restricted. Please use another email.', (value) => {
    const blacklistedDomains = ['example.com', 'test.com'];
    if (!value) return true;
    const domain = value.split('@')[1];
    return !blacklistedDomains.includes(domain);
  })
  .test('no-leading-trailing-dot', 'Email cannot start or end with a dot.', (value) => {
    if (!value) return true;
    return !value.startsWith('.') && !value.endsWith('.');
  })
  .test('no-consecutive-dots', 'Email cannot contain consecutive dots (e.g., "user..name@domain.com").', (value) => {
    if (!value) return true;
    return !/\.\./.test(value);
  });


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

  export const schoolNameValidationSchema = Yup.string()
  .required("School name is required")
  .trim("Leading and trailing spaces are not allowed")
  .min(2, "School name must be at least 2 characters")
  .max(100, "School name must be less than 100 characters")
  .matches(
    /^[a-zA-Z0-9\s-'.&()]+$/,
    "School name can only contain letters, numbers, spaces, and the following symbols: -'.&()"
  );

  export const schoolBranchNameValidationSchema = Yup.string()
  .required("School branch name is required")
  .trim("Leading and trailing spaces are not allowed")
  .min(2, "School branch name must be at least 2 characters")
  .max(100, "School branch name must be less than 100 characters")
  .matches(
    /^[a-zA-Z0-9\s-'.&()]+$/,
    "School branch name can only contain letters, numbers, spaces, and the following symbols: -'.&()"
  );

  export const schoolNameAbbreviationValidationSchema = Yup.string()
  .required("School abbreviation is required")
  .trim("Leading and trailing spaces are not allowed")
  .min(2, "School abbreviation must be at least 2 characters")
  .max(10, "School abbreviation must be less than 10 characters")
  .uppercase("School abbreviation must be in uppercase")
  .matches(
    /^[A-Z0-9]+$/,
    "School abbreviation can only contain uppercase letters and numbers"
  );

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

 export const courseCreditSchema = Yup.number()
  .required("Course credit is required.")
  .min(1, "Course credit must be at least 1.")
  .max(10, "Course credit cannot be more than 10.")
  .integer("Course credit must be a whole number.")
  .typeError("Course credit must be a valid number.");

  export const courseDescriptionSchema = Yup.string()
  .required("Course description is required.")
  .min(20, "Description must be at least 20 characters long.")
  .max(1000, "Description must not exceed 1000 characters.")
  .matches(
    /^[a-zA-Z0-9\s.,!?'"()_@#$%&*-/]+$/,
    "Description contains invalid characters. Only letters, numbers, and common punctuation are allowed."
  )
  .trim()
  .typeError("Course description must be a valid string.");

  
  export const weightedMarkValidationSchema = Yup.number()
  .required("Weighted mark is required")
  .positive("Weighted mark must be a positive number")
  .min(0, "Weighted mark cannot be less than 0")
  .max(100, "Weighted mark cannot exceed 100")
  .typeError("Weighted mark must be a valid number")
  .test("valid-number-format", "Invalid number format", (value) => {
    return /^[0-9]+(\.[0-9]{1,2})?$/.test(value);
  });

  export const courseCodeSchema = Yup.string()
  .required("Course code is required.")
  .min(4, "Course code must be at least 4 characters long.")
  .max(10, "Course code cannot be more than 10 characters.")
  .matches(
    /^[a-zA-Z]{2,4}\d{3,4}$/,
    "Course code must be 2-4 letters followed by 3-4 digits (e.g., CS101)."
  )
  .trim()
  .typeError("Course code must be a valid string.");

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

  export const departmentDescriptionSchema = Yup.string()
  .required("Department description is required.")
  .min(20, "Description must be at least 20 characters long.")
  .max(500, "Description must not exceed 500 characters.")
  .matches(
    /^[a-zA-Z0-9\s.,!?'"()_@#$%&*-/]+$/,
    "Description contains invalid characters. Only letters, numbers, and common punctuation are allowed."
  )
  .trim()
  .test(
    'no-urls',
    'Description should not contain any web addresses or links.',
    (value) => {
      if (value) {
        return !/(https?:\/\/[^\s]+)/.test(value);
      }
      return true;
    }
  )
  .typeError("Department description must be a valid string");

  export const specialtyDescriptionSchema = Yup.string()
  .required("Specialty description is required.")
  .min(20, "Specialty description must be at least 20 characters long.")
  .max(500, "Specialty description must not exceed 500 characters.")
  .matches(
    /^[a-zA-Z0-9\s.,!?'"()_@#$%&*-/]+$/,
    "Specialty description contains invalid characters. Only letters, numbers, and common punctuation are allowed."
  )
  .trim()
  .test(
    "no-urls",
    "Specialty description should not contain any web addresses or links.",
    (value) => {
      if (value) {
        return !/(https?:\/\/[^\s]+)/.test(value);
      }
      return true;
    }
  )
  .typeError("Specialty description must be a valid string");

  export const courseTitleSchema = Yup.string()
  .required("Course title is required.")
  .min(5, "Course title must be at least 5 characters long.")
  .max(150, "Course title must be less than 150 characters.")
  .matches(
    /^[a-zA-Z0-9\s:,'"-]+$/,
    "Course title can only contain letters, numbers, spaces, and punctuation like :,',-, and ''."
  )
  .trim()
  .test("no-double-spaces", "Course title should not contain double spaces", (value) => {
    return value && !/\s{2,}/.test(value);
  })
  .typeError("Course title must be a valid string");
 export  const registrationFeeValidationSchema = Yup.number()
  .required("Registration fee is required")
  .positive("Registration fee must be a positive number")
  .min(0, "Registration fee cannot be less than 0")
  .max(10000000, "Registration fee cannot exceed 10,000")
  .typeError("Registration fee must be a valid number")
  .test("valid-currency", "Registration fee must be a valid currency amount", (value) => {
    return /^\d+(\.\d{1,2})?$/.test(value);
  });

  export const schoolFeeValidationSchema = Yup.number()
  .required("School fee is required")
  .positive("School fee must be a positive number")
  .min(0, "School fee cannot be less than 0")
  .max(100000000, "School fee cannot exceed 100,000")
  .typeError("School fee must be a valid number")
  .test("valid-currency", "School fee must be a valid currency amount", (value) => {
    return /^\d+(\.\d{1,2})?$/.test(value);
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
  .optional();

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

