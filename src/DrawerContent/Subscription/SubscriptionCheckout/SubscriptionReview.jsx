import { ArrowRight, Check, Dot, University } from "lucide-react";
import { formatNumber } from "../../../utils/functions";
import HorizontalDashedLine from "../../../components/DashedLine/HorizonetalDashedLine";
import { Fragment } from "react";
import { useSelector } from "react-redux";
function SubscriptionReview({
  handleClose,
  nextStep,
  previousStep,
  fullStep,
  currentStep,
  drawerData,
}) {
  const schoolCredentials = useSelector((state) => state.auth.schoolAuthData);
  const { plan } = drawerData;
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-end p-2">
        <div className="d-flex flex-row align-items-center gap-1 fw-semibold text-capitalize font-size-sm">
          <span>step</span>
          <span>{currentStep}</span>
          <span>of</span>
          <span>{fullStep}</span>
          <span>Completed</span>
        </div>
      </div>
      <div
        className="drawer-content px-2 pt-3 font-size-sm"
        style={{ paddingBottom: "20rem" }}
      >
        <div className="d-flex flex-column gap-4">
          <div className="d-flex flex-column gap-1">
            <span className="font-size-sm fw-medium">Selected Plan</span>
            <div
              className="card border-none border p-2 shadow-sm"
              style={{ borderRadius: "0.8rem" }}
            >
              <div className="d-flex flex-column gap-4">
                <div className="d-flex flex-column gap-2">
                  <span className="fw-medium">{plan?.name}</span>
                  <span className="font-size-sm fw-light text-iron-500">
                    {plan?.description}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-end">
                  <div className="d-flex gap-1 flex-row align-items-baseline">
                    <span className="font-size-lg fw-medium">
                      {formatNumber(parseFloat(plan?.price))}
                    </span>
                    <span>/</span>
                    <span className="text-iron-400">XAF</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between">
                  <span className="font-size-sm text-iron-500">
                    Yearly Billing
                  </span>
                  <button className="d-flex flex-row align-items-center gap-1 border-none bg-none border-bottom font-size-sm">
                    <ArrowRight size={12} />
                    <span>Change</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <span className="font-size-sm fw-medium">School</span>
            <div className="">
              <div className="d-flex flex-row align-items-center gap-2">
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    display: "grid",
                    placeItems: "center",
                  }}
                  className="bg-primary-100 text-primary-500 rounded-3"
                >
                  <University size={20} />
                </div>
                <div className="d-flex flex-column">
                  <span className="fw-medium">
                    {schoolCredentials?.school_name}
                  </span>
                  <div className="d-flex flex-row align-items-center gap-1 text-iron-400 fw-light">
                    <span>{schoolCredentials?.type?.name}</span>
                    <Dot />
                    <span>{schoolCredentials?.school_branch_name}</span>
                    <Dot />
                    <span>Yaounde</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-column gap-3">
            <span className="fw-medium">Included With Your Plan</span>
            <div
              className="d-grid gap-3"
              style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
            >
              {plan?.plan_feature?.map((f) => (
                <Fragment key={f?.id}>
                  <div className="d-flex flex-row align-items-center gap-2">
                    <Check size={16} className="text-fern-500" />
                    <span className="fw-light">{f?.feature?.name}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="drawer-footer font-size-sm">
        <div className="d-flex flex-column w-100">
          <HorizontalDashedLine dashed={false} color="#ccc" thickness={0.5} />
          <div className="d-flex flex-column gap-3 px-2 py-4">
            <span className="fw-medium">Billing Summary</span>
            <div className="d-flex flex-row font-size-sm align-items-center justify-content-between">
              <span className="text-iron-500">Tax</span>
              <span>0</span>
            </div>
            <div className="d-flex flex-row font-size-sm align-items-center justify-content-between">
              <span className="text-iron-500">Additional Fees</span>
              <span>0</span>
            </div>
            <hr />
            <div className="d-flex flex-row align-items-center font-size-sm  justify-content-between">
              <span className="text-iron-500">Total</span>
              <div className="d-flex flex-row align-items-baseline gap-1">
                <span className="font-size-md fw-medium">
                  {formatNumber(parseFloat(plan?.price).toFixed(2))}
                </span>
                <span className="text-iron-400">{plan?.country?.currency}</span>
              </div>
            </div>
          </div>
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
              onClick={() => nextStep()}
            >
              Continue To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default SubscriptionReview;
