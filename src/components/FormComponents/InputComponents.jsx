import { useState, useEffect, useCallback, useImperativeHandle, forwardRef, useRef } from "react";
import { Icon } from "@iconify/react";
import InputMask from "react-input-mask";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from 'framer-motion';
function PhoneNumberInputComponent(
  { onChange, value, onValidationChange, validationSchema, optional = false },
  ref
) {
  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  useEffect(() => {
    setPhoneNumber(value || "");
  }, [value]);

  const validatePhoneNumber = async (phone) => {
    if (optional && !phone) {
      setError("");
      onValidationChange?.(true);
      return true;
    }

    if (!validationSchema) {
      onValidationChange?.(true);
      return true;
    }

    try {
      await validationSchema.validate(phone);
      setError("");
      onValidationChange?.(true);
      return true;
    } catch (err) {
      setError(err.message);
      onValidationChange?.(false);
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    triggerValidation: async () => {
      const rawValue = phoneNumber.replace(/\D/g, "");
      if (!rawValue) {
         setIsTouched(true);
         return validatePhoneNumber(rawValue);
      }
      return await validatePhoneNumber(rawValue);
    },
  }));

  const handleInputChange = (e) => {
    let rawValue = e.target.value.replace(/\D/g, "");
    if (rawValue.length > 9) {
      rawValue = rawValue.slice(0, 9);
    }

    const formattedValue = rawValue
      .replace(/(\d{3})(\d{1,3})?(\d{1,3})?/, (match, p1, p2, p3) => {
        let parts = [p1];
        if (p2) parts.push(p2);
        if (p3) parts.push(p3);
        return parts.join("-");
      })
      .trim();

    setPhoneNumber(formattedValue);
    onChange?.(rawValue);

    if (isTouched) {
      validatePhoneNumber(rawValue);
    }
  };

  const handleFocus = () => {
    setIsTouched(true);
  };

  const handleBlur = () => {
    validatePhoneNumber(phoneNumber.replace(/\D/g, ""));
  };

  const feedbackContent =
    isTouched && error
      ? error
      : isTouched && !error && phoneNumber && "Looks good!";

  const feedbackClasses = [
    "transition-all font-size-sm",
    isTouched && error
      ? "invalid-feedback transition-all"
      : isTouched && !error && phoneNumber
      ? "valid-feedback transition-all"
      : null,
    isTouched && (error || (!error && phoneNumber))
      ? "opacity-100 transition-all"
      : "opacity-0 transition-all",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-container">
      <div className="input-group position-relative z-0 has-validation">
        <span className={`${darkMode ? 'input-group-text-dark' : null} input-group-text font-size-sm  fw-semibold `}  id="basic-addon1">
          <Icon icon="twemoji:flag-cameroon" width="24" height="24" />
        </span>
        <input
          type="tel"
          className={`form-control font-size-sm p-2 ${darkMode ? 'dark-mode-input' : null}   ${
            isTouched && error ? "is-invalid" : ""
          } ${isTouched && !error && phoneNumber ? "is-valid" : ""}`}
          placeholder="6XX-XXX-XXX"
          aria-label="tel"
          aria-describedby="basic-addon1"
          maxLength={12}
          value={phoneNumber}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
      </div>
    </div>
  );
}

export const PhoneNumberInput = forwardRef(PhoneNumberInputComponent);


export const TextInput = forwardRef(
  ({ onChange, onValidationChange, value, placeholder, validationSchema, className, type = "text" }, ref) => {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [inputValue, setInputValue] = useState(value || "");
    const [inputError, setInputError] = useState("");
    const [isInputTouched, setIsInputTouched] = useState(false);
    
    const validateInput = async (currentValue) => {
      if (!validationSchema) {
        onValidationChange(true);
        return true;
      }
      try {
        await validationSchema.validate(currentValue);
        setInputError("");
        onValidationChange(true);
        return true;
      } catch (err) {
        setInputError(err.message);
        onValidationChange(false);
        return false;
      }
    };

    const handleInputChange = (e) => {
      const { value: newValue } = e.target;
      setInputValue(newValue);
      onChange(newValue);
      if (isInputTouched) {
        validateInput(newValue);
      }
    };

    const handleInputFocus = () => {
      setIsInputTouched(true);
      validateInput(inputValue);
    };

    const handleInputBlur = () => {
      validateInput(inputValue);
    };

    // 👇 Expose function to parent
    useImperativeHandle(ref, () => ({
      triggerValidation: () => {
        setIsInputTouched(true);
        return validateInput(inputValue);
      },
      getValue: () => inputValue,
    }));

    const feedbackContent =
      isInputTouched && inputError
        ? inputError
        : isInputTouched && !inputError && inputValue && "Looks Good!";

    const feedbackClasses = [
      "transition-all font-size-sm",
      isInputTouched && inputError
        ? "invalid-feedback transition-all"
        : isInputTouched && !inputError && inputValue
        ? "valid-feedback transition-all"
        : null,
      isInputTouched && (inputError || (!inputError && inputValue))
        ? "opacity-100 transition-all"
        : "opacity-0 transition-all",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="input-container">
        <input
          type={type}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={`${className} form-control font-size-sm p-2 ${darkMode ? 'dark-mode-input' : null} ${
            isInputTouched && inputError ? "is-invalid" : ""
          } ${isInputTouched && !inputError && inputValue ? "is-valid" : ""}`}
        />
        <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
      </div>
    );
  }
);

