import * as Yup from "yup";


export const isValidMySQLDate = (value) => {
  if (!value) return false;

  const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
  if (!regex.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);

  if (year < 1000 || year > 9999) return false;
  if (month < 1 || month > 12) return false;

  const daysInMonth = new Date(year, month, 0).getDate();
  return day >= 1 && day <= daysInMonth;
};
const sanitizeInput = (value, removeEmojis = true) => {
  if (!value) return value;

  let cleaned = value
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\x00-\x1F\x7F]/g, "");

  if (removeEmojis) {
    cleaned = cleaned.replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF]|[\uFE0F])/g,
      ""
    );
  }

  return cleaned;
};
export const phoneValidationSchema = (options) => {
  const {
    optional = false,
    prefixes = ['6'],
    length = 9,
    errorMessage, 
  } = options || {};

  const prefixPattern = prefixes.map(p => `(?:${p})`).join('|'); 
  const finalRegex = new RegExp(`^(${prefixPattern})\\d{${length - prefixes[0].length}}$`);

  const defaultErrorMessage =
    `Phone number must start with one of ${prefixes.map(p => `'${p}'`).join(', ')} and be ${length} digits long.`;

  let schema = Yup.string().matches(
    finalRegex,
    errorMessage || defaultErrorMessage 
  );

  if (!optional) {
    schema = schema.required("Phone number is required.");
  } else {
    schema = schema.notRequired();
  }

  return schema;
};

export const emailValidationSchema = ({
  required = true,
  disposableDomains = ["mailinator.com", "tempmail.com", "guerrillamail.com"],
  blacklistedDomains = ["example.com", "test.com"],
  messages = {}
} = {}) => {
  let schema = Yup.string()
    .transform((val) => (val ? val.trim().toLowerCase() : val)) // sanitize
    .email(messages.email || "Please enter a valid email address (e.g., user@domain.com).")
    .max(254, messages.max || "Email address must be less than 255 characters.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      messages.format || "The email address format is invalid."
    )
    .test("no-ip-address-domain", messages.ip || "Email domain cannot be an IP address.", (value) => {
      if (!value) return true;
      const domain = value.split("@")[1];
      return !/^\[?\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]?$/.test(domain);
    })
    .test("no-temp-domains", messages.temp || "Disposable email addresses are not allowed.", (value) => {
      if (!value) return true;
      const domain = value.split("@")[1];
      return !disposableDomains.includes(domain);
    })
    .test("no-blacklist", messages.blacklist || "This email domain is restricted. Please use another email.", (value) => {
      if (!value) return true;
      const domain = value.split("@")[1];
      return !blacklistedDomains.includes(domain);
    })
    .test("no-leading-trailing-dot", messages.dot || "Email cannot start or end with a dot.", (value) => {
      if (!value) return true;
      return !value.startsWith(".") && !value.endsWith(".");
    })
    .test("no-consecutive-dots", messages.dots || "Email cannot contain consecutive dots.", (value) => {
      if (!value) return true;
      return !/\.\./.test(value);
    })
    .transform((val) => (val === "" ? null : val));

  if (required) {
    schema = schema.required(messages.required || "Email address is required.");
  } else {
    schema = schema.nullable();
  }

  return schema;
};

export const courseCodeSchema = ({
  min = 4,
  max = 10,
  required = true,
  messages = {}
} = {}) => {
  let schema = Yup.string()
    .trim()
    .min(min, messages.min || `Course code must be at least ${min} characters long.`)
    .max(max, messages.max || `Course code cannot be more than ${max} characters.`)
    .matches(
      /^[A-Za-z0-9]+$/, // letters & numbers only, any order
      messages.invalid || "Course code can only contain letters and numbers."
    )
    .transform((val) => (val === "" ? null : val));

  if (required) {
    schema = schema.required(messages.required || "Course code is required.");
  } else {
    schema = schema.nullable();
  }

  return schema;
};

export const addressSchema = ({
  min = 3,
  max = 255,
  required = true,
  messages = {},
} = {}) => {
  let schema = Yup.string()
    .trim()
    .min(
      min,
      messages.min || `Address must be at least ${min} characters long.`
    )
    .max(
      max,
      messages.max || `Address cannot be more than ${max} characters.`
    )
    .test(
      "valid-address",
      messages.invalid || "Address can only contain letters, numbers, and common punctuation like commas, periods, and hyphens.",
      (value) => {
        return (
          value === null ||
          /^[A-Za-z0-9\s.,\-\/]*$/.test(value)
        );
      }
    )
    .transform((val) => (val === "" ? null : val));

  if (required) {
    schema = schema.required(messages.required || "Address is required.");
  } else {
    schema = schema.nullable();
  }

  return schema;
};

