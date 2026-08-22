import { Icon } from "@iconify/react";
import { Fragment, useRef, useState } from "react";
import { useCreateTeacher } from "../../hooks/teacher/useCreateTeacher";
import { SingleSpinner } from "../../components/Spinners/Spinners";
import {
  emailValidationSchema,
  nameSchema,
  phoneValidationSchema,
} from "../../ComponentConfig/YupValidationSchema";
import {
  PhoneNumberInput,
  TextInput,
} from "../../components/FormComponents/InputComponents";
import { gender as genderOptions } from "../../data/data";
import CustomDropdown from "../../components/Dropdowns/Dropdowns";
import { allFieldsValid, isLastElement } from "../../utils/functions";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { useGetActiveGender } from "../../hooks/gender/useGetActiveGender";
import { useGetLevels } from "../../hooks/level/useGetLevels";
import { v4 as uuidv4 } from "uuid";
import { Plus, Trash2 } from "lucide-react";
import { useGetQualifications } from "../../hooks/qualification/useGetQualification";
import HorizontalDashedLine from "../../components/DashedLine/HorizonetalDashedLine";
import { motion, AnimatePresence } from "framer-motion";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";

const qInstance = {
  qualification_id: "",
  field_of_study: "",
  year: "",
  institution: "",
};

const aLInstance = {
  allowed_level: "",
};

// Motion Variant Presets
const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
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

