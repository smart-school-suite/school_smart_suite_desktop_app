import { useState, useEffect, useCallback, useRef } from "react";
import * as YupValidationSchema from "../../ComponentConfig/YupValidationSchema";
import { Icon } from "@iconify/react";
import InputMask from "react-input-mask";
export function PhoneNumberInput({ onChange, value, onValidationChange }) {
  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (value) {
      validatePhoneNumber(value);
    }
  }, [value]);

  const validatePhoneNumber = async (phone) => {
    try {
      await YupValidationSchema.phoneValidationSchema.validate(phone);
      setError("");
      onValidationChange(true);
    } catch (err) {
      setError(err.message);
      onValidationChange(false);
    }
  };

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
    onChange(rawValue);

    if (isTouched) {
      validatePhoneNumber(rawValue);
    }
  };

  const handleFocus = () => {
    setIsTouched(true);
    validatePhoneNumber(phoneNumber.replace(/\D/g, ""));
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
      <div className="input-group z-0 position-relative">
        <span className="input-group-text is-valid" id="basic-addon1">
          <Icon icon="twemoji:flag-cameroon" width="24" height="24" />
        </span>
        <input
          type="tel"
          className={`form-control font-size-sm ${
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
      </div>
      <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
    </div>
  );
}

export function TextInputField({
  onChange,
  onValidationChange,
  value,
  placeholder,
  validationSchema,
  label,
  onErrorChange,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (isTouched || inputValue) {
      validateInput(inputValue);
    }
  }, [inputValue, validationSchema, isTouched]);

  const validateInput = async (currentValue) => {
    try {
      await validationSchema.validate(currentValue);
      setInputError("");
      onValidationChange(true);
      onErrorChange("");
    } catch (err) {
      setInputError(err.message);
      onValidationChange(false);
      onErrorChange(err.message);
    }
  };

  const handleChange = (e) => {
    const { value: newValue } = e.target;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleBlur = () => {
    if (!isTouched) {
      setIsTouched(true);
    }
    validateInput(inputValue);
  };

  const feedbackContent =
    isTouched && inputError
      ? inputError
      : isTouched && !inputError && inputValue
      ? "Looks Good!"
      : "";

  const feedbackClasses = [
    "transition-all font-size-sm",
    isTouched && inputError
      ? "invalid-feedback transition-all"
      : isTouched && !inputError && inputValue
      ? "valid-feedback transition-all"
      : null,
    isTouched && (inputError || (!inputError && inputValue))
      ? "opacity-100 transition-all"
      : "opacity-0 transition-all",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      {label && <span>{label}</span>}
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`form-control ${
          isTouched && inputError ? "is-invalid" : ""
        } ${isTouched && !inputError && inputValue ? "is-valid" : ""}`}
      />
      <div className={feedbackClasses}>{feedbackContent}</div>
    </div>
  );
}

export function TextInput({
  onChange,
  onValidationChange,
  value,
  placeholder,
  validationSchema,
  type = "text",
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const validateInput = async (currentValue) => {
    if (!validationSchema) {
      onValidationChange(true);
      return;
    }
    try {
      await validationSchema.validate(currentValue);
      setInputError("");
      onValidationChange(true);
    } catch (err) {
      setInputError(err.message);
      onValidationChange(false);
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

export function TextAreaInput({
  onChange,
  onValidationChange,
  value,
  placeholder,
  validationSchema,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const validateInput = async (currentValue) => {
    if (!validationSchema) {
      onValidationChange(true);
      return;
    }
    try {
      await validationSchema.validate(currentValue);
      setInputError("");
      onValidationChange(true);
    } catch (err) {
      setInputError(err.message);
      onValidationChange(false);
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
        rows="5"
        className={`form-control font-size-sm p-2 ${
          isInputTouched && inputError ? "is-invalid" : ""
        } ${isInputTouched && !inputError && inputValue ? "is-valid" : ""}`}
      />
      <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
    </div>
  );
}

export function NumberInput({
  onChange,
  onValidationChange,
  value,
  placeholder,
  validationSchema,
  step = "1",
  type = "number",
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const validateInput = async (currentValue) => {
    if (!validationSchema) {
      onValidationChange(true);
      return;
    }
    try {
      await validationSchema.validate(currentValue);
      setInputError("");
      onValidationChange(true);
    } catch (err) {
      setInputError(err.message);
      onValidationChange(false);
    }
  };

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
      ? "invalid-feedback transition-all"
      : isInputTouched && !inputError && inputValue !== ""
      ? "valid-feedback transition-all"
      : null,
    isInputTouched && (inputError || (!inputError && inputValue !== ""))
      ? "opacity-100 transition-all"
      : "opacity-0 transition-all",
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
}

export function DateInput({
  value,
  onChange,
  onValidationChange,
  placeholder = "MM/DD/YYYY",
  validationSchema,
  id,
  name,
}) {
  const [displayValue, setDisplayValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const validateInput = async (currentValue) => {
    if (!validationSchema) {
      onValidationChange?.(true);
      return;
    }
    try {
      await validationSchema.validate(currentValue);
      setInputError("");
      onValidationChange?.(true);
    } catch (err) {
      setInputError(err.message);
      onValidationChange?.(false);
    }
  };

  const handleChange = useCallback(
    (e) => {
      const rawValue = e.target.value;
      setDisplayValue(rawValue);

      const unmaskedValue = rawValue.replace(/[^0-9]/g, "");

      // Update parent value
      if (unmaskedValue.length === 8) {
        onChange(rawValue);
      } else {
        onChange("");
      }

      // Real-time validation if touched
      if (isInputTouched) {
        validateInput(rawValue);
      }
    },
    [onChange, isInputTouched]
  );

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
      : isInputTouched && !inputError && displayValue && "Looks Good!";

  const feedbackClasses = [
    "transition-all font-size-sm",
    isInputTouched && inputError
      ? "invalid-feedback transition-all"
      : isInputTouched && !inputError && displayValue
      ? "valid-feedback transition-all"
      : null,
    isInputTouched && (inputError || (!inputError && displayValue))
      ? "opacity-100 transition-all"
      : "opacity-0 transition-all",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="input-container">
      <InputMask
        mask="99/99/9999"
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

export function DateRangeInput({
  startValue,
  endValue,
  onChange,
  onValidationChange,
  validationSchema,
  placeholderStart = "MM/DD/YYYY",
  placeholderEnd = "MM/DD/YYYY",
}) {
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

  const validateField = async (field, value) => {
    try {
      await validationSchema.validate(
        { ...dates, [field]: value },
        { abortEarly: false }
      );
      setErrors((prev) => ({ ...prev, [field]: "" }));
      onValidationChange?.(true);
    } catch (err) {
      const fieldError = err.inner.find((e) => e.path === field);
      setErrors((prev) => ({
        ...prev,
        [field]: fieldError ? fieldError.message : "",
      }));
      onValidationChange?.(false);
    }
  };

  const handleChange = (field) => (e) => {
    const rawValue = e.target.value;
    setDates((prev) => ({ ...prev, [field]: rawValue }));
    onChange?.({ ...dates, [field]: rawValue });
    if (touched[field]) validateField(field, rawValue);
  };

  const handleFocus = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, dates[field]);
  };

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
      <div className="input-container w-50">
        <label htmlFor="startDate" className="font-size-sm">
          Start Date
        </label>
        <InputMask
          mask="99/99/9999"
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

      <div className="input-container w-50">
        <label htmlFor="endDate" className="font-size-sm">
          End Date
        </label>
        <InputMask
          mask="99/99/9999"
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
        <div className={`${feedbackClasses("end_date")} font-size-sm mt-auto`}>
          {feedbackMessage("end_date")}
        </div>
      </div>
    </div>
  );
}

export function GenderSelector({ onSelect, onError, error }) {
  const [selectedGender, setSelectedGender] = useState(null);
  const [isShowing, setIsShowing] = useState(false);
  const [touched, setTouched] = useState(false);
  const genderRef = useRef(null);

  const genders = ["Male", "Female"];

  const handle_toggle = () => {
    setIsShowing((prev) => !prev);
    setTouched(true);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    onSelect(gender);
    onError && onError("");
    setIsShowing(false);
  };

  const handleClickOutside = (event) => {
    if (genderRef.current && !genderRef.current.contains(event.target)) {
      setIsShowing(false);
      if (touched && !selectedGender) {
        onError && onError("Gender is required");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [touched, selectedGender]);

  return (
    <div className="input-container">
      <div className="position-relative" ref={genderRef}>
        <div
          className={`bg-white d-flex border flex-row align-items-center justify-content-between rounded-2 z-0 pointer-cursor ${
            touched
              ? error
                ? "border-danger text-danger"
                : selectedGender
                ? "border-success text-success"
                : ""
              : ""
          }`}
          onClick={handle_toggle}
          style={{ padding: "0.3rem" }}
        >
          <div className="d-flex flex-row align-items-center gap-3 font-size-sm">
            <span>
              {selectedGender === null ? "Select Gender" : selectedGender}
            </span>
          </div>
          <div>
            <span>
              <Icon
                icon="heroicons:chevron-up-20-solid"
                className={
                  isShowing ? "transition-3s" : "rotate-180 transition-3s"
                }
              />
            </span>
          </div>
        </div>

        <div>
          {error ? (
            <span className="font-size-sm text-danger">{error}</span>
          ) : (
            selectedGender && (
              <span className="font-size-sm text-success">Looks Good</span>
            )
          )}
        </div>

        <CSSTransition
          in={isShowing}
          timeout={300}
          classNames="dropdown"
          unmountOnExit
        >
          <div className="p-2 bg-white d-flex flex-column border gap-1 mt-1 rounded-3 position-absolute w-100 z-3">
            <div className="scrollable-dropdown d-flex flex-column gap-1">
              {genders.map((gender, index) => (
                <button
                  key={index}
                  className={`border-none m-1 gender-dropdown-item rounded-1 font-size-sm p-1 transparent-bg text-start ${
                    gender === selectedGender ? "selected-gender" : ""
                  }`}
                  onClick={() => handleGenderSelect(gender)}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}

export function InputGroup({
  onChange,
  onValidationChange,
  value,
  placeholder,
  validationSchema,
  type = "text",
  InputGroupText
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [isInputTouched, setIsInputTouched] = useState(false);

  const validateInput = async (currentValue) => {
    if (!validationSchema) {
      onValidationChange(true);
      return;
    }
    try {
      await validationSchema.validate(currentValue);
      setInputError("");
      onValidationChange(true);
    } catch (err) {
      setInputError(err.message);
      onValidationChange(false);
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
    <>
     <div className="input-container">
      <div className="input-group mb-3">
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
        <span className="input-group-text" id="basic-addon1">
          {InputGroupText}
        </span>
      </div>
      <div className={`${feedbackClasses} mt-auto`}>{feedbackContent}</div>
     </div>
    </>
  );
}
