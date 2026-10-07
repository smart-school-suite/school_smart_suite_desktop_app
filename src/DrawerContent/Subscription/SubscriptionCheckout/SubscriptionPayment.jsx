import { ArrowLeft, Check, Minus } from "lucide-react";
import { formatNumber } from "../../../utils/functions";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useGetPaymentMethod } from "../../../hooks/paymentMethod/useGetPaymentMethod";
import RectangleSkeleton from "../../../components/SkeletonPageLoader/RectangularSkeleton";
import { NotFoundError } from "../../../components/errors/Error";
import { motion, AnimatePresence } from "framer-motion";
import { PAYMENT_MAP } from "../../../utils/maps/paymentMethod/paymentMethodMap";
import CustomModal from "../../../components/Modals/Modal";
function SubscriptionPayment({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const {
    data: methods,
    isLoading,
    error,
  } = useGetPaymentMethod(schoolCredentials?.country_id?.id);
  const [method, setMethod] = useState(null);
  const { plan } = drawerData;
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-between font-size-sm p-2">
        <div className="d-flex flex-column">
          <span className="fw-medium">Payment Method</span>
          <span className="fw-light text-iron-400">
            Choose How you will like to pay for subscription
          </span>
        </div>
        <div className="d-flex flex-row align-items-center gap-1 fw-semibold text-capitalize">
          <span>step</span>
          <span>{currentStep}</span>
          <span>of</span>
          <span>{fullStep}</span>
          <span>Completed</span>
        </div>
      </div>
      <div className="drawer-content font-size-sm bg-iron-100">
        <div className="d-flex flex-column gap-3 px-2 pt-2">
          {isLoading ? (
            <RectangleSkeleton height="1dvh" width="15%" />
          ) : error ? (
            <NotFoundError
              title={error?.response?.data?.errors?.title}
              description={error?.response?.data?.errors?.description}
            ></NotFoundError>
          ) : (
            methods?.data?.map((c) => (
              <Fragment key={c?.category?.id}>
                <div className="d-flex flex-column gap-1">
                  <span className="fw-medium">{c?.category?.name}</span>
                  <div className="d-flex flex-column gap-2">
                    {c?.methods?.map((m) => (
                      <Fragment key={m.id}>
                        <MethodCard
                          method={m}
                          onSelect={(method) => {
                            setMethod(method);
                          }}
                          selectedMethod={method}
                          handleCloseDrawer={handleClose}
                          plan={plan}
                        />
                      </Fragment>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))
          )}
        </div>
      </div>
      <div className="drawer-footer">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-row align-items-center justify-content-between px-2 py-3">
            <button
              className="border-none bg-none border-bottom font-size-sm d-flex flex-row align-items-center gap-2"
              onClick={() => previousStep()}
            >
              <ArrowLeft size={16} />
              <span>Back to Review</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SubscriptionPayment;

function MethodCard({ method, onSelect, selectedMethod, handleCloseDrawer, plan }) {
  const isSelected = selectedMethod?.id === method?.id;
  const rowData = {
    method,
    handleCloseDrawer,
    plan
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(method);
    }
  };
  const Payment = PAYMENT_MAP[method.key];
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    component: null,
    size: "md",
    closeOnOutsideClick: true,
    closeOnEscape: true,
  });
  const handleCloseModal = () => {
    setShowModal(false);
    setModalConfig((prev) => ({ ...prev, component: null }));
  };
  const handleShowModal = (Component, options = {}) => {
    const {
      size = "md",
      closeOnOutsideClick = true,
      closeOnEscape = true,
    } = options;

    setModalConfig({
      component: Component,
      size,
      closeOnOutsideClick,
      closeOnEscape,
    });
    setShowModal(true);
  };
  return (
    <>
      <motion.div
        role="button"
        tabIndex={0}
        aria-selected={isSelected}
        onClick={() => {
          handleShowModal(Payment, {
            title: method?.name,
            closeOnOutsideClick: false,
            showHeader: true,
          });
          onSelect?.(method);
        }}
        onKeyDown={handleKeyDown}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        animate={{
          scale: isSelected ? 1.01 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`card d-flex flex-column gap-3 pointer-cursor ${
          isSelected
            ? "border-1 border-primary-500 bg-primary-100"
            : "border-none border bg-white"
        }`}
        style={{
          padding: "0.7rem",
          borderRadius: "0.75rem",
          transition: "background-color 0.2s, border-color 0.2s",
        }}
      >
        <div className="d-flex flex-row align-items-start gap-2">
          <div
            style={{ width: 54, height: 54 }}
            className="bg-primary-50 rounded-3 flex-shrink-0 overflow-hidden"
          >
            <img
              src={
                method?.logoUrl ||
                (method?.key === "orange_mobile_money"
                  ? "/images/orange.jpg"
                  : "/images/mtn.jpg")
              }
              alt={method?.name || "Payment method"}
              className="w-100 h-100 object-fit-cover rounded-3"
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="d-flex flex-row justify-content-between align-items-start">
              <div className="d-flex flex-column">
                <span className="fw-semibold">{method?.name}</span>
                <span className="fw-light text-iron-400">
                  {method?.description}
                </span>
              </div>
              <motion.div
                style={{
                  width: 24,
                  height: 24,
                  flexShrink: 0,
                }}
                animate={{
                  scale: isSelected ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`d-flex justify-content-center align-items-center rounded-circle ${
                  isSelected
                    ? "bg-primary-500 text-white"
                    : "bg-none border-2 border"
                }`}
              >
                <AnimatePresence mode="wait">
                  {isSelected && (
                    <motion.div
                      key="check"
                      initial={{ scale: 0, opacity: 0, rotate: -45 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      exit={{ scale: 0, opacity: 0, rotate: 45 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    >
                      <Check size={14} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.2} />

        <div className="d-flex flex-row align-items-center gap-2">
          <div className="d-flex flex-row align-items-start gap-1">
            <span className="text-iron-400 text-uppercase fw-light">
              Max Deposit:
            </span>
            <div className="d-flex flex-row align-items-center gap-2">
              <span className="fw-medium">
                {formatNumber(parseFloat(method?.max_deposit))}
              </span>
              <span className="fw-light text-iron-400">
                {method?.country?.currency}
              </span>
            </div>
          </div>
          <Minus size={16} />
          <div className="d-flex flex-row align-items-start gap-2">
            <span className="text-iron-400 text-uppercase fw-light">
              Max Withdraw:
            </span>
            <div className="d-flex flex-row align-items-center gap-1">
              <span className="fw-medium">
                {formatNumber(parseFloat(method?.max_withdraw))}
              </span>
              <span className="fw-light text-iron-400">
                {method?.country?.currency}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      <CustomModal
        show={showModal}
        handleClose={handleCloseModal}
        size={modalConfig.size}
        closeOnOutsideClick={modalConfig.closeOnOutsideClick}
        closeOnEscape={modalConfig.closeOnEscape}
        centered
      >
        {modalConfig.component && (
          <modalConfig.component
            rowData={rowData}
            handleClose={handleCloseModal}
          />
        )}
      </CustomModal>
    </>
  );
}