export const dateValidationSchema = ({
  required = true,
  futureOrToday = false,
  messages = {}
} = {}) => {
  let schema = Yup.string()
    .trim()
    .matches(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      messages.format || "Invalid date format (YYYY-MM-DD)"
    )
    .test(
      "is-valid-date",
      messages.invalid || "Invalid date",
      (val) => !val || isValidMySQLDate(val)
    )
    .transform((val) => (val === "" ? null : val));

  if (futureOrToday) {
    schema = schema.test(
      "is-future-or-today",
      messages.futureOrToday || "Date must be today or in the future",
      (val) => {
        if (!val) return true; // let required handle emptiness
        if (!isValidMySQLDate(val)) return false;

        const today = new Date();
        today.setHours(0, 0, 0, 0); // reset time

        const inputDate = new Date(val);
        return inputDate >= today;
      }
    );
  }

  if (required) {
    schema = schema.required(messages.required || "Date is required");
  } else {
    schema = schema.nullable();
  }

  return schema;
};

export const dateRangeValidationSchema = ({
  optional = false,
  futureOnly = false,
} = {}) => {
  const buildDateSchema = (label) => {
    let schema = Yup.string()
      .matches(
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
        "Invalid date format (YYYY-MM-DD)"
      )
      .test("is-valid-date", "Invalid date", (value) =>
        value ? isValidMySQLDate(value) : true
      );

    if (!optional) {
      schema = schema.required(`${label} is required`);
    }

    if (futureOnly) {
      schema = schema.test(
        "is-today-or-future",
        `${label} must be today or a future date`,
        (value) => {
          if (!value || !isValidMySQLDate(value)) return true;
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const inputDate = new Date(value);
          return inputDate >= today;
        }
      );
    }

    return schema;
  };

  return Yup.object().shape({
    start_date: buildDateSchema("Start date"),
    end_date: buildDateSchema("End date").test(
      "is-after-start",
      "End date must be after start date",
      function (value) {
        const { start_date } = this.parent;
        // Only validate if both fields are filled and valid
        if (!value || !start_date || !isValidMySQLDate(value) || !isValidMySQLDate(start_date)) {
          return true;
        }
        return new Date(value) >= new Date(start_date);
      }
    ),
  });
};

export const textareaSchema = ({
  min = 20,
  max = 500,
  required = true,
  allowEmojis = false,
  messages = {}
} = {}) => {
  let schema = Yup.string()
    .transform((value) => sanitizeInput(value?.trim() || "", !allowEmojis))
    .min(min, messages.min || `Text must be at least ${min} characters long.`)
    .max(max, messages.max || `Text must not exceed ${max} characters.`)
    .matches(
      /^[\w\s.,!?'"()\-:;#&@/]*$/u,
      messages.invalid || "Text contains invalid or unsafe characters."
    )
    .test(
      "no-scripts",
      messages.scripts || "Text cannot contain scripts or HTML tags.",
      (val) => !/<script|<\/script|<[^>]+>/i.test(val || "")
    )
    .transform((value) => (value === "" ? null : value));

  if (required) {
    schema = schema.required(messages.required || "This field is required.");
  } else {
    schema = schema.nullable();
  }

  return schema;
};

export const nameSchema = ({
  min = 2,
  max = 50,
  required = true,
  messages = {}
} = {}) => {
  let schema = Yup.string()
    .transform((value) => sanitizeInput(value?.trim() || "", true)) 
    .min(min, messages.min || `Name must be at least ${min} characters long.`)
    .max(max, messages.max || `Name must not exceed ${max} characters.`)
    .matches(
      /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/u,
      messages.invalid || "Name can only contain letters, spaces, apostrophes, and hyphens."
    )
    .test(
      "no-numbers",
      messages.noNumbers || "Name cannot contain numbers.",
      (val) => !/[0-9]/.test(val || "")
    )
    .test(
      "no-html",
      messages.html || "Name cannot contain HTML tags.",
      (val) => !/<[^>]*>/g.test(val || "")
    )
    .transform((value) => (value === "" ? null : value));

  if (required) {
    schema = schema.required(messages.required || "This field is required.");
  } else {
    schema = schema.nullable();
  }

  return schema;
};

export const numberSchema = ({
  min = 0,
  max = 1000,
  required = true,
  integerOnly = false,
  messages = {}
} = {}) => {
  let schema = Yup.number()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        const trimmed = originalValue.trim();

        if (trimmed === "") return undefined;
        if (!/^-?\d+(\.\d+)?$/.test(trimmed)) return NaN; 

        const num = Number(trimmed);
        if (!isFinite(num)) return NaN;

        return num;
      }
      return isNaN(value) ? undefined : value;
    })
    .typeError(messages.typeError || "Value must be a valid number")
    .min(min, messages.min || `Number must be at least ${min}`)
    .max(max, messages.max || `Number must be at most ${max}`);

  if (integerOnly) {
    schema = schema.test(
      "is-integer",
      messages.integer || "Value must be an integer",
      (val) => val == null || Number.isInteger(val)
    );
  }

  if (required) {
    schema = schema.required(messages.required || "Number is required");
  } else {
    schema = schema.nullable();
  }

  return schema;
};