export const TextAreaInput = forwardRef(
  (
    {
      onChange,
      onValidationChange,
      value,
      placeholder,
      validationSchema,
      optional = false,
      rows = 5,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [inputError, setInputError] = useState("");
    const [isInputTouched, setIsInputTouched] = useState(false);
    const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
      setInputValue(value || "");
      if (isInputTouched) {
        validateInput(value || "");
      } else if (!value && optional) {
        onValidationChange(true);
      }
    }, [value, isInputTouched, optional]);

    const validateInput = async (currentValue) => {
      if (
        optional &&
        (currentValue === "" || currentValue === null || currentValue === undefined)
      ) {
        setInputError("");
        onValidationChange(true);
        return true;
      }

      if (!validationSchema) {
        onValidationChange(true);
        return true;
      }

      try {
        await validationSchema.validate(currentValue);
        setInputError("");
        onValidationChange(true);
        return true;
      } catch (err) {
        setInputError(err.message);
        onValidationChange(false);
        return false;
      }
    };

    useImperativeHandle(ref, () => ({
      triggerValidation: () => {
        if (!inputValue && !optional) {
           setIsInputTouched(true);
           return validateInput(inputValue);
        }
        return validateInput(inputValue);
      },
    }));

    const handleInputChange = (e) => {
      const { value: newValue } = e.target;
      setInputValue(newValue);
      onChange(newValue);
      if (isInputTouched) {
        validateInput(newValue);
      }
    };

    const handleInputFocus = () => {
      setIsInputTouched(true);
      if (inputValue) {
        validateInput(inputValue);
      }
    };

    const handleInputBlur = () => {
      validateInput(inputValue);
    };

    const feedbackContent =
      isInputTouched && inputError
        ? inputError
        : isInputTouched && !inputError && inputValue
        ? "Looks Good!"
        : null;

    const feedbackClasses = [
      "transition-all font-size-sm",
      isInputTouched && inputError
        ? "invalid-feedback transition-all"
        : isInputTouched && !inputError && inputValue
        ? "valid-feedback transition-all"
        : null,
      isInputTouched && (inputError || (!inputError && inputValue))
        ? "opacity-100 transition-all"
        : "opacity-0 transition-all",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="text-input-container">
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          rows={rows}
          className={`form-control font-size-sm p-2 ${darkMode ? 'dark-mode-input' : null} ${
            isInputTouched && inputError ? "is-invalid" : ""
          } ${isInputTouched && !inputError && inputValue ? "is-valid" : ""}`}
        />
        <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
      </div>
    );
  }
);

export const NumberInput = forwardRef(function NumberInput(
  {
    onChange,
    onValidationChange,
    value,
    placeholder,
    validationSchema,
    step = "1",
    type = "number",
    optional = false,
  },
  ref
) {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  useEffect(() => {
    setInputValue(value || "");

    if (isInputTouched) {
      validateInput(value || "");
    } else if (!value && optional) {
      onValidationChange(true);
    }
  }, [value, isInputTouched, optional]);

  const validateInput = async (currentValue) => {
    if (optional && (currentValue === "" || currentValue == null)) {
      setInputError("");
      onValidationChange(true);
      return true;
    }

    if (!validationSchema) {
      onValidationChange(true);
      return true;
    }

    try {
      await validationSchema.validate(currentValue);
      setInputError("");
      onValidationChange(true);
      return true;
    } catch (err) {
      setInputError(err.message);
      onValidationChange(false);
      return false;
    }
  };

  // ✅ Expose manual check to parent
  useImperativeHandle(ref, () => ({
    triggerValidation: () => {
        setIsInputTouched(true)
       return validateInput(inputValue)
    },
    resetField: () => {
      setInputValue("");
      setInputError("");
      setIsInputTouched(false);
      onValidationChange(optional ? true : false);
    },
  }));

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);

    if (isInputTouched) {
      validateInput(newValue);
    }
  };

  const handleInputFocus = () => {
    setIsInputTouched(true);
    validateInput(inputValue);
  };

  const handleInputBlur = () => {
    validateInput(inputValue);
  };

  const feedbackContent =
    isInputTouched && inputError
      ? inputError
      : isInputTouched && !inputError && inputValue !== ""
      ? "Looks Good!"
      : null;

  const feedbackClasses = [
    "transition-all font-size-sm",
    isInputTouched && inputError
      ? "invalid-feedback"
      : isInputTouched && !inputError && inputValue !== ""
      ? "valid-feedback"
      : null,
    isInputTouched && (inputError || (!inputError && inputValue !== ""))
      ? "opacity-100"
      : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-container">
      <input
        type={type}
        step={step}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholder={placeholder}
        className={`form-control font-size-sm p-2 ${darkMode ? 'dark-mode-input' : null} ${
          isInputTouched && inputError ? "is-invalid" : ""
        } ${
          isInputTouched && !inputError && inputValue !== "" ? "is-valid" : ""
        }`}
      />
      <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
    </div>
  );
});

