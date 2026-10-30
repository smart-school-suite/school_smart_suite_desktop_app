import {
    createDynamicRefCallback,
    isValidationSuccessful,
    removeDynamicFieldValidation,
    removeDynamicRefs,
    updateDynamicFieldValidation,
    validateCustomRules,
    validateDynamicSection,
    validateRefs,
} from "@/utils/form";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    academicYearSchema,
    addressSchema,
    emailValidationSchema,
    nameSchema,
    phoneValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import {
    AcademicYearInput,
    PhoneNumberInput,
    TextInput,
} from "../../components/FormComponents/InputComponents";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import { NotFoundError } from "../../components/errors/Error";
import { useGetActiveGender } from "../../hooks/gender/useGetActiveGender";
import { useGetLevels } from "../../hooks/level/useGetLevels";
import { useGetQualifications } from "../../hooks/qualification/useGetQualification";
import { useGetTeacherDetails } from "../../hooks/teacher/useGetTeacherDetails";
import { useUpdateTeacher } from "../../hooks/teacher/useUpdateTeacher";
import { isLastElement, parseServerError } from "../../utils/functions";

const qInstance = {
  qualification_id: "",
  field_of_study: "",
  year: "",
  institution: "",
};

const PERSONAL_FIELDS = [
  "first_name",
  "last_name",
  "name",
  "email",
  "address",
  "phone",
  "gender_id",
];

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: "auto",
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    height: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const toFormData = (teacher) => ({
  first_name: teacher?.first_name ?? "",
  last_name: teacher?.last_name ?? "",
  name: teacher?.name ?? "",
  email: teacher?.email ?? "",
  address: teacher?.address ?? "",
  phone: teacher?.phone ?? "",
  gender_id: teacher?.gender_id ?? "",
  allowed_levels: (teacher?.levels ?? []).map((level) => ({
    allowed_level: level.id,
  })),
  qualifications: (teacher?.qualifications ?? []).map((q) => ({
    id: q.pivot?.id || uuidv4(),
    qualification_id: q.id,
    field_of_study: q.pivot?.field_of_study ?? "",
    institution: q.pivot?.institution ?? "",
    year: q.pivot?.year ?? "",
  })),
});

const toPersonalValue = (field, value) => {
  if (field === "gender_id") return value?.id || value || "";
  return typeof value === "string" ? value.trim() : (value ?? "");
};

const toLevelIds = (allowedLevels) =>
  allowedLevels.map((al) => al.allowed_level);

const toQualificationsPayload = (qualifications) =>
  qualifications.map((q) => ({
    qualification_id: q.qualification_id?.id || q.qualification_id,
    field_of_study: q.field_of_study.trim(),
    institution: q.institution.trim(),
    year: q.year.trim(),
  }));

const sameLevels = (a, b) =>
  JSON.stringify([...toLevelIds(a)].sort()) ===
  JSON.stringify([...toLevelIds(b)].sort());

const sameQualifications = (a, b) =>
  JSON.stringify(toQualificationsPayload(a)) ===
  JSON.stringify(toQualificationsPayload(b));

