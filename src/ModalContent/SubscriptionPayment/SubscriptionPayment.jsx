import { Icon } from "@iconify/react";
import { useGetPaymentMethod } from "../../hooks/paymentMethod/useGetPaymentMethod";
import { Fragment, useState } from "react";
import { paymentMethodComp } from "../../constants/paymentMethod";
import { useGetSubscriptionPlanDetails } from "../../hooks/subscription/useGetSubscriptionPlanDetails";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
function SubscriptionPayment({ rowData, handleClose }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const {
    data: paymentMethod,
    isLoading: isPaymentMethodLoading,
    error: paymentMethodError,
  } = useGetPaymentMethod(rowData.country_id);
  const {
    data: plan,
    isLoading: isPlanLoading,
    error: planError,
  } = useGetSubscriptionPlanDetails(rowData.plan_id);
  return (
    <>
      <div className="w-100">
        <div className="d-flex flex-row align-items-center justify-content-between mb-3">
          <h5 className="text-white">Subscription Checkout</h5>
          <span
            className="m-0"
            onClick={() => {
              handleClose();
            }}
          >
            <Icon icon="charm:cross" width="22" height="22" />
          </span>
        </div>
        {isPaymentMethodLoading || isPlanLoading ? (
          <div className="d-flex flex-row gap-3 w-100">
            <div
              style={{ width: "65%" }}
              className="payment-method-container scroll-bar-sm"
            >
              <div className="d-flex flex-row flex-wrap gap-4">
                {[...Array(4)].map((_items, index) => (
                  <RectangleSkeleton
                    key={index}
                    height="40dvh"
                    width="35%"
                    speed={1}
                  />
                ))}
              </div>
            </div>
            <div style={{ width: "35%" }}>
              <RectangleSkeleton height="60dvh" width="100%" speed={1} />
            </div>
          </div>
        ) : planError || paymentMethodError ? (
          <NotFoundError
            title={
              planError?.response?.data?.errors?.title ||
              paymentMethodError?.response?.data?.errors?.title
            }
            description={
              planError?.response?.data?.errors?.description ||
              paymentMethodError?.response?.data?.errors?.description
            }
          ></NotFoundError>
        ) : (
          <div className="w-100 d-flex flex-row align-items-start gap-3">
            <div
              style={{ width: "60%" }}
              className="payment-method-container scroll-bar-sm"
            >
              {paymentMethod.data.map((items) => (
                <Fragment key={items?.category?.id}>
                  <div className="w-100 d-flex flex-column gap-2">
                    <h6 className="text-white">{items?.category?.name}</h6>
                    <div className="d-flex flex-row flex-wrap gap-4">
                      {items?.methods?.map((method) => (
                        <Fragment key={method.id}>
                          <div
                            className={`method-card pointer-cursor p-2  position-relative ${
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
                              <span className="font-size-sm text-white">
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
            <div style={{ width: "40%" }} className="d-flex flex-column gap-2">
              <h6 className="text-white">Order Summary</h6>
              <div className="d-flex flex-column gap-2">
                <div className="d-flex text-white flex-row font-size-sm align-items-center justify-content-between">
                  <span>Plan</span>
                  <span>{plan?.data?.name}</span>
                </div>
                <div className="d-flex flex-row font-size-sm align-items-center justify-content-between">
                  <span>Sub Total</span>
                  <span>
                    {plan?.data?.price} {plan?.data?.country?.currency}
                  </span>
                </div>
                <div className="d-flex flex-row font-size-sm align-items-center justify-content-between">
                  <span>Tax</span>
                  <span>0</span>
                </div>
                <div className="d-flex flex-row font-size-sm align-items-center justify-content-between">
                  <span>Additional Fees</span>
                  <span>0</span>
                </div>
                <hr />
                <div className="d-flex flex-row align-items-center font-size-sm text-white justify-content-between">
                  <span>Total</span>
                  <span>
                    {parseFloat(plan?.data?.price).toFixed(2)}{" "}
                    {plan?.data?.country?.currency}
                  </span>
                </div>
              </div>
              <PaymentForm
                selectedMethod={selectedMethod}
                selectedPlan={plan.data}
                paymentMethod={paymentMethod.data}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
export default SubscriptionPayment;

function PaymentForm({ selectedMethod, selectedPlan, paymentMethod }) {
  const methodObj = paymentMethodComp.find((m) => m.key === selectedMethod);
  const PaymentUI = methodObj ? methodObj.component : null;
  return (
    <>
      {PaymentUI ? (
        <PaymentUI
          selectedMethod={selectedMethod}
          selectedPlan={selectedPlan}
          paymentMethod={paymentMethod}
        />
      ) : (
        <p className="text-center font-size-sm text-white">
          Please select a valid payment method. to Continue
        </p>
      )}
    </>
  );
}
