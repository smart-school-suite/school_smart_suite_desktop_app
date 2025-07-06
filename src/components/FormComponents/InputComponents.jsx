import React, { useState } from "react";
import * as YupValidationSchema from  "../../ComponentConfig/YupValidationSchema";
import { Icon } from "@iconify/react";

export function PhoneNumberInput({ onChange, value, onValidationChange }) {
  const [phoneNumber, setPhoneNumber] = useState( value || "");
  const [error, setError] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const validatePhoneNumber = async (phone) => {
    try {
      await YupValidationSchema.phoneValidationSchema.validate(phone);
      setError("");
      onValidationChange(true)
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
    onChange(value)
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
  const [email, setEmail] = useState( value || "");
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
    onChange(value)
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
  const [fieldOfStudy, setFieldOfStudy] = useState( value || "");
  const [fieldOfStudyError, setFieldOfStudyError] = useState("");
  const [isFieldOfStudyTouched, setIsFieldOfStudyTouched] = useState(false);

  const validateFieldOfStudy = async (value) => {
    try {
      await YupValidationSchema.fieldOfStudyValidationSchema.validate(value);
      setFieldOfStudyError("");
      onValidationChange(true);
    } catch (err) {
      setFieldOfStudyError(err.message);
      onValidationChange(false)
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
  const [salary, setSalary] = useState( value || "");
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
    onChange(value)
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
  const [experienceYears, setExperienceYears] = useState( value || "");
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
  const [address, setAddress] = useState( value || "");
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
    onChange(value)
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
  const [courseCode, setCourseCode] = useState( value || "");
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

export function CourseTitleInput({ value, onChange, onValidationChange}) {
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
      onValidationChange(false)
    }
  };

  const handleCourseCodeChange = (e) => {
    const { value } = e.target;
    setCourseTitle(value);
    onChange(value)
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
        placeholder="Mathematics"
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
  const [weightedMark, setWeightedMark] = useState( value ||  "");
  const [weightedMarkError, setWeightedMarkError] = useState("");
  const [isWeightedMarkTouched, setIsWeightedMarkTouched] = useState(false);

  const validateDepartment = async (value) => {
    try {
      await YupValidationSchema.weightedMarkValidationSchema.validate(value);
      setWeightedMarkError("");
      onValidationChange(true)
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


export function SpecialtyTitleInput({ value, onChange, onValidationChange, placeholder }) {
  const [specailtyName, setSpecailtyName] = useState( value || "");
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
    <div>
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

export function RegistrationFeeInput({ onChange, value, onValidationChange, placeholder }) {
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

export function SchoolFeeInput({ onChange, onValidationChange, value, placeholder }) {
  const [schoolFee, setSchoolFee] = useState( value || "");
  const [schoolFeeError, setSchoolFeeError] = useState("");
  const [isSchoolFeeTouched, setIsSchoolFeeTouched] = useState(false);

  const validateSchoolFee = async (value) => {
    try {
      await YupValidationSchema.schoolFeeValidationSchema.validate(value);
      setSchoolFeeError("");
      onValidationChange(true);
    } catch (err) {
      setSchoolFeeError(err.message);
      onValidationChange(false);
    }
  };

  const handleSchoolFeeChange = (e) => {
    const { value } = e.target;
    setSchoolFee(value);
    onChange(value);
    validateSchoolFee(value);
  };

  const handleSchoolFeeFocus = () => {
    setIsSchoolFeeTouched(true);
  };
  return (
    <div>
      <span>School Fee</span>
      <input
        type="number"
        onChange={handleSchoolFeeChange}
        onFocus={handleSchoolFeeFocus}
        placeholder={placeholder}
        className={`form-control ${
          isSchoolFeeTouched && schoolFeeError ? "is-invalid" : ""
        } ${
          isSchoolFeeTouched && !schoolFeeError && schoolFee ? "is-valid" : ""
        }`}
      />
      {isSchoolFeeTouched && schoolFeeError && (
        <div className="invalid-feedback">{schoolFeeError}</div>
      )}
      {isSchoolFeeTouched && !schoolFeeError && schoolFee && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function NotesInput() {
  const [notes, setNotes] = useState("");
  const [notesError, setNotesError] = useState("");
  const [isNotesTouched, setIsNotesTouched] = useState(false);

  const validateNotes = async (value) => {
    try {
      await YupValidationSchema.notesValidationSchema.validate(value);
      setNotesError("");
    } catch (err) {
      setNotesError(err.message);
    }
  };

  const handleNotesChange = (e) => {
    const { value } = e.target;
    setNotes(value);
    validateNotes(value);
  };

  const handleNotesFocus = () => {
    setIsNotesTouched(true);
  };
  return (
    <div>
      <span>Notes</span>
      <textarea
        placeholder="Write notes Here"
        className={`form-control ${
          isNotesTouched && notesError ? "is-invalid" : ""
        } ${isNotesTouched && !notesError && notes ? "is-valid" : ""}`}
        onChange={handleNotesChange}
        onFocus={handleNotesFocus}
      ></textarea>
      {isNotesTouched && notesError && (
        <div className="invalid-feedback">{notesError}</div>
      )}
      {isNotesTouched && !notesError && notes && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function Reason() {
  const [reason, setReason] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [isReasonTouched, setIsReasonTouched] = useState(false);

  const validateReason = async (value) => {
    try {
      await YupValidationSchema.reasonValidationSchema.validate(value);
      setReasonError("");
    } catch (err) {
      setReasonError(err.message);
    }
  };

  const handleReasonChange = (e) => {
    const { value } = e.target;
    setReason(value);
    validateReason(value);
  };

  const handleReasonFocus = () => {
    setIsReasonTouched(true);
  };
  return (
    <div>
      <span>Reason</span>
      <textarea
        placeholder="Enter reason"
        className={`form-control ${
          isReasonTouched && reasonError ? "is-invalid" : ""
        } ${isReasonTouched && !reasonError && reason ? "is-valid" : ""}`}
        onChange={handleReasonChange}
        onFocus={handleReasonFocus}
      ></textarea>
      {isReasonTouched && reasonError && (
        <div className="invalid-feedback">{reasonError}</div>
      )}
      {isReasonTouched && !reasonError && reason && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function LastNameInput({ value, onChange, onValidationChange }) {
  const [lastName, setLastName] = useState( value || "");
  const [lastNameError, setLastNameError] = useState("");
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);

  const validateLastName = async (value) => {
    try {
      await YupValidationSchema.lastNameValidationSchema.validate(value);
      setLastNameError("");
      onValidationChange(true);
    } catch (err) {
      setLastNameError(err.message);
      onValidationChange(false);
    }
  };

  const handleLastNameChange = (e) => {
    const { value } = e.target;
    setLastName(value);
    onChange(value);
    validateLastName(value);
  };

  const handleLastNameFocus = () => {
    setIsLastNameTouched(true);
  };
  return (
    <div>
      <span>Last Name </span>
      <input
        type="text"
        placeholder="Chongong"
        onChange={handleLastNameChange}
        onFocus={handleLastNameFocus}
        className={`form-control ${
          isLastNameTouched && lastNameError ? "is-invalid" : ""
        } ${isLastNameTouched && !lastNameError && lastName ? "is-valid" : ""}`}
      />
      {isLastNameTouched && lastNameError && (
        <div className="invalid-feedback">{lastNameError}</div>
      )}
      {isLastNameTouched && !lastNameError && lastName && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function FirstNameInput({value, onChange, onValidationChange }) {
  const [firstName, setFirstName] = useState( value || "");
  const [firstNameError, setFirstNameError] = useState("");
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);

  const validateFirstName = async (value) => {
    try {
      await YupValidationSchema.firstNameValidationSchema.validate(value);
      setFirstNameError("");
      onValidationChange(true);
    } catch (err) {
      setFirstNameError(err.message);
      onValidationChange(false);
    }
  };

  const handleFirstNameChange = (e) => {
    const { value } = e.target;
    setFirstName(value);
    onChange(value);
    validateFirstName(value);
  };

  const handleFirstNameFocus = () => {
    setIsFirstNameTouched(true);
  };
  return (
    <div>
      <span>First Name</span>
      <input
        type="text"
        placeholder="Gemuh"
        onChange={handleFirstNameChange}
        onFocus={handleFirstNameFocus}
        className={`form-control ${
          isFirstNameTouched && firstNameError ? "is-invalid" : ""
        } ${
          isFirstNameTouched && !firstNameError && firstName ? "is-valid" : ""
        }`}
      />
      {isFirstNameTouched && firstNameError && (
        <div className="invalid-feedback">{firstNameError}</div>
      )}
      {isFirstNameTouched && !firstNameError && firstName && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function BatchTitleInput() {
  const [batchTitle, setBatchTitle] = useState("");
  const [batchTitleError, setBatchTitleError] = useState("");
  const [isBatchTitleTouched, setIsBatchTitleTouched] = useState(false);

  const validateBatchTitle = async (value) => {
    try {
      await YupValidationSchema.batchTitleValidationSchema.validate(value);
      setBatchTitleError("");
    } catch (err) {
      setBatchTitleError(err.message);
    }
  };

  const handleBatchTitleChange = (e) => {
    const { value } = e.target;
    setBatchTitle(value);
    validateBatchTitle(value);
  };

  const handleFirstNameFocus = () => {
    setIsBatchTitleTouched(true);
  };
  return (
    <div>
      <span>Batch Title</span>
      <input
        type="text"
        placeholder="Batch of endurance"
        onChange={handleBatchTitleChange}
        onFocus={handleFirstNameFocus}
        className={`form-control ${
          isBatchTitleTouched && batchTitleError ? "is-invalid" : ""
        } ${
          isBatchTitleTouched && !batchTitleError && batchTitle
            ? "is-valid"
            : ""
        }`}
      />
      {isBatchTitleTouched && batchTitleError && (
        <div className="invalid-feedback">{batchTitleError}</div>
      )}
      {isBatchTitleTouched && !batchTitleError && batchTitle && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function LocationInput() {
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isLocationTouched, setIsLocationTouched] = useState(false);

  const validateLocation = async (value) => {
    try {
      await YupValidationSchema.locationValidationSchema.validate(value);
      setLocationError("");
    } catch (err) {
      setLocationError(err.message);
    }
  };

  const handleLocationChange = (e) => {
    const { value } = e.target;
    setLocation(value);
    validateLocation(value);
  };

  const handleLocationFocus = () => {
    setIsLocationTouched(true);
  };
  return (
    <div>
      <span>Location</span>
      <input
        type="text"
        className={`form-control ${
          isLocationTouched && locationError ? "is-invalid" : ""
        } ${isLocationTouched && !locationError && location ? "is-valid" : ""}`}
        placeholder="Enter location"
        onChange={handleLocationChange}
        onFocus={handleLocationFocus}
      />
      {isLocationTouched && locationError && (
        <div className="invalid-feedback">{locationError}</div>
      )}
      {isLocationTouched && !locationError && location && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function EventTitleInput() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventTitleError, setEventTitleError] = useState("");
  const [isEventTItleTouched, setIsEventTitleTouched] = useState(false);

  const validateEventTile = async (value) => {
    try {
      await YupValidationSchema.titleValidationSchema.validate(value);
      setEventTitleError("");
    } catch (err) {
      setEventTitleError(err.message);
    }
  };

  const handleEventTitleChange = (e) => {
    const { value } = e.target;
    setEventTitle(value);
    validateEventTile(value);
  };

  const handleEventTitleFocus = () => {
    setIsEventTitleTouched(true);
  };
  return (
    <div>
      <span>Event Title</span>
      <input
        type="text"
        onChange={handleEventTitleChange}
        onFocus={handleEventTitleFocus}
        className={`form-control ${
          isEventTItleTouched && eventTitleError ? "is-invalid" : ""
        } ${
          isEventTItleTouched && !eventTitleError && eventTitle
            ? "is-valid"
            : ""
        }`}
        placeholder="Enter event title"
      />
      {isEventTItleTouched && eventTitleError && (
        <div className="invalid-feedback">{eventTitleError}</div>
      )}
      {isEventTItleTouched && !eventTitleError && eventTitle && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function DescriptionInput({ onChange, onValidationChange, value }) {
  const [description, setDescription] = useState( value || "");
  const [descriptionError, setDescriptionError] = useState("");
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);

  const validateDescription = async (value) => {
    try {
      await YupValidationSchema.descriptionSchema.validate(value);
      setDescriptionError("");
      onValidationChange(true)
    } catch (err) {
      setDescriptionError(err.message);
      onValidationChange(false);
    }
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setDescription(value);
    onChange(value)
    validateDescription(value);
  };

  const handleDescriptionFocus = () => {
    setIsDescriptionTouched(true);
  };
  return (
    <div>
      <span>Description</span>
      <textarea
        placeholder="Enter Description .........."
        className={`form-control ${
          isDescriptionTouched && descriptionError ? "is-invalid" : ""
        } ${
          isDescriptionTouched && !descriptionError && description
            ? "is-valid"
            : ""
        }`}
        onChange={handleDescriptionChange}
        onFocus={handleDescriptionFocus}
      ></textarea>
      {isDescriptionTouched && descriptionError && (
        <div className="invalid-feedback">{descriptionError}</div>
      )}
      {isDescriptionTouched && !descriptionError && description && (
        <div className="valid-feedback">Looks good!</div>
      )}
    </div>
  );
}

export function PreferredLanguageInput() {
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [preferredLanguageError, setPreferredLanguageError] = useState("");
  const [isPreferredLanguageTouched, setIsPreferredLanguageTouched] =
    useState(false);

  const validatePreferredLanguage = async (value) => {
    try {
      await YupValidationSchema.preferredLanguageSchema.validate(value);
      setPreferredLanguageError("");
    } catch (err) {
      setPreferredLanguageError(err.message);
    }
  };

  const handlePreferredLanguageChange = (e) => {
    const { value } = e.target;
    setPreferredLanguage(value);
    validatePreferredLanguage(value);
  };

  const handlePreferredLanguageFocus = () => {
    setIsPreferredLanguageTouched(true);
  };
  return (
    <div>
      <span>Preferred Language of Communication</span>
      <input
        type="text"
        onChange={handlePreferredLanguageChange}
        onFocus={handlePreferredLanguageFocus}
        className={`form-control ${
          isPreferredLanguageTouched && preferredLanguageError
            ? "is-invalid"
            : ""
        } ${
          isPreferredLanguageTouched &&
          !preferredLanguageError &&
          preferredLanguage
            ? "is-valid"
            : ""
        }`}
        placeholder="Pigeon, English, French, Bassa"
      />
      {isPreferredLanguageTouched && preferredLanguageError && (
        <div className="invalid-feedback">{preferredLanguageError}</div>
      )}
      {isPreferredLanguageTouched &&
        !preferredLanguageError &&
        preferredLanguage && <div className="valid-feedback">Looks good!</div>}
    </div>
  );
}

export function RelationshipToStudentInput() {
  const [relationshipToStudent, setRelationshipToStudent] = useState("");
  const [relationshipToStudentError, setRelationshipToStudentError] =
    useState("");
  const [isrelationshipToStudentTouched, setIsRelationshipToStudentTouched] =
    useState(false);

  const validateRelationshipToStudent = async (value) => {
    try {
      await YupValidationSchema.relationshipSchema.validate(value);
      setRelationshipToStudentError("");
    } catch (err) {
      setRelationshipToStudentError(err.message);
    }
  };

  const handleRelationshipToStudentChange = (e) => {
    const { value } = e.target;
    setRelationshipToStudent(value);
    validateRelationshipToStudent(value);
  };

  const handleRelationshipToStudentFocus = () => {
    setIsRelationshipToStudentTouched(true);
  };
  return (
    <>
      <div>
        <span>Relationship To Student</span>
        <input
          type="text"
          onChange={handleRelationshipToStudentChange}
          onFocus={handleRelationshipToStudentFocus}
          className={`form-control ${
            isrelationshipToStudentTouched && relationshipToStudentError
              ? "is-invalid"
              : ""
          } ${
            isrelationshipToStudentTouched &&
            !relationshipToStudentError &&
            relationshipToStudent
              ? "is-valid"
              : ""
          }`}
          placeholder="Mother, Father, Aunt, Uncle"
        />
        {isrelationshipToStudentTouched && relationshipToStudentError && (
          <div className="invalid-feedback">{relationshipToStudentError}</div>
        )}
        {isrelationshipToStudentTouched &&
          !relationshipToStudentError &&
          relationshipToStudent && (
            <div className="valid-feedback">Looks good!</div>
          )}
      </div>
    </>
  );
}

export function MinimumScoreInput({ maxValue, onChange, value }){
  const [score, setScore] = useState( value || 0);
  const [scoreError, setScoreError] = useState("");
  const [isScoreTouched, setIsScoreTouched] = useState(false);

  const validateScore = async (value) => {
    try {
      const numberSchema = YupValidationSchema.createNumberSchema(maxValue);
      await numberSchema.validate(value);
      setScoreError("");
    } catch (err) {
      setScoreError(err.message);
    }
  };

  const handleScoreChange = (e) => {
    const { value } = e.target;
    setScore(value);
    onChange(value)
    validateScore(value);
  };

  const handleScoreFocus = () => {
    setIsScoreTouched(true);
  };

  return (
    <>
      <div>
        <input
          type="number"
          value={score}
          onChange={handleScoreChange}
          onFocus={handleScoreFocus}
          step="0.01"
          className={`form-control form-control-sm ${
            isScoreTouched && scoreError ? "is-invalid" : ""
          } ${
            isScoreTouched && !scoreError && score ? "is-valid" : ""
          }`}
          placeholder="Enter a number (0 to {maxValue})"
        />
        {isScoreTouched && scoreError && (
          <div className="invalid-feedback">{scoreError}</div>
        )}
        {isScoreTouched && !scoreError && score && (
          <div className="valid-feedback">Looks good!</div>
        )}
      </div>
    </>
  );
}