function DateInputComponent(
  {
    value,
    onChange,
    onValidationChange,
    placeholder = "YYYY-MM-DD",
    validationSchema,
    id,
    name,
  },
  ref
) {
  const [displayValue, setDisplayValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  useEffect(() => {
    setDisplayValue(value || "");
  }, [value]);

  const validateInput = useCallback(
    async (currentValue) => {
      if (!validationSchema) {
        onValidationChange?.(true);
        return true;
      }
      try {
        await validationSchema.validate(currentValue);
        setInputError("");
        onValidationChange?.(true);
        return true;
      } catch (err) {
        setInputError(err.message);
        onValidationChange?.(false);
        return false;
      }
    },
    [validationSchema, onValidationChange]
  );

  const handleChange = useCallback(
    (e) => {
      const rawValue = e.target.value;
      setDisplayValue(rawValue);

      const unmaskedValue = rawValue.replace(/[^0-9]/g, "");

      if (unmaskedValue.length === 8) {
        onChange(rawValue);
      } else {
        onChange("");
      }

      if (isInputTouched) {
        validateInput(rawValue);
      }
    },
    [onChange, isInputTouched, validateInput]
  );

  const handleFocus = () => {
    setIsInputTouched(true);
    validateInput(displayValue);
  };

  const handleBlur = () => {
    validateInput(displayValue);
  };

  useImperativeHandle(ref, () => ({
    async triggerValidation() {
      if (!displayValue) {
        setIsInputTouched(true);
        return validateInput(displayValue);
      }
      return validateInput(displayValue);
    },
  }));

  const feedbackContent =
    isInputTouched && inputError
      ? inputError
      : isInputTouched && !inputError && displayValue && "Looks Good!";

  const feedbackClasses = [
    "transition-all font-size-sm",
    isInputTouched && inputError
      ? "invalid-feedback"
      : isInputTouched && !inputError && displayValue
      ? "valid-feedback"
      : null,
    isInputTouched && (inputError || (!inputError && displayValue))
      ? "opacity-100"
      : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-container">
      <InputMask
        mask="9999-99-99"
        maskChar="_"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id={id}
        name={name}
        placeholder={placeholder}
        aria-describedby={`${id}-hint`}
        className={`form-control date-input-field p-2 font-size-sm ${darkMode && 'dark-mode-input'} ${
          isInputTouched && inputError
            ? "is-invalid"
            : isInputTouched && !inputError && displayValue
            ? "is-valid"
            : ""
        }`}
      />
      <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
    </div>
  );
}
export const DateInput = forwardRef(DateInputComponent);

export const TimeInput = forwardRef(function TimeInput(
  {
    value,
    onChange,
    id,
    name,
    placeholder = "HH:MM",
    validationSchema,
    optional = false,
    onValidationChange, // ✅ added
  },
  ref
) {
  const [displayValue, setDisplayValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    setDisplayValue(value || "");
    if (isInputTouched) {
      validateInput(value || "");
    } else if (!value && optional) {
      setInputError("");
      onValidationChange?.(true);
    }
  }, [value, isInputTouched, optional]);

  const validateInput = async (currentValue) => {
    if (optional && (currentValue === "" || currentValue == null)) {
      setInputError("");
      onValidationChange?.(true); 
      return true;
    }
    if (!validationSchema) {
      setInputError("");
      onValidationChange?.(true); 
      return true;
    }
    try {
      await validationSchema.validate(currentValue);
      setInputError("");
      onValidationChange?.(true);
      return true;
    } catch (err) {
      setInputError(err.message);
      onValidationChange?.(false);
      return false;
    }
  };

  useImperativeHandle(ref, () => ({
    triggerValidation: () => {
      setIsInputTouched(true);
      return validateInput(displayValue);
    },
    resetField: () => {
      setDisplayValue("");
      setInputError("");
      setIsInputTouched(false);
      onValidationChange?.(optional ? true : false);
    },
  }));

  const handleChange = (e) => {
    const rawValue = e.target.value;
    setDisplayValue(rawValue);
    const unmaskedValue = rawValue.replace(/[^0-9]/g, "");
    if (unmaskedValue.length === 4) {
      onChange(rawValue);
      if (isInputTouched) {
        validateInput(rawValue);
      }
    } else {
      onChange("");
      onValidationChange?.(false); 
    }
  };

  const handleFocus = () => {
    setIsInputTouched(true);
    validateInput(displayValue);
  };

  const handleBlur = () => {
    validateInput(displayValue);
  };

  const feedbackContent =
    isInputTouched && inputError
      ? inputError
      : isInputTouched && !inputError && displayValue !== ""
      ? "Looks Good!"
      : null;

  const feedbackClasses = [
    "transition-all font-size-sm",
    isInputTouched && inputError
      ? "invalid-feedback"
      : isInputTouched && !inputError && displayValue !== ""
      ? "valid-feedback"
      : null,
    isInputTouched && (inputError || (!inputError && displayValue !== ""))
      ? "opacity-100"
      : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-container">
      <InputMask
        mask="99:99"
        maskChar="_"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`form-control font-size-sm p-2 ${
          darkMode ? "dark-mode-input" : null
        } ${isInputTouched && inputError ? "is-invalid" : ""} ${
          isInputTouched && !inputError && displayValue !== "" ? "is-valid" : ""
        }`}
      />
      <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
    </div>
  );
});

