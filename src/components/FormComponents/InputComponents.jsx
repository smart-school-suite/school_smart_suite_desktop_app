import React, { useState, useEffect } from "react";
import * as YupValidationSchema from "../../ComponentConfig/YupValidationSchema";
import { Icon } from "@iconify/react";
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

export function CourseCodeInput({ onChange, value, onValidationChange }) {
  const [courseCode, setCourseCode] = useState(value || "");
  const [courseCodeError, setCourseCodeError] = useState("");
  const [isCourseCodeTouched, setIsCourseCodeTouched] = useState(false);

  const validateCourseCode = async (value) => {
    try {
      await YupValidationSchema.courseCodeValidationSchema.validate(value);
      setCourseCodeError("");
      onValidationChange(true);
    } catch (err) {
      setCourseCodeError(err.message);
      onValidationChange(false);
    }
  };

  const handleCourseCodeChange = (e) => {
    const { value } = e.target;
    setCourseCode(value);
    onChange(value);
    validateCourseCode(value);
  };

  const handleCourseCodeFocus = () => {
    setIsCourseCodeTouched(true);
  };
  return (
    <div>
      <span>Course Code</span>
      <input
        type="text"
        placeholder="CS101, BIO-305 etc"
        name="course_code"
        className={`form-control ${
          isCourseCodeTouched && courseCodeError ? "is-invalid" : ""
        } ${
          isCourseCodeTouched && !courseCodeError && courseCode
            ? "is-valid"
            : ""
        }`}
        onChange={handleCourseCodeChange}
        onFocus={handleCourseCodeFocus}
      />
      {isCourseCodeTouched && courseCodeError && (
        <div className="invalid-feedback">{courseCodeError}</div>
      )}
      {isCourseCodeTouched && !courseCodeError && courseCode && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function CourseTitleInput({
  value,
  onChange,
  onValidationChange,
  placeholder,
}) {
  const [courseTitle, setCourseTitle] = useState(value || "");
  const [courseTitleError, setCourseTitleError] = useState("");
  const [isCourseTitleTouched, setIsCourseTitleTouched] = useState(false);

  const validateCourseTitle = async (value) => {
    try {
      await YupValidationSchema.courseTitleValidationSchema.validate(value);
      setCourseTitleError("");
      onValidationChange(true);
    } catch (err) {
      setCourseTitleError(err.message);
      onValidationChange(false);
    }
  };

  const handleCourseCodeChange = (e) => {
    const { value } = e.target;
    setCourseTitle(value);
    onChange(value);
    validateCourseTitle(value);
  };

  const handleCourseTitleFocus = () => {
    setIsCourseTitleTouched(true);
  };
  return (
    <div>
      <span>Course Title</span>
      <input
        type="text"
        className={`form-control ${
          isCourseTitleTouched && courseTitleError ? "is-invalid" : ""
        } ${
          isCourseTitleTouched && !courseTitleError && courseTitle
            ? "is-valid"
            : ""
        }`}
        placeholder={placeholder === null ? "Mathematics" : placeholder}
        onChange={handleCourseCodeChange}
        onFocus={handleCourseTitleFocus}
      />
      {isCourseTitleTouched && courseTitleError && (
        <div className="invalid-feedback">{courseTitleError}</div>
      )}
      {isCourseTitleTouched && !courseTitleError && courseTitle && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function CourseCreditInput({ value, onValidationChange, onChange }) {
  const [courseCredit, setCourseCredit] = useState(value || "");
  const [courseCreditError, setCourseCreditError] = useState("");
  const [isCourseCreditTouched, setIsCourseCreditTouched] = useState(false);

  const validateCourseCredit = async (value) => {
    try {
      await YupValidationSchema.courseCreditValidationSchema.validate(value);
      setCourseCreditError("");
      onValidationChange(true);
    } catch (err) {
      onValidationChange(false);
      setCourseCreditError(err.message);
    }
  };

  const handleCourseCreditChange = (e) => {
    const { value } = e.target;
    setCourseCredit(value);
    onChange(value);
    validateCourseCredit(value);
  };

  const handleCourseCreditFocus = () => {
    setIsCourseCreditTouched(true);
  };
  return (
    <div>
      <span>Course Credit</span>
      <input
        type="number"
        placeholder="1 credit, 2 credit"
        className={`form-control ${
          isCourseCreditTouched && courseCreditError ? "is-invalid" : ""
        } ${
          isCourseCreditTouched && !courseCreditError && courseCredit
            ? "is-valid"
            : ""
        }`}
        onChange={handleCourseCreditChange}
        onFocus={handleCourseCreditFocus}
      />
      {isCourseCreditTouched && courseCreditError && (
        <div className="invalid-feedback">{courseCreditError}</div>
      )}
      {isCourseCreditTouched && !courseCreditError && courseCredit && (
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

export function OccupationInput() {
  const [occupation, setOccupation] = useState("");
  const [occupationError, setOccupationError] = useState("");
  const [isOccupationTouched, setIsOccupationTouched] = useState(false);

  const validateOccupation = async (value) => {
    try {
      await YupValidationSchema.occupationValidationSchema.validate(value);
      setOccupationError("");
    } catch (err) {
      setOccupationError(err.message);
    }
  };

  const handleOccupationChange = (e) => {
    const { value } = e.target;
    setOccupation(value);
    validateOccupation(value);
  };

  const handleOccupationFocus = () => {
    setIsOccupationTouched(true);
  };
  return (
    <div>
      <span>Occupation</span>
      <input
        type="text"
        placeholder="Singer, software Engineer"
        onChange={handleOccupationChange}
        onFocus={handleOccupationFocus}
        className={`form-control ${
          isOccupationTouched && occupationError ? "is-invalid" : ""
        } ${
          isOccupationTouched && !occupationError && occupation
            ? "is-valid"
            : ""
        }`}
      />
      {isOccupationTouched && occupationError && (
        <div className="invalid-feedback">{occupationError}</div>
      )}
      {isOccupationTouched && !occupationError && occupation && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function DepartmentNameInput({ onValidationChange, value, onChange }) {
  const [department, setDepartment] = useState(value || "");
  const [departmentError, setDepartmentError] = useState("");
  const [isDepartmentTouched, setIsDepartmentTouched] = useState(false);

  const validateDepartment = async (value) => {
    try {
      await YupValidationSchema.departmentValidationSchema.validate(value);
      setDepartmentError("");
      onValidationChange(true);
    } catch (err) {
      setDepartmentError(err.message);
      onValidationChange(false);
    }
  };

  const handleDepartmentChange = (e) => {
    const { value } = e.target;
    setDepartment(value);
    onChange(value);
    validateDepartment(value);
  };

  const handleCourseCreditFocus = () => {
    setIsDepartmentTouched(true);
  };
  return (
    <div>
      <span>Department Name</span>
      <input
        type="text"
        placeholder="Mathematics Department"
        onChange={handleDepartmentChange}
        onFocus={handleCourseCreditFocus}
        className={`form-control ${
          isDepartmentTouched && departmentError ? "is-invalid" : ""
        } ${
          isDepartmentTouched && !departmentError && department
            ? "is-valid"
            : ""
        }`}
      />
      {isDepartmentTouched && departmentError && (
        <div className="invalid-feedback">{departmentError}</div>
      )}
      {isDepartmentTouched && !departmentError && department && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function SpecialtyTitleInput({
  value,
  onChange,
  onValidationChange,
  placeholder,
}) {
  const [specailtyName, setSpecailtyName] = useState(value || "");
  const [specailtyNameError, setSpecailtyNameError] = useState("");
  const [isSpecailtyNameTouched, setIsSpecailtyNameTouched] = useState(false);

  const validateSpecailtyName = async (value) => {
    try {
      await YupValidationSchema.specialtyValidationSchema.validate(value);
      setSpecailtyNameError("");
      onValidationChange(true);
    } catch (err) {
      setSpecailtyNameError(err.message);
      onValidationChange(false);
    }
  };

  const handleSpecailtyNameChange = (e) => {
    const { value } = e.target;
    setSpecailtyName(value);
    onChange(value);
    validateSpecailtyName(value);
  };

  const handleOccupationFocus = () => {
    setIsSpecailtyNameTouched(true);
  };
  return (
    <div style={{ height:"10dvh" }}>
      <span>Specialty Name</span>
      <input
        type="text"
        placeholder={placeholder}
        className={`form-control ${
          isSpecailtyNameTouched && specailtyNameError ? "is-invalid" : ""
        } ${
          isSpecailtyNameTouched && !specailtyNameError && specailtyName
            ? "is-valid"
            : ""
        }`}
        onChange={handleSpecailtyNameChange}
        onFocus={handleOccupationFocus}
      />
      {isSpecailtyNameTouched && specailtyNameError && (
        <div className="invalid-feedback">{specailtyNameError}</div>
      )}
      {isSpecailtyNameTouched && !specailtyNameError && specailtyName && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function RegistrationFeeInput({
  onChange,
  value,
  onValidationChange,
  placeholder,
}) {
  const [registrationFee, setRegistrationFee] = useState(value || "");
  const [registrationFeeError, setRegistrationFeeError] = useState("");
  const [isRegistrationFeeTouched, setIsRegistrationTouched] = useState(false);

  const validateRegistrationFee = async (value) => {
    try {
      await YupValidationSchema.registrationFeeValidationSchema.validate(value);
      setRegistrationFeeError("");
      onValidationChange(true);
    } catch (err) {
      setRegistrationFeeError(err.message);
      onValidationChange(false);
    }
  };

  const handleRegistrationFeeChange = (e) => {
    const { value } = e.target;
    setRegistrationFee(value);
    onChange(value);
    validateRegistrationFee(value);
  };

  const handleRegistrationFeeFocus = () => {
    setIsRegistrationTouched(true);
  };
  return (
    <div>
      <span>Registration Fee</span>
      <input
        type="number"
        placeholder={placeholder}
        onChange={handleRegistrationFeeChange}
        onFocus={handleRegistrationFeeFocus}
        className={`form-control ${
          isRegistrationFeeTouched && registrationFeeError ? "is-invalid" : ""
        } ${
          isRegistrationFeeTouched && !registrationFeeError && registrationFee
            ? "is-valid"
            : ""
        }`}
      />
      {isRegistrationFeeTouched && registrationFeeError && (
        <div className="invalid-feedback">{registrationFeeError}</div>
      )}
      {isRegistrationFeeTouched && !registrationFeeError && registrationFee && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function SchoolFeeInput({
  onChange,
  onValidationChange,
  value,
  placeholder,
}) {
  const [schoolFee, setSchoolFee] = useState(value || "");
  const [schoolFeeError, setSchoolFeeError] = useState("");
  const [isSchoolFeeTouched, setIsSchoolFeeTouched] = useState(false);

  const validateSchoolFee = async (inputValue) => {
    try {
      await YupValidationSchema.schoolFeeValidationSchema.validate(inputValue);
      setSchoolFeeError("");
      onValidationChange(true);
    } catch (err) {
      setSchoolFeeError(err.message);
      onValidationChange(false);
    }
  };

  const handleSchoolFeeChange = (e) => {
    const { value: newValue } = e.target;
    setSchoolFee(newValue);
    onChange(newValue);
    validateSchoolFee(newValue);
  };

  const handleSchoolFeeFocus = () => {
    setIsSchoolFeeTouched(true);
  };

  const feedbackContent = isSchoolFeeTouched && schoolFeeError
    ? schoolFeeError
    : (isSchoolFeeTouched && !schoolFeeError && schoolFee && 'Looks Good!');

  const feedbackClasses = [
    'transition-all font-size-sm',
    isSchoolFeeTouched && schoolFeeError
      ? 'invalid-feedback transition-all'
      : (isSchoolFeeTouched && !schoolFeeError && schoolFee
          ? 'valid-feedback transition-all'
          : null), 
    isSchoolFeeTouched && (schoolFeeError || (!schoolFeeError && schoolFee))
      ? 'opacity-100 transition-all'
      : 'opacity-0 transition-all',
  ].filter(Boolean).join(' ');

  return (
    <div>
      <span>School Fee</span>
      <input
        type="number"
        value={schoolFee}
        onChange={handleSchoolFeeChange}
        onFocus={handleSchoolFeeFocus}
        placeholder={placeholder}
        className={`form-control ${
          isSchoolFeeTouched && schoolFeeError ? "is-invalid" : ""
        } ${
          isSchoolFeeTouched && !schoolFeeError && schoolFee
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