function UpdateTeacher({ drawerData, handleClose }) {
  const { id: teacherId } = drawerData;
  const {
    data: teacherDetails,
    isLoading,
    error,
  } = useGetTeacherDetails(teacherId);

  if (isLoading) {
    return (
      <div className="d-flex flex-column w-100 gap-3">
        {[...Array(6)].map((_, index) => (
          <div className="d-flex flex-column gap-2 w-100" key={index}>
            <RectangleSkeleton width="25%" height="1dvh" />
            <RectangleSkeleton width="100%" height="5dvh" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <NotFoundError
        title={error?.response?.data?.errors?.title}
        description={error?.response?.data?.errors?.description}
      />
    );
  }

  return (
    <UpdateTeacherForm
      teacherId={teacherId}
      teacher={teacherDetails?.data}
      handleClose={handleClose}
    />
  );
}

function UpdateTeacherForm({ teacherId, teacher, handleClose }) {
  const {
    data: genderData,
    isLoading: isGenderLoading,
    error: genderError,
  } = useGetActiveGender();
  const {
    data: levels,
    isLoading: isLevelLoading,
    error: levelError,
  } = useGetLevels();
  const {
    data: qualifications,
    isLoading: isQualificationLoading,
    error: qualificationError,
  } = useGetQualifications();

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const fullNameRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  const phoneNumberRef = useRef();
  const addressRef = useRef();
  const formRefs = useRef({});
  const errorBannerRef = useRef(null);

  const fieldRefs = {
    first_name: firstNameRef,
    last_name: lastNameRef,
    name: fullNameRef,
    email: emailRef,
    gender_id: genderRef,
    phone: phoneNumberRef,
    address: addressRef,
  };

  const [initialData] = useState(() => toFormData(teacher));
  const [formData, setFormData] = useState(initialData);

  const [isFieldValid, setFieldValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    phone: "",
    address: "",
    allowed_levels: "",
    qualifications: "",
  });

  // Only the setter is needed by the dynamic validation helpers
  const [, setDynamicFieldValid] = useState({});

  const [errors, setErrors] = useState({
    gender: "",
    qualifications: {},
  });

  const [clientError, setClientError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const { mutate: updateTeacherMutation, isPending } =
    useUpdateTeacher(handleClose);

  useEffect(() => {
    if ((clientError || serverError) && errorBannerRef.current) {
      errorBannerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [clientError, serverError]);

  // 🔹 Change detection
  const changedPersonalFields = PERSONAL_FIELDS.filter(
    (field) =>
      toPersonalValue(field, formData[field]) !==
      toPersonalValue(field, initialData[field]),
  );
  const levelsChanged = !sameLevels(
    formData.allowed_levels,
    initialData.allowed_levels,
  );
  const qualificationsChanged = !sameQualifications(
    formData.qualifications,
    initialData.qualifications,
  );
  const hasChanges =
    changedPersonalFields.length > 0 || levelsChanged || qualificationsChanged;

  const clearBannerErrors = () => {
    setClientError(null);
    setServerError(null);
  };

  // Every formData update goes through here so the banner clears once the user edits
  const updateFormData = (updater) => {
    clearBannerErrors();
    setFormData(updater);
  };

  const handleFormChange = (field, value) => {
    updateFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleQualificationChange = (id, field, value) => {
    updateFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.map((q) =>
        q.id === id ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const handleQualificationDropdownError = (id, value) => {
    setErrors((prev) => ({
      ...prev,
      qualifications: { ...prev.qualifications, [id]: value },
    }));
  };

  const removeQualification = (id) => {
    removeDynamicRefs(formRefs, "qualifications", id);
    removeDynamicFieldValidation(setDynamicFieldValid, "qualifications", id);
    setErrors((prev) => {
      const { [id]: _removed, ...rest } = prev.qualifications;
      return { ...prev, qualifications: rest };
    });

    const remaining = formData.qualifications.filter((q) => q.id !== id);
    updateFormData((prev) => ({ ...prev, qualifications: remaining }));
    if (isFieldValid.qualifications !== "") {
      setFieldValid((prev) => ({
        ...prev,
        qualifications: remaining.length > 0,
      }));
    }
  };

  const addQualification = () => {
    updateFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, { ...qInstance, id: uuidv4() }],
    }));
    if (isFieldValid.qualifications !== "") {
      setFieldValid((prev) => ({ ...prev, qualifications: true }));
    }
  };

  const toggleLevelSelection = (levelId) => {
    const exists = formData.allowed_levels.some(
      (item) => item.allowed_level === levelId,
    );
    const nextLevels = exists
      ? formData.allowed_levels.filter((item) => item.allowed_level !== levelId)
      : [...formData.allowed_levels, { allowed_level: levelId }];

    updateFormData((prev) => ({ ...prev, allowed_levels: nextLevels }));
    setFieldValid((prev) => ({
      ...prev,
      allowed_levels: nextLevels.length > 0,
    }));
  };

  const hasDuplicateQualifications = () => {
    const ids = toQualificationsPayload(formData.qualifications)
      .map((q) => q.qualification_id)
      .filter(Boolean);
    return new Set(ids).size !== ids.length;
  };

  // Only validate what changed, so untouched legacy data doesn't block the update
  const handlePrevalidation = async () => {
    const staticValidation = await validateRefs(
      Object.fromEntries(
        changedPersonalFields.map((field) => [field, fieldRefs[field].current]),
      ),
    );

    const qualificationValidation = qualificationsChanged
      ? await validateDynamicSection(formRefs.current.qualifications || {})
      : {};

    const customValidation = await validateCustomRules({
      allowed_levels: () => formData.allowed_levels.length > 0,
      qualifications: () => formData.qualifications.length > 0,
      unique_qualifications: () => !hasDuplicateQualifications(),
    });

    return {
      static: staticValidation,
      qualifications: qualificationValidation,
      custom: customValidation,
    };
  };

  const handleUpdateTeacher = async () => {
    clearBannerErrors();
    if (!hasChanges) return;

    const hasLevels = formData.allowed_levels.length > 0;
    const hasQualifications = formData.qualifications.length > 0;
    setFieldValid((prev) => ({
      ...prev,
      allowed_levels: hasLevels,
      qualifications: hasQualifications,
    }));

    const validation = await handlePrevalidation();
    if (!isValidationSuccessful(validation)) {
      const messages = [];
      if (!hasLevels) messages.push("Select at least one teaching level.");
      if (!hasQualifications) messages.push("Add at least one qualification.");
      if (hasDuplicateQualifications())
        messages.push("Each qualification can only be added once.");
      setClientError({
        title:
          "Please correct the highlighted fields before updating the teacher.",
        messages,
      });
      return;
    }

    const payload = Object.fromEntries(
      changedPersonalFields.map((field) => [
        field,
        toPersonalValue(field, formData[field]) || null,
      ]),
    );
    if (levelsChanged) {
      payload.allowed_level_ids = toLevelIds(formData.allowed_levels);
    }
    if (qualificationsChanged) {
      payload.qualifications = toQualificationsPayload(formData.qualifications);
    }

    updateTeacherMutation(
      { teacherId, updateData: payload },
      {
        onError: (error) =>
          setServerError(parseServerError(error, "Failed To Update Teacher")),
      },
    );
  };

  const getValidationClass = (field) => {
    if (field === false) return "border-danger";
    if (field === true) return "border-success";
    return "";
  };

  const bannerError = clientError || serverError;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-size-sm d-flex flex-column gap-4 pt-2"
      style={{ flex: 1, minHeight: 0 }}
    >
      <div className="drawer-content px-2">
        <AnimatePresence>
          {bannerError && (
            <motion.div
              key="form-error"
              ref={errorBannerRef}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-red-50 p-2 rounded-3 text-red-700 mb-4 d-flex flex-row align-items-start justify-content-between gap-2"
              role="alert"
            >
              <div className="d-flex flex-column gap-1">
                <p className="m-0 fw-medium">{bannerError.title}</p>
                {bannerError.messages?.length > 0 && (
                  <ul className="m-0 ps-3">
                    {bannerError.messages.map((msg, i) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                type="button"
                className="border-none bg-none p-0 text-red-700"
                onClick={clearBannerErrors}
                aria-label="Dismiss error"
              >
                <X size={16} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="d-flex flex-column gap-2">
          <span className="fw-light text-iron-500">Personal Information</span>
          <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-row align-items-center gap-2">
              <div className="w-50">
                <label htmlFor="firstName" className="font-size-sm fw-semibold">
                  First Name
                </label>
                <TextInput
                  placeholder={"Enter Teacher First Name"}
                  onChange={(value) => handleFormChange("first_name", value)}
                  onValidationChange={(value) =>
                    handleStateChange("first_name", value, setFieldValid)
                  }
                  validationSchema={nameSchema({
                    min: 3,
                    max: 50,
                    required: true,
                    messages: {
                      min: "First Name Must Be Atleast 3 Characters Long",
                      max: "First Name Must Not Exceed 50 Characters",
                      required: "First Name Required",
                    },
                  })}
                  value={formData.first_name}
                  ref={firstNameRef}
                />
              </div>
              <div className="w-50">
                <label htmlFor="lastName" className="font-size-sm fw-semibold">
                  Last Name
                </label>
                <TextInput
                  placeholder={"Enter Teacher Last Name"}
                  onChange={(value) => handleFormChange("last_name", value)}
                  onValidationChange={(value) =>
                    handleStateChange("last_name", value, setFieldValid)
                  }
                  validationSchema={nameSchema({
                    min: 3,
                    max: 50,
                    required: true,
                    messages: {
                      min: "Last Name Must Be Atleast 3 Characters Long",
                      max: "Last Name Must Not Exceed 50 Characters",
                      required: "Last Name Required",
                    },
                  })}
                  value={formData.last_name}
                  ref={lastNameRef}
                />
              </div>
            </div>
            <div>
              <label htmlFor="fullNames" className="font-size-sm fw-semibold">
                Full Names
              </label>
              <TextInput
                onChange={(value) => handleFormChange("name", value)}
                onValidationChange={(value) =>
                  handleStateChange("name", value, setFieldValid)
                }
                value={formData.name}
                validationSchema={nameSchema({
                  min: 3,
                  max: 50,
                  required: true,
                  messages: {
                    min: "Name Must Be Atleast 3 Characters Long",
                    max: "Name Must Not Exceed 50 Characters",
                    required: "Full Name Required",
                  },
                })}
                placeholder={"Enter Teacher Full Names"}
                ref={fullNameRef}
              />
            </div>
            <div>
              <label htmlFor="email" className="font-size-sm fw-semibold">
                E-mail
              </label>
              <TextInput
                type="email"
                onChange={(value) => handleFormChange("email", value)}
                onValidationChange={(value) =>
                  handleStateChange("email", value, setFieldValid)
                }
                placeholder={"e.g example@gmail.com"}
                validationSchema={emailValidationSchema({ required: true })}
                value={formData.email}
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="address" className="font-size-sm fw-semibold">
                Address
              </label>
              <TextInput
                onChange={(value) => handleFormChange("address", value)}
                onValidationChange={(value) =>
                  handleStateChange("address", value, setFieldValid)
                }
                placeholder={"e.g Yaounde Avenue Charles De Gaulle"}
                validationSchema={addressSchema({
                  min: 5,
                  max: 200,
                  required: true,
                  messages: {
                    min: "Address Must Be Atleast 5 Characters Long",
                    max: "Address Must Not Exceed 200 Characters",
                    required: "Address Required",
                  },
                })}
                value={formData.address}
                ref={addressRef}
              />
            </div>
            <div>
              <label htmlFor="gender" className="font-size-sm fw-semibold">
                Gender
              </label>
              {isGenderLoading ? (
                <RectangleSkeleton width="100%" height="5dvh" />
              ) : (
                <CustomDropdown
                  data={genderData?.data || []}
                  displayKey={["name"]}
                  valueKey={["id"]}
                  direction="up"
                  onSelect={(value) => handleFormChange("gender_id", value)}
                  onError={(value) =>
                    handleStateChange("gender", value, setErrors)
                  }
                  errorMessage="Gender Required"
                  error={errors.gender}
                  placeholder="Select Gender"
                  ref={genderRef}
                  value={formData.gender_id?.id || formData.gender_id}
                />
              )}
              {genderError && (
                <span className="font-size-sm text-danger">
                  Failed to load genders. Please refresh and try again.
                </span>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="font-size-sm fw-semibold">
                Phone Number
              </label>
              <PhoneNumberInput
                onChange={(value) => handleFormChange("phone", value)}
                onValidationChange={(value) =>
                  handleStateChange("phone", value, setFieldValid)
                }
                value={formData.phone}
                validationSchema={phoneValidationSchema({
                  optional: false,
                  prefixes: ["6", "2"],
                  messages: { required: "Phone Number Required" },
                })}
                ref={phoneNumberRef}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-3">
            <span className="fw-light text-iron-500">Teaching Scope</span>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-1">
                <span className="fw-semibold">Teaching Levels</span>
                <div className="input-container">
                  <div
                    className={`card rounded-3 p-2 ${getValidationClass(isFieldValid.allowed_levels)}`}
                  >
                    <span className="font-size-sm text-muted">
                      {formData.allowed_levels.length > 0
                        ? `${formData.allowed_levels.length} Level(s) Selected`
                        : "Selected Levels Will Appear Here"}
                    </span>
                  </div>
                  {isFieldValid.allowed_levels === false && (
                    <div className="mt-auto">
                      <span className="font-size-sm text-danger">
                        At Least One Level Is Required
                      </span>
                    </div>
                  )}
                </div>
              </div>
              {isLevelLoading ? (
                <div className="d-flex flex-row flex-wrap gap-2">
                  {[...Array(5)].map((_, index) => (
                    <RectangleSkeleton key={index} width="10rem" height="5dvh" />
                  ))}
                </div>
              ) : levelError ? (
                <div className="alert alert-warning font-size-sm">
                  An error occurred when fetching levels. Please try refreshing
                  again.
                </div>
              ) : (
                <div className="d-flex flex-row flex-wrap gap-2">
                  {levels?.data?.map((level) => {
                    const isSelected = formData.allowed_levels.some(
                      (al) => al.allowed_level === level.id,
                    );
                    return (
                      <motion.button
                        key={level.id}
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                        onClick={() => toggleLevelSelection(level.id)}
                        className={`font-size-sm px-3 py-2 border rounded-pill ${
                          isSelected
                            ? "primary-background-100 color-primary"
                            : "bg-transparent"
                        }`}
                      >
                        {level?.name}
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <span className="fw-semibold">Qualifications</span>
            {qualificationError && (
              <div className="alert alert-warning font-size-sm m-0">
                An error occurred when fetching qualifications. Please try
                refreshing again.
              </div>
            )}
            <AnimatePresence mode="wait">
              {formData.qualifications.length === 0 ? (
                <motion.div
                  key="empty-qualifications"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div
                    className={`d-flex flex-column gap-3 align-items-center justify-content-center card rounded-4 ${getValidationClass(isFieldValid.qualifications)}`}
                    style={{ height: "40dvh" }}
                  >
                    <span>
                      No Qualifications Found. Please click on the button below
                      to add qualifications.
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="border-none border p-2 font-size-sm outline-none bg-none rounded-3"
                      onClick={addQualification}
                    >
                      <div className="d-flex flex-row align-items-center gap-2">
                        <Plus size={16} />
                        <span>Add Qualification</span>
                      </div>
                    </motion.button>
                    {isFieldValid.qualifications === false && (
                      <span className="font-size-sm text-danger">
                        At Least One Qualification Is Required
                      </span>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="qualifications-list"
                  className="d-flex flex-column gap-4"
                >
                  <AnimatePresence>
                    {formData.qualifications.map((qualification, index) => (
                      <motion.div
                        key={qualification.id}
                        layout
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="d-flex flex-column gap-4"
                      >
                        <div
                          className="d-flex flex-column gap-2 align-items-center justify-content-center w-100"
                          style={{ minHeight: "40dvh" }}
                        >
                          <div className="d-flex w-100 justify-content-between align-items-center">
                            <small className="text-muted">
                              Qualification #{index + 1}
                            </small>
                            <motion.button
                              whileHover={{ scale: 1.1, color: "#dc3545" }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              className="btn btn-sm text-danger p-0 border-0 bg-transparent"
                              onClick={() =>
                                removeQualification(qualification.id)
                              }
                              title="Remove Qualification"
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                          <div className="d-flex flex-column gap-1 w-100">
                            <span className="fw-semibold">Field of Study</span>
                            <TextInput
                              placeholder={"Enter Field of Study"}
                              onChange={(value) =>
                                handleQualificationChange(
                                  qualification.id,
                                  "field_of_study",
                                  value,
                                )
                              }
                              validationSchema={nameSchema({
                                min: 3,
                                max: 200,
                                required: true,
                                messages: {
                                  min: "Field of Study Must Be Atleast 3 Characters Long",
                                  max: "Field of Study Must Not Exceed 200 Characters",
                                  required: "Field of Study Required",
                                },
                              })}
                              ref={createDynamicRefCallback(
                                formRefs,
                                "qualifications",
                                qualification.id,
                                "field_of_study",
                              )}
                              onValidationChange={(value) =>
                                updateDynamicFieldValidation(
                                  setDynamicFieldValid,
                                  "qualifications",
                                  qualification.id,
                                  "field_of_study",
                                  value,
                                )
                              }
                              value={qualification.field_of_study}
                            />
                          </div>
                          <div className="d-flex flex-column gap-1 w-100">
                            <span className="fw-semibold">Institution</span>
                            <TextInput
                              placeholder={"Enter Institution"}
                              onChange={(value) =>
                                handleQualificationChange(
                                  qualification.id,
                                  "institution",
                                  value,
                                )
                              }
                              validationSchema={nameSchema({
                                min: 3,
                                max: 150,
                                required: true,
                                messages: {
                                  min: "Institution Must Be Atleast 3 Characters Long",
                                  max: "Institution Must Not Exceed 150 Characters",
                                  required: "Institution Required",
                                },
                              })}
                              ref={createDynamicRefCallback(
                                formRefs,
                                "qualifications",
                                qualification.id,
                                "institution",
                              )}
                              onValidationChange={(value) =>
                                updateDynamicFieldValidation(
                                  setDynamicFieldValid,
                                  "qualifications",
                                  qualification.id,
                                  "institution",
                                  value,
                                )
                              }
                              value={qualification.institution}
                            />
                          </div>
                          <div className="d-flex flex-column gap-1 w-100">
                            <span className="fw-semibold">Academic Year</span>
                            <AcademicYearInput
                              id={`year-${qualification.id}`}
                              name={`year-${qualification.id}`}
                              placeholder="e.g 2026-2027"
                              value={qualification.year}
                              onChange={(value) =>
                                handleQualificationChange(
                                  qualification.id,
                                  "year",
                                  value,
                                )
                              }
                              validationSchema={academicYearSchema({
                                required: true,
                                messages: {
                                  required: "Academic Year Required",
                                },
                              })}
                              ref={createDynamicRefCallback(
                                formRefs,
                                "qualifications",
                                qualification.id,
                                "year",
                              )}
                              onValidationChange={(value) =>
                                updateDynamicFieldValidation(
                                  setDynamicFieldValid,
                                  "qualifications",
                                  qualification.id,
                                  "year",
                                  value,
                                )
                              }
                            />
                          </div>
                          <div className="d-flex flex-column gap-1 w-100">
                            <span className="fw-semibold">Qualification</span>
                            {isQualificationLoading ? (
                              <RectangleSkeleton width="100%" height="5dvh" />
                            ) : (
                              <CustomDropdown
                                data={qualifications?.data || []}
                                displayKey={["name"]}
                                valueKey={["id"]}
                                direction="up"
                                onSelect={(value) =>
                                  handleQualificationChange(
                                    qualification.id,
                                    "qualification_id",
                                    value,
                                  )
                                }
                                onError={(value) =>
                                  handleQualificationDropdownError(
                                    qualification.id,
                                    value,
                                  )
                                }
                                error={errors.qualifications[qualification.id]}
                                errorMessage="Qualification Required"
                                placeholder="Select Qualification"
                                value={
                                  qualification.qualification_id?.id ||
                                  qualification.qualification_id
                                }
                                ref={createDynamicRefCallback(
                                  formRefs,
                                  "qualifications",
                                  qualification.id,
                                  "qualification_id",
                                )}
                              />
                            )}
                          </div>
                        </div>
                        {!isLastElement(index, formData.qualifications) && (
                          <HorizontalDashedLine
                            color={"#ccc"}
                            thickness={0.5}
                            dashed={false}
                            className="mb-2"
                          />
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div className="d-flex flex-row justify-content-end mt-auto">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="border-none border p-2 font-size-sm outline-none bg-none rounded-3"
                      onClick={addQualification}
                    >
                      <div className="d-flex flex-row align-items-center gap-2">
                        <Plus size={16} />
                        <span>Add Qualification</span>
                      </div>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="drawer-footer">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between p-2">
            <button
              type="button"
              className="border-none bg-none"
              onClick={() => handleClose()}
              disabled={isPending}
            >
              Cancel
            </button>
            <button
              type="button"
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={handleUpdateTeacher}
              disabled={isPending || !hasChanges}
              title={!hasChanges ? "No changes to save" : undefined}
            >
              {isPending ? <SingleSpinner /> : "Update Teacher"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default UpdateTeacher;