export const InputGroup = forwardRef(
  (
    {
      onChange,
      onValidationChange,
      value,
      placeholder,
      validationSchema,
      step = "1",
      type = "number",
      InputGroupText,
      optional = false,
    },
    ref
  ) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [inputError, setInputError] = useState("");
    const [isInputTouched, setIsInputTouched] = useState(false);
    const darkMode = useSelector((state) => state.theme.darkMode);
    useEffect(() => {
      setInputValue(value || "");
      if (isInputTouched) {
        validateInput(value || "");
      } else if (!value && optional) {
        onValidationChange(true);
      }
    }, [value, isInputTouched, optional]);

    const validateInput = async (currentValue) => {
      if (
        optional &&
        (currentValue === "" || currentValue === null || currentValue === undefined)
      ) {
        setInputError("");
        onValidationChange(true);
        return true;
      }

      if (!validationSchema) {
        onValidationChange(true);
        return true;
      }

      try {
        await validationSchema.validate(currentValue);
        setInputError("");
        onValidationChange(true);
        return true;
      } catch (err) {
        setInputError(err.message);
        onValidationChange(false);
        return false;
      }
    };

    const handleInputChange = (e) => {
      const { value: newValue } = e.target;
      setInputValue(newValue);
      onChange(newValue);

      if (isInputTouched) {
        validateInput(newValue);
      }
    };

    const handleInputFocus = () => {
      setIsInputTouched(true);
      validateInput(inputValue);
    };

    const handleInputBlur = () => {
      validateInput(inputValue);
    };
  
    useImperativeHandle(ref, () => ({
      triggerValidation: () => {
        if (!inputValue && !optional) {
          setIsInputTouched(true)
          return validateInput(inputValue);
        }
        return true;
      },
    }));

    const feedbackContent =
      isInputTouched && inputError
        ? inputError
        : isInputTouched && !inputError && inputValue && "Looks Good!";

    const feedbackClasses = [
      "transition-all font-size-sm",
      isInputTouched && inputError
        ? "invalid-feedback transition-all"
        : isInputTouched && !inputError && inputValue
        ? "valid-feedback transition-all"
        : null,
      isInputTouched && (inputError || (!inputError && inputValue))
        ? "opacity-100 transition-all"
        : "opacity-0 transition-all",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="input-container">
        <div className="input-group position-relative z-0 has-validation">
          <input
            type={type}
            step={step}
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            className={`form-control font-size-sm p-2  ${darkMode ? 'dark-mode-input' : null} ${
              isInputTouched && inputError ? "is-invalid" : ""
            } ${
              isInputTouched && !inputError && inputValue !== "" ? "is-valid" : ""
            }`}
          />
          <span className={`${darkMode ? 'input-group-text-dark' : null} input-group-text font-size-sm  fw-semibold `} id="basic-addon1">
            {InputGroupText}
          </span>
          <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
        </div>
      </div>
    );
  }
);

