import React, { useState, useEffect, useCallback } from "react";
import * as YupValidationSchema from "../../ComponentConfig/YupValidationSchema";
import { Icon } from "@iconify/react";
import InputMask from 'react-input-mask';
export function PhoneNumberInput({ onChange, value, onValidationChange }) {
  const [phoneNumber, setPhoneNumber] = useState(value || "");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

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
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 9) {
      value = value.slice(0, 9);
    }

    const formattedValue = value
      .replace(
        /(\d{3})(\d{1,3})(\d{1,3})?/,
        (match, p1, p2) =>
          `${p1}${p2 ? "-" + p2 : ""}${
            value.length > 6 ? "-" + value.slice(6) : ""
          }`
      )
      .trim();

    setPhoneNumber(formattedValue);
    onChange(value);
    if (value.length === 0) {
      setError("Phone number is required.");
    } else {
      validatePhoneNumber(value);
    }
  };

  const handleFocus = () => setIsTouched(true);

  return (
    <div>
      <label htmlFor="phone">Phone Number</label>
      <div className="input-group z-0 position-relative">
        <span className="input-group-text is-valid" id="basic-addon1">
          <Icon icon="twemoji:flag-cameroon" width="26" height="26" />
        </span>
        <input
          type="tel"
          className={`form-control ${isTouched && error ? "is-invalid" : ""} ${
            isTouched && !error && phoneNumber ? "is-valid" : ""
          }`}
          placeholder="6XX-XXX-XXX"
          aria-label="tel"
          aria-describedby="basic-addon1"
          maxLength={12}
          value={phoneNumber}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      {isTouched && error && (
        <div className="text-danger my-1" style={{ fontSize: "0.9rem" }}>
          {error}
        </div>
      )}
      {isTouched && !error && phoneNumber && (
        <div className="text-success my-1" style={{ fontSize: "0.9rem" }}>
          Looks good!
        </div>
      )}
    </div>
  );
}
export function EmailInput({ value, onChange, onValidationChange }) {
  const [email, setEmail] = useState(value || "");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validateEmail = async (email) => {
    try {
      await YupValidationSchema.emailValidationSchema.validate(email);
      setError("");
      onValidationChange(true);
    } catch (err) {
      setError(err.message);
      onValidationChange(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    onChange(value);
    validateEmail(value);
  };

  const handleFocus = () => setIsTouched(true);

  return (
    <>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          className={`form-control ${isTouched && error ? "is-invalid" : ""} ${
            isTouched && !error && email ? "is-valid" : ""
          }`}
          placeholder="example@gmail.com"
          name="email"
          value={email}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {isTouched && error && <div className="invalid-feedback">{error}</div>}
        {isTouched && !error && email && (
          <div className="valid-feedback">Looks good!</div>
        )}
      </div>
    </>
  );
}

export function FullNamesInput({ value, onChange, onValidationChange }) {
  const [name, setName] = useState(value || "");
  const [nameError, setNameError] = useState("");
  const [isNameTouched, setIsNameTouched] = useState(false);

  const validateName = async (name) => {
    try {
      await YupValidationSchema.nameValidationSchema.validate(name);
      setNameError("");
      onValidationChange(true);
    } catch (err) {
      setNameError(err.message);
      onValidationChange(false);
    }
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    onChange(value);
    validateName(value);
  };

  const handleNameFocus = () => setIsNameTouched(true);

  return (
    <div>
      <label htmlFor="name">Full Names</label>
      <input
        type="text"
        id="name"
        className={`form-control ${
          isNameTouched && nameError ? "is-invalid" : ""
        } ${isNameTouched && !nameError && name ? "is-valid" : ""}`}
        placeholder="John Doe"
        name="name"
        value={name}
        onChange={handleNameChange}
        onFocus={handleNameFocus}
      />
      {isNameTouched && nameError && (
        <div className="invalid-feedback">{nameError}</div>
      )}
      {isNameTouched && !nameError && name && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function FieldOfStudyInput({ value, onChange, onValidationChange }) {
  const [fieldOfStudy, setFieldOfStudy] = useState(value || "");
  const [fieldOfStudyError, setFieldOfStudyError] = useState("");
  const [isFieldOfStudyTouched, setIsFieldOfStudyTouched] = useState(false);

  const validateFieldOfStudy = async (value) => {
    try {
      await YupValidationSchema.fieldOfStudyValidationSchema.validate(value);
      setFieldOfStudyError("");
      onValidationChange(true);
    } catch (err) {
      setFieldOfStudyError(err.message);
      onValidationChange(false);
    }
  };

  const handleFieldOfStudyChange = (e) => {
    const { value } = e.target;
    setFieldOfStudy(value);
    onChange(value);
    validateFieldOfStudy(value);
  };

  const handleFieldOfStudyFocus = () => {
    setIsFieldOfStudyTouched(true);
  };

  return (
    <div>
      <label htmlFor="fieldOfStudy">Field of Study</label>
      <input
        type="text"
        className={`form-control ${
          isFieldOfStudyTouched && fieldOfStudyError ? "is-invalid" : ""
        } ${
          isFieldOfStudyTouched && !fieldOfStudyError && fieldOfStudy
            ? "is-valid"
            : ""
        }`}
        placeholder="Software Engineering"
        name="fieldOfStudy"
        value={fieldOfStudy}
        onChange={handleFieldOfStudyChange}
        onFocus={handleFieldOfStudyFocus}
        id="fieldOfStudy"
      />
      {isFieldOfStudyTouched && fieldOfStudyError && (
        <div className="invalid-feedback">{fieldOfStudyError}</div>
      )}
      {isFieldOfStudyTouched && !fieldOfStudyError && fieldOfStudy && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function ReligionInput() {
  const [religion, setReligion] = useState("");
  const [religionError, setReligionError] = useState("");
  const [isReligionTouched, setIsReligionTouched] = useState(false);

  const validateReligion = async (value) => {
    try {
      await YupValidationSchema.religionValidationSchema.validate(value);
      setReligionError("");
    } catch (err) {
      setReligionError(err.message);
    }
  };

  const handleReligionChange = (e) => {
    const { value } = e.target;
    setReligion(value);
    validateReligion(value);
  };

  const handleReligionFocus = () => {
    setIsReligionTouched(true);
  };

  return (
    <div>
      <label htmlFor="religion">Religion</label>
      <input
        type="text"
        className={`form-control ${
          isReligionTouched && religionError ? "is-invalid" : ""
        } ${isReligionTouched && !religionError && religion ? "is-valid" : ""}`}
        placeholder="Catholic, Presbyterain Etc"
        name="religion"
        value={religion}
        onChange={handleReligionChange}
        onFocus={handleReligionFocus}
        id="religion"
      />
      {isReligionTouched && religionError && (
        <div className="invalid-feedback">{religionError}</div>
      )}
      {isReligionTouched && !religionError && religion && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function CulturalBackgroundInput() {
  const [culturalBackground, setCulturalBackground] = useState("");
  const [culturalBackgroundError, setCulturalBackgroundError] = useState("");
  const [isCulturalBackgroundTouched, setIsCulturalBackgroundTouched] =
    useState(false);

  const validateCulturalBackground = async (value) => {
    try {
      await YupValidationSchema.culturalBackgroundValidationSchema.validate(
        value
      );
      setCulturalBackgroundError("");
    } catch (err) {
      setCulturalBackgroundError(err.message);
    }
  };

  const handleCulturalBackgroundChange = (e) => {
    const { value } = e.target;
    setCulturalBackground(value);
    validateCulturalBackground(value);
  };

  const handleCulturalBackgroundFocus = () => {
    setIsCulturalBackgroundTouched(true);
  };

  return (
    <div>
      <span>Cultural Background</span>
      <input
        type="text"
        className={`form-control ${
          isCulturalBackgroundTouched && culturalBackgroundError
            ? "is-invalid"
            : ""
        } ${
          isCulturalBackgroundTouched &&
          !culturalBackgroundError &&
          culturalBackground
            ? "is-valid"
            : ""
        }`}
        placeholder="Bamoun, Bet, Nso"
        name="cultural_background"
        value={culturalBackground}
        onChange={handleCulturalBackgroundChange}
        onFocus={handleCulturalBackgroundFocus}
        id="culturalBackground"
      />
      {isCulturalBackgroundTouched && culturalBackgroundError && (
        <div className="invalid-feedback">{culturalBackgroundError}</div>
      )}
      {isCulturalBackgroundTouched &&
        !culturalBackgroundError &&
        culturalBackground && <div className="valid-feedback">Looks good!</div>}
    </div>
  );
}

export function CityInput() {
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [isCityTouched, setIsCityTouched] = useState(false);

  const validateCity = async (value) => {
    try {
      await YupValidationSchema.cityValidationSchema.validate(value);
      setCityError("");
    } catch (err) {
      setCityError(err.message);
    }
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    setCity(value);
    validateCity(value);
  };

  const handleCityFocus = () => {
    setIsCityTouched(true);
  };
  return (
    <div className="my-1">
      <span>City</span>
      <input
        type="text"
        className={`form-control ${
          isCityTouched && cityError ? "is-invalid" : ""
        } ${isCityTouched && !cityError && city ? "is-valid" : ""}`}
        placeholder="Yaounde, Douala, Bamenda"
        name="city"
        value={city}
        onChange={handleCityChange}
        onFocus={handleCityFocus}
      />
      {isCityTouched && cityError && (
        <div className="invalid-feedback">{cityError}</div>
      )}
      {isCityTouched && !cityError && city && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function SalaryInput({ value, onChange, onValidationChange }) {
  const [salary, setSalary] = useState(value || "");
  const [salaryError, setSalaryError] = useState("");
  const [isSalaryTouched, setIsSalaryTouched] = useState(false);

  const validateSalary = async (value) => {
    try {
      await YupValidationSchema.salaryValidationSchema.validate(value);
      setSalaryError("");
      onValidationChange(true);
    } catch (err) {
      setSalaryError(err.message);
      onValidationChange(false);
    }
  };

  const handleSalaryChange = (e) => {
    const { value } = e.target;
    setSalary(value);
    onChange(value);
    validateSalary(value);
  };

  const handleSalaryFocus = () => {
    setIsSalaryTouched(true);
  };
  return (
    <div>
      <span>Salary</span>
      <input
        type="number"
        className={`form-control ${
          isSalaryTouched && salaryError ? "is-invalid" : ""
        } ${isSalaryTouched && !salaryError && salary ? "is-valid" : ""}`}
        placeholder="30,000"
        onChange={handleSalaryChange}
        onFocus={handleSalaryFocus}
        name="salary"
        id="salary"
      />
      {isSalaryTouched && salaryError && (
        <div className="invalid-feedback">{salaryError}</div>
      )}
      {isSalaryTouched && !salaryError && salary && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function YearsExperienceInput({ onChange, value, onValidationChange }) {
  const [experienceYears, setExperienceYears] = useState(value || "");
  const [experienceYearsError, setExperienceYearsError] = useState("");
  const [isExperienceYearsTouched, setIsExperienceYearsTouched] =
    useState(false);

  const validateExperienceYears = async (value) => {
    try {
      await YupValidationSchema.experienceValidationSchema.validate(value);
      setExperienceYearsError("");
      onValidationChange(true);
    } catch (err) {
      setExperienceYearsError(err.message);
      onValidationChange(false);
    }
  };

  const handleExperienceYearsChange = (e) => {
    const { value } = e.target;
    setExperienceYears(value);
    onChange(value);
    validateExperienceYears(value);
  };

  const handleSalaryFocus = () => {
    setIsExperienceYearsTouched(true);
  };
  return (
    <div>
      <span>Years Experience</span>
      <input
        type="number"
        className={`form-control ${
          isExperienceYearsTouched && experienceYearsError ? "is-invalid" : ""
        } ${
          isExperienceYearsTouched && !experienceYearsError && experienceYears
            ? "is-valid"
            : ""
        }`}
        placeholder="0-50 years"
        value={experienceYears}
        onChange={handleExperienceYearsChange}
        onFocus={handleSalaryFocus}
      />
      {isExperienceYearsTouched && experienceYearsError && (
        <div className="invalid-feedback">{experienceYearsError}</div>
      )}
      {isExperienceYearsTouched && !experienceYearsError && experienceYears && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function AddressInput({ onChange, value, onValidationChange }) {
  const [address, setAddress] = useState(value || "");
  const [addressError, setAddressError] = useState("");
  const [isAddressTouched, setIsAddressTouched] = useState(false);

  const validateAddress = async (value) => {
    try {
      await YupValidationSchema.addressValidationSchema.validate(value);
      setAddressError("");
      onValidationChange(true);
    } catch (err) {
      setAddressError(err.message);
      onValidationChange(false);
    }
  };

  const handleAddressChange = (e) => {
    const { value } = e.target;
    setAddress(value);
    onChange(value);
    validateAddress(value);
  };

  const handleAddressFocus = () => {
    setIsAddressTouched(true);
  };
  return (
    <div>
      <span>Address</span>
      <input
        type="text"
        placeholder="Simbock Biyem-assi"
        className={`form-control ${
          isAddressTouched && addressError ? "is-invalid" : ""
        } ${isAddressTouched && !addressError && address ? "is-valid" : ""}`}
        value={address}
        onChange={handleAddressChange}
        onFocus={handleAddressFocus}
      />
      {isAddressTouched && addressError && (
        <div className="invalid-feedback">{addressError}</div>
      )}
      {isAddressTouched && !addressError && address && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}


export function WeigtedMarkInput({ onChange, value, onValidationChange }) {
  const [weightedMark, setWeightedMark] = useState(value || "");
  const [weightedMarkError, setWeightedMarkError] = useState("");
  const [isWeightedMarkTouched, setIsWeightedMarkTouched] = useState(false);

  const validateDepartment = async (value) => {
    try {
      await YupValidationSchema.weightedMarkValidationSchema.validate(value);
      setWeightedMarkError("");
      onValidationChange(true);
    } catch (err) {
      setWeightedMarkError(err.message);
      onValidationChange(false);
    }
  };

  const handleWeightedMarkChange = (e) => {
    const { value } = e.target;
    setWeightedMark(value);
    onChange(value);
    validateDepartment(value);
  };

  const handleWeightedMarkFocus = () => {
    setIsWeightedMarkTouched(true);
  };

  return (
    <div>
      <span>Weighted Mark</span>
      <input
        type="text"
        className={`form-control ${
          isWeightedMarkTouched && weightedMarkError ? "is-invalid" : ""
        } ${
          isWeightedMarkTouched && !weightedMarkError && weightedMark
            ? "is-valid"
            : ""
        }`}
        onChange={handleWeightedMarkChange}
        onFocus={handleWeightedMarkFocus}
        id="weighted_mark"
        placeholder="20, 30, 50, 100"
      />
      {isWeightedMarkTouched && weightedMarkError && (
        <div className="invalid-feedback">{weightedMarkError}</div>
      )}
      {isWeightedMarkTouched && !weightedMarkError && weightedMark && (
        <div className="valid-feedback">Looks good!</div>
      )}
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

  const feedbackContent = isTouched && inputError
    ? inputError
    : (isTouched && !inputError && inputValue
      ? 'Looks Good!'
      : '');

  const feedbackClasses = [
    'transition-all font-size-sm',
    isTouched && inputError
      ? 'invalid-feedback transition-all'
      : (isTouched && !inputError && inputValue
        ? 'valid-feedback transition-all'
        : null),
    isTouched && (inputError || (!inputError && inputValue))
      ? 'opacity-100 transition-all'
      : 'opacity-0 transition-all',
  ].filter(Boolean).join(' ');

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
        } ${
          isTouched && !inputError && inputValue
            ? "is-valid"
            : ""
        }`}
      />
      <div className={feedbackClasses}>
        {feedbackContent}
      </div>
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

  const feedbackContent = isInputTouched && inputError
    ? inputError
    : (isInputTouched && !inputError && inputValue && 'Looks Good!');

  const feedbackClasses = [
    'transition-all font-size-sm',
    isInputTouched && inputError
      ? 'invalid-feedback transition-all'
      : (isInputTouched && !inputError && inputValue
          ? 'valid-feedback transition-all'
          : null),
    isInputTouched && (inputError || (!inputError && inputValue))
      ? 'opacity-100 transition-all'
      : 'opacity-0 transition-all',
  ].filter(Boolean).join(' ');

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
        } ${
          isInputTouched && !inputError && inputValue
            ? "is-valid"
            : ""
        }`}
      />
      <div className={`${feedbackClasses} mt-auto`}>
        {feedbackContent}
      </div>
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
        } ${isInputTouched && !inputError && inputValue !== "" ? "is-valid" : ""}`}
      />
      <div className={`${feedbackClasses} mt-auto`}>
        {feedbackContent}
      </div>
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
  name
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

export function TimeInput({ value, onChange, id, name, placeholder = "HH:MM" }) {
  const [displayValue, setDisplayValue] = useState(value);
  const handleChange = useCallback((e) => {
    const rawValue = e.target.value;
    setDisplayValue(rawValue);
    const unmaskedValue = rawValue.replace(/[^0-9]/g, '');
    if (unmaskedValue.length === 4) {
      onChange(rawValue);
    } else if (unmaskedValue.length < 4 && value !== '') {
        onChange('');
    }
  }, [onChange, value]);

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
      await validationSchema.validate({ ...dates, [field]: value }, { abortEarly: false });
      setErrors((prev) => ({ ...prev, [field]: "" }));
      onValidationChange?.(true);
    } catch (err) {
      const fieldError = err.inner.find((e) => e.path === field);
      setErrors((prev) => ({ ...prev, [field]: fieldError ? fieldError.message : "" }));
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
    <div className="d-flex flex-row align-items-center gap-2 w-100" style={{ height:"10dvh" }}>
      <div className="input-container w-50">
        <label htmlFor="startDate" className="font-size-sm">Start Date</label>
        <InputMask
          mask="99/99/9999"
          maskChar="_"
          value={dates.start_date}
          onChange={handleChange("start_date")}
          onFocus={handleFocus("start_date")}
          onBlur={handleFocus("start_date")}
          placeholder={placeholderStart}
          className={`form-control w-100 font-size-sm ${touched.start_date && errors.start_date ? "is-invalid" : ""} ${
            touched.start_date && !errors.start_date && dates.start_date ? "is-valid" : ""
          }`}
        />
        <div className={`${feedbackClasses("start_date")} font-size-sm mt-auto`}>
          {feedbackMessage("start_date")}
        </div>
      </div>

      <div className="input-container w-50">
        <label htmlFor="endDate" className="font-size-sm">End Date</label>
        <InputMask
          mask="99/99/9999"
          maskChar="_"
          value={dates.end_date}
          onChange={handleChange("end_date")}
          onFocus={handleFocus("end_date")}
          onBlur={handleFocus("end_date")}
          placeholder={placeholderEnd}
          className={`form-control w-100 font-size-sm ${touched.end_date && errors.end_date ? "is-invalid" : ""} ${
            touched.end_date && !errors.end_date && dates.end_date ? "is-valid" : ""
          }`}
        />
        <div className={`${feedbackClasses("end_date")} font-size-sm mt-auto`}>
          {feedbackMessage("end_date")}
        </div>
      </div>
    </div>
  );
}
