import { Icon } from "@iconify/react";
import { useGetActivationCodeTypes } from "../../hooks/activationCode/useGetActivationCodeType";
import { useGetPaymentMethod } from "../../hooks/paymentMethod/useGetPaymentMethod";
import { NumberInput } from "../../components/FormComponents/InputComponents";
import { numberSchema } from "../../ComponentConfig/YupValidationSchema";
import { useState, Fragment } from "react";
import { formatNumber } from "../../utils/functions";
import { useSelector } from "react-redux";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../components/errors/Error";
import toast from "react-hot-toast";
import ToastWarning from "../../components/Toast/ToastWarning";
import { allFieldsValid } from "../../utils/functions";
import { activationCodePaymentMethodComp } from "../../constants/activationCodePaymentMethod";
function PurchaseActivationCode({ handleClose }) {
  const {
    data: activationCodeType,
    isLoading: isActivationCodeTypeLoading,
    error: activationCodeTypeError,
  } = useGetActivationCodeTypes();
  const countryState = useSelector(
    (state) => state.auth.user.schoolDetails?.school?.country
  );
  const userCurrencySymbol = countryState.currency;
  const {
    data: paymentMethod,
    isLoading: isPaymentMethodLoading,
    error: paymentMethodError,
  } = useGetPaymentMethod(countryState.id);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({
    teacher_code_count: 0,
    student_code_count: 0,
  });
  const [isFieldValid, setIsFieldValid] = useState({
    student_code_count: "",
    teacher_code_count: "",
  });
  const handleStateChange = (field, value, stateFn) => {
    stateFn((prev) => ({ ...prev, [field]: value }));
  };

  const handleValidation = async () => {
    if (formData.student_code_count == 0 && formData.teacher_code_count == 0) {
      toast.custom(
        <ToastWarning
          title="No Recipients Selected"
          description="Please add at least one student or teacher code to proceed."
        />
      );
      return;
    }
    if (validateParticipants(formData, isFieldValid)) {
      <ToastWarning
        title={"Invalid Fields"}
        description="Please check the highlighted fields and try again."
      />;
    }
  };
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between mb-3">
        <span className="m-0">Purchase Code</span>
        <span
          className="m-0"
          onClick={() => {
            handleClose();
          }}
        >
          <Icon icon="charm:cross" width="22" height="22" />
        </span>
      </div>
      <div className="d-flex flex-row align-items-center w-100">
        {isPaymentMethodLoading || isActivationCodeTypeLoading ? (
          <div className="d-flex flex-row gap-3 w-100">
            <div
              style={{ width: "50%" }}
              className="payment-method-container scroll-bar-sm"
            >
             <div className="d-flex flex-column gap-2">
              <RectangleSkeleton height="1dvh" width="25%" speed={1} />
               <div className="d-flex flex-row flex-wrap gap-4">
                {[...Array(2)].map((_items, index) => (
                  <RectangleSkeleton
                    key={index}
                    height="30dvh"
                    width="35%"
                    speed={1}
                  />
                ))}
              </div>
             </div>
            </div>
            <div style={{ width: "50%" }} className="d-flex flex-column gap-4">
              <div className="d-flex flex-row align-items-center w-100 gap-2">
                <div className="d-flex flex-column w-50 gap-2">
                  <RectangleSkeleton height="1dvh" width="25%" speed={1} />
                  <RectangleSkeleton height="4.5dvh" width="100%" speed={1} />
                </div>
                <div className="d-flex flex-column w-50 gap-2">
                  <RectangleSkeleton height="1dvh" width="25%" speed={1} />
                  <RectangleSkeleton height="4.5dvh" width="100%" speed={1} />
                </div>
              </div>
              <div>
                <RectangleSkeleton height="1dvh" width="15%" speed={1} />
              </div>
              <div className="d-flex flex-column gap-3 w-100">
                {[...Array(6)].map((_, index) => (
                  <Fragment key={index}>
                    <div className="d-flex flex-row justify-content-between w-100">
                      <RectangleSkeleton height="1dvh" width="20%" speed={1} />
                      <RectangleSkeleton height="1dvh" width="10%" speed={1} />
                    </div>
                  </Fragment>
                ))}
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-between w-100">
                <RectangleSkeleton height="1dvh" width="20%" speed={1} />
                <RectangleSkeleton height="1dvh" width="10%" speed={1} />
              </div>
            </div>
          </div>
        ) : paymentMethodError || activationCodeTypeError ? (
          <NotFoundError
            title={
              activationCodeTypeError?.response?.data?.errors?.title ||
              paymentMethodError?.response?.data?.errors?.title
            }
            description={
              activationCodeTypeError?.response?.data?.errors?.description ||
              paymentMethodError?.response?.data?.errors?.description
            }
          ></NotFoundError>
        ) : (
          <>
            <div className="d-flex flex-row align-items-start gap-2 w-100">
              <div
                style={{ width: "50%" }}
                className="payment-method-container scroll-bar-sm"
              >
                {paymentMethod.data.map((items) => (
                  <Fragment key={items?.category?.id}>
                    <div className="w-100 d-flex flex-column gap-2">
                      <span>{items?.category?.name}</span>
                      <div className="d-flex flex-row flex-wrap gap-4">
                        {items?.methods?.map((method) => (
                          <Fragment key={method.id}>
                            <div
                              className={`method-card pointer-cursor p-2  position-relative  border ${
                                selectedMethod == method.key
                                  ? "payment-method-selected"
                                  : ""
                              }`}
                              onClick={() => {
                                setSelectedMethod(method.key);
                              }}
                            >
                              {selectedMethod == method.key && (
                                <div
                                  className="position-absolute z-3"
                                  style={{ right: "4px" }}
                                >
                                  <div
                                    style={{
                                      background: "#c1f1cb",
                                      width: "1rem",
                                      height: "1rem",
                                      placeItems: "center",
                                      boxShadow:
                                        "0 2px 8px rgba(223, 249, 228, 0.3)",
                                    }}
                                    className="d-grid rounded-circle"
                                  >
                                    <div
                                      style={{
                                        background: "#58d073",
                                        width: "0.6rem",
                                        height: "0.6rem",
                                      }}
                                      className="rounded-circle"
                                    ></div>
                                  </div>
                                </div>
                              )}
                              <div>
                                <img
                                  src={`/images/${
                                    method.key == "mtn_mobile_money"
                                      ? "mtn.jpg"
                                      : "orange.jpg"
                                  }`}
                                  alt="operator_img"
                                  style={{
                                    width: "100%",
                                    height: "80%",
                                    objectFit: "contain",
                                  }}
                                />
                              </div>
                              <div className="mt-auto">
                                <span className="font-size-sm">
                                  {method.name}
                                </span>
                              </div>
                            </div>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
              <div
                className="d-flex flex-column gap-3"
                style={{ width: "50%" }}
              >
                <div className="d-flex flex-row align-items-center gap-2">
                  <div className="w-50">
                    <span className="font-size-sm">Teacher Code Count</span>
                    <NumberInput
                      placeholder={"e.g 100 Codes"}
                      onChange={(value) =>
                        handleStateChange(
                          "teacher_code_count",
                          value,
                          setFormData
                        )
                      }
                      onValidationChange={(value) =>
                        handleStateChange(
                          "teacher_code_count",
                          value,
                          setIsFieldValid
                        )
                      }
                      validationSchema={numberSchema({
                        min: 1,
                        max: 1000,
                        required: true,
                        integerOnly: true,
                        messages: {
                          required: "Code Count Required",
                          min: "Code Count Must Be Atleast 1",
                          max: "Code Count Must Not Exceed 1000",
                        },
                      })}
                      value={formData.teacher_code_count}
                    />
                  </div>
                  <div className="w-50">
                    <span className="font-size-sm">Student Code Count</span>
                    <NumberInput
                      placeholder={"e.g 100 Codes"}
                      onChange={(value) =>
                        handleStateChange(
                          "student_code_count",
                          value,
                          setFormData
                        )
                      }
                      onValidationChange={(value) =>
                        handleStateChange(
                          "student_code_count",
                          value,
                          setIsFieldValid
                        )
                      }
                      validationSchema={numberSchema({
                        min: 1,
                        max: 1000,
                        required: true,
                        integerOnly: true,
                        messages: {
                          required: "Code Count Required",
                          min: "Code Count Must Be Atleast 1",
                          max: "Code Count Must Not Exceed 1000",
                        },
                      })}
                      value={formData.student_code_count}
                    />
                  </div>
                </div>
                <span className="font-size-sm gainsboro-color">
                  Order Summary
                </span>
                <div className="d-flex flex-column gap-2">
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="font-size-sm">Teacher Code Count</span>
                    <span className="font-size-sm fw-bold">
                      {formData.teacher_code_count || 0}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="font-size-sm">Teacher Code Price</span>
                    <span className="font-size-sm fw-bold">
                      {activationCodeType?.data
                        ? formatNumber(
                            parseFloat(
                              activationCodeType?.data?.find(
                                (items) => items.type == "teacher"
                              )?.price
                            )
                          )
                        : 0}{" "}
                      {userCurrencySymbol}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="font-size-sm">
                      Teacher Code Price Total
                    </span>
                    <span className="font-size-sm fw-bold">
                      {activationCodeType?.data
                        ? formatNumber(
                            totalTeacherPrice(
                              formData.teacher_code_count,
                              activationCodeType?.data
                            )
                          )
                        : 0}{" "}
                      {userCurrencySymbol}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="font-size-sm">Student Code Count</span>
                    <span className="font-size-sm fw-bold">
                      {formData.student_code_count || 0}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="font-size-sm">Student Code Price</span>
                    <span className="font-size-sm fw-bold">
                      {activationCodeType?.data
                        ? parseFloat(
                            activationCodeType?.data?.find(
                              (items) => items.type == "student"
                            )?.price
                          )
                        : 0}{" "}
                      {userCurrencySymbol}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="font-size-sm">
                      Student Code Price Total
                    </span>
                    <span className="font-size-sm fw-bold">
                      {activationCodeType?.data
                        ? formatNumber(
                            totalStudentPrice(
                              formData.student_code_count,
                              activationCodeType?.data
                            )
                          )
                        : 0}{" "}
                      {userCurrencySymbol}
                    </span>
                  </div>
                  <hr />
                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="font-size-sm">Total Price</span>
                    <span className="font-size-sm fw-bold">
                      {activationCodeType?.data
                        ? formatNumber(
                            totalPrice(
                              formData.student_code_count,
                              formData.teacher_code_count,
                              activationCodeType?.data
                            )
                          )
                        : 0}{" "}
                      {userCurrencySymbol}
                    </span>
                  </div>
                </div>
                <div>
                  <PaymentForm
                    selectedMethod={selectedMethod}
                    paymentMethod={paymentMethod.data}
                    purchaseCredentials={formData}
                    handleValidation={handleValidation}
                    currency={userCurrencySymbol}
                    totalPrice={totalPrice(
                      formData.student_code_count,
                      formData.teacher_code_count,
                      activationCodeType?.data
                    )}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default PurchaseActivationCode;

const validateParticipants = (formData, isFieldValid) => {
  const hasStudents = formData.student_code_count > 0;
  const hasTeachers = formData.teacher_code_count > 0;

  if (!hasStudents && !hasTeachers) return false;

  const studentValid = hasStudents
    ? allFieldsValid(isFieldValid.student_code_count)
    : true;
  const teacherValid = hasTeachers
    ? allFieldsValid(isFieldValid.teacher_code_count)
    : true;

  return studentValid && teacherValid;
};

const totalPrice = (totalStudent, totalTeacher, activationCodeTypes) => {
  const teacherPrice = activationCodeTypes.find(
    (items) => items.type == "teacher"
  ).price;
  const studentPrice = activationCodeTypes.find(
    (items) => items.type == "student"
  ).price;
  return (teacherPrice * totalTeacher + studentPrice * totalStudent).toFixed(2);
};

const totalStudentPrice = (totalStudent, activationCodeTypes) => {
  const studentPrice = activationCodeTypes.find(
    (items) => items.type == "student"
  ).price;
  return (studentPrice * totalStudent).toFixed(2);
};

const totalTeacherPrice = (totalTeacher, activationCodeTypes) => {
  const teacherPrice = activationCodeTypes.find(
    (items) => items.type == "teacher"
  ).price;
  return (teacherPrice * totalTeacher).toFixed(2);
};

function PaymentForm({
  selectedMethod,
  paymentMethod,
  purchaseCredentials,
  handleValidation,
  currency,
  totalPrice,
}) {
  const methodObj = activationCodePaymentMethodComp.find(
    (m) => m.key === selectedMethod
  );
  const PaymentUI = methodObj ? methodObj.component : null;
  return (
    <>
      {PaymentUI ? (
        <PaymentUI
          selectedMethod={selectedMethod}
          handleValidation={handleValidation}
          purchaseCredentials={purchaseCredentials}
          paymentMethod={paymentMethod}
          currency={currency}
          totalPrice={totalPrice}
        />
      ) : (
        <p className="text-center font-size-sm">
          Please select a valid payment method. to Continue
        </p>
      )}
    </>
  );
}