export const DateRangeInput = forwardRef(
  (
    {
      startValue,
      endValue,
      onChange,
      onStartDateChange,
      onEndDateChange,
      onStartDateValidationChange,
      onEndDateValidationChange,
      validationSchema,
      placeholderStart = "YYYY-MM-DD",
      placeholderEnd = "YYYY-MM-DD",
    },
    ref
  ) => {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [dates, setDates] = useState({
      start_date: startValue || "",
      end_date: endValue || "",
    });

    const [errors, setErrors] = useState({
      start_date: "",
      end_date: "",
    });

    const [touched, setTouched] = useState({
      start_date: false,
      end_date: false,
    });

    // 🔹 Independent field validation
    const validateStartDate = async (value) => {
      if (!validationSchema) {
        onStartDateValidationChange?.(true);
        return true; // Explicitly return true if no schema
      }

      try {
        // Validate only start_date field
        await validationSchema.fields.start_date.validate(value);
        setErrors((prev) => ({ ...prev, start_date: "" }));
        onStartDateValidationChange?.(true);
        return true; // Validation passed
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          start_date: err.message || "Invalid start date",
        }));
        onStartDateValidationChange?.(false);
        return false; // Validation failed
      }
    };

    const validateEndDate = async (value) => {
      if (!validationSchema) {
        onEndDateValidationChange?.(true);
        return true; // Explicitly return true if no schema
      }

      try {
        // Validate end_date field, considering start_date for is-after-start test
        await validationSchema.validate(
          { start_date: dates.start_date, end_date: value },
          { abortEarly: false }
        );
        setErrors((prev) => ({ ...prev, end_date: "" }));
        onEndDateValidationChange?.(true);
        return true; // Validation passed
      } catch (err) {
        const fieldError = err.inner.find((e) => e.path === "end_date");
        setErrors((prev) => ({
          ...prev,
          end_date: fieldError ? fieldError.message : "Invalid end date",
        }));
        onEndDateValidationChange?.(false);
        return false; // Validation failed
      }
    };

    // 🔹 Handle input changes
    const handleChange = (field) => (e) => {
      const rawValue = e.target.value;
      setDates((prev) => ({ ...prev, [field]: rawValue }));
      onChange?.({ ...dates, [field]: rawValue });

      if (field === "start_date") {
        onStartDateChange?.(rawValue);
        if (touched.start_date) validateStartDate(rawValue);
      }
      if (field === "end_date") {
        onEndDateChange?.(rawValue);
        if (touched.end_date) validateEndDate(rawValue);
      }
    };

    const handleFocus = (field) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (field === "start_date") validateStartDate(dates.start_date);
      if (field === "end_date") validateEndDate(dates.end_date);
    };

    // 🔹 Expose granular validation to parent
    useImperativeHandle(ref, () => ({
      preValidateStart: async () => {
        if (!dates.start_date) {
          setTouched((prev) => ({ ...prev, start_date: true }));
        }
        return await validateStartDate(dates.start_date); // Return the validation result
      },
      preValidateEnd: async () => {
        if (!dates.end_date) {
          setTouched((prev) => ({ ...prev, end_date: true }));
        }
        return await validateEndDate(dates.end_date); // Return the validation result
      },
    }));

    const feedbackClasses = (field) =>
      [
        "transition-all font-size-sm",
        touched[field] && errors[field]
          ? "invalid-feedback"
          : touched[field] && !errors[field] && dates[field]
          ? "valid-feedback"
          : null,
        touched[field] && (errors[field] || (!errors[field] && dates[field]))
          ? "opacity-100"
          : "opacity-0",
      ]
        .filter(Boolean)
        .join(" ");

    const feedbackMessage = (field) =>
      touched[field] && errors[field]
        ? errors[field]
        : touched[field] && !errors[field] && dates[field]
        ? "Looks Good!"
        : "";

    return (
      <div
        className="d-flex flex-row align-items-center gap-2 w-100"
        style={{ height: "11dvh" }}
      >
        {/* Start Date */}
        <div className="input-container w-50">
          <label htmlFor="startDate" className="font-size-sm">
            Start Date
          </label>
          <InputMask
            mask="9999-99-99"
            maskChar="_"
            value={dates.start_date}
            onChange={handleChange("start_date")}
            onFocus={handleFocus("start_date")}
            onBlur={handleFocus("start_date")}
            placeholder={placeholderStart}
            className={`form-control w-100 font-size-sm p-2 ${darkMode ? 'dark-mode-input' : null} ${
              touched.start_date && errors.start_date ? "is-invalid" : ""
            } ${
              touched.start_date && !errors.start_date && dates.start_date
                ? "is-valid"
                : ""
            }`}
          />
          <div
            className={`${feedbackClasses("start_date")} font-size-sm mt-auto`}
          >
            {feedbackMessage("start_date")}
          </div>
        </div>

        {/* End Date */}
        <div className="input-container w-50">
          <label htmlFor="endDate" className="font-size-sm">
            End Date
          </label>
          <InputMask
            mask="9999-99-99"
            maskChar="_"
            value={dates.end_date}
            onChange={handleChange("end_date")}
            onFocus={handleFocus("end_date")}
            onBlur={handleFocus("end_date")}
            placeholder={placeholderEnd}
            className={`form-control w-100 p-2 font-size-sm ${darkMode ? 'dark-mode-input' : null} ${
              touched.end_date && errors.end_date ? "is-invalid" : ""
            } ${
              touched.end_date && !errors.end_date && dates.end_date
                ? "is-valid"
                : ""
            }`}
          />
          <div
            className={`${feedbackClasses("end_date")} font-size-sm mt-auto`}
          >
            {feedbackMessage("end_date")}
          </div>
        </div>
      </div>
    );
  }
);