function CreateTeacher({ handleClose }) {
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

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    gender_id: "",
    phone: "",
    address: "",
    qualifications: [],
    allowed_levels: [],
  });

  const [isFieldValid, setFieldValid] = useState({
    email: "",
    name: "",
    last_name: "",
    first_name: "",
    phone: "",
    address: "",
    allowed_levels: "",
  });

  const [errors, setErrors] = useState({
    gender: "",
  });

  const { mutate: createTeacherMutation, isPending } =
    useCreateTeacher(handleClose);

  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleQualificationChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.map((q) =>
        q.id === id ? { ...q, [field]: value } : q,
      ),
    }));
  };

  const removeQualification = (id) => {
    setFormData((prev) => ({
      ...prev,
      qualifications: prev.qualifications.filter((q) => q.id !== id),
    }));
  };

  const addQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, { ...qInstance, id: uuidv4() }],
    }));
  };

  const toggleLevelSelection = (levelId) => {
    setFormData((prev) => {
      const exists = prev.allowed_levels.some(
        (item) => item.allowed_level === levelId,
      );
      return {
        ...prev,
        allowed_levels: exists
          ? prev.allowed_levels.filter((item) => item.allowed_level !== levelId)
          : [...prev.allowed_levels, { allowed_level: levelId }],
      };
    });
  };

  const handlePrevalidation = async () => {
    if (formData.allowed_levels.length == 0) {
      setFieldValid((prev) => {
        const clone = { ...prev };
        clone.allowed_levels = false;
        return clone;
      });
    } else {
      setFieldValid((prev) => {
        const clone = { ...prev };
        clone.allowed_levels = true;
        return clone;
      });
    }
    const firstName = await firstNameRef.current?.triggerValidation?.();
    const lastName = await lastNameRef.current?.triggerValidation?.();
    const fullName = await fullNameRef.current?.triggerValidation?.();
    const email = await emailRef.current?.triggerValidation?.();
    const gender = await genderRef.current?.triggerValidation?.();
    const phoneNumber = await phoneNumberRef.current?.triggerValidation?.();
    const address = await addressRef?.current?.triggerValidation();
    return {
      firstName,
      lastName,
      fullName,
      email,
      gender,
      phoneNumber,
      address,
    };
  };

  const handleCreateTeacher = async () => {
    const prevalidation = await handlePrevalidation();
    if (!allFieldsValid(prevalidation) || !allFieldsValid(isFieldValid)) {
      toast.custom(
        <ToastWarning
          title={"Invalid Fields"}
          description={
            "Please ensure all fields are valid before creating a teacher."
          }
        />,
      );
      return;
    }

    const payload = {
      ...formData,
      gender_id: formData.gender_id?.id || formData.gender_id,
      qualifications: formData.qualifications.map((q) => ({
        ...q,
        qualification_id: q.qualification_id?.id || q.qualification_id,
      })),
    };

    createTeacherMutation(payload);
  };

  const getValidationClass = (field) => {
    if (field === false) return "border-danger";
    if (field === true) return "border-success";
    return "";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="font-size-sm d-flex flex-column gap-4"
      style={{ flex: 1, minHeight: 0 }}
    >
      <div className="drawer-content px-2">
        <div className="d-flex flex-column gap-2">
          <span className="fw-medium text-muted">Personal Information</span>
          <div className="d-flex flex-column gap-1">
            <div className="d-flex flex-row align-items-center gap-2">
              <div className="w-50">
                <label htmlFor="firstName" className="font-size-sm fw-semibold">
                  First Name
                </label>
                <TextInput
                  placeholder={"Enter Teacher First Name"}
                  onChange={(value) =>
                    handleStateChange("first_name", value, setFormData)
                  }
                  onValidationChange={(value) =>
                    handleStateChange("first_name", value, setFieldValid)
                  }
                  validationSchema={nameSchema({
                    min: 3,
                    max: 50,
                    required: true,
                    message: {
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
                  onChange={(value) =>
                    handleStateChange("last_name", value, setFormData)
                  }
                  onValidationChange={(value) =>
                    handleStateChange("last_name", value, setFieldValid)
                  }
                  validationSchema={nameSchema({
                    min: 3,
                    max: 50,
                    required: true,
                    message: {
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
                onChange={(value) =>
                  handleStateChange("name", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("name", value, setFieldValid)
                }
                value={formData.name}
                validationSchema={nameSchema({
                  min: 3,
                  max: 150,
                  required: true,
                  message: {
                    min: "Name Must Be Atleast 3 Characters Long",
                    max: "Name Must Not Exceed 150 Characters",
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
                onChange={(value) =>
                  handleStateChange("email", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("email", value, setFieldValid)
                }
                placeholder={"e.g example@gmail.com"}
                validationSchema={emailValidationSchema({
                  required: true,
                })}
                value={formData.email}
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="address" className="font-size-sm fw-semibold">
                Address
              </label>
              <TextInput
                onChange={(value) =>
                  handleStateChange("address", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("address", value, setFieldValid)
                }
                placeholder={"e.g Yaounde Avenue Charles De Gaull"}
                validationSchema={nameSchema({
                  min: 3,
                  max: 50,
                  required: true,
                  message: {
                    min: "Address Must Be Atleast 3 Characters Long",
                    max: "Address Must Not Exceed 50 Characters",
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
              <CustomDropdown
                data={genderData?.data || []}
                displayKey={["name"]}
                valueKey={["id"]}
                direction="up"
                onSelect={(value) =>
                  handleStateChange("gender_id", value, setFormData)
                }
                onError={(value) =>
                  handleStateChange("gender", value, setErrors)
                }
                errorMessage="Gender Required"
                error={errors.gender}
                placeholder="Select Gender"
                ref={genderRef}
                value={formData.gender_id?.id || formData.gender_id}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="font-size-sm fw-semibold">
                Phone Number
              </label>
              <PhoneNumberInput
                onChange={(value) =>
                  handleStateChange("phone", value, setFormData)
                }
                onValidationChange={(value) =>
                  handleStateChange("phone", value, setFieldValid)
                }
                value={formData.phone}
                validationSchema={phoneValidationSchema({
                  optional: false,
                  prefixes: ["6", "2"],
                  messages: {
                    required: "Phone Number Required",
                  },
                })}
                ref={phoneNumberRef}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-3">
            <span className="fw-medium text-muted">Teaching Scope</span>
            <div className="d-flex flex-column gap-1">
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
                          : "Selected Levels Will Appear here"}
                      </span>
                    </div>
                    {
                       isFieldValid.allowed_levels === false && (
                          <div className="mt-auto">
                             <span className="font-size-sm text-danger">Alteast One Level Is Required</span>
                          </div>
                       )
                    }
                  </div>
                </div>
                {isLevelLoading ? (
                  <div className="d-flex flex-row flex-wrap gap-2">
                    {[...Array(5)].map((_, index) => (
                      <Fragment>
                        <RectangleSkeleton width="10rem" height="5dvh" />
                      </Fragment>
                    ))}
                  </div>
                ) : levelError ? (
                  <div className="alert alert-warning font-size-sm">
                    An error occured when fetching levels please try refreshing
                    again
                  </div>
                ) : (
                  <div className="d-flex flex-row flex-wrap gap-2">
                    {levels?.data?.map((level) => {
                      const isSelected = formData.allowed_levels.some(
                        (al) => al.allowed_level === level.id,
                      );
                      return (
                        <Fragment key={level.id}>
                          <motion.button
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
                        </Fragment>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-3">
            <span className="fw-semibold">Qualifications</span>
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
                    className="d-flex flex-column gap-3 align-items-center justify-content-center card rounded-4"
                    style={{ height: "40dvh" }}
                  >
                    <span>
                      No Qualifications Found Please Click on the button below
                      to create Qualifications
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      className="border-none border p-2 font-size-sm outline-none bg-none rounded-3"
                      onClick={addQualification}
                    >
                      <div className="d-flex flex-row align-items-center">
                        <Plus size={16} />
                        <span>Add Qualification</span>
                      </div>
                    </motion.button>
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
                            <span className="">Field of Study</span>
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
                                max: 50,
                                required: true,
                                message: {
                                  min: "Field of Study Must Be Atleast 3 Characters Long",
                                  max: "Field of Study Must Not Exceed 50 Characters",
                                  required: "Field of Study Required",
                                },
                              })}
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
                                max: 50,
                                required: true,
                                message: {
                                  min: "Institution Must Be Atleast 3 Characters Long",
                                  max: "Institution Must Not Exceed 50 Characters",
                                  required: "Institution Required",
                                },
                              })}
                              value={qualification.institution}
                            />
                          </div>
                          <div className="d-flex flex-column gap-1 w-100">
                            <span className="fw-semibold">Year</span>
                            <TextInput
                              placeholder={"Enter Year"}
                              onChange={(value) =>
                                handleQualificationChange(
                                  qualification.id,
                                  "year",
                                  value,
                                )
                              }
                              validationSchema={nameSchema({
                                min: 3,
                                max: 50,
                                required: true,
                                message: {
                                  min: "Year Must Be Atleast 3 Characters Long",
                                  max: "Year Must Not Exceed 50 Characters",
                                  required: "Year Required",
                                },
                              })}
                              value={qualification.year}
                            />
                          </div>
                          <div className="d-flex flex-column gap-1 w-100">
                            <span className="fw-semibold">Qualification</span>
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
                              errorMessage="Qualification Required"
                              placeholder="Select Qualification"
                              value={
                                qualification.qualification_id?.id ||
                                qualification.qualification_id
                              }
                            />
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
              className="border-none bg-none"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="border-none rounded-3 primary-background text-white font-size-sm px-3 py-2"
              onClick={() => handleCreateTeacher()}
              disabled={isPending}
            >
              {isPending ? <SingleSpinner /> : "Create Teacher"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CreateTeacher;
