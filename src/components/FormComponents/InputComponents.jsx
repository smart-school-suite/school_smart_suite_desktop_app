import { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from "react";
import { Icon } from "@iconify/react";
import InputMask from "react-input-mask";

function PhoneNumberInputComponent(
  { onChange, value, onValidationChange, validationSchema, optional = false },
  ref
) {
  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // Sync external `value` only when it actually changes
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
        <span className="input-group-text" id="basic-addon1">
          <Icon icon="twemoji:flag-cameroon" width="24" height="24" />
        </span>
        <input
          type="tel"
          className={`form-control font-size-sm p-2 ${
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
  ({ onChange, onValidationChange, value, placeholder, validationSchema, type = "text" }, ref) => {
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
          className={`form-control font-size-sm p-2 ${
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
          className={`form-control font-size-sm p-2 ${
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
        validateInput(inputValue)
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
        className={`form-control font-size-sm p-2 ${
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
        setInputError("This field is required");
        onValidationChange?.(false);
        return false;
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
        className={`form-control date-input-field p-2 font-size-sm ${
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

export function TimeInput({
  value,
  onChange,
  id,
  name,
  placeholder = "HH:MM",
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const handleChange = useCallback(
    (e) => {
      const rawValue = e.target.value;
      setDisplayValue(rawValue);
      const unmaskedValue = rawValue.replace(/[^0-9]/g, "");
      if (unmaskedValue.length === 4) {
        onChange(rawValue);
      } else if (unmaskedValue.length < 4 && value !== "") {
        onChange("");
      }
    },
    [onChange, value]
  );

  return (
    <div className="input-container">
      <InputMask
        mask="99:99"
        maskChar="_"
        value={value}
        onChange={handleChange}
        id={id}
        name={name}
        placeholder={placeholder}
        aria-describedby={`${id}-hint`}
        className="form-control time-input-field is-invalid"
      />
    </div>
  );
}

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

    // 🔹 Field-level validation
    const validateField = async (field, value) => {
      if (!validationSchema) {
        if (field === "start_date") onStartDateValidationChange?.(true);
        if (field === "end_date") onEndDateValidationChange?.(true);
        return;
      }

      try {
        await validationSchema.validate(
          { ...dates, [field]: value },
          { abortEarly: false }
        );

        setErrors((prev) => ({ ...prev, [field]: "" }));

        if (field === "start_date") onStartDateValidationChange?.(true);
        if (field === "end_date") onEndDateValidationChange?.(true);
      } catch (err) {
        const fieldError = err.inner.find((e) => e.path === field);
        setErrors((prev) => ({
          ...prev,
          [field]: fieldError ? fieldError.message : "",
        }));

        if (field === "start_date") onStartDateValidationChange?.(false);
        if (field === "end_date") onEndDateValidationChange?.(false);
      }
    };

    // 🔹 Handle input changes
    const handleChange = (field) => (e) => {
      const rawValue = e.target.value;

      setDates((prev) => ({ ...prev, [field]: rawValue }));
      onChange?.({ ...dates, [field]: rawValue });

      if (field === "start_date") onStartDateChange?.(rawValue);
      if (field === "end_date") onEndDateChange?.(rawValue);

      if (touched[field]) validateField(field, rawValue);
    };

    const handleFocus = (field) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, dates[field]);
    };

    // 🔹 Expose granular validation to parent
    useImperativeHandle(ref, () => ({
      preValidateStart: () => {
        if (!dates.start_date) {
          setTouched((prev) => ({...prev, start_date:true}))
          return validateField("start_date", dates.start_date);
        }
        return true;
      },
      preValidateEnd: () => {
        if (!dates.end_date) {
          setTouched((prev) => ({...prev, end_date:true}))
          return validateField("end_date", dates.end_date);
        }
        return true;
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
        style={{ height: "10dvh" }}
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
            className={`form-control w-100 font-size-sm ${
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
            className={`form-control w-100 font-size-sm ${
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
            className={`form-control font-size-sm p-2 ${
              isInputTouched && inputError ? "is-invalid" : ""
            } ${
              isInputTouched && !inputError && inputValue !== "" ? "is-valid" : ""
            }`}
          />
          <span className="input-group-text font-size-sm fw-semibold" id="basic-addon1">
            {InputGroupText}
          </span>
          <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
        </div>
      </div>
    );
  }
);