export const TimeRangeInput = forwardRef(
  (
    {
      startValue,
      endValue,
      onChange,
      onStartTimeChange,
      onEndTimeChange,
      onStartTimeValidationChange,
      onEndTimeValidationChange,
      validationSchema,
      placeholderStart = "HH:MM",
      placeholderEnd = "HH:MM",
    },
    ref
  ) => {
    const darkMode = useSelector((state) => state.theme.darkMode);
    const [times, setTimes] = useState({
      start_time: startValue || "",
      end_time: endValue || "",
    });

    const [errors, setErrors] = useState({
      start_time: "",
      end_time: "",
    });

    const [touched, setTouched] = useState({
      start_time: false,
      end_time: false,
    });

    // 🔹 Independent field validation
    const validateStartTime = async (value) => {
      if (!validationSchema) {
        onStartTimeValidationChange?.(true);
        return true;
      }

      try {
        await validationSchema.fields.start_time.validate(value);
        setErrors((prev) => ({ ...prev, start_time: "" }));
        onStartTimeValidationChange?.(true);
        return true;
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          start_time: err.message || "Invalid start time",
        }));
        onStartTimeValidationChange?.(false);
        return false;
      }
    };

    const validateEndTime = async (value) => {
      if (!validationSchema) {
        onEndTimeValidationChange?.(true);
        return true;
      }

      try {
        await validationSchema.validate(
          { start_time: times.start_time, end_time: value },
          { abortEarly: false }
        );
        setErrors((prev) => ({ ...prev, end_time: "" }));
        onEndTimeValidationChange?.(true);
        return true;
      } catch (err) {
        const fieldError = err.inner.find((e) => e.path === "end_time");
        setErrors((prev) => ({
          ...prev,
          end_time: fieldError ? fieldError.message : "Invalid end time",
        }));
        onEndTimeValidationChange?.(false);
        return false;
      }
    };

    // 🔹 Handle input changes
    const handleChange = (field) => (e) => {
      const rawValue = e.target.value;
      setTimes((prev) => ({ ...prev, [field]: rawValue }));
      onChange?.({ ...times, [field]: rawValue });

      if (field === "start_time") {
        onStartTimeChange?.(rawValue);
        if (touched.start_time) validateStartTime(rawValue);
      }
      if (field === "end_time") {
        onEndTimeChange?.(rawValue);
        if (touched.end_time) validateEndTime(rawValue);
      }
    };

    const handleFocus = (field) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (field === "start_time") validateStartTime(times.start_time);
      if (field === "end_time") validateEndTime(times.end_time);
    };

    // 🔹 Expose granular validation to parent
    useImperativeHandle(ref, () => ({
      preValidateStart: async () => {
        if (!times.start_time) {
          setTouched((prev) => ({ ...prev, start_time: true }));
        }
        return await validateStartTime(times.start_time);
      },
      preValidateEnd: async () => {
        if (!times.end_time) {
          setTouched((prev) => ({ ...prev, end_time: true }));
        }
        return await validateEndTime(times.end_time);
      },
    }));

    const feedbackClasses = (field) =>
      [
        "transition-all font-size-sm",
        touched[field] && errors[field]
          ? "invalid-feedback"
          : touched[field] && !errors[field] && times[field]
          ? "valid-feedback"
          : null,
        touched[field] && (errors[field] || (!errors[field] && times[field]))
          ? "opacity-100"
          : "opacity-0",
      ]
        .filter(Boolean)
        .join(" ");

    const feedbackMessage = (field) =>
      touched[field] && errors[field]
        ? errors[field]
        : touched[field] && !errors[field] && times[field]
        ? "Looks Good!"
        : "";

    return (
      <div
        className="d-flex flex-row align-items-center gap-2 w-100"
      >
        <div className="w-50 d-flex flex-column" style={{ height:"9dvh" }}>
          <label htmlFor="startTime" className="font-size-sm">
            Start Time
          </label>
          <InputMask
            mask="99:99"
            maskChar="_"
            value={times.start_time}
            onChange={handleChange("start_time")}
            onFocus={handleFocus("start_time")}
            onBlur={handleFocus("start_time")}
            placeholder={placeholderStart}
            className={`form-control w-100 font-size-sm ${darkMode ? 'dark-mode-input' : null} p-2 ${
              touched.start_time && errors.start_time ? "is-invalid" : ""
            } ${
              touched.start_time && !errors.start_time && times.start_time
                ? "is-valid"
                : ""
            }`}
          />
          <div
            className={`${feedbackClasses("start_time")} font-size-sm mt-auto`}
          >
            {feedbackMessage("start_time")}
          </div>
        </div>

        <div className="w-50 d-flex flex-column w-50" style={{ height:"9dvh" }}>
          <label htmlFor="endTime" className="font-size-sm">
            End Time
          </label>
          <InputMask
            mask="99:99"
            maskChar="_"
            value={times.end_time}
            onChange={handleChange("end_time")}
            onFocus={handleFocus("end_time")}
            onBlur={handleFocus("end_time")}
            placeholder={placeholderEnd}
            className={`form-control w-100 p-2 font-size-sm ${darkMode ? 'dark-mode-input' : null} ${
              touched.end_time && errors.end_time ? "is-invalid" : ""
            } ${
              touched.end_time && !errors.end_time && times.end_time
                ? "is-valid"
                : ""
            }`}
          />
          <div
            className={`${feedbackClasses("end_time")} font-size-sm mt-auto`}
          >
            {feedbackMessage("end_time")} 
          </div>
        </div>
      </div>
    );
  }
);

