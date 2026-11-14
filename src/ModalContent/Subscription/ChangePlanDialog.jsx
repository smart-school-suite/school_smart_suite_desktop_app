import { ArrowRight, RefreshCw, Rocket } from "lucide-react";
import { useState } from "react";
import ConfirmDialog from "../../components/Modals/ConfirmDialog";
import RectangleSkeleton from "../../components/SkeletonPageLoader/RectangularSkeleton";
import { useFormError } from "../../hooks/form/useFormError";
import { useGetPaymentMethod } from "../../hooks/paymentMethod/useGetPaymentMethod";
import { useRenewPlan, useUpgradePlan } from "../../hooks/subscription/useChangePlan";
import { formatDate, formatLimit, formatMoney, planGains } from "../../utils/subscription/planDisplay";

/**
 * Upgrade to another plan or renew the current one.
 *
 *   <ModalButton action={{ modalContent: ChangePlanDialog }}
 *     rowData={{ mode: "upgrade" | "renew", plan, currentPlan, subscription }} />
 */
export default function ChangePlanDialog({ handleClose, rowData }) {
  const { mode = "upgrade", plan, currentPlan, subscription, focusKeys = [] } = rowData ?? {};
  const isRenew = mode === "renew";
  const { formError, errorBannerRef, setClientError, handleServerError, clearFormError } = useFormError(
    isRenew ? "Renewal failed" : "Upgrade failed",
  );
  const { data: methods, isLoading } = useGetPaymentMethod(plan?.country_id);
  const [methodId, setMethodId] = useState(null);
  const [phone, setPhone] = useState("");

  const upgrade = useUpgradePlan(handleClose);
  const renew = useRenewPlan(handleClose);
  const isPending = upgrade.isPending || renew.isPending;

  const paymentMethods = (methods?.data ?? []).flatMap((group) => group?.methods ?? []);
  const gains = isRenew ? [] : planGains(plan, 3, focusKeys).filter((f) => f.change === "up");

  const handleConfirm = () => {
    clearFormError();
    if (!methodId) {
      setClientError("Choose how to pay", ["Pick a payment method to continue."]);
      return;
    }
    if (!/^\+?\d{8,15}$/.test(phone.replace(/\s/g, ""))) {
      setClientError("Check the phone number", ["Enter the mobile money number that will pay, e.g. 6XXXXXXXX."]);
      return;
    }
    const payload = { payment_method_id: methodId, phone_number: phone.replace(/\s/g, "") };
    if (isRenew) {
      renew.mutate({ ...payload, plan_id: plan?.id }, { onError: handleServerError });
    } else {
      upgrade.mutate({ ...payload, new_plan_id: plan?.id }, { onError: handleServerError });
    }
  };

  return (
    <ConfirmDialog
      title={isRenew ? `Renew ${plan?.name}` : `Upgrade to ${plan?.name}`}
      icon={isRenew ? RefreshCw : Rocket}
      description={
        isRenew
          ? `Your plan is extended by a full year${subscription?.end_date ? ` from ${formatDate(subscription.end_date)}` : ""}. Nothing changes in your school.`
          : "Your new limits apply as soon as the payment goes through. All your data, settings and history stay."
      }
      confirmLabel={`Pay ${formatMoney(plan?.price, plan?.currency)}`}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      isPending={isPending}
      error={formError}
      errorRef={errorBannerRef}
      onDismissError={clearFormError}
    >
      <div className="d-flex flex-row align-items-center gap-2 rounded-3 border bg-iron-50 p-2">
        {!isRenew && currentPlan && (
          <>
            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
              <span className="text-iron-500" style={{ fontSize: "0.68rem" }}>From</span>
              <span className="fw-medium text-truncate">{currentPlan.name}</span>
            </div>
            <ArrowRight size={14} className="text-iron-400 flex-shrink-0" aria-hidden="true" />
          </>
        )}
        <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
          <span className="text-iron-500" style={{ fontSize: "0.68rem" }}>{isRenew ? "Plan" : "To"}</span>
          <span className="fw-semibold text-primary-700 text-truncate">{plan?.name}</span>
        </div>
        <div className="d-flex flex-column align-items-end flex-shrink-0">
          <span className="fw-semibold">{formatMoney(plan?.price, plan?.currency)}</span>
          <span className="text-iron-500" style={{ fontSize: "0.68rem" }}>per year</span>
        </div>
      </div>

      {gains.length > 0 && (
        <ul className="list-unstyled m-0 d-flex flex-column gap-1">
          {gains.map((feature) => (
            <li key={feature.key} className="text-iron-600 font-size-xs">
              <span className="fw-semibold text-iron-900">{formatLimit(feature)}</span> {feature.name}
              {feature.multiplier > 1 && <span className="text-primary-600"> · {feature.multiplier}× more</span>}
            </li>
          ))}
        </ul>
      )}

      <fieldset className="d-flex flex-column gap-2 border-0 p-0 m-0">
        <legend className="font-size-xs fw-semibold text-iron-700 mb-1">Pay with</legend>
        {isLoading ? (
          <RectangleSkeleton height="3rem" />
        ) : paymentMethods.length === 0 ? (
          <span className="text-iron-500 font-size-xs">No payment method is available for your country yet. Contact support to change your plan.</span>
        ) : (
          <div className="d-flex flex-row flex-wrap gap-2">
            {paymentMethods.map((method) => {
              const selected = methodId === method.id;
              return (
                <label
                  key={method.id}
                  className={`d-flex flex-row align-items-center gap-2 rounded-3 border px-2 py-2 pointer-cursor flex-grow-1 ${selected ? "border-primary bg-primary-50" : ""}`}
                  style={{ flexBasis: "10rem" }}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    className="form-check-input m-0"
                    checked={selected}
                    onChange={() => {
                      setMethodId(method.id);
                      clearFormError();
                    }}
                  />
                  <img
                    src={method.logoUrl || (method.key === "orange_mobile_money" ? "/images/orange.jpg" : "/images/mtn.jpg")}
                    alt=""
                    className="rounded-2 object-fit-cover"
                    style={{ width: 24, height: 24 }}
                  />
                  <span className="font-size-xs fw-medium text-truncate">{method.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </fieldset>

      <label className="d-flex flex-column gap-1">
        <span className="font-size-xs fw-semibold text-iron-700">Mobile money number</span>
        <input
          type="tel"
          inputMode="tel"
          className="form-control font-size-sm"
          placeholder="6XXXXXXXX"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            clearFormError();
          }}
        />
      </label>
    </ConfirmDialog>
  );
}