export const DateTimeInput = forwardRef(function DateTimeInput(
  {
    value,
    onChange,
    id,
    name,
    placeholder = "YYYY-MM-DD HH:MM",
    validationSchema,
    optional = false,
    onValidationChange,
  },
  ref
) {
  const [displayValue, setDisplayValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    setDisplayValue(value || "");
    if (isInputTouched) {
      validateInput(value || "");
    } else if (!value && optional) {
      setInputError("");
      onValidationChange(true);
    }
  }, [value, isInputTouched, optional]);

  const validateInput = useCallback(
    async (currentValue) => {
      if (optional && (currentValue === "" || currentValue == null)) {
        setInputError("");
        onValidationChange(true);
        return true;
      }
      if (!validationSchema) {
        setInputError("");
        onValidationChange(true);
        return true;
      }
      try {
        await validationSchema.validate(currentValue);
        setInputError("");
        onValidationChange(true);
        return true;
      } catch (err) {
        setInputError(err.message);
        onValidationChange(false);
        return false;
      }
    },
    [optional, validationSchema, onValidationChange]
  );

  useImperativeHandle(ref, () => ({
    triggerValidation: async () => {
      setIsInputTouched(true);
      return validateInput(displayValue);
    },
    resetField: () => {
      setDisplayValue("");
      setInputError("");
      setIsInputTouched(false);
      onValidationChange(optional ? true : false);
    },
  }));

  const handleChange = (e) => {
  const rawValue = e.target.value;
  setDisplayValue(rawValue);

  const unmaskedValue = rawValue.replace(/[^0-9]/g, "");

  onChange(rawValue);

  if (unmaskedValue.length === 12) {
    if (isInputTouched) {
      validateInput(rawValue);
    }
  } else {
    if (isInputTouched) {
      onValidationChange(false);
    }
  }
};


  const handleFocus = () => {
    setIsInputTouched(true);
    validateInput(displayValue);
  };

  const handleBlur = () => {
    validateInput(displayValue);
  };

  const feedbackContent =
    isInputTouched && inputError
      ? inputError
      : isInputTouched && !inputError && displayValue !== ""
      ? "Looks Good!"
      : null;

  const feedbackClasses = [
    "transition-all font-size-sm",
    isInputTouched && inputError
      ? "invalid-feedback"
      : isInputTouched && !inputError && displayValue !== ""
      ? "valid-feedback"
      : null,
    isInputTouched && (inputError || (!inputError && displayValue !== ""))
      ? "opacity-100"
      : "opacity-0",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-container">
      <InputMask
        mask="9999-99-99 99:99"
        maskChar="_"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`form-control font-size-sm p-2 ${
          darkMode ? "dark-mode-input" : ""
        } ${isInputTouched && inputError ? "is-invalid" : ""} ${
          isInputTouched && !inputError && displayValue !== "" ? "is-valid" : ""
        }`}
      />
      <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
    </div>
  );
});

export const DateTimeRangeInput = forwardRef(
  (
    {
      startValue,
      endValue,
      onChange,
      onStartDateTimeChange,
      onEndDateTimeChange,
      onStartDateTimeValidationChange,
      onEndDateTimeValidationChange,
      validationSchema,
      placeholderStart = "YYYY-MM-DD HH:MM",
      placeholderEnd = "YYYY-MM-DD HH:MM",
      startDateLabel,
      endDateLabel
    },
    ref
  ) => {
    const darkMode = useSelector((state) => state.theme.darkMode);

    const [values, setValues] = useState({
      start_date: startValue || "",
      end_date: endValue || "",
    });

    const [errors, setErrors] = useState({
      start_date: "",
      end_date: "",
    });

    const [touched, setTouched] = useState({
      start_date: false,
      end_date: false,
    });

    // 🔹 Validate start datetime
    const validateStart = useCallback(
      async (value) => {
        if (!validationSchema) {
          onStartDateTimeValidationChange?.(true);
          return true;
        }
        try {
          await validationSchema.fields.start_date.validate(value);
          setErrors((prev) => ({ ...prev, start_date: "" }));
          onStartDateTimeValidationChange?.(true);
          return true;
        } catch (err) {
          setErrors((prev) => ({
            ...prev,
            start_date: err.message || "Invalid start date & time",
          }));
          onStartDateTimeValidationChange?.(false);
          return false;
        }
      },
      [validationSchema, onStartDateTimeValidationChange]
    );

    // 🔹 Validate end datetime (depends on start)
    const validateEnd = useCallback(
      async (value) => {
        if (!validationSchema) {
          onEndDateTimeValidationChange?.(true);
          return true;
        }
        try {
          await validationSchema.validate(
            { start_date: values.start_date, end_date: value },
            { abortEarly: false }
          );
          setErrors((prev) => ({ ...prev, end_date: "" }));
          onEndDateTimeValidationChange?.(true);
          return true;
        } catch (err) {
          const endError = err.inner?.find((e) => e.path === "end_date");
          setErrors((prev) => ({
            ...prev,
            end_date: endError ? endError.message : "Invalid end date & time",
          }));
          onEndDateTimeValidationChange?.(false);
          return false;
        }
      },
      [validationSchema, values.start_date, onEndDateTimeValidationChange]
    );

    // 🔹 Input change handler
    const handleChange = (field) => (e) => {
      const rawValue = e.target.value;
      setValues((prev) => ({ ...prev, [field]: rawValue }));
      onChange?.({ ...values, [field]: rawValue });

      if (field === "start_date") {
        onStartDateTimeChange?.(rawValue);
        if (touched.start_date) validateStart(rawValue);
      }
      if (field === "end_date") {
        onEndDateTimeChange?.(rawValue);
        if (touched.end_date) validateEnd(rawValue);
      }
    };

    // 🔹 Focus & blur handlers
    const handleFocus = (field) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (field === "start_date") validateStart(values.start_date);
      if (field === "end_date") validateEnd(values.end_date);
    };

    const handleBlur = (field) => () => {
      if (field === "start_date") validateStart(values.start_date);
      if (field === "end_date") validateEnd(values.end_date);
    };

    // 🔹 Expose imperative validation triggers
    useImperativeHandle(ref, () => ({
      async preValidateStart() {
        if (!values.start_date) {
          setTouched((prev) => ({ ...prev, start_date: true }));
        }
        return await validateStart(values.start_date);
      },
      async preValidateEnd() {
        if (!values.end_date) {
          setTouched((prev) => ({ ...prev, end_date: true }));
        }
        return await validateEnd(values.end_date);
      },
    }));

    // 🔹 Feedback helpers
    const feedbackClasses = (field) =>
      [
        "transition-all font-size-sm",
        touched[field] && errors[field]
          ? "invalid-feedback"
          : touched[field] && !errors[field] && values[field]
          ? "valid-feedback"
          : null,
        touched[field] && (errors[field] || (!errors[field] && values[field]))
          ? "opacity-100"
          : "opacity-0",
      ]
        .filter(Boolean)
        .join(" ");

    const feedbackMessage = (field) =>
      touched[field] && errors[field]
        ? errors[field]
        : touched[field] && !errors[field] && values[field]
        ? "Looks Good!"
        : "";

    return (
      <div
        className="d-flex flex-row align-items-center gap-2 w-100"
        style={{ height: "11dvh" }}
      >
        {/* Start DateTime */}
        <div className="input-container w-50">
          <label htmlFor="startDateTime" className="font-size-sm">
            {startDateLabel || "Start Date & Time"}
          </label>
          <InputMask
            mask="9999-99-99 99:99"
            maskChar="_"
            value={values.start_date}
            onChange={handleChange("start_date")}
            onFocus={handleFocus("start_date")}
            onBlur={handleBlur("start_date")}
            placeholder={placeholderStart}
            className={`form-control w-100 font-size-sm p-2 ${
              darkMode ? "dark-mode-input" : ""
            } ${
              touched.start_date && errors.start_date ? "is-invalid" : ""
            } ${
              touched.start_date && !errors.start_date && values.start_date
                ? "is-valid"
                : ""
            }`}
          />
          <div
            className={`${feedbackClasses("start_date")} font-size-sm mt-auto`}
          >
            {feedbackMessage("start_date")}
          </div>
        </div>

        {/* End DateTime */}
        <div className="input-container w-50">
          <label htmlFor="endDateTime" className="font-size-sm">
            {endDateLabel || "End Date & Time"}
          </label>
          <InputMask
            mask="9999-99-99 99:99"
            maskChar="_"
            value={values.end_date}
            onChange={handleChange("end_date")}
            onFocus={handleFocus("end_date")}
            onBlur={handleBlur("end_date")}
            placeholder={placeholderEnd}
            className={`form-control w-100 font-size-sm p-2 ${
              darkMode ? "dark-mode-input" : ""
            } ${
              touched.end_date && errors.end_date ? "is-invalid" : ""
            } ${
              touched.end_date && !errors.end_date && values.end_date
                ? "is-valid"
                : ""
            }`}
          />
          <div
            className={`${feedbackClasses("end_date")} font-size-sm mt-auto`}
          >
            {feedbackMessage("end_date")}
          </div>
        </div>
      </div>
    );
  }
);


export const ImageUploadComponent = ({
  onImageUpload,
  onImagePreview,
  maxFileSize = 5 * 1024 * 1024,
  accept = 'image/*',
  uploadText = 'Click Here To Upload Event Image',
  progressBarColor = 'green-bg',
}) => {
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [fileSize, setFileSize] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxFileSize) {
      setError(`File size exceeds ${formatFileSize(maxFileSize)} limit`);
      return;
    }

    setError('');
    setFileName(file.name);
    setFileSize(file.size);

    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        onImageUpload?.(file);
      }
    }, 200);

    // Generate preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      onImagePreview?.(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleCancel = () => {
    setFileName('');
    setProgress(0);
    setFileSize(0);
    setError('');
    fileInputRef.current.value = '';
    onImagePreview?.(null); // Clear preview
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="image-input-container">
      <label htmlFor="eventImage" className="font-size-sm">
        Event Image (optional)
      </label>
      <div 
        className="custom-image-input-container"
        onClick={handleClick}
      >
        <div className="d-flex flex-column justify-content-center align-items-center gap-2 w-100  rounded">
          <Icon icon="mage:image-plus" style={{ fontSize: '2rem' }} />
          <span className="font-size-sm">{uploadText}</span>
          <input
            type="file"
            id="eventImage"
            ref={fileInputRef}
            accept={accept}
            className="d-none"
            onChange={handleFileChange}
          />
        </div>
      </div>
      {error && (
        <motion.div
          className="text-danger font-size-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {error}
        </motion.div>
      )}
      <AnimatePresence>
        {fileName && !error && (
          <motion.div
            className="d-flex flex-row align-items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="d-flex flex-column w-100">
              <span className="font-size-sm fw-medium text-capitalize">{fileName}</span>
              <div className="progress">
                <motion.div
                  className={`progress-bar ${progressBarColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                ></motion.div>
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <span className="font-size-sm text-success">Looks Good</span>
                <motion.div
                className="d-flex flex-row align-items-center gap-1 font-size-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <span>{formatFileSize(fileSize)}</span>
                <Icon icon="ph:line-vertical" />
                <span>{progress}%</span>
              </motion.div>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  fontSize: '0.8rem',
                  textAlign: 'center',
                  outline: 'none',
                }}
                onClick={handleCancel}
              >
                <Icon
                  icon="material-symbols-light:cancel-outline"
                  className="fs-6"
                />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
